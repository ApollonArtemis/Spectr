// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, get, ref, child } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD56TvVuz9rl9wvRN9VhkJH_Gz8WHpFh_Q",
    authDomain: "spectre-8f79c.firebaseapp.com",
    databaseURL: "https://spectre-8f79c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "spectre-8f79c",
    storageBucket: "spectre-8f79c.appspot.com",
    messagingSenderId: "875337744237",
    appId: "1:875337744237:web:d2dd76f311523b30b56464",
    measurementId: "G-13VZ185YFT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();
const dbref = ref(db);

const mainForm = document.getElementById('mainform');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordFeedback = document.getElementById('passwordFeedback');

let SignInUser = async (evt) => {
    evt.preventDefault();

    // Trigger custom validation and stop if the form is invalid
    if (!mainForm.checkValidity()) {
        mainForm.classList.add('was-validated');
        return;
    }

    // Clear previous error messages
    password.classList.remove('is-invalid');
    passwordFeedback.style.display = 'none';

    try {
        // Check if email exists in the database
        const emailSnapshot = await get(child(dbref, 'Registered_Accounts')).then((snapshot) => {
            if (!snapshot.exists()) {
                return false;
            }
            const accounts = snapshot.val();
            for (const key in accounts) {
                if (accounts[key].email === email.value) {
                    return true;
                }
            }
            return false;
        });

        if (!emailSnapshot) {
            // Email not found, show error feedback
            alert("Account does not exist.");
            return;
        }

        // Proceed with sign-in
        const credentials = await signInWithEmailAndPassword(auth, email.value, password.value);
        get(child(dbref, 'Registered_Accounts/' + credentials.user.uid)).then((snapshot) => {
            if (snapshot.exists) {
                sessionStorage.setItem("user-info", JSON.stringify({
                    firstname: snapshot.val().firstname,
                    middlename: snapshot.val().middlename,
                    lastname: snapshot.val().lastname,
                    contact_no: snapshot.val().contact_no,
                    gender: snapshot.val().gender,
                    region: snapshot.val().region,
                    province: snapshot.val().province,
                    city: snapshot.val().city,
                    barangay: snapshot.val().barangay,
                    address_info: snapshot.val().address_info,
                    email: snapshot.val().email,
                    password: snapshot.val().password,
                    pincode: snapshot.val().pincode,
                    company_name: snapshot.val().company_name,
                    company_branch: snapshot.val().company_branch,
                    company_email: snapshot.val().company_email,
                    company_telephone_no: snapshot.val().company_telephone_no,
                    company_address: snapshot.val().company_address,
                    company_region: snapshot.val().company_region,
                    company_province: snapshot.val().company_province,
                    company_city: snapshot.val().company_city,
                    company_barangay: snapshot.val().company_barangay
                }));
                sessionStorage.setItem("user-creds", JSON.stringify(credentials.user));
                window.location.href = 'client.html';
            }
        });

    } catch (error) {
        // Display error message for wrong password
        password.classList.remove('is-valid');
        passwordFeedback.innerText = "*Incorrect Password.";
        passwordFeedback.style.display = 'block';
    }
}

mainForm.addEventListener('submit', SignInUser);