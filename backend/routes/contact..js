const router = require("express").Router();

const sqlite3 = require('sqlite3').verbose();

const path = require('path');
const filePath = path.join(__dirname, '..', 'data', 'contact.db');
const db = new sqlite3.Database(filePath);

db.run(`CREATE TABLE IF NOT EXISTS contact (
    id INTEGER PRIMARY KEY,
    fname TEXT,
    lname TEXT,
    email TEXT,
    subject TEXT,
    message TEXT,
    submittedAT DATE
)`);

router.post('/', (req, res) => {
    const { fname, lname, email, subject, message } = req.body

    db.run(`INSERT INTO contact (fname, lname, email, subject, message,submittedAT)
        VALUES (?,?,?,?,?,?)`, [fname, lname, email, subject, message, new Date()])

    console.log('Content form submited', { fname, lname, email, subject, message });
    res.status(200).json({ status: "Message Reciver" })
});

router.get('/:action', (req, res) => {
    const { action } = req.params;

    switch (action) {
        case 'all':
            db.all('SELECT * FROM contact ORDER BY submittedAT DESC', [], (err, rows) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to fetch contacts' });
                }
                return res.json(rows);
            });
            break;

        case 'last':
            db.get('SELECT * FROM contact ORDER BY submittedAT DESC LIMIT 1', [], (err, row) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to fetch last contact' });
                }
                return res.json(row);
            });
            break;

        case 'deletelast':
            db.run('DELETE FROM contact WHERE id = (SELECT MAX(id) FROM contact)', [], function (err) {
                if (err) {
                    return res.status(500).json({ error: 'Failed to delete last contact' });
                }
                return res.json({ message: 'Last contact deleted', changes: this.changes });
            });
            break;

        default:
            return res.status(400).json({ error: 'Action not found!' });
    }
});


module.exports = router;