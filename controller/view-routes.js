'use strict';

 var app = app || {};

 if (window.location.pathname !== '/') {
   page.base('/signup');
 }

 page('/', () => {
  app.initSignUp.init();
 });

 page('/signup', () => {
   app.initSignUp.init();
 });

 page('/signin', () => {
   app.initSignIn.init();
 });

 page('/usercontrol', () => {
   app.initUserControl.init();
 });

page.start();