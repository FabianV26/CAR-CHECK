firebase.auth().onAuthStateChanged(function(user) {
    if (user) {

      useremail = user.email;
      
      userGmail.innerHTML +=  ` ${useremail}` 

  var user = firebase.auth().currentUser;
  if (user != null) {
      var name = user.displayName;
      var email = user.email;
      var photoUrl = user.photoURL;
      var emailVerified = user.emailVerified;
      var uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                       // you have one. Use User.getToken() instead.
    
    }

    var docRef = fs.collection(email).doc("puntajegeneral");

    docRef.get().then(function(doc) {
      const puntaje = doc.data();
      console.log(puntaje.puntaje1);
      pu1 = Math.floor( puntaje.puntaje1*100/15) + "%";
      pu2 = Math.floor( puntaje.puntaje2*100/15) + "%";
      pu3 = Math.floor( puntaje.puntaje3*100/15) + "%";
      pu4 = Math.floor( puntaje.puntaje4*100/15) + "%";
      pu5 = Math.floor( puntaje.puntaje5*100/15) + "%";
      pu6 = Math.floor( puntaje.puntaje6*100/15) + "%";
      pu7 = Math.floor( puntaje.puntaje7*100/15) + "%";
      pu8 = Math.floor( puntaje.puntaje8*100/15) + "%";
      pu9 = Math.floor( puntaje.puntaje9*100/15) + "%";
      pu10 = Math.floor( puntaje.puntaje10*100/15) + "%";

      pg = Math.floor( puntaje.puntaje1+puntaje.puntaje2+puntaje.puntaje3+puntaje.puntaje4+puntaje.puntaje5+puntaje.puntaje6+puntaje.puntaje7+puntaje.puntaje8+puntaje.puntaje9+puntaje.puntaje10/10) + "%";

      pgeneral.innerHTML +=  ` ${pg}` 

      p1.innerHTML +=  ` ${pu1}` 
      p2.innerHTML +=  ` ${pu2}` 
      p3.innerHTML +=  ` ${pu3}` 
      p4.innerHTML +=  ` ${pu4}` 
      p5.innerHTML +=  ` ${pu5}` 
      p6.innerHTML +=  ` ${pu6}` 
      p7.innerHTML +=  ` ${pu7}` 
      p8.innerHTML +=  ` ${pu8}` 
      p9.innerHTML +=  ` ${pu9}` 
      p10.innerHTML +=  ` ${pu10}` 
     

    })
    } else {
      // No user is signed in.
    }
  });




  