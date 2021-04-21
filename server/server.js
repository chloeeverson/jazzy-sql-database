const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;
const pg = require('pg');

// Create a connection to our database
const Pool = pg.Pool;
const pool = new Pool({
    //name of database
    database: 'jazzy_sql',
    //where database is
    host: 'Localhost',
    port: 5432,
    //connections at one time
    max: 10,
    //30 seconds to try to connect otherwise cancel query
    idleTimeoutMillis: 30000,
});

//handle CONNECTION events
pool.on('connect', () => {
    console.log('Postgresql connected'); 
});
//notify if backend error happens
pool.on('error', (error) => {
    console.log('Error with postgres pool', error); 
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});

// TODO - Replace static content with a database tables
const artistList = [ 
    {
        name: 'Ella Fitzgerald',
        birthdate: '04-25-1917'
    },
    {
        name: 'Dave Brubeck',
        birthdate: '12-06-1920'
    },       
    {
        name: 'Miles Davis',
        birthdate: '05-26-1926'
    },
    {
        name: 'Esperanza Spalding',
        birthdate: '10-18-1984'
    },
]
const songList = [
    {
        title: 'Take Five',
        length: '5:24',
        released: '1959-09-29'
    },
    {
        title: 'So What',
        length: '9:22',
        released: '1959-08-17'
    },
    {
        title: 'Black Gold',
        length: '5:17',
        released: '2012-02-01'
    }
];

app.get('/artist', (req, res) => {
    console.log(`In /songs GET`);
    let queryText = 'SELECT * FROM "artist" ORDER BY "birthdate" DESC;';
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            console.log(`error making query ${queryText}`, err);
            res.sendStatus(500);   
        })
});

app.post('/artist', (req, res) => {
    const artistToSend = req.body;
    const queryText = `INSERT INTO "artist" ("name","birthdate")
    VALUES ('${artistToSend.name}, '${artistToSend.birthdate});`;
    pool.query(queryText)
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`error making query ${queryText}`, err);
            res.sendStatus(500);
            
        })
});

app.get('/song', (req, res) => {
    console.log(`In /songs GET`);
    let queryText = 'SELECT * FROM "song" ORDER BY "title";';
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            console.log(`error making query ${queryText}`, err);
            res.sendStatus(500);   
        })
});

app.post('/song', (req, res) => {
    const newSong = req.body;
    const queryText = `INSERT INTO "song" ("title","length","released")
    VALUES ('${newSong.title}, '${newSong.length}, ${newSong.released});`;
    pool.query(queryText)
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`error making query ${queryText}`, err);
            res.sendStatus(500);
            
        })
});


