class Station {
    /**
     * Name of the station.
     * @type {string}
     */
    #stationName;

    /**
     * Code of the station.
     * @type {string}
     */
    #stationCode;

    /**
     * Line associated with the station.
     * @type {StationLine}
     */
    #stationLine;

    /**
     * Crowd density data for the station.
     * @type {CrowdDensity}
     */
    #crowdDensityData;

    /**
     * Estimated time of arrival for the train.
     * @type {number}
     */
    #trainETA;

    /**
     * Indicates if the station is a favorite.
     * @type {boolean}
     */
    #isFavourite;

    /**
     * Constructor to initialize the station.
     * @param {string} stationName - The name of the station.
     * @param {string} stationCode - The code of the station.
     * @param {StationLine} stationLine - The line associated with the station.
     * @param {CrowdDensity} crowdDensityData - The crowd density data for the station.
     * @param {number} trainETA - The estimated time of arrival for the train.
     * @param {boolean} isFavourite - Indicates if the station is a favorite.
     */
    constructor(stationName, stationCode, stationLine, crowdDensityData, trainETA, isFavourite) {
        this.#stationName = stationName;
        this.#stationCode = stationCode;
        this.#stationLine = stationLine;
        this.#crowdDensityData = crowdDensityData;
        this.#trainETA = trainETA;
        this.#isFavourite = isFavourite;
    }

    /**
     * Get the crowd density data for the station.
     * @returns {CrowdDensity} - The crowd density data.
     */
    getCrowdDensity() {
        return this.#crowdDensityData;
    }

    /**
     * Get the estimated time of arrival for the train.
     * @returns {number} - The estimated time of arrival.
     */
    getTrainETA() {
        return this.#trainETA;
    }

    /**
     * Mark the station as a favorite.
     */
    favourite() {
        this.#isFavourite = true;
    }

    /**
     * Unmark the station as a favorite.
     */
    unfavourite() {
        this.#isFavourite = false;
    }
}
