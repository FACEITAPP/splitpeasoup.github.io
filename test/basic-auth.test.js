require('dotenv').config({path: '../.env'});
const superagent = require('superagent');
const btoa = require('btoa');
const PORT = process.env.PORT || 3000;
const SERVER_URL = 'http://localhost:' + PORT;
const SIGNUP_URL = SERVER_URL + '/api/signup';
const SIGNIN_URL = SERVER_URL + '/api/signin';
const PANEL_URL = SERVER_URL + '/api/panel';

function getUserParams() {
  return {
    username: 'Bradley' + Math.random(),
    password: 'trees',
    photo: {image: 'baker.jpg'}
  };
};

function signUpUser(newUser) {
  let imageLocation = './uploads/baker.jpg';
  return superagent.post(SIGNUP_URL)
  .set('Content-Type', 'application/json')
  .auth(newUser.username, newUser.password)
  .field('username', newUser.username)
  .field('password', newUser.password)
  .attach('photo', imageLocation)
}
describe('sends 200 when user successfully signs up on /signup', () => {
  it('sends 200 for authorized GET request made with a valid id', (done) => {
    let newUser = getUserParams();
      signUpUser(newUser)
      .end((err, res) => {
        if (err) {
          console.error('User not successfully signed up', err)
        };
        expect(res.status).toBe(200);
        expect(res.body.username).toBe(newUser.username);
        expect(res.body.password).toBeDefined();
        expect(res.body.password).not.toBe(newUser.password);
        expect(res.body.photo).toBeDefined();
        done();
    });
  });
});

describe('/api/signin', () => {
  it('should return status 400 if missing username', done => {
    let params = getUserParams();
    delete params['username'];
    superagent
      .post(SIGNIN_URL)
      .set('Content-Type', 'application/json')
      .send(params)
      .then(result => console.log('result', result.status))
      .catch(err => {
        expect(err.status).toEqual(400);
        done();
      });
  });

  it('should return status 400 if missing password', done => {
    let params = getUserParams();
    delete params['password'];
    superagent
      .post(SIGNIN_URL)
      .set('Content-Type', 'application/json')
      .send(params)
      .catch(err => {
        expect(err.status).toEqual(400);
        done();
      });
  });

  it('should return status 200 with successful request', done => {
    let params = getUserParams();
    superagent
      .post(SIGNIN_URL)
      .set('Content-Type', 'application/json')
      .send(params)
      .then(res => {
        expect(res.status).toEqual(200);
        done();
      });
  });
});

// describe('/api/panel', () => {
//   it('should return 401 unauthorized if password is incorrect', done => {
//     let params = getUserParams();
//     superagent
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

//   it.only('should return 200 if username and password are', done => {
//     let params = getUserParams();
//     superagent
//       .post(PANEL_URL)
//       .set('Content-Type', 'application/json')
//       .send(params)
//       .then(res => {
//         expect(res.status).toEqual(200); 
//         let payload = params['username'] + ':' + params['password'];
//         let encoded = btoa(payload);
//         return superagent
//           .get(PANEL_URL)
//           .set('Authorization', 'Basic ' + encoded);
//       })
//       .then(res => {
//         expect(res.status).toEqual(200);
//         done();
//       });
//   });
// });

module.exports = signUpUser;