/**
 * Manages the navigation of the website, including routing and menu interactions.
 */
class NavigationController {
    /**
     * Constructor to create an instance of NavigationController.
     * @param {HTMLElement} navElement - The navigation element to control (e.g., a <nav> element).
     */
    constructor(navElement) {
        this.navElement = navElement; // Store the navigation element for later use
    }

    /**
     * Initializes the navigation controller.
     * Sets up click events for the navigation links.
     */
    init() {
        this.setupClickEvents(); // Call the function to set up the click events
    }

    /**
     * Sets up click events for all navigation links.
     */
    setupClickEvents() {
        // Get all <a> (anchor/link) elements within the navigation element
        const links = this.navElement.querySelectorAll('a');

        // Loop through each link and add a click event listener
        links.forEach(link => {
            // When a link is clicked, prevent the default behavior and handle navigation manually
            link.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent the link from navigating to another page
                this.handleNavigation(link); // Handle navigation logic (e.g., load new content)
            });
        });
    }

    /**
     * Handles the navigation logic when a link is clicked.
     * @param {HTMLElement} link - The clicked link element.
     */
    handleNavigation(link) {
        const targetUrl = link.getAttribute('href'); // Get the URL from the clicked link
        console.log(`Navigating to: ${targetUrl}`); // Log the URL (you can replace this with real navigation logic)
        // Implement custom navigation logic here (e.g., load new page content)
    }
    
}

// Example usage:
// const navElement = document.getElementById('navigation'); // Select the <nav> element from the DOM
// const navController = new NavigationController(navElement); // Create a new instance of NavigationController
// navController.init(); // Initialize the controller to set up click events
