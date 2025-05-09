const experss = require('express');
const router = experss.Router();

const subject = require('../data/contact_subject.json');

router.get('/' , (req, res) => {
    //res.end('{"contactSubject": ["General Enquiry","Class","Schedule","instructor","Price","Other", "Opor"]}');
    res.json(subject);
});

module.exports = router;

