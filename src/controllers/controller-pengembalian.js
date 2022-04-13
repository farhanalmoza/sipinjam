const config = require('../configs/database');
let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports = {
    index(req,res){
        res.render("pengembalian",{
            url : 'http://localhost:8000/',
        });
    },
    save(req,res){
        let sqlPeminjaman = "UPDATE peminjaman SET status = 'kembali' WHERE id_peminjaman = "+req.body.id_peminjaman;
        let queryPeminjaman = pool.query(sqlPeminjaman, (err, results) => {
            if(err) throw err;
        });
        let sqlBuku = "UPDATE buku SET stok = stok + 1, dipinjam = dipinjam - 1 WHERE id_buku = "+req.body.id_buku;
        let queryBuku = pool.query(sqlBuku, (err, results) => {
            if(err) throw err;
        });
        let data = {tgl_pengembalian: req.body.tgl_kembali,
                    denda: req.body.denda,
                    id_petugas: req.body.id_petugas,
                    id_anggota: req.body.id_anggota,
                    id_buku: req.body.id_buku};
        let sql = "INSERT INTO pengembalian SET ?";
        let query = pool.query(sql,data,(err,results)=>{
            if(err) throw err;
            res.redirect("/pengembalian");
        });
    },
    all(req,res){
        let sql = "SELECT * FROM pengembalian";
        let query = pool.query(sql,(err,results)=>{
            if(err) throw err;
            return res.json(results);
        });
    }
}