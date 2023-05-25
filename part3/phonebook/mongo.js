/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

// eslint-disable-next-line no-undef
const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.kb5r5ui.mongodb.net/personApp?retryWrites=true&w=majority`


mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const name = process.argv[3]
const number = process.argv[4]

if (name==null && number==null) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name,' ',person.number)
    })
    mongoose.connection.close()
  })
}

if (name!=null && number!=null) {
  const person = new Person({
    'name': name,
    'number': number
  })


  person.save().then(() => {
    console.log(`Added ${name} ${number} to phonebook` )
    mongoose.connection.close()
  })
}




