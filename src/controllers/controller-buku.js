const config   = require('../configs/database');
let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports = {
    index(req,res){
        res.render("buku",{
            url : 'http://cadf-20-213-242-75.ngrok.io/',
        });
    },
    all(req,res){
        let sql = "SELECT * FROM buku ORDER BY id DESC";
        let query = pool.query(sql, (err, results) => {
            if(err) throw err;
            return res.json(results);
        });
    },
    save(req,res){
        let data = {judul: req.body.judul,
                    id_kategori: req.body.id_kategori,
                    penerbit: req.body.penerbit,
                    penulis: req.body.penulis,
                    tahun_terbit: req.body.tahun_terbit,
                    stok: req.body.stok};
        let sql = "INSERT INTO buku SET ?";
        let query = pool.query(sql, data,(err, results) => {
            if(err) throw err;
            res.redirect('/buku');
        });
    },
    delete(req,res){
        let sql = "DELETE FROM buku WHERE id = "+req.body.id_buku;
        let query = pool.query(sql, req.params.id,(err, results) => {
            if(err) throw err;
            res.redirect('/buku');
        });
    },
    update(req,res){
        let sql = "UPDATE buku SET judul='"+req.body.judul
                    +"', id_kategori='"+req.body.id_kategori
                    +"', penerbit='"+req.body.penerbit
                    +"', penulis='"+req.body.penulis
                    +"', tahun_terbit='"+req.body.tahun_terbit
                    +"', stok='"+req.body.stok
                    +"' WHERE id="+req.body.id_buku;
        let query = pool.query(sql, (err, results) => {
            if(err) throw err;
            res.redirect('/buku');
        });
    }
}