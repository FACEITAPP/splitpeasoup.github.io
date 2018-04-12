'use strict';
// To-Dos: 
// 1. Write tests for no username/password/photo (also photo needs face)
// 2. Write tests for each thing client might mess up. No token, not found in database/user needs to sign up first.

require('dotenv').config({path: '../.env'});
const superagent = require('superagent');
const PORT = process.env.PORT || 3000;
const SERVER_URL = 'http://localhost:' + PORT;
const SIGNUP_URL = SERVER_URL + '/api/signup';
const SIGNIN_URL = SERVER_URL + '/api/signin';
const signUpUser = require('./basic-auth.test.js');

function getUserParams() {
  return {
    username: 'Buck' + Math.random(),
    password: 'bambi',
    photo: {image: 'baker.jpg'}
  };
};

describe('Handle tokenless requests', () => {

  test('sends 404 for GET requests if no token was provided', (done) => {
    superagent.get(SERVER_URL + '/api/faces').catch(err => {
      expect(err.status).toBe(404);
      done();
    });
  });

  test('sends 500 for POST requests if no token was provided', (done) => {

    let newUser = getUserParams();

    superagent.post(SERVER_URL + '/api/faces')
      .set('Content-Type', 'application/json')
      .send(newUser)
      .end((err, res) => {
        expect(res.status).toBe(500);
        done();
      });
  });

  test('sends 401 for PUT requests if no token was provided', (done) => {

    let newUser = getUserParams();

    superagent.post(SERVER_URL + '/api/face/:id')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(newUser))
      .end((err, res) => {
        let postId = res.body._id;
        let updatedPost = {
          name: 'new face'
        };
        superagent.put(SERVER_URL + '/api/face/:id=' + postId)
          .set('Content-Type', 'application/json')
          .send(updatedPost)
          .end((err, res) => {
            expect(res.status).toBe(401);
            done();
          });
      });
  });
});

describe('Handle valid authorization', () => {
  test.only('sends 200 for authorized GET request made with a valid id', (done) => {
    let newUser = getUserParams();
    // let userId;
    let token;
    let postId;
    signUpUser(newUser)
      .end((err, res) => {
        // userId = res.body._id;
        superagent.get(SIGNIN_URL)
          .set('Content-Type', 'application/json')
          .auth(res.body.username, res.body.password, res.body.photo) // test for undefined for username, null, unknown (isn't in db already)
          .end((err, res) => {
            if (err) {
              console.error('error', err);
              fail();
            }
            token = res.body.token; // grab the JWToken
            expect(res.status).toBe(200);
            expect(token).toBeDefined();
            done();
            // unknown username
            // password doesn't match unknown username
            // photo
            // if everything passes need to get a good token back
          });
      });
  });
});

//             superagent.post(SERVER_URL + '/api/faces')
//               .set('Content-Type', 'application/json')
//               .set('Authorization', 'Bearer ' + token)
//               .send(newPost)
//               .end((err, res) => {

//                 postId = res.body._id;

//                 superagent.get(SERVER_URL + '/face/:id' + postId)
//                   .set('Authorization', 'Bearer ' + token)
//                   .end((err, res) => {

//                     expect(res.body.name).toBe('New face!');

//                     expect(res.status).toBe(200);

//                     // STRETCH
//                     // superagent.get(SERVER_URL + '/api/signup')
//                     // .set('Authorization', 'Bearer ' + token)
//                     // .end((err, res) => {
//                     //     expect(Array.isArray(res.body));
//                     //     done();
//                     // }); 
//                     // NO STRETCH
//                     done();
//                   });
//               });
//           });
//       });
//   });

//   test('sends 200 for a post request with a valid authorization and body', (done) => {

//     let newUser = getUserParams();
//     let userId;
//     let token;
//     let postId;
    
//     superagent.post(SERVER_URL + '/api/signup')
//       .set('Content-Type', 'application/json')
//       .auth(newUser.username, newUser.password)
//       .send(JSON.stringify(newUser))
//       .end((err, res) => {
//         userId = res.body._id;
//         superagent.get(SERVER_URL + '/api/signin')
//           .set('Content-Type', 'application/json')
//           .auth(newUser.username, newUser.password)
//           .end((err, res) => {
//             let newPost = {
//               userId: userId,
//               name: 'I am a new user!'
//             };
//             token = res.body.token;
//             superagent.post(SERVER_URL + '/api/faces')
//               .set('Content-Type', 'application/json')
//               .set('Authorization', 'Bearer ' + token)
//               .send(JSON.stringify(newPost))
//               .end((err, res) => {
//                 expect(true).toBe(true);
//                 done();
//               });
//           });
//       });
//   });

//   test('sends 200 for authorized PUT request made with a valid id', (done) => {
//     expect(true).toBe(false);
//     done();
//   });

//   test('STRETCH: should return array of ids for /api/face', (done) => {
//     expect(true).toBe(false);
//     done();
//   });
// });
