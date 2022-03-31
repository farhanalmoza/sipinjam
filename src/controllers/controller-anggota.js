const config = require('../configs/database');
let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports = {
    index(req,res){
        res.render("anggota",{
            url : 'http://localhost:8000/',
        });
    },
    all(req,res){
        let sql = "SELECT * FROM anggota";
        let query = pool.query(sql, (err, results) => {
            if(err) throw err;
            return res.json(results);
        });
    },
    save(req,res){
        let data = {id: req.body.id_anggota, nama: req.body.nama_anggota, telepon: req.body.telepon_anggota, alamat: req.body.alamat_anggota};
        let sql = "INSERT INTO anggota SET ?";
        let query = pool.query(sql, data,(err, results) => {
            if(err) throw err;
            res.redirect('/anggota');
        });
    },
    update(req,res){
        let data = {id: req.body.id_anggota, nama: req.body.nama_anggota, telepon: req.body.telepon_anggota, alamat: req.body.alamat_anggota};
        let sql = "UPDATE anggota SET ? WHERE id="+req.body.id_anggota;
        let query = pool.query(sql, data,(err, results) => {
            if(err) throw err;
            res.redirect('/anggota');
        });
    },
    delete(req,res){
        let sql = "DELETE FROM anggota WHERE id="+req.body.id_anggota;
        let query = pool.query(sql, (err, results) => {
            if(err) throw err;
            res.redirect('/anggota');
        });
    }
}