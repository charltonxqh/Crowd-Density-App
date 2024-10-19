class Feedback {
    /**
     * Name of the user providing feedback.
     * @type {string}
     */
    #name;

    /**
     * Email of the user providing feedback.
     * @type {string}
     */
    #email;

    /**
     * Category of the feedback.
     * @type {string}
     */
    #category;

    /**
     * Message containing the feedback details.
     * @type {string}
     */
    #message;

    /**
     * Constructor to initialize feedback.
     * @param {string} name - The name of the user.
     * @param {string} email - The email of the user.
     * @param {string} category - The category of feedback.
     * @param {string} message - The feedback message.
     */
    constructor(name, email, category, message) {
        this.#name = name;
        this.#email = email;
        this.#category = category;
        this.#message = message;
    }

    /**
     * Get the name of the user.
     * @returns {string} - The user's name.
     */
    getName() {
        return this.#name;
    }

    /**
     * Get the email of the user.
     * @returns {string} - The user's email.
     */
    getEmail() {
        return this.#email;
    }

    /**
     * Get the category of the feedback.
     * @returns {string} - The feedback category.
     */
    getCategory() {
        return this.#category;
    }

    /**
     * Get the feedback message.
     * @returns {string} - The feedback message.
     */
    getMessage() {
        return this.#message;
    }

    /**
     * Save feedback to the database.
     */
    saveFeedback() {    }

    /**
     * Send confirmation email to the user.
     */
    sendConfirmationEmail() {   }

    /**
     * Validate feedback fields.
     * @returns {boolean} - True if valid, false otherwise.
     */
    validateFeedback() {    }
}
