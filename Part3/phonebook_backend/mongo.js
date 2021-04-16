const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('You need to enter your password, contact name, and contact phone number.');
    console.log('Ex: node mongo.js <password> <contact name> <contact phone number>');
    process.exit(1);
} else {
    const password = process.argv[2];
    
    // password in .env file
    mongoose.connect(`mongodb+srv://arin:${password}@udemy-web-dev-yelpcamp.zztje.mongodb.net/phonebook-app?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});
    
    const contactSchema = new mongoose.Schema({
        name: String,
        number: String
    });
    
    const Person = new mongoose.model('Person', contactSchema);
    
    if (process.argv.length === 3) {
        Person.find({}).then(response => {
            console.log('phonebook:');
            response.map(person => {
                console.log(`${person.name} ${person.number}`);
            });
            mongoose.connection.close();
        });
    } else {
        const contactName = process.argv[3];
        const contactNumber = process.argv[4];

        Person.create({
            name: contactName,
            number: contactNumber
        }).then(response => {
            console.log(response);
            console.log(`added ${response.name} number ${response.number} to phonebook`);
            mongoose.connection.close();
        });
    }
}