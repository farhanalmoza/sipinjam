// library yang digunakan
const path = require('path');
const express = require('express');
const session = require('express-session');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const flash = require('req-flash');
const app = express();

// Definisi lokasi file router
const homeRouter = require('./src/routes/router-home');
const loginRoutes = require('./src/routes/router-login');
const registerRoutes = require('./src/routes/router-register');
const dashboardRoutes = require('./src/routes/router-dashboard');
const anggotaRoutes = require('./src/routes/router-anggota');
const bukuRoutes = require('./src/routes/router-buku');
const kategoriRoutes = require('./src/routes/router-kategori');
const peminjamanRoutes = require('./src/routes/router-peminjaman');
const pengembalianRoutes = require('./src/routes/router-pengembalian');
const petugasRoutes = require('./src/routes/router-petugas.js');

// Configurasi library session
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 't@1k0ch3ng',
  name: 'secretName',
  cookie: {
      sameSite: true
  },
}))

//set views file
app.set('views',path.join(__dirname,'src/views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
//set folder public sebagai static folder untuk static file
app.use('/assets',express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.setHeader('Pragma', 'no-cache');
  next();
});

// route home
app.use('/', homeRouter);

// route auth
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);

// route petugas
app.use('/dashboard', dashboardRoutes);
app.use('/anggota', anggotaRoutes);
app.use('/buku', bukuRoutes);
app.use('/kategori', kategoriRoutes);
app.use('/peminjaman', peminjamanRoutes);
app.use('/pengembalian', pengembalianRoutes);
app.use('/petugas', petugasRoutes);

//server listening
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});
