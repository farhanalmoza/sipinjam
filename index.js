//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();

//konfigurasi koneksi
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pemweb_sipinjam'
});

//connect ke database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set folder public sebagai static folder untuk static file
app.use('/assets',express.static(__dirname + '/public'));

//route halaman
app.get('/',(req, res) => { res.render('dashboard',{}); });
app.get('/anggota',(req, res) => { res.render('anggota',{}); });
app.get('/buku',(req, res) => { res.render('buku',{}); });
app.get('/peminjaman',(req, res) => { res.render('peminjaman',{}); });
app.get('/pengembalian',(req, res) => { res.render('pengembalian',{}); });

// route all
app.get('/all/anggota',(req, res) => {
  let sql = "SELECT * FROM anggota";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    return res.json(results);
  });
});
app.get('/all/buku',(req, res) => {
  let sql = "SELECT * FROM buku";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    return res.json(results);
  });
});
app.get('/all/peminjaman',(req, res) => {
  let sql = "SELECT * FROM peminjaman";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    return res.json(results);
  });
});
app.get('/all/pengembalian',(req, res) => {
  let sql = "SELECT * FROM pengembalian";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    return res.json(results);
  });
});

//route untuk insert
app.post('/save/anggota',(req, res) => {
  let data = {id: req.body.id_anggota, nama: req.body.nama_anggota, telepon: req.body.telepon_anggota, alamat: req.body.alamat_anggota};
  let sql = "INSERT INTO anggota SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/anggota');
  });
});
app.post('/save/buku',(req, res) => {
  let data = {judul: req.body.judul, penerbit: req.body.penerbit, penulis: req.body.penulis, tahun_terbit: req.body.tahun_terbit, stok: req.body.stok};
  let sql = "INSERT INTO buku SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/buku');
  });
});
app.post('/save/peminjaman',(req, res) => {
  let data = {tgl_pinjam: req.body.tgl_pinjam,
              tgl_kembali: req.body.tgl_kembali,
              id_anggota: req.body.id_anggota,
              id_buku: req.body.id_buku,
              id_petugas: req.body.id_petugas};
  let sql = "INSERT INTO peminjaman SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/peminjaman');
  });
});

//route untuk update data
app.post('/update/anggota',(req, res) => {
  let sql = "UPDATE anggota SET id='"+req.body.id_anggota+"', nama='"+req.body.nama_anggota+"', telepon='"+req.body.telepon_anggota+"', alamat='"+req.body.alamat_anggota+"' WHERE id="+req.body.id_anggota;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/anggota');
  });
});
app.post('/update/buku',(req, res) => {
  let sql = "UPDATE buku SET id='"+req.body.id
              +"', judul='"+req.body.judul
              +"', penerbit='"+req.body.penerbit
              +"', penulis='"+req.body.penulis
              +"', tahun_terbit='"+req.body.tahun_terbit
              +"', stok='"+req.body.stok
              +"' WHERE id="+req.body.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/buku');
  });
});

//route untuk delete data
app.post('/delete/anggota',(req, res) => {
  let sql = "DELETE FROM anggota WHERE id="+req.body.id_anggota+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/anggota');
  });
});
//route untuk delete data buku
app.post('/delete/buku',(req, res) => {
  let sql = "DELETE FROM buku WHERE id="+req.body.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/buku');
  });
});

//server listening
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});
