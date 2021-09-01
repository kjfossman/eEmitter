class eEmitter{
    constructor() {
        this.events = {} 
    }

    on(name, listener) {
        // check if listener is a function
        if (typeof listener !== "function") {
          throw new Error("Listener must be a function")
        }
        // create key value pair name: [listeners] if it does not exist in events object
        this.events[name] = this.events[name] || []
        // add listener to proper events array
        this.events[name].push(listener);
    }

    emit(name, ...data) {
        // check if name is an event 
        if (!this.events[name]) {
            throw new Error(`Event ${name} does not exist`)
        }
        // declare function to run listeners 
        const fireCallbacks = (listener) => {
            listener(...data)
        }
        // Run each listener with the proper arguments 
        this.events[name].forEach(fireCallbacks)
    }
}

const eventEmitter = new eEmitter()


