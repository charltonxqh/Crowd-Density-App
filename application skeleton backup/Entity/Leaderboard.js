class Leaderboard {
    /**
     * Field for storing a list of stations
     * @type {Station[]}
     */
    #leaderboard;

    /**
     * Gets the list of stations in the leaderboard.
     * @returns {Array<string>} The current list of stations.
     */
    getLeaderboard() {
        return this.#leaderboard
    }

    /**
     * Sets the list of stations in the leaderboard.
     * @param {Array<string>} stations - An array of station names to set.
     */
    setLeaderboard(leaderboard) {
        this.#leaderboard = leaderboard
    }

    /**
     * Adds a new station to the leaderboard.
     * @param {string} station - The name of the station to add.
     */
    addStation(station) {  }

    /**
     * Removes a station from the leaderboard.
     * @param {string} station - The name of the station to remove.
     * @returns {boolean} True if the station was removed, false if the station did not exist.
     */
    removeStation(station) {  }
}


