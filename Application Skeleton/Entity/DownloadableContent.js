class DownloadableContent {

    /**
     * The title of the downloadable content
     * @type {string}
     */
    #title;
    
    /**
     * A brief description of the content
     * @type {string}
     */
    #description;  

    /**
     * The type of file (e.g., 'pdf', 'csv', 'jpg')\
     * @type {string}
     */
    #fileType;

    /**
     * Gets the title of the content.
     * @returns {string} The title.
     */
    getTitle() {
        return this.#title;
    }

    /**
     * Gets the description of the content.
     * @returns {string} The description.
     */
    getDescription() {
        return this.#description;
    }

    /**
     * Gets the file type of the content.
     * @returns {string} The file type.
     */
    getFileType() {
        return this.#fileType;
    }

    /**
     * Starts the download of the content.
     */
    download() {
        // Implementation for initiating a download
        console.log(`Downloading ${this.#title}`);
    }
}