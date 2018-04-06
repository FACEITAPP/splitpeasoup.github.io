require('dotenv').config();
const superagent = require('superagent');
const btoa = require('btoa');
const PORT = process.env.PORT;
// const SERVER_URL = 'http://localhost:' + PORT;
// const SIGNUP_URL = SERVER_URL + '/api/#####';
// const SIGNIN_URL = SERVER_URL + '/api/#####';

describe('/faces', () => {
  it('should return faces.length = 0 if no face is detected.', done => {
    facelessImage = `https://api-us.faceplusplus.com/facepp/v3/detect?api_key=${APP_KEY}&api_secret=${APP_SECRET}&image_url=https://i.imgur.com/aMDUKvx.jpg`;
    superagent
      .post(facelessImage)
      .end(function (err, results) {
        return results;
      })
    expect(results.body.faces.length).toEqual(0);
  });
  it('should return an faces.length = 1 if a face is detected', done => {
    facelessImage = `https://api-us.faceplusplus.com/facepp/v3/detect?api_key=${APP_KEY}&api_secret=${APP_SECRET}&image_url=https://i.imgur.com/MNFYkZY.jpg`;
    superagent
      .post(app_url)
      .end(function (err, results) {
        return results;
      })
    expect(results.body.faces.length).toEqual(1);
  })
})

// userRouter.post('/faces',(req,res)=> {
//   console.log(req.body);
//   console.log('app_key', APP_KEY === undefined);
//   console.log('username', req.body.username);
//   console.log('password', req.body.password);

//   request.post(app_url)
//     .end(function (err, results) {
//       console.log('hi');
//       console.log(results.body);
//       console.log('facetoken', results.body.faces[0].face_token);
//       return results;
//     // if (err) {
//     //   console.log('err',err);
//     // }
//     // console.log('res',res);
//     // done();
//     }).then(()=> {});
//   // .then((results)=> {
//   //   console.log('api results', results);
//   //   new User ({username: req.body.username, password: req.body.password , facetoken: results.body.faces[0].face_token}).save();
//   // })
//   // .then(() => res.status(200))
//   // .catch(err => res.sendStatus(404).send(err))



// });