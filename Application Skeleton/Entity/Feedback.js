class Feedback {
    /**
     * Name of the user providing feedback.
     * @type {string} - Name of feedback provider
     */
    #name;

    /**
     * Email of the user providing feedback.
     * @type {string} - Email of feedback provider
     */
    #email;

    /**
     * Category of the feedback.
     * @type {string} - Category of feedback
     */
    #category;

    /**
     * Message containing the feedback details.
     * @type {string}
     */
    #message;

    /**
     * Get the name of the user.
     * @returns {string} - The user's name.
     */
    getName() {
        return this.#name;
    }

    /**
     * Set the name of the user.
     * @param {string} - The user's name.
     */
    setName(name) {
        this.#name = name;
    }

    /**
     * Get the email of the user.
     * @returns {string} - The user's email.
     */
    getEmail() {
        return this.#email;
    }

    /**
     * Set the email of the user.
     * @param {string} email - The user's email.
     */
    setEmail(email) {
        this.#email = email;
    }

    /**
     * Get the category of the feedback.
     * @returns {string} - The feedback category.
     */
    getCategory() {
        return this.#category;
    }

    /**
     * Get the category of the feedback.
     * @param {string} category- The feedback category.
     */
    setCategory(category) {
        this.#category = category;
    }

    /**
     * Get the feedback message.
     * @returns {string} - The feedback message.
     */
    getMessage() {
        return this.#message;
    }

    /**
     * Set the feedback message.
     * @param {string} message - The feedback message.
     */
    setMessage(message) {
        this.#message = message;
    }

    /**
     * Save feedback to the database.
     */
    saveFeedback() { }

    /**
     * Send confirmation email to the user.
     */
    sendConfirmationEmail() { }

    /**
     * Validate feedback fields.
     */
    validateFeedback() { }
}
