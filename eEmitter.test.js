
const eventEmitter = require('./eEmitter')

// Using these functions for testing purposes
const greetEveryone = (...args) => {
    return args.map(e => `Good Afternoon ${e}.`)
}

const sayHello = (...args) => {
    return args.map(e => `Hello ${e}!`)
}
const sayBye = (...args) => {
    return args.map(e => `Bye ${e}!`)
}

// Making sure all methods and class are correct type
test('Check to see if eventEmitter is an object and all functions are correct type', () => {
    expect(typeof eventEmitter).toBe('object')
    expect(typeof eventEmitter.on).toBe('function')
    expect(typeof eventEmitter.once).toBe('function')
    expect(typeof eventEmitter.removeListener).toBe('function')
    expect(typeof eventEmitter.removeAllNameListeners).toBe('function')
    expect(typeof eventEmitter.emit).toBe('function')
    
})

test('eventEmitter.on is properly adding events', () => {  
    // add 'greet' event with event listener greetEveryone
    eventEmitter.on('greet', greetEveryone)
        expect(eventEmitter.events).toEqual({ 'greet': [greetEveryone] })
    // add 'greet' event with event listener sayHello
    eventEmitter.on('greet', sayHello)
        expect(eventEmitter.events).toEqual({ 'greet': [greetEveryone, sayHello] })
    // add 'send' event with event listener sayBye
    eventEmitter.on('send', sayBye)
        expect(eventEmitter.events).toEqual(
            {   
                'greet':    [greetEveryone, sayHello],
                'send':     [sayBye]  
              })
})

test('eventEmitter.removeListener properly removes specific event listener', () => {
    // set eventEmitter.events to a controlled event and event listeners for testing
    eventEmitter.events =  {   
        'greet': [greetEveryone, sayHello],
      }
    // remove specific event listener greetEveryone from 'greet' event
    eventEmitter.removeListener('greet', greetEveryone)
        expect(eventEmitter.events).toEqual({ 'greet': [sayHello] })
    
    // set eventEmitter.events to a controlled event and event listeners for testing
    eventEmitter.events =  {   
        'greet':    [greetEveryone, sayHello],
        'send':     [sayBye]
        }  
    // remove specific event listener sayHello from 'greet' event
    eventEmitter.removeListener('greet', sayHello)
        expect(eventEmitter.events).toEqual({   'greet':    [greetEveryone],
                                                'send':     [sayBye]  })
})

test('eventEmitter.removeAllNameListeners properly removes all listeners from specific event name', () => {
    // set eventEmitter.events to a controlled event and event listeners for testing
    eventEmitter.events =  {   
        'greet':    [greetEveryone, sayHello],
        'send':     [sayBye]
        }  
    // remove all event listeners from a specific event 'greet'
    eventEmitter.removeAllNameListeners('greet')
         expect(eventEmitter.events).toEqual({  'send':    [sayBye],
                                                'greet':   []    })

})

test('eventEmitter.once properly adds event and removes after first use', () => {
    // set eventEmitter.events to a controlled event and event listeners for testing
    eventEmitter.events = {'greet': [sayHello]}
    // add event listener greetEveryone to 'greet' for one time use only
    eventEmitter.once('greet', greetEveryone)
        expect(eventEmitter.events).not.toEqual({ 'greet': [sayHello] })
    // emit 'greet' event which will get rid of the one time use listener but keep the other
    eventEmitter.emit('greet', 'kyle')
        expect(eventEmitter.events).toEqual({ 'greet': [sayHello] })
})

