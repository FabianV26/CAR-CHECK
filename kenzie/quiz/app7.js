
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
            puntaje5: puntaje.puntaje5,
            puntaje6: puntaje.puntaje6,
            puntaje7: quiz.score,
            puntaje8: puntaje.puntaje8,
            puntaje9: puntaje.puntaje9,
            puntaje10: puntaje.puntaje10
           
           

        });
        
        });



};

// CREAR LAS PREGUNTAS
var questions = [
    new Question("1. En orden descendente la tercera prioridad de paso en intersecciones es:", ["La autoridad ", "Vehículo de emergencia","El alto y ceda", "Avenida"], "Vehículo de emergencia"),
    new Question("2. Según los tipos de movimiento el tercer lugar lo ocupa el vehículo que", ["Sigue directo", "Gira a la izquierda", "Gira a la derecha", "Gira en U"], "Gira a la izquierda"),
    new Question("3. La Ley de la Mano Derecha establece que", ["El que tenga vehículo a su derecha debe pasar primero", "El que tenga vehículo a su derecha debe ceder el paso","El que tenga vehículo a su derecha debe respetar la señal", "El que tenga vehículo a su derecha regula el tránsito"], "El que tenga vehículo a su derecha debe ceder el paso"),
    new Question("4. Según los tipos de movimiento el primer lugar lo ocupa el vehículo que", ["Sigue directo", "Gira a la izquierda", "Gira a la derecha", "Gira en U"], "Gira a la derecha"),
    new Question("5. Según los tipos de movimiento el segundo lugar lo ocupa el vehículo que", ["Sigue directo", "Gira a la izquierda", "Gira a la derecha", "Gira en U"], "Sigue directo"),
    new Question("6. El punto donde convergen dos o más vías desde diferentes direcciones, corresponde a la definición de", ["Estructura vial", "Intersección", "Circulación", "Zona conflictiva"], "Intersección"),
    new Question("7. Tiene prioridad sobre la calle, pero no sobre la vía principal, se refiere a", ["El semáforo", "El alto", "La avenida", "El ceda"], "La avenida"),
    new Question("8. La primera prioridad de paso, la cual esta por encima de todas las estructuras viales, es", ["La autoridad", "El vehículo sobre rieles", "El semáforo", "El alto"], "El vehículo sobre rieles"),
    new Question("9. Cuando dos vías tienen similar importancia y no existe ningún dispositivo regulando, la prioridad de paso que se debe aplicar es", ["Avenidas y calles", "Las vías principales", "La autoridad", "La ley de la mano derecha"], "La ley de la mano derecha"),
    new Question("10. Tiene prioridad sobre el semáforo, pero no sobre la autoridad, se refiere a la prioridad de paso", ["Vehículo sobre rieles", "Vehículos de emergencia", "Semáforo", "Alto"], "Vehículos de emergencia"),
    new Question("11. La segunda prioridad de paso en intersecciones, corresponde a", ["El semáforo", "El alto", "El ceda", "La autoridad"], "La autoridad"),
    new Question("12. La novena prioridad de paso en intersecciones, corresponde a", ["La avenida", "La calle", "La ley de la mano derecha", "La cortesía y la comunicación"], "La cortesía y la comunicación"),
    new Question("13. Tiene prioridad de paso sobre la vía principal, pero no sobre el semáforo, se refiere a la prioridad de paso en intersección llamada", ["Alto y ceda", "Vehículos de emergencia", "Avenidas y calles", "Cortesía"], "Alto y ceda"),
    new Question("14. La Ley de Tránsito establece prioridades de paso, como acatamiento obligatorio en intersecciones, estas son", ["5", "7", "8", "9"], "9"),
    new Question("15. La séptima prioridad de paso en intersección, corresponde a", ["Alto y ceda", "Avenidas y calles", "Vías principales", "Semáforo"], "Avenidas y calles")
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



