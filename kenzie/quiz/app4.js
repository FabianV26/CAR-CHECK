
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
            puntaje4: quiz.score,
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
    new Question("1. Se representa mediante dos líneas externas amarillas continuas y dos líneas internas amarillas discontinuas", ["Carril reversible", "Carril central de giro izquierdo","Islas de canalización", "Líneas de barrera"], "Carril central de giro izquierdo"),
    new Question("2. Son señales con fondo de color naranja y son temporales", ["Restricción", "Prohibición", "Reglamentación", "Protección de obras"], "Protección de obras"),
    new Question("3. Se representa mediante dos líneas blancas paralelas entre sí y transversales a la vía", ["Zona de seguridad", "Zona de paso","Carril reversible", "Carril central de giro izquierdo"], "Zona de paso"),
    new Question("4. Guía al vehículo que desea virar a la izquierda en las intersecciones y se llama", ["Línea de canalización", "Isla de canalización", "Marcas sobre el espaldón", "Línea de centro"], "Línea de canalización"),
    new Question("5. Guía en caso de lluvia y de neblina, se refiera a la línea de", ["Vía", "Borde", "Barrera", "Canalización"], "Borde"),
    new Question("7. Las señales de reglamentación se clasifican en", ["Destino y distancia", "Recomendación y servicio", "Identificación y recomendación", "Restricción y prohibición"], "Restricción y prohibición"),
    new Question("8. Las señales de identificación de rutas primarias, se representan por medio de un", ["Circulo", "Escudo", "Rombo", "Rectángulo"], "Escudo"),
    new Question("9. Los dos sistemas de señalización que predominan en el mundo son", ["Latinoamericano y anglosajón", "Norteamericano y suramericano", "Centroamericano y australiano", "Estadounidense y europeo"], "Estadounidense y europeo"),
    new Question("10. Los capta luces que complementan la línea de vía, son de color", ["Blanco", "Amarillo", "Rojo", "Azul"], "Blanco"),
    new Question("11. Ordenar el tránsito en zonas conflictivas, es una de las funciones de", ["La línea de canalización", "El carril reversible", "El carril de giro izquierdo", "Las islas de canalización"], "Las islas de canalización"),
    new Question("12. El evento de tránsito en el que está involucrado un semoviente, se clasifica como el tipo de accidente llamado", ["Atropello", "Colisión", "Vuelco", "Derrape"], "Colisión"),
    new Question("13. Las señales verticales con fondo color verde y de mayor tamaño, se encuentran ubicadas en", ["Carreteras primarias", "Carreteras de alta velocidad", "Carreteras secundarias", "Carreteras rurales"], "Carreteras de alta velocidad"),
    new Question("14. Las señales de información general indican", ["Tipos de rutas", "Destino de lugares", "Nombres de lugares", "Manejo prudente en carretera"], "Nombres de lugares"),
    new Question("15. La señalización es uniforme y homogénea, lo que corresponde a un", ["Lenguaje local", "Lenguaje centroamericano", "Lenguaje internacional", "Lenguaje americano"], "Lenguaje internacional")
    
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



