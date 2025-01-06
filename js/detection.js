import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth(app);

let tbody = document.getElementById('tbody_detection');

document.getElementById('shopliftingCount').textContent = shopliftingCount;
document.getElementById('robberyCount').textContent = robberyCount;
document.getElementById('totalIncidents').textContent = totalIncidents;


function Detection(date, time, camera, type) {
    let trow = document.createElement("tr");

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');

    td1.classList.add('text-center');
    td2.classList.add('text-center');
    td3.classList.add('text-center');
    td4.classList.add('text-center');
    td5.classList.add('text-center');

    td1.innerHTML = date;
    td2.innerHTML = time;
    td3.innerHTML = camera; // Display Camera Name
    td4.innerHTML = type;

    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('d-flex', 'justify-content-center', 'gap-2', 'flex-column', 'flex-sm-row');

    let viewBtn = document.createElement('button');
    viewBtn.type = "button";
    viewBtn.className = "btn text-sm";
    viewBtn.style.backgroundColor = "rgb(49, 101, 147)";
    viewBtn.style.color = "white";
    viewBtn.innerHTML = "<img src='images/icons/download-button.png' alt='Download'> Download";

    // let deleteBtn = document.createElement('button');
    // deleteBtn.type = "button";
    // deleteBtn.className = "btn btn-secondary text-sm";
    // deleteBtn.innerHTML = "<img src='static/images/icons/archive.png' alt='Archive'> Archive";

    buttonContainer.appendChild(viewBtn);
    //buttonContainer.appendChild(deleteBtn);

    td5.appendChild(buttonContainer);

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);

    tbody.appendChild(trow);
}

function AddAllItemsToTable(detectionData) {
    tbody.innerHTML = "";

    detectionData.reverse().forEach(element => {
        Detection(element.date, element.time, element.camera, element.type);
    });

    if ($.fn.DataTable.isDataTable('#table_detection')) {
        $('#table_detection').DataTable().clear();
        $('#table_detection').DataTable().destroy();
    }

    $(document).ready(function () {
        var table = $('#table_detection').DataTable({
            buttons: [
                { extend: 'copy', exportOptions: { columns: ':not(:last-child)' } },
                { extend: 'csv', exportOptions: { columns: ':not(:last-child)' } },
                { extend: 'excel', exportOptions: { columns: ':not(:last-child)' } },
                { extend: 'pdf', exportOptions: { columns: ':not(:last-child)' } },
                { extend: 'print', exportOptions: { columns: ':not(:last-child)' } }
            ]
        });
        table.buttons().container().appendTo('#table_detection_wrapper .col-md-6:eq(0)');
    });
}

const shopliftingCountElement = document.querySelector('.col-lg-4:nth-child(1) .fs-1'); // Shoplifting 
const robberyCountElement = document.querySelector('.col-lg-4:nth-child(2) .fs-1');    // Robbery 
const totalIncidentsElement = document.querySelector('.col-lg-4:nth-child(3) .fs-1');  // Total incidents

function updateIncidentCounts(detections) {
    let shopliftingCount = 0;
    let robberyCount = 0;

    detections.forEach(detection => {
        if (detection.type === "Shoplifting") {
            shopliftingCount++;
        } else if (detection.type === "Robbery") {
            robberyCount++;
        }
    });

    const totalIncidents = shopliftingCount + robberyCount;

    // Update the HTML
    shopliftingCountElement.textContent = shopliftingCount;
    robberyCountElement.textContent = robberyCount;
    totalIncidentsElement.textContent = totalIncidents;
}

function GetAllDataOnce() {
    const user = auth.currentUser;

    if (user) {
        const uid = user.uid; // Get the UID of the logged-in user
        const dbRef = ref(db, `Registered_Accounts/${uid}/Detection`);

        onValue(dbRef, (snapshot) => {
            let detections = [];

            snapshot.forEach(cameraSnapshot => {
                cameraSnapshot.forEach(detectionSnapshot => {
                    const data = detectionSnapshot.val();
                    detections.push({
                        date: data.date,
                        time: data.time,
                        type: data.type,
                        camera: data.camera || cameraSnapshot.key // Fallback to "Camera 1", "Camera 2", etc.
                    });
                });
            });

            AddAllItemsToTable(detections);
            updateIncidentCounts(detections); // Update counts
        });
    } else {
        console.error("User is not logged in.");
    }
}

auth.onAuthStateChanged((user) => {
    if (user) {
        GetAllDataOnce();
    } else {
        console.error("No user is currently logged in.");
    }
});

