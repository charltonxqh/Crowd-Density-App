class Alert {
    /**
     * Status of the alert.
     * @type {number}
     */
    #status;

    /**
     * Line associated with the alert.
     * @type {string}
     */
    #line;

    /**
     * Direction of the line.
     * @type {string}
     */
    #direction;

    /**
     * Stations related to the alert.
     * @type {const}
     */
    #stations;

    /**
     * Message of the alert.
     * @type {string}
     */
    #message;

    /**
     * Prints the alert details.
     * @param {string} line
     * @param {string} direction
     * @param {const} stations
     * @param {string} message
     */
    printAlert(line, direction, stations, message) {
        console.log(`Alert for Line: ${line}, Direction: ${direction}, Stations: ${stations}, Message: ${message}`);
    }

    /**
     * Get the status of the alert.
     * @returns {number} status
     */
    getStatus() {
        return this.#status;
    }

    /**
     * Get the line associated with the alert.
     * @returns {string} line
     */
    getLine() {
        return this.#line;
    }

    /**
     * Get the direction of the alert.
     * @returns {string} direction
     */
    getDirection() {
        return this.#direction;
    }

    /**
     * Get the stations related to the alert.
     * @returns {const} stations
     */
    getStations() {
        return this.#stations;
    }

    /**
     * Get the message of the alert.
     * @returns {string} message
     */
    getMessage() {
        return this.#message;
    }
}
