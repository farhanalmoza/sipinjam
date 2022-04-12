const config = require('../configs/database');
let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports = {
    index(req,res){
        res.render("peminjaman",{
            url : 'http://localhost:8000/',
        });
    },
    all(req,res){
        let sql = `SELECT * FROM peminjaman
                    JOIN anggota ON peminjaman.id_anggota = anggota.id
                    JOIN buku ON peminjaman.id_buku = buku.id_buku
                    JOIN petugas ON peminjaman.id_petugas = petugas.id
                    ORDER BY peminjaman.id_peminjaman DESC`;
        let query = pool.query(sql, (err, results) => {
            if(err) throw err;
            return res.json(results);
        });
    },
    pinjam(req,res){
        let sql = `SELECT * FROM peminjaman
                    JOIN anggota ON peminjaman.id_anggota = anggota.id
                    JOIN buku ON peminjaman.id_buku = buku.id_buku
                    JOIN petugas ON peminjaman.id_petugas = petugas.id
                    WHERE status = 'pinjam'
                    ORDER BY peminjaman.id_peminjaman DESC`;
        let query = pool.query(sql, (err, results) => {
            if(err) throw err;
            return res.json(results);
        });
    },
    kembali(req,res){
        let sql = `SELECT * FROM peminjaman
                    JOIN anggota ON peminjaman.id_anggota = anggota.id
                    JOIN buku ON peminjaman.id_buku = buku.id_buku
                    JOIN petugas ON peminjaman.id_petugas = petugas.id
                    WHERE status = 'kembali'
                    ORDER BY peminjaman.id_peminjaman DESC`;
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
                    id_petugas: req.body.id_petugas,
                    status: "pinjam"
                };
        let sql = "INSERT INTO peminjaman SET ?";
        let sqlBuku = "UPDATE buku SET stok = stok - 1, dipinjam = dipinjam + 1 WHERE id_buku = "+req.body.id_buku;
        let queryBuku = pool.query(sqlBuku, (err, results) => {
            if(err) throw err;
        });
        let query = pool.query(sql, data,(err, results) => {
            if(err) throw err;
            res.redirect('/peminjaman');
        });
    },
    getById(req,res){
        let id = req.params.id;
        let sql = `SELECT * FROM peminjaman
                    JOIN anggota ON peminjaman.id_anggota = anggota.id
                    JOIN buku ON peminjaman.id_buku = buku.id_buku
                    WHERE peminjaman.id_peminjaman=${id}`;
        let query = pool.query(sql, (err, results) => {
            if(err) throw err;
            return res.json(results);
        });
    }
}