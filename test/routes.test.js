'use strict';

require('dotenv').config({path: '../.env'});
const superagent = require('superagent');
const SERVER_URL = 'http://localhost:3000'; 
+ process.env.PORT;

function getUserParams() {
	return {
		username: 'Bradley' + Math.random(),
		password: 'trees'
	};
};


describe('creates new user',()=>{

	test('user router post route returns 200 with valid user properties',(done)=> {
		getUserParams
		toBe(res.status).toEqual(200);  
	})

})
  
  

  
describe('uploads user photo to S3')
describe('returns face_token for new user')


// test signup route
// test signin route
// test user get/put/delete route
// test photo get/put/delet route
