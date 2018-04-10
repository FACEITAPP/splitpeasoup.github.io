'use strict';
require('dotenv').config({path: '../.env'});

describe('.env file', () => {
  test('should allow access to each property', () => {
   expect(process.env.PORT).toEqual('3000');
   expect(process.env.SECRET).toEqual('ilovemountains');
   expect(process.env.MONGODB_URI).toEqual('mongodb://localhost/face');
  })
});