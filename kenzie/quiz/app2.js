
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
  
    gameOverHTML += "<h2 id='score'> Tu puntaje es de: " + quiz.score + "</h2>";
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
            puntaje2: quiz.score,
            puntaje3: puntaje.puntaje3,
            puntaje4: puntaje.puntaje4,
            puntaje5: puntaje.puntaje5,
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
    new Question("1. Disco, horquilla y cojinete pertenecen al sistema de:", ["Embrague", "Frenos","Dirección", "Alimentación"], "Embrague"),
    new Question("2. Los discos, zapatas y tuberías pertenecen al sistema del vehículo llamado:", ["Sistema de embrague", "Sistema de dirección", "Sistema de frenos", "Sistema de amortiguación"], "Sistema de frenos"),
    new Question("3. Absorber el movimiento originado por las irregularidades de la calzada, es la función del sistema de", ["Dirección", "Alimentación","Embrague", "Suspensión"], "Suspensión"),
    new Question("4. El sistema de inyección, pertenece al sistema del vehículo llamado:", ["Dirección", "Amortiguación", "Alimentación", "Escape"], "Alimentación"),
    new Question("5. El alternador se considera el principal elemento del subsistema eléctrico llamado:", ["Sistema de Carga", "Sistema de Arranque", "Sistema Eléctrico", "Sistema de alumbrado"], "Sistema de Carga"),
    new Question("6. El Carter es uno de los componentes del sistema de:", ["Embrague ", "Lubricación", "Amortiguación", "Escape"], "Lubricación"),
    new Question("7. El radiador y el termostato, son componentes pertenecientes al sistema de:", ["Lubricación", "Alimentación", "Enfriamiento", "Dirección"], "Enfriamiento"),
    new Question("8. La zona donde se indica el buen o mal funcionamiento de algún sistema de vehículos por medio de luces testigos, se llama:", ["ECU", "ABS", "Zona verde", "Panel de instrumentos"], "Panel de instrumentos"),
    new Question("9. Para extender la duración de las llantas y mejorar su desempeño, se recomienda:", ["La limpieza continua", "Bajar la presión de aire", "Aumentar la presión de aire", "La rotación regular"], "La rotación regular"),
    new Question("10. La Ley de Tránsito establece que la altura del taco de la llanta debe estar:", ["A 2 milímetros de profundidad", "Igual al testigo de la llanta", "Por encima del testigo de la llanta", "Por debajo del testigo de la llanta"], "Por encima del testigo de la llanta"),
    new Question("11. Se considera un dispositivo de seguridad pasiva al:", ["Cinturón de seguridad", "Pedal de freno", "Pedal del embrague", "Freno de estacionamiento"], "Cinturón de seguridad"),
    new Question("12. El catalizador es un componente que pertenece al sistema de:", ["Alimentación", "Escape", "Amortiguación", "Dirección"], "Escape"),
    new Question("13. Las ballestas son un componente que pertenece al sistema de:", ["Suspensión ", "Dirección", "Alimentación", "Escape"], "Suspensión "),
    new Question("14. Evitar el roce entre las piezas del motor, es la función principal del sistema de:", ["Embrague", "Enfriamiento", "Alimentación", "Lubricación"], "Lubricación"),
    new Question("15. Existen en el mercado varios tipos de llantas, dos de estos son:", ["De caucho y de hule", "Reencauchadas y demarcadas", "Radiales y tubulares", "Rotativas y alternativas"], "Radiales y tubulares"),
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



