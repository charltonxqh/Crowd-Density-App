class CrowdDensity {
    /**
     * Field for real-time crowd density data
     * @type {CrowdDensityLevel}
     */
    #realTimeCrowdDensity;

    /**
     * Field for forecasted crowd density data
     * @type {CrowdDensityLevel}
     */
    #forecastCrowdDensity;

    /**
     * Gets the real-time crowd density.
     * @returns {CrowdDensityLevel} The current real-time crowd density.
     */
    getRealTimeCrowdDensity() {
        return this.#realTimeCrowdDensity;
    }

    /**
     * Sets the real-time crowd density.
     * @param {CrowdDensityLevel} density - The real-time crowd density to set.
     */
    setRealTimeCrowdDensity(density) {
        this.#realTimeCrowdDensity = density;
    }

    /**
     * Gets the forecasted crowd density.
     * @returns {CrowdDensityLevel} The forecasted crowd density.
     */
    getForecastCrowdDensity() {
        return this.#forecastCrowdDensity;
    }

    /**
     * Sets the forecasted crowd density.
     * @param {CrowdDensityLevel} density - The forecasted crowd density to set.
     */
    setForecastCrowdDensity(density) {
        this.#forecastCrowdDensity = density;
    }
}

