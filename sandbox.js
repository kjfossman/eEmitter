const eventEmitter = require('./eEmitter')

const greetEveryone = (...args) => {
    return args.map(e => console.log(`Good Afternoon ${e}.`))
}

eventEmitter.on('greet', greetEveryone)

eventEmitter.emit('greet', 'Kyle')

