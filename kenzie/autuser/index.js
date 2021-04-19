const db = firebase.firestore();

const btntask = document.querySelector("#singup-form");
btntask.addEventListener("submit", (e) => {
    e.preventDefault();

    db.collection("cities").doc("LA").set({
        name: "Los Angeles",
        state: "CA",
        country: "USA"
    })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
});

