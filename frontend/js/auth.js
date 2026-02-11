/* Partie récupération des balises html avec affectation variables */

/* Affichage de la pop up de connexion */ 
const btnSignIn = document.getElementById("authBtn");
const authentification = document.getElementById("authentification")

/* Changement pop up en inscription */
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const switchMode = document.getElementById("switchMode");
const switchLabel = document.getElementById("switchLabel");

/* Fermeture de la pop up */ 
const closeBtn = document.getElementById("closeModal");

/* Partie inscription */
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");

let isSignUp = false;

/* Affichage de la pop up de connexion */ 
btnSignIn.addEventListener("click", () => {
    if (isLoggedIn()) {
        localStorage.removeItem("currentUser");
        location.reload();
        return;
    }

    usernameInput.value = "";
    passwordInput.value = "";
    message.textContent = "";
    authentification.style.display = "flex";
});


/* Changement pop up en inscription */

switchMode.addEventListener("click", () => {
    usernameInput.value = "";
    passwordInput.value = "";
    message.textContent = "";

    isSignUp = !isSignUp;

    if (isSignUp) 
    {
        formTitle.textContent = "Inscription";
        submitBtn.textContent = "S'inscrire";
        switchLabel.textContent = "Déjà un compte ?";
        switchMode.textContent = "Connecte-toi";
    } 
    else 
    {
        formTitle.textContent = "Sign In";
        submitBtn.textContent = "Se connecter";
        switchLabel.textContent = "Pas de compte ?";
        switchMode.textContent = "Inscris-toi";
    }
});

/* Fermeture de la pop up */ 
closeBtn.addEventListener("click", () => {
    authentification.style.display = "none";
})

/* Partie inscription */
submitBtn.addEventListener("click", () => {

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === "" || password === "") {
        message.textContent = "Tous les champs sont obligatoires.";
        message.style.color = "red";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users"));
    if (!Array.isArray(users)) {
        users = [];
    }

    /* INSCRIPTION */
    if (isSignUp) {
        const userExists = users.some(user => user.username === username);
        if (userExists) {
            message.textContent = "Ce nom d'utilisateur existe déjà.";
            message.style.color = "red";
            return;
        }

        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));

        message.textContent = "Compte créé avec succès !";
        message.style.color = "green";
        usernameInput.value = "";
        passwordInput.value = "";
        return;
    }

    /* CONNEXION */
    const user = users.find(user => user.username === username);

    if (!user) {
        message.textContent = "Utilisateur introuvable.";
        message.style.color = "red";
        return;
    }

    if (user.password !== password) {
        message.textContent = "Mot de passe incorrect.";
        message.style.color = "red";
        return;
    }

    /* Connexion réussie */
    localStorage.setItem("currentUser", JSON.stringify({ username }));
    btnSignIn.textContent = "Déconnexion";
    authentification.style.display = "none";
    location.reload();
});


/*****  Partie déclaration des fonctions *****/

function isLoggedIn()
{
    return localStorage.getItem("currentUser") !== null;
}

if (isLoggedIn()) 
{
    btnSignIn.textContent = "Déconnexion";
}



