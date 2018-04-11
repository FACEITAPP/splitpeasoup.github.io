'use strict';


require('dotenv').config({path: '../.env'});
const superagent = require('superagent');
const SERVER_URL = 'http://localhost:3000'; 
+ process.env.PORT;


//paths to test:
//1. does sign up send req and req.body
//2. are the correct paths invoked
    //a.sign in
    //b. signup
    //c.control panel features