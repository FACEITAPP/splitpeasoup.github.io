# Midterm Review
## Large Repo
First impressions: it's takes way too long to download your repo. It's 400MB
after cloning the entire thing. It looks like the culprit is .git itself. The
size of the .git directory is 390M. You must have committed a very large number
of files at some point in the past.

That being said, we'd need to do research to find out how to reduce the size of
the repo without obliterating the history. You could start a fresh repo with
all your code as it is from scratch, but you wouldn't ever be able to go back
in time. There must be some way to fix this, I simply don't know what it is.
Chalk it all up as an opportunity to be careful about what's committed, and a
research opportunity to find out what is the culprit here and how to fix it.

## README Contents
Nice README. Great job prominently listing everone on the team. Impressive
list of technologies you used! You really tied together a lot of things.

## .env Configuration

## Routing
There's inconsistent indentation inside the `userRouter.js` file which
makes the whole complex file harder to read and understand.

Bring more of the URL for your routers into the main server. The server should
look like a summary of all the URL endpoints. In your server every single
router is mapped off just `/api` so there's no real immediate distinction
between the three routers.

Here's what you have:

```js
app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', photoRouter);
```

Here's what would be better:

```js
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/photos', photoRouter);
```

You have so many different routes inside the user router. It's messy!
Some routes are even duplicated, and there's auth-looking routes in
the user router that probably shouldn't be there. 

```js
userRouter.route('/faces')
userRouter.route('/signup-upload').post
userRouter.route('/signup-with-face').get
userRouter.route('/signup')
userRouter.route('/signin-upload').post
userRouter.route('/signin-with-face').get
userRouter.route('/face/person')
```

Adding comments to each of these routes might help you add 
clarity to your application. What do each of these routes 
really do?

* `GET /faces` uses bearer auth to find and return user info.
* `POST /signup-upload` uploads a photo to AWS, saves Photo to db and returns photo url.
* `GET /signup-with-face` uses face API to get face token,  create user and return token
* `POST /signup` uploads a photo, saves Photo to db, access face
  API, creates user, creates and returns token.
* `POST /signin-upload` uploads photo, creates Photo in db, responds with photo url.
* `GET /signin-with-face` posts photo url to Face API, compares
  confidence value, signs and responds with token
* `GET /face-person` responds with user info
* `PUT /face-person` updates user info
* `DELETE /face-person` does a strange request with superagent to `/user` then finds and removes user


It's not clear to be what's happening here. Why is your server
calling superagent.route? A comment would be helpful.

```js
superagent.route('/user').delete(req, res)
  .then(user => {
    User.findByIdAndRemove(req.params.id)
  .then(user => {
    if (website.userId.toString() === req.user.id.toString()) {
      return user.remove();
    }
  })
```

### Uploading Photos
Searching for ".upload" or "ACL:" shows five places in your application that
are configured to receive photos and store them on AWS. Perhaps some complexity
of your application could be reduced by reducing this down to just two places.

Don't users only need to upload photos if:

1. They're saving a photo to be authed with later.
2. They're uploading a photo to sign in with.

### HTML Router
Looks like your html router is never being used. Delete the file.

## MongoDB Models
Good job using the pre-save hook to avoid storing plain-text passwords.
Also good job attaching the `.checkPassword` method to the User model.

## Error Handler
Good job making the error handler. It is definitely useful converting those
obscure error messages into more meaningful explanations.

That being said, the error handler is redundant. It repeats logic and
structure over and over. Rewrite it to seperate the data from the
mechanism of using the data. Extract the error codes and their corresponding
explanations so it's just data, then write code to process that data.

It's nice to separate data from code because it makes it easier to change how
you interact with the data later.

You could turn this first piece of code into the second:

```js
let apiError = function (result, res) {
	if (!result || result.error_message) {
		return {
			msg: 'Internal server error.',
			status: 500
		}
	}

	if (result.error_message.includes('IMAGE_ERROR_UNSUPPORTED_FORMAT')) {
		//console.log("400 - IMAGE_ERROR_UNSUPPORTED_FORMAT");
		return {
			msg: 'The uploaded image can not be resolved. The file format may not be supported or the file is damaged.',
			status: 400
		};
	}

	if (result.error_message.includes('INVALID_IMAGE_SIZE')) {
		//console.log("400 - INVALID_IMAGE_SIZE");
		return {
			msg: 'The size of uploaded image does not meet the size requirements.',
			status: 400
		};
  }
  // ...
}
```

```js
let ERRORS = [
  {
    message: 'IMAGE_ERROR_UNSUPPORTED_FORMAT',
    explanation: 'The uploaded image can not be resolved. The file format may not be supported or the file is damaged.'
  },
  {
    message: 'INVALID_IMAGE_SIZE',
    explanation: 'The size of uploaded image does not meet the size requirements.',
  },
  {
	  message:'IMAGE_DOWNLOAD_TIMEOUT',
    explanation: 'IMAGE_DOWNLOAD_TIMEOUT',
		customResponseCode: 412
  }
  // ...
];

let apiError = function (result, res) {
	if (!result || result.error_message) {
		return {
			msg: 'Internal server error.',
			status: 500
		}
	}

  ERRORS.forEach(err => {
    if (result.error_message.includes(err.message)) {
      return {
        msg: err.explanation,
        // send a custom response code if it's configured,
        // otherwise default 400.
        status: customResponseCode || 400 
      };
    }
  });
}
```

## Frontend
Nice work starting to build out the front-end and get that working.

# Overall
There's a lot of nitpicks here, but don't let that dissuade you. You
all chose to do perhaps the most complex project in the class. You
all tied together a lot of technologies.

If there's one takeaway from this project: delete more stuff! I know
it takes a lot of work and you have to write a lot of code to prove things
and figure things out along the way. When you've got things working the
second step should be to stop and figure out how to make things less complex.

I think your app could have been reduced to three routes (plus more for CRUD
stuff):

* `/auth/signup` - create an account (don't allow photo uploads)
* `/auth/signin` - log in with username/password/photo. Fail if user has photo
  set and the request doesn't send the request with a photo.
* `/users/upload-photo` - the one route where users upload a photo to set as
  auth in their account.
  