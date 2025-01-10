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

let shopliftingCount = 0;
let robberyCount = 0;
let totalIncidents = 0;

const shopliftingCountElement = document.getElementById('shopliftingCount');
const robberyCountElement = document.getElementById('robberyCount');
const totalIncidentsElement = document.getElementById('totalIncidents');
let chart3;

function renderDonutChart(shoplifting, robbery) {
    const donutGraph = {
        chart: {
            type: 'donut',
            height: '250',
        },
        series: [shoplifting, robbery], // Shoplifting and Robbery counts
        labels: ['Shoplifting', 'Robbery'],
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            fontSize: '22px',
                            fontWeight: 600,
                            color: '#000', // White font for the label name
                            offsetY: 20
                        },
                        value: {
                            fontSize: '16px',
                            fontWeight: 400,
                            color: '#000', // White font for the value
                            offsetY: -20
                        }
                    }
                }
            }
        },
        colors: ['#4CAF50', '#F44336'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: { width: 200 },
                legend: { position: 'bottom' }
            }
        }]
    };

    if (!chart3) {
        chart3 = new ApexCharts(document.querySelector("#chart3"), donutGraph);
        chart3.render();
    } else {
        chart3.updateSeries([shoplifting, robbery]);
    }
}


function updateIncidentCounts(detections) {
    shopliftingCount = 0;
    robberyCount = 0;

    detections.forEach(detection => {
        if (detection.type === "Shoplifting") {
            shopliftingCount++;
        } else if (detection.type === "Robbery") {
            robberyCount++;
        }
    });

    totalIncidents = shopliftingCount + robberyCount;

    shopliftingCountElement.textContent = shopliftingCount;
    robberyCountElement.textContent = robberyCount;
    totalIncidentsElement.textContent = totalIncidents;

    renderDonutChart(shopliftingCount, robberyCount);
}

function GetAllDataOnce() {
    const user = auth.currentUser;

    if (user) {
        const uid = user.uid;
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
                        camera: data.camera || cameraSnapshot.key
                    });
                });
            });

            updateIncidentCounts(detections);
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