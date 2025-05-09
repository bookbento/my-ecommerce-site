const experss = require('express');
const router = experss.Router();

router.post('/', (req, res) => {
    const {fname, lname, email, subject, message} = req.body
    console.log('Content form submited', {fname, lname, email, subject, message});
    res.status(200).json({status:"Message Reciver"})
});

module.exports = router;