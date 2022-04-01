const config = require('../configs/database');
let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports = {
    index(req,res){
        res.render("pengembalian",{
            url : 'http://cadf-20-213-242-75.ngrok.io/',
        });
    },
    save(req,res){
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
    }
}