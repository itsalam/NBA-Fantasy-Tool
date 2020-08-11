const express = require("express");
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'sql3.freemysqlhosting.net',
    user: 'sql3339188',
    database: 'sql3339188',
    password: 'NlFjeyWSK8'
}).promise();

let app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.set("view engine", "ejs"); // ejs allows us to use dynamic content

app.get("/", (req, res) => res.render("pages/index")); // where we are storing our html files

// clear db when form is loaded
app.get("/myForm", (req, res) => {
    pool.execute('Truncate table todo')
        .then(res.render("pages/myForm"));
});

// post data from myFrom to db
app.post("/myForm", (req, res) => {
    pool.execute(`INSERT into todo (text) values ('${req.body.items}')`)
        .then(
            // select from db
            pool.execute("SELECT * FROM todo ORDER BY id DESC LIMIT 0, 1")
            .then(([Data, Metadata]) => {
                let myString = Data[0].text;
                let data = myString.split(",");
                // render data on /result
                res.render("pages/result", {
                    data: data
                });
            })
            .catch(error => console.log(error))
        )
        .catch(error => console.log(error));
});

// PUT to UPDATE an entry with a new one
// ONLY WORKS ONCE...
app.put('/myForm', (req, res) => {
    let old = req.body.old_item;
    let newer = req.body.new_item;

    // get entry that has 'old' todo item
    pool.execute(`SELECT * FROM todo WHERE text LIKE ('%${old}%')`)
        .then(([Data, Metadata]) => {

            // store db Data as a string
            let dbData = String(Data[0].text);
            // replace old item with new item
            let newData = dbData.replace(String(old), String(newer));
            // truncate table
            pool.execute('Truncate table todo')
                .then(
                    // enter new data into db
                    pool.execute(`INSERT into todo (text) values ('${newData}')`)
                    .then(
                        // get new data
                        pool.execute("SELECT * FROM todo ORDER BY id DESC LIMIT 1")
                        .then(([D, Metadata]) => {
                            let myString = D[0].text;
                            let data = myString.split(",");
                            // render data on /result
                            res.render("pages/result", {
                                data: data
                            });
                        })
                        .catch(error => console.log(error))
                    )
                    .catch(error => console.log(error)))
        })
        .catch(error => console.log(error));
});

// DELETE does not actually delete the item, but replaces the chosen item with an empty entry..
// this is because of how my db table is structured
// only works once
app.delete('/myForm', (req, res) => {
    let old = req.body.old_item;
    // get entry that has 'old' todo item
    pool.execute(`SELECT * FROM todo WHERE text LIKE ('%${old}%')`)
        .then(([Data, Metadata]) => {
            // store db Data as a string
            let dbData = String(Data[0].text);
            // replace old item with new item
            let newData = dbData.replace(String(old), "");
            pool.execute('Truncate table todo')
                .then(
                    // enter new data into db
                    pool.execute(`INSERT into todo (text) values ('${newData}')`)
                    .then(
                        // get new data
                        pool.execute("SELECT * FROM todo ORDER BY id DESC LIMIT 1")
                        .then(([D, Metadata]) => {
                            let myString = D[0].text;
                            let data = myString.split(",");
                            // render data on /result
                            res.render("pages/result", {
                                data: data
                            });
                        })
                        .catch(error => console.log(error))
                    )
                    .catch(error => console.log(error)))
        })
});

app.listen(3000);