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
     * Get the status of the alert.
     * @returns {number} status
     */
    getStatus() {
        return this.#status;
    }

    /**
     * sets the status
     * @param {number} status - The status of the alert message
     */
    setStatus(status){
        this.#status = status;
    }

    /**
     * Get the line associated with the alert.
     * @returns {string} line
     */
    getLine() {
        return this.#line;
    }

    /**
     * sets the line
     * @param {string} line - The line affected
     */
    setLine(line){
        this.#line = line;
    }

    /**
     * Get the direction of the alert.
     * @returns {string} direction
     */
    getDirection() {
        return this.#direction;
    }

    /**
     * sets the direction
     * @param {string} direction - The direction of train affected
     */
    setDirection(direction){
        this.#direction = direction;
    }

    /**
     * Get the stations related to the alert.
     * @returns {const} stations
     */
    getStations() {
        return this.#stations;
    }

    /**
     * sets the stations
     * @param {const} stations - The statations affected
     */
    setStations(stations){
        this.#stations = stations;
    }

    /**
     * Get the message of the alert.
     * @returns {string} message
     */
    getMessage() {
        return this.#message;
    }

    /**
     * sets the message
     * @param {string} message - The content of alert message
     */
    setMessage(message){
        this.#message = message;
    }

    /**
    * Prints the alert details for debugging.
    */
    printAlert() { }
}
