import Station from "./Station"
class Leaderboard {
    /**
     * Field for storing a list of stations
     * @type {Station[]}
     */
    #leaderboard;

    /**
     * Gets the list of stations in the leaderboard.
     * @returns {Station[]} The current list of stations.
     */
    getLeaderboard() {
        return this.#leaderboard
    }

    /**
     * Sets the list of stations in the leaderboard.
     * @param {Station[]} stations - An array of station names to set.
     */
    setLeaderboard(stations) {
        this.#leaderboard = stations
    }

    /**
     * Adds a new station to the leaderboard.
     * @param {Station} station
     */
    addStation(station) { }

    /**
     * Removes a station from the leaderboard.
     * * @param {Station} station
     */
    removeStation(station) { }
}


