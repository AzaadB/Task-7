const express = require('express');
const cors = require('cors')

const CarRoutes = require('./routes/Cars.routes')

//express app
const app = express()

const mongoose = require('mongoose')

//middleware
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/cars', CarRoutes)



//Port listening at:
const PORT = process.env.PORT || 5000;

//Connection URL
const uri = 'mongodb+srv://FAST:MR.PrimeNumbers@cluster1.ux44b.mongodb.net/CARSMODELS?retryWrites=true&w=majority'
mongoose.Promise = global.Promise;/*Nodes Promise property within the global object equals mongoose's 
Promise property.*/

/*If we want to use mongoose in different position inside the codes it must be viewed as global mode, 
that's why we need to set mongoose as : mongoose.Promise = global.Promise;*/

mongoose.connect('mongodb+srv://FAST:MR.PrimeNumbers@cluster1.ux44b.mongodb.net/', {
    dbName: 'CARS'
}).then(result => {
    console.log('mongoose connected!');
}).catch(err => console.log(err));

const db = mongoose.connection; //Store mongoose.connection inside db variable.

db.once('open', function () {
    console.log("Successfully connected to the database");


    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    }); // Listening at PORT = process.env.PORT || 5000;
});

db.on('error', function () {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});



