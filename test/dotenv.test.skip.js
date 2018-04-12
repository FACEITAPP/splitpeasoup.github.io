'use strict';
require('dotenv').config({path: '../.env'});

describe('.env file', () => {
  test('should allow access to each property', () => {
   expect(process.env.PORT).toEqual('3000');
   expect(process.env.SECRET).toEqual('ilovemountains');
   expect(process.env.MONGODB_URI).toEqual('mongodb://localhost/face');
   expect(process.env.AWS_BUCKET).toEqual('faceit-app');
   expect(process.env.AWS_ACCESS_KEY_ID).toEqual('AKIAJKJAMRGVWHCY3O5Q');
   expect(process.env.AWS_SECRET_ACCESS_KEY).toEqual('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');
   expect(process.env.FACEAPI_KEY).toEqual('2e46e8o1UmyNH6cw_hWv_HTW2LjDiV7b');
   expect(process.env.FACEAPI_SECRET).toEqual('ogvJgcYQRfIgMYT2QECWMsTqtc_97Bqz');
  })
});