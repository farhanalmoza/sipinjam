const config = require('../configs/database');
let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports = {
    index(req,res){
        res.render("peminjaman",{
            url : 'http://cadf-20-213-242-75.ngrok.io/',
        });
    },
    all(req,res){
        let sql = `SELECT * FROM peminjaman
                    JOIN anggota ON peminjaman.id_anggota = anggota.id
                    JOIN buku ON peminjaman.id_buku = buku.id
                    JOIN petugas ON peminjaman.id_petugas = petugas.id`;
        let query = pool.query(sql, (err, results) => {
            if(err) throw err;
            return res.json(results);
        });
    },
    save(req,res){
        let data = {tgl_pinjam: req.body.tgl_pinjam,
                    tgl_kembali: req.body.tgl_kembali,
                    id_buku: req.body.id_buku,
                    id_anggota: req.body.id_anggota,
                    id_petugas: req.body.id_petugas
                };
        let sql = "INSERT INTO peminjaman SET ?";
        let query = pool.query(sql, data,(err, results) => {
            if(err) throw err;
            res.redirect('/peminjaman');
        });
    },
    update(req,res){
        let data = {tgl_pinjam: req.body.tanggal_pinjam,
                    tgl_kembali: req.body.tanggal_kembali,
                    id_buku: req.body.id_buku,
                    id_anggota: req.body.id_anggota,
                    id_petugas: req.body.id_petugas
                };
        let sql = "UPDATE peminjaman SET ? WHERE id="+req.body.id;
        let query = pool.query(sql, data,(err, results) => {
            if(err) throw err;
            res.redirect('/peminjaman');
        });
    },
    delete(req,res){
        let sql = "DELETE FROM peminjaman WHERE id="+req.body.id;
        let query = pool.query(sql, (err, results) => {
            if(err) throw err;
            res.redirect('/peminjaman');
        });
    },
    getById(req,res){
        let id = req.params.id;
        let sql = `SELECT * FROM peminjaman
                    JOIN anggota ON peminjaman.id_anggota = anggota.id
                    JOIN buku ON peminjaman.id_buku = buku.id
                    WHERE peminjaman.id_peminjaman=${id}`;
        let query = pool.query(sql, (err, results) => {
            if(err) throw err;
            return res.json(results);
        });
    }
}