class ToastEventEmitter {
    constructor() {
        this.listeners = new Set();
    }

    subscribe(listener) {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }

    emit(type, message, options = {}) {
        this.listeners.forEach((listener) => {
            try {
                listener({ type, message, options });
            } catch (error) {
                console.error("Error in toast listener:", error);
            }
        });
    }

    success(message, options) {
        this.emit("success", message, options);
    }

    error(message, options) {
        this.emit("error", message, options);
    }

    info(message, options) {
        this.emit("info", message, options);
    }

    warning(message, options) {
        this.emit("warning", message, options);
    }

    verification(message, options) {
        this.emit("verification", message, options);
    }
}

export const toastEvents = new ToastEventEmitter();
