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

    once(name, listener){
        // check if listener is a function
        if (typeof listener !== "function") {
            throw new Error("Listener must be a function")
        }
        // when emitted the listener will run and then be removed
        const oneTime = (...args) => {
            listener(...args)
            this.removeListener(name, oneTime) 
        }
        // create key value pair name: [listeners] if it does not exist in events object
        this.events[name] = this.events[name] || []
        // add oneTime const to proper events array
        this.events[name].push(oneTime)
        
    }

    removeListener(name, listenerToRemove) {
        // check if name is an event
        if (!this.events[name]) {
            throw new Error(`Cannot remove listener from ${name} because event ${name} does not exist`)
        }
        // set events to equal events array without the listenerToRemove
        this.events[name] = this.events[name].filter(l => l !== listenerToRemove)
    }

    removeAllNameListeners(name) {
        if (!this.events[name]) {
            throw new Error(`Cannot remove listeners from ${name} because event ${name} does not exist`)
        }
        this.events[name] = []
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

module.exports = eventEmitter
