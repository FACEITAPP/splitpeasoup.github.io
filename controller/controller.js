
'use strict';

var app = app || {};
require(addToken);

if (window.location.pathname !== '/') {
  page.base('/signup');
}

page('/', () => {
 app.initSignUp.init();
});

page('/signup', () => {
  app.initSignUp.init().userRouter.route('/signup');
});

page('/signin', () => {
  app.initSignIn.init().addToken.authRouter.route('/signin').userRouter.route('/signin');
});


// how do we accomplish being signed in and using user control panel?
page('/usercontrol/finduser', () => {
  app.initUserControl.init()authRouter.route('/panel');
});

page('/usercontrol/uploadphoto', () => {
  app.initUserControl.init().authRouter.route('/panel');
});

page('/usercontrol/deleteuser', () => {
  app.initUserControl.init().authRouter.route('/panel');
});

page('/usercontrol/deletphoto', () => {
  app.initUserControl.init().authRouter.route('/panel');
});

page.start();