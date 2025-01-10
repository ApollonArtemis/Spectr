/*DATE*/
document.addEventListener("DOMContentLoaded", function () {
    const dateElement = document.getElementById("currentDate");

    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);

    dateElement.textContent = formattedDate;
});

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// Firebase configuration
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
const database = getDatabase(app);

// Reference to the 'Registered_Accounts' node
const registeredAccountsRef = ref(database, 'Registered_Accounts');

// Fetch the accounts and count them
get(registeredAccountsRef).then((snapshot) => {
    const accounts = snapshot.val();
    const activeUsers = accounts ? Object.keys(accounts).length : 0; // Assuming all users are active
    const inactiveUsers = 0; // No inactive users for now

    var lineGraph = {
        chart: {
            type: 'line',
            height: 300,
            foreColor: '#000'
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        series: [{
            data: [{
                x: 'January',
                y: 10
            }, {
                x: 'February',
                y: 18
            }, {
                x: 'March',
                y: 13
            }, {
                x: 'April',
                y: 13
            }, {
                x: 'May',
                y: 13
            }, {
                x: 'June',
                y: 13
            }, {
                x: 'July',
                y: 13
            }, {
                x: 'August',
                y: 13
            }, {
                x: 'September',
                y: 13
            }, {
                x: 'October',
                y: 13
            }, {
                x: 'November',
                y: 13
            }, {
                x: 'December',
                y: 13
            }]
        }]
    }
    var chartlineGraph = new ApexCharts(document.querySelector("#detectionPerMonth"), lineGraph);
    chartlineGraph.render();

    const donutGraph = {
        chart: {
            type: 'donut',
            height: 300
        },
        series: [activeUsers, inactiveUsers], // Active and Inactive users
        labels: ['Shoplifting', 'Roberry'],
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
        colors: ['#4CAF50', '#F44336'], // Green for active, Red for inactive
        theme: {
            mode: 'light' // Ensure overall dark theme for better contrast
        }
    };

    // Render the chart
    const chartpieGraph = new ApexCharts(document.querySelector("#chart3"), donutGraph);
    chartpieGraph.render();

});

