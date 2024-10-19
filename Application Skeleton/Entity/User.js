import Station from "./Station"
class User {
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
     * @type {List<Station>}
     */
    #savedStations;

    /**
     * Gets the username.
     * @returns {string} - The username.
     */
    getUsername() {
        return this.#username;
    }

    /**
     * Sets the username.
     * @param {string} username - The username to set.
     */
    setUsername(username) {
        this.#username = username;
    }

    /**
     * Gets the password.
     * @returns {string} - The password.
     */
    getPassword() {
        return this.#password;
    }

    /**
     * Sets the password.
     * @param {string} password - The password to set.
     */
    setPassword(password) {
        this.#password = password;
    }

    /**
     * Gets the email.
     * @returns {string} - The email.
     */
    getEmail() {
        return this.#email;
    }

    /**
     * Sets the email.
     * @param {string} email - The email to set.
     */
    setEmail(email) {
        this.#email = email;
    }

    /**
     * Gets the saved stations as a list.
     * @returns {List<Station>}
     */
    getSavedStations() {
        return this.#savedStations;
    }

    /**
     * Sets the saved stations.
     * @param {string} station - The station name to set.
     * @param {string} type - The type of the station (e.g., favorite, work).
     */
    setSavedStation(station, type) {
        this.#savedStations.set(station, type);
    }

    /**
     * Removes a saved station by name.
     */
    removeSavedStation(station) { }
}