const config = require('../configs/database');
let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports = {
    all(req,res){
        let sql = "SELECT * FROM kategori";
        let query = pool.query(sql, (err, results) => {
            if(err) throw err;
            return res.json(results);
        });
    },
    save(req,res){
        let data = {kategori: req.body.kategori};
        let sql = "INSERT INTO kategori SET ?";
        let query = pool.query(sql, data,(err, results) => {
            if(err) throw err;
            res.redirect('/buku');
        });
    },
    delete(req,res){
        let sql = "DELETE FROM kategori WHERE id = "+req.body.id_kategori;
        let query = pool.query(sql, req.params.id,(err, results) => {
            if(err) throw err;
            res.redirect('/buku');
        });
    }
}
