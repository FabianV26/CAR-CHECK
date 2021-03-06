
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
            puntaje3: quiz.score,
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
    new Question("1. La fuerza transmitida desde el motor hacia la caja, diferencial y llantas, se define como", ["Torque", "Par contorsiona#","Par torsional", "C??mara de combusti??n"], "Par torsional"),
    new Question("2. El movimiento que genera una biela a lo interno de motor es de", ["Traslaci??n ", "Alternativo", "Rotaci??n", "Giratorio"], "Alternativo"),
    new Question("3. Una llanta inflada con m??s presi??n de la recomendada, se desgasta", ["A los lados", "Al centro","Regular", "Normal"], "Al centro"),
    new Question("4. A 40 KPH en marcha cuarta, ??Cu??ntas RPM se deben desarrollar en el veh??culo?", ["1400 rpm", "2000 rpm", "2500 rpm", "3000 rpm"], "1400 rpm"),
    new Question("5. En el mercado existen dos tipos de tac??metro, estos ser??an", ["Visuales y de tensi??n", "Luminosos y t??ctiles", "Digitales y anal??gicos", "Dactilares y t??ctiles"], "Digitales y anal??gicos"),
    new Question("6. Esta herramienta es muy valiosa para conocer el buen funcionamiento del veh??culo", ["Veloc??metro digital", "Diagrama de velocidades", "Veloc??metro anal??gico", "Turbo cargador"], "Diagrama de velocidades"),
    new Question("7. Zona ideal para realizar los cambios de marcha:", ["Amarilla", "Verde", "Roja", "Azul"], "Verde"),
    new Question("8. Un motor bien afinado, reduce el gasto y la contaminaci??n en un", ["5%", "9%", "15%", "20%"], "9%"),
    new Question("9. Los alerones son dispositivos que disminuyen la", ["Fuerza de pendiente", "Fuerza de sustentaci??n", "Fuerza de arrastre", "Fuerza de inercia"], "Fuerza de sustentaci??n"),
    new Question("10. La conducci??n t??cnica, econ??mica y eficiente busca", ["Reducir los consumos m??nimos de combustible", "Eliminar los consumos de combustible y mantenimiento", "Aumentar los costos operativos ", "Reducir los costos por consumo de combustible y mantenimiento"], "Reducir los costos por consumo de combustible y mantenimiento"),
    new Question("11. Aplicar buenos h??bitos de manejo puede generar una econom??a que va desde un", ["5% a un 10%", "10% a un 15%", "15% a un 20%", "10% a un 30%"], "10% a un 30%"),
    new Question("12. El rango de oscilaci??n general para lograr una conducci??n t??cnica, econ??mica y eficiente, se obtiene entre", ["1500 y 2800 rpm", "1500 y 3000 rpm", "1500 y 3500 rpm", "1500 y 4000 rpm"], "1500 y 2800 rpm"),
    new Question("13. La resistencia por la inercia depende de", ["La forma del veh??culo", "El perfil del veh??culo", "La masa del veh??culo", "La longitud del veh??culo"], "La masa del veh??culo"),
    new Question("14. La marcha m??s adecuada para bajar una pendiente, es", ["La primera", "La compresi??n m??xima", "La marcha en vac??o", "La misma relaci??n de caja con la que se sube"], "La misma relaci??n de caja con la que se sube"),
    new Question("15. La capacidad de carga de un veh??culo, depende de", ["La forma", "El perfil", "El torque de su motor", "La masa del veh??culo"], "El torque de su motor")
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



