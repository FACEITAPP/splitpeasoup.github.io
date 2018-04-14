'use strict';

require('dotenv').config({path: '../.env'});
const superagent = require('superagent');
const SERVER_URL = 'http://localhost:3000'; 
+ process.env.PORT;

const faker = require('faker');
//.set('Authorization', 'Bearer ' + token) => this may help with passing the tokenfor signin, how to successful attach token to request header???
// To do today:
// update signin function
// successfully accept token
//test user paths
//tighten up code to increase test coverage
//look up what actions increase test coverage
// implement heroku and travis



function SignUpParams() {
  let fakerImage = faker.image.people();
  console.log('fakerImage',fakerImage);
	return {
		username: '' + Math.random(),
    password: 'trees',
    photo: fakerImage
	};
};

function SignInParamsRight() {
	return {
		username: 'elephant',
    password: '1234',
    photo: 'https://faceit-app.s3.amazonaws.com/358dfa9dc781d2f4d0e979bdae3b74aa.jpg'//correct image associated
	};
};

function SignInParamsWrong() {
	return {
		username: 'portman',
    password: '1234',
    photo: 'https://faceit-app.s3.amazonaws.com/55a1e5673dc0e5164c0197fcd7f6d1a9.jpg'//wrong image associated
	};
};

describe('creates new user',()=>{
  beforeAll(server.start);
  afterAll(server.stop);

	test('userRouter signup post indicates successful completion of signup route by return status 200',(done)=> {
    let newUser = SignInParamsRight();
    superagent.post(SERVER_URL + '/api/signup')
    .set('Content-Type', 'application/json')
    .auth(newUser.username, newUser.password)
    .field('username', newUser.username)
    .field('password', newUser.password)
    .attach('photo', newUser.photo)
  })
  test('userRouter signin post indicates successful completion of signup route by return status 200',(done)=> {
    let user = SignInParamsRight();
    superagent.post(SERVER_URL + '/signin-with-face')
        .auth(user.username, user.password)
        .set('Content-Type', 'application/json')
        .send(user)
        .end((err, res) => {
          expect(res.status).toBe(200);
          done();
  })
  test('userRouter signin post indicates successful completion of signup route by return status 200',(done)=> {
    let user = SignInParamsWrong();
    superagent.post(SERVER_URL + '/signin-with-face')
        .auth(user.username, user.password)
        .set('Content-Type', 'application/json')
        .send(user)
        .end((err, res) => {
          console.log('err', err)
          // expect(res.status).toBe(200);
          done();
  })
  
//   test('err catch',{
//     let newUser = getUserParams();


// //may want this test outside the description body

// })

  // test('user is created and saved to database',{
  //   getUserParams
  //   //checkout database to see how to see a new entry
  // })
})
  



// test signup route
// test signin route
// test user get/put/delete route
// test photo get/put/delet route
