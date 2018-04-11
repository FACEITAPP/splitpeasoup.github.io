'use strict';

require('dotenv').config({path: '../.env'});
const superagent = require('superagent');
const SERVER_URL = 'http://localhost:3000'; 
+ process.env.PORT;

//.set('Authorization', 'Bearer ' + token) => this may help with passing the tokenfor signin, how to successful attach token to request header???
// To do today:
// update signin function
// successfully accept token
//test user paths
//tighten up code to increase test coverage
//look up what actions increase test coverage



function getUserParams() {
	return {
		username: 'Bradley' + Math.random(),
		password: 'trees'
	};
};


describe('creates new user',()=>{

	test('userRouter post route returns 200 to indicate success',(done)=> {
    getUserParams
    
		toBe(res.status).toEqual(200);  
  })
  
  test('userRouter uploads photo to S3',{
//may want this test outside the description body

})

  test('user is created and saved to database',{
    getUserParams
    //checkout database to see how to see a new entry
  })
})
  
  

  
describe('uploads user photo to S3')
describe('returns face_token for new user')


// test signup route
// test signin route
// test user get/put/delete route
// test photo get/put/delet route
