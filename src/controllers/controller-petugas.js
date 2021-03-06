const config = require('../configs/database');
let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports = {
    index(req, res) {
        res.render("petugas",{
            url : 'http://localhost:8000/',
        });
    },
    profile(req, res) {
        let id = req.session.userid;
        let sql = "SELECT * FROM petugas WHERE id =" + id;
        let query = pool.query(sql, (err, results) => {
            if(err) throw err;
            return res.json(results);
        });
    }
}