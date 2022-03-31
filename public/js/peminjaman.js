$(document).ready(function(){
    getAnggota.loadData = "/anggota/all";
    getBuku.loadData = "/buku/all";
    getPeminjaman.loadData = "/peminjaman/all";
    getPetugas.loadData = "/petugas/profile";
});

const getAnggota = {
    set loadData(data) {
        const url = "http://localhost:8000" + data;
        Functions.prototype.getRequest(getAnggota, url);
    },
    set successData(response) {
        const data = response;
        const option = document.createElement("option");
        option.value = "";
        option.innerHTML = "Pilih Anggota";
        document.getElementById("id_anggota").appendChild(option);
        for (let i = 0; i < data.length; i++) {
            const option = document.createElement("option");
            option.value = data[i].id;
            option.innerHTML = data[i].nama;
            document.getElementById("id_anggota").appendChild(option);
        }
    }
}

const getBuku = {
    set loadData(data) {
        const url = "http://localhost:8000" + data;
        Functions.prototype.getRequest(getBuku, url);
    },
    set successData(response) {
        const data = response;
        const option = document.createElement("option");
        option.value = "";
        option.innerHTML = "Pilih Buku";
        document.getElementById("buku").appendChild(option);
        for (let i = 0; i < data.length; i++) {
            const option = document.createElement("option");
            option.value = data[i].id;
            option.innerHTML = data[i].judul;
            document.getElementById("buku").appendChild(option);
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
    }
}

const getPeminjaman = {
    set loadData(data) {
        const url = "http://localhost:8000" + data;
        Functions.prototype.getRequest(getPeminjaman, url);
    },
    set successData(response) {
        let data = response;
        const table = $('#tabel-peminjaman');
        table.append(`
            <tr>
                <th width="35%">Tanggal Pinjam</th>
                <th>Peminjam</th>
                <th>Buku</th>
                <th></th>
            </tr>
        `);
        for (let i = 0; i < data.length; i++) {
            const months = ["Januari", "Februari", "Maret", "April",
                            "Mei", "Juni", "Juli", "Agustus", "September",
                            "Oktober", "November", "Desember"];
            const bulan = new Date(data[i].tgl_pinjam).getMonth();

            const tanggal = new Date(data[i].tgl_pinjam).getDate();
            const bln = months[bulan];
            const tahun = new Date(data[i].tgl_pinjam).getFullYear();

            const tgl_pinjam = `${tanggal} ${bln} ${tahun}`;
            table.append(`
                <tr>
                    <td>${tgl_pinjam}</td>
                    <td>${data[i].nama}</td>
                    <td>${data[i].judul}</td>
                </tr>
            `);
        }
    }
}