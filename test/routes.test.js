'use strict';

require('dotenv').config({path: '../.env'});
const superagent = require('superagent');
const SERVER_URL = 'http://localhost:3000'; 
+ process.env.PORT;
const SIGNUP_URL = SERVER_URL + '/api/signup';
const faker = require('faker');
//.set('Authorization', 'Bearer ' + token) => this may help with passing the tokenfor signin, how to successful attach token to request header???
// To do today:
// update signin function
// successfully accept token
//test user paths
//tighten up code to increase test coverage
//look up what actions increase test coverage
// implement heroku and travis



function getUserParams() {
  let fakerImage = faker.image.people();
	return {
		username: '' + Math.random(),
    password: 'trees'
    photo: fakerImage 
	};
};


describe('creates new user',()=>{

	test('userRouter signup post indicates successful completion of signup route by return status 200',(done)=> {
    let newUser = getUserParams();
    superagent.post(SERVER_URL + '/api/signup')
        .set('Content-Type', 'application/json')
        .send(newUser)
        .end((err, res) => {
          expect(res.status).toBe(200);
          done();
  })
  
  test('err catch',{
    let newUser = getUserParams();


//may want this test outside the description body

})

  test('user is created and saved to database',{
    getUserParams
    //checkout database to see how to see a new entry
  })
})
  



// test signup route
// test signin route
// test user get/put/delete route
// test photo get/put/delet route
