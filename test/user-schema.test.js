const userSchema = require('../models/userSchema.js');

function getUserParams() {
  return {
    username: 'Buck',
    password: 'bambi',
    photo: { image: 'baker.jpg' }
  };
};

let newUser = getUserParams();

describe('Add a new user to the dataBase', () => {
  it('Should return confirmation that the user has been created', () => {
    let newUser = getUserParams()
    userSchema.create({
      username: newUser.username,
      password: newUser.password,
      facetoken: 'faketokenrandomstring',
      photo: newUser.photo
    })
      .then(user => {
        expect(username).toEqual('Buck2');
        expect(password).not.toBe('bambi');
        expect(facetoken).toBe('faketokenrandomstring');
        expect(photo).toEqual('baker.jpg');
      })
      .catch(err => {
        console.log(err);
      })
  });
});

// describe('Add a new user to the dataBase - without a username', () => {
//   it('Should return confirmation that the user has been created', () => {
//     let newUser = getUserParams()
//     delete newUser['username'];
//     userSchema.create({
//       username: newUser.username,
//       password: newUser.password,
//       facetoken: 'faketokenrandomstring',
//       photo: newUser.photo
//     })
//       .then(user => {
//         expect(username).toEqual('Buck');
//         expect(password).not.toBe('bambi');
//         expect(facetoken).toBe('faketokenrandomstring');
//         expect(photo).toEqual('baker.jpg');
//       })
//   });
// });