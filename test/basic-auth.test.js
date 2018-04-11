require('dotenv').config({path: '../.env'});

const server = require('../server.js');
const superagent = require('superagent');
const btoa = require('btoa');
const bcrypt = require('bcrypt');
const PORT = process.env.PORT;
const SERVER_URL = 'http://localhost:' + PORT;
const SIGNUP_URL = SERVER_URL + '/api/signup';
const SIGNIN_URL = SERVER_URL + '/api/signin';
const PANEL_URL = SERVER_URL + '/api/panel';

function getUserParams() {
  return {
    username: 'Bradley' + Math.random(),
    password: 'trees',
    photo: {url: 'https://s3-us-west-2.amazonaws.com/faceit-app/29d937c5ac9c07e83e0a5d85a9a0128f.jpg'}
  };
};

describe('Basic Auth', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  describe('api/signup', () => {
    it('creating an account should respond with a 200 and a token if there are no errors', () => {
      let params = getUserParams();
      return superagent
        .post(SIGNUP_URL)
        .set('Content-Type', 'application/json')
        .send(params)
        .then(res => {
          expect(res.status).toEqual(200);
        });
    });

    it('an incomplete request should return a 400 error', () => {
      let params = getUserParams();
      return superagent
        .post(SIGNUP_URL)
        .set('Content-Type', 'application/json')
        .send(params)
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    it('username or email already found in database should respond with 409 error', () => {
      let params = getUserParams();
      return superagent
        .post(SIGNUP_URL)
        .set('Content-Type', 'application/json')
        .send(params)
        .then( () => {
          return superagent.post(SIGNUP_URL)
            .send(params);
        })
        .then(Promise.reject)
        .catch(res => {
          expect(res.status).toEqual(409);
        });
    });
  });

  describe('/api/signin', () => {
    it('should return status 400 if missing username', done => {
      let params = getUserParams();
      delete params['username'];
      return superagent
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

    it('should return status 400 if missing photo', done => {
      let params = getUserParams();
      delete params[photo];
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

  describe('/api/panel', () => {
    it.only('should return 401 unauthorized if password is incorrect', done => {
      let params = getUserParams();
      superagent
        .post(PANEL_URL)
        .set('Content-Type', 'application/json')
        .send(params)
        .then(res => {
          expect(res.status).toEqual(200);
          // setting the password as a wrong password
          let payload = params['username'] + ':' + 'wrongpassword';
          let encoded = btoa(payload);
          return superagent
            .get(PANEL_URL)
            .set('Authorization', 'Basic ' + encoded);
        })
        .catch(err => {
          expect(err.status).toEqual(401);
          done();
        });
    });

    it('should return 200 if username and password and photo are entered', done => {
      let params = getUserParams();
      superagent
        .post(PANEL_URL)
        .set('Content-Type', 'application/json')
        .send(params)
        .then(res => {
          expect(res.status).toEqual(200); 
          let payload = params['username'] + ':' + params['password'] + ':' + params[image];
          let encoded = btoa(payload);
          return superagent
            .get(PANEL_URL)
            .set('Authorization', 'Basic ' + encoded);
        })
        .then(res => {
          expect(res.status).toEqual(200);
          done();
        });
    });
  });
});