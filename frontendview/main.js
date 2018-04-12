'use strict';

console.log('hello');

const signInForm = document.getElementById("signinForm");
signInForm.addEventListener("submit", (ev) => {
  console.log("submitting sign in");
  ev.preventDefault();

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

