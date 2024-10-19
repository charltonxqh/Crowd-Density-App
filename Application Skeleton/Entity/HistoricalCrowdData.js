class HistoricalCrowdData {
    /**
     * @type {dayOfWeek}
     * the day of week 
     */
    #dayOfWeek;

    getDayOfWeek(){
        return this.#dayOfWeek;
    }

    setDayOfWeek(day){
        this.#dayOfWeek = day;
    }

    /**
     * Display the crowd data for a specific day of the week.
     */
    displayData(day) { }
}