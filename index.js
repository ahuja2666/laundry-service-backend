// <<<<<<< HEAD
const mongoose = require("mongoose")
// =======
const express = require('express')
// >>>>>>> 15ff24c37acf3022b31b70e020edcea479b25513
const app = express();
const port = 8080;

mongoose.connect('mongodb://localhost/Orderdb',()=>{
    console.log("database connected")
});
app.use(bodyparser.json());
app.use('/orders',orderRoutes);

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})