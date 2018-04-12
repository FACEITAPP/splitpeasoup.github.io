'use strict';

console.log('hello');

const signInForm = document.getElementById("signinForm");
signInForm.addEventListener("submit", (event) => {
  console.log("submitting sign in");
  event.preventDefault();

  const url = signInForm.getAttribute('action');
  const method = signInForm.getAttribute('method');

  let username = 'bob';    // TODO: grab username/pass from form
  let password = 'marley';
  let payload = btoa(username + ':' + password);

  console.log("submitting sign in to", method, url);
  fetch(url, {
    method: method,
    headers: {
      'Authorization': 'Basic ' + payload
    }
  })
  .then(res => {
    return res.json();
  })
  .then(json => {
    console.log('json:', json);
    localStorage.setItem('token', json.token);
  })
  .catch(err => {
    console.log("err:", err);
  })
});

const sendtokenForm = document.getElementById("sendtoken");
sendtokenForm.addEventListener("submit", (event) => { // click listener for buttons
  event.preventDefault();

  // TODO: rewrite the url and method for anything that's not picking
  // this info off the form
  const url = "/api/panel/photo"
  const method = "DELETE"

  fetch(url, {
    method: method,
    body: {
      photoId: '123454nfsed'
    },
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  })
  .then(res => {
    return res.json();
  })
  .then(json => {
    console.log('json:', json);
    localStorage.setItem('token', json.token);
  })
  .catch(err => {
    console.log("err:", err);
  })
});