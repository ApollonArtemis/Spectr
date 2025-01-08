function showContent(contentId) {
    // Hide all content items
    document.querySelectorAll('.content-item').forEach(item => item.style.display = 'none');

    // Show the selected content
    const selectedContent = document.getElementById(contentId);
    if (selectedContent) {
        selectedContent.style.display = 'block';

        // Update the document title based on data-title
        document.title = selectedContent.getAttribute('data-title');
    }
}

// Example: Listening for clicks on a navigation bar
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetContentId = this.getAttribute('href').substring(1); // Remove '#' from href
        showContent(targetContentId);
    });
});

// Show initial content (optional)
showContent('content1');

document.addEventListener("DOMContentLoaded", () => {
    const profileLink = document.getElementById("profile-link");
    const profileContent = document.getElementById("profile");

    profileLink.addEventListener("click", () => {
        const newTitle = profileContent.getAttribute("data-title");
        if (newTitle) {
            document.title = `${newTitle}`;
        }
    });
});