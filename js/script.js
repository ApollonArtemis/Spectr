/*DATE*/
document.addEventListener("DOMContentLoaded", function () {
    const dateElement = document.getElementById("currentDate");

    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);

    dateElement.textContent = formattedDate;
});

/* SIDEBAR TOGGLE */
$(document).ready(function () {
    // Sidebar toggle functionality
    $("#sidebarCollapse").on("click", function () {
        $("#sidebar").toggleClass("active");
    });
});

/* SIGN OUT BTN */
let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));

// console.log(UserInfo);

let userFirstname = document.getElementById('user_firstname');
let userCompanyName = document.getElementById('company_name');
let displayCompanyName = document.getElementById('displayCompanyName');
let displayCompanyName2 = document.getElementById('displayCompanyName2');
let displayCompanyBranch = document.getElementById('displayCompanyBranch');
let displayCompanyAddress = document.getElementById('displayCompanyAddress');
let displayCompanyTelephoneNo = document.getElementById('displayCompanyTelephoneNo');
let signoutButton = document.getElementById('signoutbutton');

// Display firstname and company name, with checks to confirm data is present
if (UserInfo && UserInfo.firstname) {
    userFirstname.innerText = `${UserInfo.firstname}`;
} else {
    console.log("Firstname is missing in UserInfo or is undefined.");
}

if (UserInfo && UserInfo.company_name) {
    userCompanyName.innerText = `${UserInfo.company_name}`;
} else {
    console.log("Company name is missing in UserInfo or is undefined.");
}

if (UserInfo && UserInfo.company_name) {
    displayCompanyName.innerText = `${UserInfo.company_name}`;
} else {
    console.log("Company name is missing in UserInfo or is undefined.");
}

if (UserInfo && UserInfo.company_name) {
    displayCompanyName2.innerText = `${UserInfo.company_name}`;
} else {
    console.log("Company name is missing in UserInfo or is undefined.");
}

if (UserInfo && UserInfo.company_branch) {
    displayCompanyBranch.innerText = `${UserInfo.company_branch}`;
} else {
    console.log("Company branch is missing in UserInfo or is undefined.");
}

if (UserInfo && UserInfo.company_address) {
    displayCompanyAddress.innerText = `${UserInfo.company_address}`;
} else {
    console.log("Company address is missing in UserInfo or is undefined.");
}

if (UserInfo && UserInfo.company_telephone_no) {
    displayCompanyTelephoneNo.innerText = `${UserInfo.company_telephone_no}`;
} else {
    console.log("Company telephone nummber is missing in UserInfo or is undefined.")
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

/* CONTENT AND SIDEBAR LOGIC */
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("#sidebar .event-link");
    const contentItems = document.querySelectorAll(".content-item");

    // Load the last active link and content from localStorage
    const lastActiveContentId = localStorage.getItem("activeContent");
    if (lastActiveContentId) {
        links.forEach((link) => {
            if (link.getAttribute("data-content") === lastActiveContentId) {
                link.classList.add("active-link");
            }
        });
        contentItems.forEach((item) => {
            item.style.display = item.id === lastActiveContentId ? "block" : "none";
        });
    } else {
        // Set the default active link if no previous data is found
        const defaultLink = document.querySelector("#sidebar .event-link[data-content='content1']");
        if (defaultLink) {
            defaultLink.classList.add("active-link");
            const defaultContent = document.querySelector("#content1");
            if (defaultContent) {
                defaultContent.style.display = "block";
            }
        }
    }

    // Add click event to all links
    links.forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            // Remove the active state from all links
            links.forEach((l) => l.classList.remove("active-link"));

            // Hide all content items
            contentItems.forEach((item) => {
                item.style.display = "none";
            });

            // Add the active state to the clicked link
            this.classList.add("active-link");

            // Show the corresponding content
            const targetContentId = this.getAttribute("data-content");
            const targetContent = document.querySelector(`#${targetContentId}`);
            if (targetContent) {
                targetContent.style.display = "block";

                // Save the active content to localStorage
                localStorage.setItem("activeContent", targetContentId);
            }
        });
    });
});

/*SHOW PASSWORD AND PIN EYE TOGGLER*/
$(document).ready(function () {
    const togglePasswordVisibility = (passwordInput, eyeIcon, eyeSlashIcon) => {
        const type = passwordInput.attr('type') === 'password' ? 'text' : 'password';
        passwordInput.attr('type', type);
        eyeIcon.toggleClass('d-none');
        eyeSlashIcon.toggleClass('d-none');
    };

    $(".toggle-password-btn").on("click", function () {
        const targetInputId = $(this).data("target");
        const passwordInput = $("#" + targetInputId);
        const eyeIcon = $(this).find("i.bi-eye");
        const eyeSlashIcon = $(this).find("i.bi-eye-slash");
        togglePasswordVisibility(passwordInput, eyeIcon, eyeSlashIcon);

        const newPasswordInput = $("#newPassword");
        const confirmNewPasswordInput = $("#confirmNewPassword");


        if (targetInputId === "confirmNewPassword") {
            togglePasswordVisibility(newPasswordInput, $("#passwordToggleBtn i.bi-eye"), $("#passwordToggleBtn i.bi-eye-slash"));
        } else if (targetInputId === "newPassword") {
            togglePasswordVisibility(confirmNewPasswordInput, $("#passwordToggleBtn i.bi-eye"), $("#passwordToggleBtn i.bi-eye-slash"));
        }

        /*CHANGE PIN EYE TOGGLER*/

        /*
        const newPinInput = $("#newPin");
        const confirmNewPinInput = $("#confirmNewPin");
 
        if (targetInputId === "confirmNewPin") {
            togglePasswordVisibility(newPinInput, $("#passwordToggleBtn i.bi-eye"), $("#passwordToggleBtn i.bi-eye-slash"));
        } else if (targetInputId === "newPin") {
            togglePasswordVisibility(confirmNewPinInput, $("#passwordToggleBtn i.bi-eye"), $("#passwordToggleBtn i.bi-eye-slash"));
        }
            */
    });
});

// /*PIN MODAL */
// document.getElementById('profile-link').addEventListener('click', function (event) {
//     event.preventDefault();

//     var modal = new bootstrap.Modal(document.getElementById('pinModal'), {
//         backdrop: 'static',
//         keyboard: false
//     });
//     modal.show();
// });

// document.getElementById('staff-management-link').addEventListener('click', function (event) {
//     event.preventDefault();

//     var modal = new bootstrap.Modal(document.getElementById('pinModal'), {
//         backdrop: 'static',
//         keyboard: false
//     });
//     modal.show();
// });

// document.getElementById('pin-form').addEventListener('submit', function (event) {
//     event.preventDefault();

//     var password = document.getElementById('userPin').value;

//     if (password) {
//         var modal = document.getElementById('pinModal');  // Get the modal element

//         if (modal.classList.contains('profile-modal')) {
//             window.location.hash = '#profile';
//         }
//         else if (modal.classList.contains('staff-management-modal')) {
//             window.location.hash = '#staff-management';
//         }

//         var bootstrapModal = bootstrap.Modal.getInstance(modal);
//         bootstrapModal.hide();
//     } else {
//         alert('Incorrect pin.');
//     }
// });

// /*PIN MODAL CANCEL BTN */
// function goToDashboard() {
//     window.location.href = 'client.html';
// }

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
} */

// CONTENT 5: ACCOUNTS
function goToContent5(event) {
    event.preventDefault();
    document.getElementById('content1').style.display = 'none'; // Dashboard
    document.getElementById('content3').style.display = 'none'; // Staff Management
    document.getElementById('accounts').style.display = 'block'; // Accounts

    // Save the active content to localStorage
    localStorage.setItem("activeContent", "accounts");
}

// CONTENT 6: ADD STAFF
function showContent6(event) {
    event.preventDefault();

    document.getElementById('content3').style.display = 'none'; // Staff Management
    document.getElementById('content6').style.display = 'block'; // Add Staff

    // Save the active content to localStorage
    localStorage.setItem("activeContent", "content6");
}

// CONTENT 7: EDIT STAFF
function goToStaffManagement(event) {
    event.preventDefault();

    document.getElementById('content3').style.display = 'block'; // Staff Management
    document.getElementById('content6').style.display = 'none'; // Add Staff
    document.getElementById('content7').style.display = 'none'; // Edit Staff

    // Save the active content to localStorage
    localStorage.setItem("activeContent", "content3");
}