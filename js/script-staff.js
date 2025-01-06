/*SIDEBAR*/
$(document).ready(function () {
    $("#sidebarCollapse").on("click", function () {
        $("#sidebar").toggleClass("active");
    });

    const homeLink = document.querySelector(
        '#sidebar .event-link[data-content="content1"]'
    );
    if (homeLink) {
        homeLink.click();
        homeLink.classList.add("active-link");
    }
});

/* SIGN OUT BTN */
let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));

console.log(UserInfo);

let displayCompanyName2 = document.getElementById('displayCompanyName2');
let signoutButton = document.getElementById('signoutbutton');

if (UserInfo && UserInfo.company_name) {
    displayCompanyName2.innerText = `${UserInfo.company_name}`;
} else {
    console.log("Company name is missing in UserInfo or is undefined.");
}

// Sign-out functionality
let Signout = () => {
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = 'login.html';
}

// Check credentials on page load
let CheckCred = () => {
    if (!sessionStorage.getItem("user-creds")) {
        window.location.href = 'login.html';
    }
}

window.addEventListener('load', CheckCred);
signoutButton.addEventListener('click', Signout);

document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("#sidebar .event-link");
    const contentItems = document.querySelectorAll(".content-item");

    links.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            links.forEach((l) => l.classList.remove("active-link"));

            const targetContentId = this.getAttribute("data-content");

            contentItems.forEach((item) => {
                if (item.id === targetContentId) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
            this.classList.add("active-link");
        });
    });

    const nextButtons = document.querySelectorAll(".next-button");
    nextButtons.forEach((button) => {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            const nextContentId = this.getAttribute("data-next");
            const nextContent = document.getElementById(nextContentId);

            // Hide all content items
            document.querySelectorAll(".content-item").forEach((item) => {
                item.style.display = "none";
            });

            // Show the next content item
            if (nextContent) {
                nextContent.style.display = "block";
                // Optional: Ensure next content doesn't get focus to prevent scrolling
                nextContent.tabIndex = -1; // Remove focusability
            }

            // Update active link
            links.forEach((link) => {
                if (link.getAttribute("data-content") === nextContentId) {
                    link.classList.add("active-link");
                } else {
                    link.classList.remove("active-link");
                }
            });
        });
    });
});

/*DATE*/
// document.addEventListener("DOMContentLoaded", function () {
//     const dateElement = document.getElementById("currentDate");

//     const date = new Date();
//     const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//     const formattedDate = date.toLocaleDateString(undefined, options);

//     dateElement.textContent = formattedDate;
// });

/*URL PATH
function changeUrl(content) {
    const newUrl = `client.html#${content}`;

    window.history.pushState({}, "", newUrl);

    const allSections = document.querySelectorAll('.content');
    allSections.forEach(section => section.style.display = 'none');

    const selectedContent = document.getElementById(content); 
    if (selectedContent) {
        selectedContent.style.display = 'block'; 
    }
}*/