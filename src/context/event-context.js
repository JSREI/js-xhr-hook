class EventContext {

    constructor() {
        this.events = [];
    }

    /**
     *
     * @param event {Event}
     */
    addEvent(event) {
        // TODO 2025-01-11 00:18:17 同名的时候覆盖？
        this.events.push(event);
    }

}

module.exports = {
    EventContext
}