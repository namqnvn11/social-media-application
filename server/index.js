const express = require('express');
const app = express();
require('dotenv').config();
require('./config/mongo.db').connect();

app.use(express.json());
app.use('/api/v1', require('./routers/index'));

app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
