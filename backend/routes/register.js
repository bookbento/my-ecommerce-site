// const { count } = require('console');
const { subscribe } = require('diagnostics_channel');
const experss = require('express');
const router = experss.Router();

const fs = require('fs');
const path = require('path');

/*
1.read existing file
2.parse data int array
3.add new data into array
4.save array into file


*/
router.post('/', (req, res) => {
    const {fname, lname, email, password , occupationCat, occupation} = req.body

    const subscribe = {subscribeAt : new Date(), email};

    const filePath = path.join(__dirname,'..','data', 'subscribe.json');

    console.log('Content form submited', {email});

    let subscribes = [];

    if(fs.existsSync(filePath)){
        //file is there
        const filedata = fs.readFileSync(filePath, 'utf-8');
        subscribes = JSON.parse(filedata);
        subscribes.push(subscribe);
        fs.writeFileSync(filePath, JSON.stringify(subscribes, null, 2));
        res.status(200).json({status:"Message Reciver"});
        console.log('Content form submited', {email});
    } else {
        //no file
        subscribes.push(subscribe);
        fs.writeFileSync(filePath, JSON.stringify(subscribes, null, 2));
        res.status(200).json({status:"Message Reciver"});
        console.log('Content form submited', {email});
    }
});

module.exports = router;