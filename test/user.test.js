'use strict';
require('dotenv').config({ path: '../.env' });
require('dotenv').config({ path: '../.env' });
const superagent = require('superagent');
const btoa = require('btoa');
const PORT = process.env.PORT;
const SERVER_URL = 'http://localhost:' + PORT;
const SIGNIN_URL = SERVER_URL + '/api/signin';
const PANEL_URL = SERVER_URL + '/api/panel';











// const jwt = require('jsonwebtoken');

// // server can receive data
// // server can send data
// //JWT is generated successfully
// skip.describe('JWT generated succefully',()=> {
//   let data = {username : 'bob', isAdmin: false};
//   let token = jwt.sign(data, process.env.SECRET);

//   let tokenSections = token.split('.');
//   expect(tokenSections).toEqual(3);
// });
// //JWT is able to verified
// it('Verifies JWT',(done)=> {
//   let data = {username : 'bob', isAdmin: false};
//   let token = jwt.sign(data, process.env.SECRET);

//   jwt.verify(token, process.env.SECRET, (err,decoded)=> {
//     expect(decoded.username).toEqual(data.username);
//     expect(decoded.isAdmin).toEqual(data.isAdmin);
//     done();
//   });
// });
// Hacked JWT returns error
// incorrect JWT returns error