class FAQ {
    /**
     * The question of the FAQ
     * @type {string}
     */
    #question;

    /**
     * The answer of the FAQ
     * @type {string}
     */
    #answer;

    /**
     * The category of FAQ
     * @type {string}
     */
    #category;

    /**
     * Get the question of the FAQ.
     * 
     * @returns {string} The question associated with this FAQ.
     */
    getQuestion() {
        return this.#question;
    }

    /**
     * Set the question of the FAQ.
     * 
     * @param {string} question - The question to be set.
     */
    setQuestion(question) {
        this.#question = question;
    }

    /**
     * Get the answer of the FAQ.
     * 
     * @returns {string} The answer associated with this FAQ.
     */
    getAnswer() {
        return this.#answer;
    }

    /**
     * Set the answer of the FAQ.
     * 
     * @param {string} answer - The answer to be set.
     */
    setAnswer(answer) {
        this.#answer = answer;
    }

    /**
     * Get the category of the FAQ.
     * 
     * @returns {string} The category this FAQ belongs to.
     */
    getCategory() {
        return this.#category;
    }

    /**
     * Set the category of the FAQ.
     * 
     * @param {string} category - The category to be set.
     */
    setCategory(category) {
        this.#category = category;
    }
}