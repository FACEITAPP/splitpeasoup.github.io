
'use strict';
const photoRouter = require('/photoRouter.js');
const userRouter = require('/userRouter.js');
const authRouter = require('/authRouter.js');
const tokenreq = require('../lib/bearer-auth-middleware.js');// is this how to bring in the addtoken function?
//do I need to bring in super agent?
const htmlRouter = new express.Router();

htmlRouter.route('/signup', (req, res) => {
 userRouter.route('/signup');
});

htmlRouter.route('/signin', (req) => {
  userSchema.methods.checkpassword(req.password).then(results=>{userRouter.route('/signin')});
});


// how do we accomplish being signed in and using user control panel?
htmlRouter.route('/usercontrol/finduser', (req, res) => {
 addToken(req,res).authRouter.route('/panel')photoRouter.route('/photos').get(req,res);
});

htmlRouter.route('/usercontrol/uploadphoto', (req,res) => {
  addToken(req).authRouter.route('/panel').photoRouter.route('user').post(req,res);
});

htmlRouter.route('/usercontrol/deleteuser', (req,res) => {
addToken(req).authRouter.route('/panel').userRouter.route('face/:id').delete(req,res);
});

htmlRouter.route('/usercontrol/deletphoto', (req,res) => {
  addToken(req).authRouter.route('/panel').photoRouter.route('/user').delete(req,res)// how to properly invoke these paths?;
});


module.exports = htmlRouter;