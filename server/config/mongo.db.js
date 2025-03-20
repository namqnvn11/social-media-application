const mongoose = require('mongoose');

class Database {
    constructor(){
        if(Database.instance){
            this.connect();
            Database.instance = this;
        }
        return Database.instance;
    }

    async connect(){
        try {
            await mongoose.connect(process.env.MONGO_URI)
            console.log("Connected to MongoDB");
        } catch (error) {
            console.log("Error connecting to MongoDB", error);
        }
    }
}

module.exports = new Database();