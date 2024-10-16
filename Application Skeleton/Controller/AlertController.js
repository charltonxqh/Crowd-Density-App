/**
 * Class responsible for managing alerts on the MRT website.
 */
class AlertController {
    /**
     * Fetches disruption alerts.
     * @returns {string} - Returns a string describing the disruption alerts.
     */
    fetchDisruptionAlerts() {
        // Placeholder logic for fetching disruption alerts
        return `Disruption alerts: ${this.alertQueue.length} alerts in the queue.`;
    }

    /**
     * Identifies the type of alert based on certain criteria.
     * @returns {string} - Returns a string indicating the type of alert.
     */
    identifyAlertType() {
        // Placeholder logic for identifying the alert type
        if (this.alertQueue.length > 0) {
            return this.alertQueue[0].type; // Example logic to return the type of the first alert in the queue
        }
        return 'No alerts available';
    }

    /**
     * Sends an alert to a user.
     * @param {string} userId - The ID of the user who will receive the alert.
     * @param {string} message - The message to be sent in the alert.
     * @param {string} type - The type of alert (e.g., 'info', 'warning', 'alert').
     * @returns {boolean} - Returns true if alert was sent successfully.
     */
    sendAlert(userId, message, type) {
        // Placeholder logic for sending an alert
        console.log(`Alert sent to user ${userId}: [${type}] ${message}`);
        return true; // Return true for success
    }

    /**
     * Adds an alert to the alert queue.
     * @param {string} userId - The ID of the user who will receive the alert.
     * @param {string} message - The message to be queued.
     * @param {string} type - The type of alert.
     */
    queueAlert(userId, message, type) {
        // Pushes the alert details to the alertQueue
        this.alertQueue.push({ userId, message, type });
        console.log(`Alert queued for user ${userId}: [${type}] ${message}`);
    }

    /**
     * Processes and sends all alerts in the alert queue.
     */
    processAlertQueue() {
        // Process each alert in the queue
        while (this.alertQueue.length > 0) {
            const alert = this.alertQueue.shift(); // Removes the first item
            this.sendAlert(alert.userId, alert.message, alert.type);
        }
    }

    /**
     * Sends a system-wide alert to all users.
     * @param {Array<string>} userIds - List of user IDs who will receive the alert.
     * @param {string} message - The alert message to be sent.
     */
    sendSystemAlert(userIds, message) {
        userIds.forEach(userId => {
            this.sendAlert(userId, message, 'alert');
        });
    }
}

// Example usage (replace with actual alert handling logic):
// let alertController = new AlertController();
// alertController.queueAlert('user123', 'Train service disrupted', 'alert');
// alertController.processAlertQueue();
// alertController.sendSystemAlert(['user123', 'user456'], 'System-wide maintenance on MRT lines');

// Key Methods:
// sendAlert: Sends an alert with a message to a specific user.
// queueAlert: Adds an alert to a queue for later processing.
// processAlertQueue: Sends all alerts in the queue.
// sendSystemAlert: Sends a system-wide alert to all users listed.