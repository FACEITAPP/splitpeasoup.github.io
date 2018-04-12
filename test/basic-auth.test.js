require('dotenv').config({ path: '../.env' });
const superagent = require('superagent');
const btoa = require('btoa');
const PORT = process.env.PORT;
const SERVER_URL = 'http://localhost:' + PORT;
const SIGNIN_URL = SERVER_URL + '/api/signin';
const PANEL_URL = SERVER_URL + '/api/panel';

function getUserParams() {
  return {
    username: 'Bradley' + Math.random(),
    password: 'trees'
  };
};

describe('/api/signin', () => {
  it('should return status 400 if missing username', done => {
    let params = getUserParams();
    delete params['username'];
    superagent
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
  it('should return 401 unauthorized if password is incorrect', done => {
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

  it.only('should return 200 if username and password are', done => {
    let params = getUserParams();
    superagent
      .post(PANEL_URL)
      .set('Content-Type', 'application/json')
      .send(params)
      .then(res => {
        expect(res.status).toEqual(200);
        let payload = params['username'] + ':' + params['password'];
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