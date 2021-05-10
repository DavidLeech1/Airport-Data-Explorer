// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDThZnahAB7kdxAVoTGdGafXMKTwOF4iDM",
    authDomain: "airport-data-explorer.firebaseapp.com",
    projectId: "airport-data-explorer",
    storageBucket: "airport-data-explorer.appspot.com",
    messagingSenderId: "69274643027",
    appId: "1:69274643027:web:581b165e0884672684f4a6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();


//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
    } else {
        console.log('user logged out');
    }
});


//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    var success = "No";

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        //close login modal and reset form
        //const modal = document.querySelector('#modal-login');
        //M.Modal.getInstance(modal).close();
        //loginForm.reset();
        alert('User has logged in as '+email);
        success = "Yes";
    })
    if (success="Yes") {
        window.location.href = 'index.html';

    } else {
        alert("Login Failed - Please Try Again");
    }
})