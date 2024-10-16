class User {

    /**
     * Field for the unique user ID
     * @type {number}
     */
    #userID;

    /**
     * Field for the username of the user
     * @type {string}
     */
    #username;

    /**
     * Field for the user's password
     * @type {string}
     */
    #password;

    /**
     * Field for the user's email address
     * @type {string}
     */
    #email;

    /**
     * Field for a mapping of stations to their types (e.g., favorite, work)
     * @type {Map}
     */
    #savedStations;

    /*
     * Gets the user ID.
     * @returns {string} The user ID.
     */
    getUserID() {
        return this.#userID;
    }

    /**
     * Sets the user ID.
     * @param {number} userID - The user ID to set.
     */
    setUserID(userID) {
        // Implementation goes here
        this.#userID = userID;
    }

    /**
     * Gets the username.
     * @returns {string} The username.
     */
    getUsername() {
        // Implementation goes here
        return this.#username;
    }

    /**
     * Sets the username.
     * @param {string} username - The username to set.
     */
    setUsername(username) {
        // Implementation goes here
        this.#username = username;
    }

    /**
     * Gets the password.
     * @returns {string} The password.
     */
    getPassword() {
        // Implementation goes here
        return this.#password;
    }

    /**
     * Sets the password.
     * @param {string} password - The password to set.
     */
    setPassword(password) {
        // Implementation goes here
        this.#password = password;
    }

    /**
     * Gets the email.
     * @returns {string} The email.
     */
    getEmail() {
        // Implementation goes here
        return this.#email;
    }

    /**
     * Sets the email.
     * @param {string} email - The email to set.
     */
    setEmail(email) {
        // Implementation goes here
        this.#email = email;
    }

    /**
     * Gets the saved stations as a mapping.
     * @returns {Map} A mapping of station names to their types.
     */
    getSavedStations() {
        // Implementation goes here
        return this.#savedStations;
    }

    /**
     * Sets the saved stations.
     * @param {string} station - The station name to set.
     * @param {string} type - The type of the station (e.g., favorite, work).
     */
    setSavedStation(station, type) {
        // Implementation goes here
        this.#savedStations.set(station, type);
    }

    /**
     * Removes a saved station by name.
     * @param {string} station - The station name to remove.
     */
    removeSavedStation(station) {
        // Implementation goes here
        this.#savedStations.delete(station);
    }
}