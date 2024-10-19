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
     * The type of file (e.g., 'pdf', 'csv', 'jpg')
     * @type {string}
     */
    #fileType;

    /**
     * Gets the title of the content.
     * @returns {string} - The title.
     */
    getTitle() {
        return this.#title;
    }

    /**
     * Sets the title of the content.
     * @param {string} title - The title.
     */
    setTitle(title) {
        this.#title = title;
    }

    /**
     * Gets the description of the content.
     * @returns {string} - The description.
     */
    getDescription() {
        return this.#description;
    }

    /**
     * Sets the description of the content.
     * @param {string} description - The description.
     */
    setDescription(description) {
        this.#description = description;
    }

    /**
     * Gets the file type of the content.
     * @returns {string} - The file type.
     */
    getFileType() {
        return this.#fileType;
    }

    /**
     * Gets the file type of the content.
     * @param {string} fileType - The file type.
     */
    setFileType(fileType){
        this.#fileType = fileType
    }

    /**
     * Download the content.
     */
    download() { }
}