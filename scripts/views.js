'use strict';


const View = {};

View.initSignUp = function(){
	document.getElementById(signin).hide();
	document.getElementById(usercontrols).hide();
	document.getElementById(signup).show();
};
View.initSignIn = function(){
	document.getElementById(signup).hide();
	document.getElementById(usercontrols).hide();
	document.getElementById(signin).show();
};
View.initUserControl = function(){
	document.getElementById(signup).hide();
	document.getElementById(signin).hide();
	document.getElementById(usercontrols).show();
};

module.exports = View;



