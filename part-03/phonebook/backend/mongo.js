const mongoose = require('mongoose')

const args = process.argv

if (args.length !== 3 && args.length !== 5) {
  console.log('invalid args, must be:')
  console.log('> [password]')
  console.log('> [password] [name] [number]')
  process.exit(1)
}

const personSchma = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchma)

if (args.length >= 3) {
  const password = process.argv[2]
  const dbURI = `mongodb+srv://fullstack:${password}@fullstack.2wzidjs.mongodb.net/phonebookApp?retryWrites=true&w=majority`
  mongoose.set('strictQuery', false)
  mongoose.connect(dbURI)
}

if (args.length === 3) {
  Person.find({}).then(res => {
    console.log('phonebook:')
    res.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: args[3],
    number: args[4],
  })
  person.save().then(res => {
    console.log(`added ${res.name} number ${res.number} to phonebook`)
    mongoose.connection.close()
  })
}

