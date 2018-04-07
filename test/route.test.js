require('dotenv').config();
const superagent = require('superagent');
const btoa = require('btoa');
const PORT = process.env.PORT;
// const SERVER_URL = 'http://localhost:' + PORT;
// const SIGNUP_URL = SERVER_URL + '/api/#####';
// const SIGNIN_URL = SERVER_URL + '/api/#####';
faceLessImg = 'https://i.imgur.com/aMDUKvx.jpg'  //Tophat R2D2
singleFaceImg = 'https://i.imgur.com/MNFYkZY.jpg' // Daniel
multipleFaceImg = 'https://i.imgur.com/5FRpT5o.jpg' // Gates McFadden and scubaguy
imgUrl = `https://api-us.faceplusplus.com/facepp/v3/detect?api_key=${APP_KEY}&api_secret=${APP_SECRET}&image_url=`;


describe('/faces', () => {
  it('should return faces.length = 0 if no face is detected.', done => {
    superagent
      .post(imgUrl+faceLessImg)
      .end(function (err, results) {
      expect(results.body.faces.length).toEqual(0);
      done();
      })
  });
  it('should return an faces.length = 1 if a single face is detected', done => {
       superagent
      .post(imgUrl+singleFaceImg)
      .end(function (err, results) {
        expect(results.body.faces.length).toEqual(1);
        done();
      })

  })
  it('should return an faces.length > 1 if a more than one face is detected', done => {
    superagent
      .post(imgUrl+multipleFaceImg)
      .end(function (err, results) {
        expect(results.body.faces.length).toBeGreaterThan(1);
        done();
      })
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