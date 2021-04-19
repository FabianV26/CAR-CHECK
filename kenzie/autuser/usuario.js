// Login with Google
const googleButton = document.querySelector("#logingoogle");

googleButton.addEventListener("click", (e) => {
  e.preventDefault();
  signInForm.reset();
 
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    console.log(result);
    console.log("google sign in");
    location.href ="index.html";
    
  })
  .catch(err => {
    console.log(err);
  })
});

const signUpForm = document.querySelector("#singup-form");
signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = signUpForm["singup-email"].value;
    const password = signUpForm["singup-password"].value;


    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorMessage = error.message;
   alert(errorMessage)
       
      
      
      })


})




const signInForm = document.querySelector("#login-form");

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signInForm["login-email"].value;
  const password = signInForm["login-password"].value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    
    var errorMessage = error.message;
    alert(errorMessage)

   
})

})

const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    location.href="autuser/login.html";

    console.log("signup out");
  });
});


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    usermail = user.email;  


    console.log(usermail);

  } else {
    // No user is signed in.
  }
});



const getpuntaje = () => fs.collection('fabivargasfuentes@gmail.com').get();
window.addEventListener('DOMContentLoaded', async (e) => {
const querySnapshot = await getpuntaje();
querySnapshot.forEach(doc =>{
  const puntaje = doc.data();

   

  console.log(puntaje.puntaje1)

})
})

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    location.href ="index.html";
  } else {
   
  }
})