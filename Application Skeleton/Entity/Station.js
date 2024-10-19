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
     * Get the station name
     * @returns {string}  
     */
    getStationName(){
        return this.#stationName
    }

    /**
     * Set the station name
     * @param {string} stationName 
     */
    setStationName(stationName){
        this.#stationName = stationName;
    }

    /**
     * Return the station code
     * @returns {string} - 
     */
    getStationCode(){
        return this.#stationCode;
    }

    /**
     * Set the station code
     * @param {string} - 
     */
    setStationCode(stationCode){
        this.#stationCode = stationCode
    }
    
    /**
     * return the station line of a station
     * @returns {StationLine} - The station line
     */
    getStationLine(){
        return this.#stationLine
    }

    /**
     * set the station line of a station
     * @param {stationLine} - The station line to set
     */
    setStationLine(stationLine){
        this.#stationLine = stationLine
    }

    /**
     * Get the crowd density data for the station.
     * @returns {CrowdDensity} - The crowd density data.
     */
    getCrowdDensity() {
        return this.#crowdDensityData;
    }

    /**
     * Set the crowd density data
     * @param {CrowdDensity} - Crowd Density to set
     */
    setCrowdDensity(crowdDensityData){
        this.#crowdDensityData = crowdDensityData;
    }

    /**
     * Get the estimated time of arrival for the train.
     * @returns {number} - The estimated time of arrival.
     */
    getTrainETA() {
        return this.#trainETA;
    }

    /**
     * Set the train eta
     * @param {number} trainETA 
     */
    setTrainETA(trainETA){
        this.#trainETA = trainETA;
    }

    /**
     * Get isFavourite
     * @returns {boolean} 
     */
    getIsFavourite(){
        return this.#isFavourite
    }

    /**
     * Get isFavourite
     * @params {}
     */
    setIsFavourite(isFavourite){
        this.#isFavourite = isFavourite;
    }

    /**
     * Mark the station as a favorite.
     */
    favourite() { }

    /**
     * Unmark the station as a favorite.
     */
    unfavourite() { }
}
