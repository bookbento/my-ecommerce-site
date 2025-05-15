const experss = require('express');

const cors = require('cors');

const bodyParser = require('body-parser')

const app = experss();
const POST = 4000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/subject', require('./routes/subject'));
app.use('/api/contact', require('./routes/contact.'));
app.use('/api/subscribe',require('./routes/subscribe'));
app.use('/api/register',require('./routes/register'));


app.listen(POST, () => {
    console.log('Server running at http://localhost:' + POST);
});

