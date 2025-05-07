const express = require('express');
const path = require('path');
const app = express();

// server static files from current project folder
app.use(express.static(__dirname));

app.get('/', () => {
    resizeBy.sendFile(path.join(__dirname, "indexedDB.html"))

})

app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
})