$(document).ready(function() {
    getAnggota.loadData = "/all/anggota";
    getBuku.loadData = "/all/buku";
    getPeminjaman.loadData = "/all/peminjaman";
});

const getAnggota = {
    set loadData(data) {
        const url = "http://localhost:8000" + data;
        Functions.prototype.getRequest(getAnggota, url);
    },
    set successData(response) {
        const elemen = $('.jumlah-anggota');
        if (response.length > 0) {
            elemen.text(response.length);
        }
    }
}

const getBuku = {
    set loadData(data) {
        const url = "http://localhost:8000" + data;
        Functions.prototype.getRequest(getBuku, url);
    },
    set successData(response) {
        const elemen = $('.jumlah-buku');
        if (response.length > 0) {
            elemen.text(response.length);
        }
    }
}

const getPeminjaman = {
    set loadData(data) {
        const url = "http://localhost:8000" + data;
        Functions.prototype.getRequest(getPeminjaman, url);
    },
    set successData(response) {
        const elemen = $('.jumlah-peminjaman');
        if (response.length > 0) {
            elemen.text(response.length);
        }
    }
}
