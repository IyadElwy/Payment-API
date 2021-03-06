const mongoose = require("mongoose");

//////////////////////////////////////////////////////////////////////////////

require('dotenv').config({path: './Config.env'});
const app = require("./app");

//////////////////////////////////////////////////////////////////////////////


process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION. Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

//////////////////////////////////////////////////////////////////////////////


const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

//////////////////////////////////////////////////////////////////////////////

process.on('unhandledRejection', err => {
    console.log(err);
    console.log('UNHANDLED REJECTION. Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////