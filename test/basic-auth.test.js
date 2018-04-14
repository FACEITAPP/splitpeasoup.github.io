require('dotenv').config({path: '../.env'});
const server = require('../server.js');
const superagent = require('superagent');
const btoa = require('btoa');
const PORT = process.env.PORT || 3000;
const SERVER_URL = 'http://localhost:' + PORT;
const SIGNUP_URL = SERVER_URL + '/api/signup-with-face';
const SIGNIN_URL = SERVER_URL + '/api/signin-with-face';
const PANEL_URL = SERVER_URL + '/api/panel';
const auth = require('../routes/authRouter.js');

function getUserParams() {
  return {
    username: 'Bradley' + Math.random(),
    password: 'trees',
    // photo: {url: 'baker.jpg'}
  };
};
  
// function signUpUser(newUser) {
//   let imageLocation = './uploads/baker.jpg';
//   return superagent
//   .post(SIGNUP_URL)
//   .set('Content-Type', 'application/json')
//   .auth(newUser.username, newUser.password)
//   .field('username', newUser.username)
//   .field('password', newUser.password)
//   .attach('photo', imageLocation)
// };

function signInUser(newUser) {
  let payload = newUser['username'] + ':' + newUser['password'];
  let encoded = btoa(payload);
  return superagent
  .get(SIGNIN_URL)
  .set('Authorization', 'Basic ' + encoded)
  .set('photo', 'https://faceit-app.s3.amazonaws.com/358dfa9dc781d2f4d0e979bdae3b74aa.jpg')
};

describe('Basic Auth', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  describe('test /signup-with-face', () => {
    it('sends 200 for authorized GET request made with a valid id', (done) => {
      let newUser = getUserParams();
      let payload = newUser['username'] + ':' + newUser['password'];
      let encoded = btoa(payload);
      superagent
      .get(SIGNUP_URL)
      .set('Authorization', 'Basic ' + encoded)
      .set('photo', 'https://faceit-app.s3.amazonaws.com/358dfa9dc781d2f4d0e979bdae3b74aa.jpg')
            
      .end((err, res) => {
          if (err) {
            console.error('User not successfully signed up', err)
          };
          expect(res.status).toBe(200);
          done();
      });
    });

    it('should return status 400 if missing password', (done) => {
      let newUser = getUserParams();
      let imageLocation = './uploads/baker.jpg';
      return superagent
      .post(SIGNUP_URL)
      .set('Content-Type', 'application/json')
      .auth(newUser.username, newUser.password)
      .field('username', newUser.username)
      .attach('photo', imageLocation)
      .catch(res => {
        expect(res.status).toBe(400);
        done();
      });
  });

    it('should return status 400 if missing username', (done) => {
      let newUser = getUserParams();
      delete newUser['username'];      
      let imageLocation = './uploads/baker.jpg';
      superagent
      .post(SIGNUP_URL)
      .set('Content-Type', 'application/json')
      .auth(newUser.username, newUser.password)
      .field('password', newUser.password)
      .attach('photo', imageLocation)
      .catch(res => {
        expect(res.status).toBe(400);
        done();
      });
  });
});

  describe('/api/signin', () => {
    it('should return status 400 if missing username', done => {
      let newUser = getUserParams();
      signUpUser(newUser)
      .end((err, res) => {
        return superagent
        .get(SIGNIN_URL)
        .set('Content-Type', 'application/json')
        .auth(newUser.password)
        .end((err, res) => {
          if (err) {
            console.error('error', err);
          }
          token = res.body.token;
          expect(res.status).toBe(400);
          done();
        })
      });
    });

    it('should return status 400 if missing password', done => {
      let newUser = getUserParams();
      signUpUser(newUser)
      .end((err, res) => {
        return superagent
        .get(SIGNIN_URL)
        .set('Content-Type', 'application/json')
        .auth(newUser.username)
        .end((err, res) => {
          if (err) {
            console.error('error', err);
          }
          token = res.body.token;
          expect(res.status).toBe(400);
          done();
        })
      });
    });

    it('should return status 200 with successful request', done => {
      let newUser = getUserParams();
      let token = signInUser(newUser)
      .end((err, res) => {
          if (err) {
            console.error('User not successfully signed in', err)
          };
          expect(res.status).toBe(200);
          expect(token).toBeDefined();
          done();
        })
      });
  });

  // describe('/api/panel', () => {
  //   it.only('should return 200 if username and password are', done => {
  //     let newUser = getUserParams();
  //     let userId;
  //     signUpUser(newUser)
  //       .then(res => {
  //         expect(res.status).toBe(200);
  //         userId = res.body._id;
  //         return signIn(newUser);
  //       })
  //       .then(res => {
  //         expect(res.status).toBe(200);
  //         expect(res.body.token).toBeDefined();
  //         expect(jwt.verify(res.body.token, process.env.SECRET).id).toBe(userId);
  //         done();
  //       });
  //   });
  // let newUser = getUserParams();
  //     let userId;
  //     signUpUser(newUser)
  //       .then(() => signIn(newUser))
  //       .then(res => {
  //         const token = res.body.token;
  //         return superagent(auth).get(PANEL_URL)
  //         .set('Authorization', 'Bearer ' + token)
  //         .then(result => {
  //           expect(result.status).toBe(200)
  //           done();
  //       });
  //     });
  //   });
  // });





  //   it('should return 401 unauthorized if password is incorrect', done => {
  //     let params = getUserParams();
  //     return superagent
  //       .post(PANEL_URL)
  //       .set('Content-Type', 'application/json')
  //       .send(params)
  //       .then(res => {
  //         expect(res.status).toEqual(200);
  //         // setting the password as a wrong password
  //         let payload = params['username'] + ':' + 'wrongpassword';
  //         let encoded = btoa(payload);
  //         return superagent
  //           .get(PANEL_URL)
  //           .set('Authorization', 'Basic ' + encoded);
  //       })
  //       .catch(err => {
  //         expect(err.status).toEqual(401);
  //         done();
  //       });
  //   });
});