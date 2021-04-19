

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
 
    location.href="singup.html";
  } else {
    // No user is signed in.
  }
});


