
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Resultado</h1>";
  
    gameOverHTML += "<h2 id='score'> Tu puntage es de: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;

        
//ENVIAR PUNTAJE A FIRESTORE
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


  console.log(email)

  var docRef = fs.collection(email).doc("puntajegeneral");

docRef.get().then(function(doc) {
     
          const puntaje = doc.data();
          
       
          fs.collection (email).doc("puntajegeneral").set({
            puntaje1: puntaje.puntaje1,
            puntaje2: puntaje.puntaje2,
            puntaje3: puntaje.puntaje3,
            puntaje4: puntaje.puntaje4,
            puntaje5: quiz.score,
            puntaje6: puntaje.puntaje6,
            puntaje7: puntaje.puntaje7,
            puntaje8: puntaje.puntaje8,
            puntaje9: puntaje.puntaje9,
            puntaje10: puntaje.puntaje10
           

        });
        
        });



};

// CREAR LAS PREGUNTAS
var questions = [
    new Question("1.  Una afirmaci??n correcta sobre la conducci??n de motocicleta, es", ["Una motocicleta se puede volcar f??cilmente", "Una motocicleta no se puede volcar","Una motocicleta goza de gran estabilidad", "Una motocicleta se puede volcar solo con lluvia"], "Una motocicleta se puede volcar f??cilmente"),
    new Question("2. Una premisa importante a considerar, cuando se conduce una motocicleta, es", ["Es m??s f??cil que un conductor de veh??culo vea al motociclista", "Es m??s f??cil que el conductor de moto vea a un veh??culo", "Detectar una moto y un veh??culo en carretera, tiene la misma dificultad", "Es muy f??cil detectar una moto en carretera"], "Es m??s f??cil que el conductor de moto vea a un veh??culo"),
    new Question("3. Un dispositivo de seguridad obligatorio a la hora de conducir una motocicleta, es", ["Rodilleras", "Botas","Casco", "Guantes"], "Casco"),
    new Question("4. Un detalle importante a considerar a la hora de adquirir un casco para conducir una motocicleta, es", ["Debe ser integral", "Debe ser abierto", "Debe ser certificado", "Debe contar con visera"], "Debe ser certificado"),
    new Question("5. Un dispositivo de seguridad obligatorio a la hora de conducir una motocicleta, es", ["Las gafas", "Dispositivo reflectivo", "La visera en el casco", "Los guantes"], "Dispositivo reflectivo"),
    new Question("6. Los especialistas establecen, que la motocicleta m??s adecuada, es la que", ["Frene con m??s efectividad", "Tenga un color m??s visible", "Permita ir m??s erguido", "Quede a la medida de su conductor"], "Quede a la medida de su conductor"),
    new Question("7. El freno principal en una motocicleta, corresponde a", ["El freno delantero", "El freno trasero", "Ambos frenos", "El freno central"], "El freno trasero"),
    new Question("8. En la motocicleta, hay un freno que se utiliza como complemento y como ayuda para estabilizar la moto, este corresponde a", ["El freno delantero", "El freno trasero", "Ambos frenos", "El freno central"], "El freno delantero"),
    new Question("9. Una recomendaci??n para el pasajero en motocicleta, es", ["Subirse primero que el conductor", "Subirse cuando este encendida", "Subirse cuando este apagada", "Subirse con la ???patilla colocada???"], "Subirse cuando este apagada"),
    new Question("10. Una recomendaci??n para el pasajero en motocicleta, es", ["Sentarse de lado", "Sentarse lo m??s separado posible del conductor", "Sentarse lo m??s adelante posible", "Sentarse sin sujetarse"], "Sentarse lo m??s adelante posible"),
    new Question("11. Una recomendaci??n para el pasajero en motocicleta, es", ["Bajar los pies en cada detenci??n", "Mantener los pies en los estribos en todo momento", "No inclinarse en las curvas", "Hablarle al conductor para guiarlo"], "Mantener los pies en los estribos en todo momento"),
    new Question("12. En la pr??ctica del motociclismo en grupo, se recomienda que", ["Los grupos en movimiento sean grandes", "Se conduzcan con prisa para no entorpecer el tr??nsito", "Los grupos en movimiento sean peque??os", "El l??der sea el ??ltimo en el grupo"], "Los grupos en movimiento sean peque??os"),
    new Question("13. En la pr??ctica del motociclismo en grupo, se recomienda que", ["El l??der sea el ??ltimo en el grupo", "Los principiantes deben ir detr??s del l??der", "Los experimentados deben ir adelante", "Los principiantes deben ir de ??ltimoAll"], "Los principiantes deben ir detr??s del l??der"),
    new Question("14. En la pr??ctica del motociclismo en grupo, la formaci??n m??s segura para trasladarse, es", ["Escalonada", "En fila", "En pareja lado a lado", "En c??rculo"], "Escalonada"),
    new Question("15. En las motocicletas, el sistema de transmisi??n m??s difundido y conocido, es", ["Por card??n", "Por faja", "Por cadena", "Por sensor"], "Por cadena")
];

const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    location.href="../autuser/login.html";

    console.log("signup out");
  });
});

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();



