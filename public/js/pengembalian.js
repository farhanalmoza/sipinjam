$(document).ready(function(){
    getPeminjaman.loadData = "/peminjaman/all";
    getPetugas.loadData = "/petugas/profile";

    // date today
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const todayDate = yyyy + '-' + mm + '-' + dd;
    $('#tgl_kembali_display').val(todayDate);
    $('#tgl_kembali').val(todayDate);
});

const getPeminjaman = {
    set loadData(data) {
        const url = "http://localhost:8000" + data;
        Functions.prototype.getRequest(getPeminjaman, url);
    },
    set successData(response) {
        const data = response;
        const option = document.createElement("option");
        option.value = "";
        option.innerHTML = "Nomor Peminjaman";
        document.getElementById("no_peminjaman").appendChild(option);
        for (let i = 0; i < data.length; i++) {
            const option = document.createElement("option");
            option.value = data[i].id_peminjaman;
            option.innerHTML = data[i].id_peminjaman;
            document.getElementById("no_peminjaman").appendChild(option);
        }
    }
}

const getPetugas = {
    set loadData(data) {
        const url = "http://localhost:8000" + data;
        Functions.prototype.getRequest(getPetugas, url);
    },
    set successData(response) {
        const data = response;
        document.getElementById("nama-petugas").innerHTML = data[0].nama;
        document.getElementById("id_petugas").value = data[0].id;
    }
}

$('#no_peminjaman').change(function(){
    const id = $('#no_peminjaman').val();
    $('#id_peminjaman').val(id);
    getDetailPeminjaman.loadData = "/peminjaman/detail/" + id;
});

const getDetailPeminjaman = {
    set loadData(data) {
        const url = "http://localhost:8000" + data;
        Functions.prototype.getRequest(getDetailPeminjaman, url);
    },
    set successData(response) {
        const data = response;
        document.getElementById("judul_buku").value = data[0].judul;
        document.getElementById("id_buku").value = data[0].id_buku;
        document.getElementById("nama_anggota").value = data[0].nama_anggota;
        document.getElementById("id_anggota").value = data[0].id_anggota;
    }
}