/**
 * Class representing the Estimated Time of Arrival (ETA) at a station.
 * 
 * @class
 */
class ETA {
        /**
     * The station name of the station
     * @type {string}
     */
    #stationName;

    /**
     * The stationID of the station
     * @type {string}
     */
    #stationID;

    /**
     * Direction of service
     * @type {string}
     */
    #direction;

    /**
     * The time of arrival
     * @type {number}
     */
    #timeOfArrival;

    /**
     * Get the name of the station.
     * 
     * @returns {string} The station name.
     */
    getStationName() {
        return this.#stationName;
    }

    /**
     * Set the station name.
     * 
     * @param {string} stationName - The new station name.
     */
    setStationName(stationName) {
        this.#stationName = stationName;
    }

    /**
     * Get the unique ID of the station.
     * 
     * @returns {string} The station ID.
     */
    getStationID() {
        return this.#stationID;
    }

    /**
     * Set the station ID.
     * 
     * @param {string} stationID - The new station ID.
     */
    setStationID(stationID) {
        this.#stationID = stationID;
    }

    /**
     * Get the direction of the train.
     * 
     * @returns {string} The direction of the train.
     */
    getDirection() {
        return this.#direction;
    }

    /**
     * Set the direction of the train.
     * 
     * @param {string} direction - The new direction of the train.
     */
    setDirection(direction) {
        this.#direction = direction;
    }

    /**
     * Get the estimated time of arrival.
     * 
     * @returns {number} The time of arrival.
     */
    getTimeOfArrival() {
        return this.#timeOfArrival;
    }

    /**
     * Set the estimated time of arrival.
     * 
     * @param {Date} timeOfArrival - The new estimated time of arrival.
     */
    setTimeOfArrival(timeOfArrival) {
        this.#timeOfArrival = timeOfArrival;
    }
}
