
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
            puntaje1: quiz.score,
            puntaje2: 0,
            puntaje3: 0,
            puntaje4: 0,
            puntaje5: 0,
            puntaje6: 0,
            puntaje7: 0,
            puntaje8: 0,
            puntaje9: 0,
            puntaje10: 0
           

        });
        
        });



};

// CREAR LAS PREGUNTAS
var questions = [
    new Question("1. El derecho a circular se encuentra establecido en el artículo 22 de la:", ["Ley de tránsito", "Constitución Política","Ley de administración", "Ley de Movilidad"], "Constitución Política"),
    new Question("2. La Ley de Tránsito vigente, se conoce en el ámbito nacional como la Ley:", ["7331", "8709", "9078", "9660"], "9078"),
    new Question("3.  A la persona que incumpla una o más normas de la Ley de Tránsito, se le aplica una:", ["Sanción", "Infracción","Suspensión", "Contravención"], "Sanción"),
    new Question("4. Las sanciones más altas que se aplican para las infracciones más graves, se clasifican en la categoría:", ["A", "B", "C", "D"], "A"),
    new Question("5. Las sanciones más bajas, para las infracciones catalogadas como menos peligrosas, se clasifican en la categoría:", ["A", "B", "C", "D"], "E"),
    new Question("6. Se eleva a rango de delito, al conductor novato que conduce bajo los efectos del alcohol con una concentración mayor a:", ["0,10 g por litro de sangre", "0,20 g por litro de sangre", "0.25 g por litro de sangre", "0,50 g por litro de sangre"], "0,50 g por litro de sangre"),
    new Question("7. De acuerdo con su naturaleza constructiva, en Costa Rica se autoriza la circulación de vehículos que estén provistos de un volante ubicado:", ["Solo al lado izquierdo", "Solo al lado derecho", "Solo al centro", "Al lado izquierdo o al centro"], "Al lado izquierdo o al centro"),
    new Question("8. Al conductor común o profesional que acumule entre 5 y 8 puntos en su licencia, en su próxima renovación se le otorgará una vigencia de:", ["3 años", "4 años", "5 años", "6 años"], "4 años"),
    new Question("9. Un dispositivo obligatorio en el vehículo y establecido por Ley de Tránsito, para circular en carretera es:", ["Botiquín", "Llanta de refacción", "Caja de herramientas", "Cables para paso de corriente"], "Llanta de refacción"),
    new Question("10. En una autopista, la velocidad mínima permitida es de:", ["30 KPH", "40 KPH", "50 KPH", "60 KPH"], "50 KPH"),
    new Question("11. Por trasladar niños menores de 12 años que midan menos de 1,45 metros, se aplica una sanción conexa que corresponde a la acumulación de:", ["4 puntos en la licencia", "6 puntos en la licencia", "8 puntos en la licencia", "12 puntos en la licencia"], "4 puntos en la licencia"),
    new Question("12. Un extranjero puede utilizar la licencia de su país de origen, por un periodo no mayor a:", ["1 mes", "2 meses", "3 meses", "6 meses"], "3 meses"),
    new Question("13. Acumulará 6 puntos en su licencia de conducir, el conductor que:", ["No utilice cinturón de seguridad", "Realice un giro en U en zona no autorizada", "No porta los documentos obligatorios por Ley de Tránsito", "No utilice el casco de seguridad durante la conducción de motocicleta"], "Realice un giro en U en zona no autorizada"),
    new Question("14. Las luces de una motocicleta deben mantenerse encendidas según establece la Ley de Tránsito:", ["De 6:00 p.m. a 6:00 a.m", "De 6:00 p.m. a 7:00 a.m", "De 5:00 p.m. a 6:00 a.m", "Durante todo momento que se encuentre en circulación"], "Framework"),
    new Question("15. La licencia B-1, autoriza la conducción de vehículos hasta un peso máximo de:", ["2500 kilogramos", "3000 kilogramos", "4000 kilogramos", "5000 kilogramos"], "5000 kilogramos")

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



