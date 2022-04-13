$(document).ready(function(){
    getAnggota.loadData = "/anggota/all";
    getBuku.loadData = "/buku/all";
    getPeminjaman.loadData = "/peminjaman/pinjam";
    getPetugas.loadData = "/petugas/profile";

    // date today
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const todayDate = yyyy + '-' + mm + '-' + dd;
    $('#tgl_pinjam_display').val(todayDate);
    $('#tgl_pinjam').val(todayDate);

    peminjamanChart();
    pinjamKembaliChart();
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
            option.innerHTML = data[i].nama_anggota;
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
            option.value = data[i].id_buku;
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
        document.getElementById("id_petugas").value = data[0].id;
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
                <th>No Peminjaman</th>
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
                    <td>${data[i].id_peminjaman}</td>
                    <td>${tgl_pinjam}</td>
                    <td>${data[i].nama_anggota}</td>
                    <td>${data[i].judul}</td>
                </tr>
            `);
        }
    }
}

function exportExcel() {
    var dataType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    var tableSelect = document.getElementById('tabel-peminjaman');
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // filename
    var filename = 'Laporan Peminjaman Buku.xls';

    // Specify file as an attachment or viewing in browser
    if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        var link = document.createElement('a');
        link.href = 'data:' + dataType + ', ' + tableHTML;
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// chart peminjaman
function peminjamanChart() {
    async function fetchData() {
        const url = "http://localhost:8000/peminjaman/all";
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    fetchData().then(data => {
        let januari = 0,
            februari = 0,
            maret = 0,
            april = 0,
            mei = 0,
            juni = 0,
            juli = 0,
            agustus = 0,
            september = 0,
            oktober = 0,
            november = 0,
            desember = 0;

        const tgl_pinjam = data.map(
            function(index) {return index.tgl_pinjam}
        );
        tgl_pinjam.filter(function(value, index, arr) {
            arr[index] = value.split("-");
            if (arr[index][1] == "01") {
                januari++;
            } else if (arr[index][1] == "02") {
                februari++;
            } else if (arr[index][1] == "03") {
                maret++;
            } else if (arr[index][1] == "04") {
                april++;
            } else if (arr[index][1] == "05") {
                mei++;
            } else if (arr[index][1] == "06") {
                juni++;
            } else if (arr[index][1] == "07") {
                juli++;
            } else if (arr[index][1] == "08") {
                agustus++;
            } else if (arr[index][1] == "09") {
                september++;
            } else if (arr[index][1] == "10") {
                oktober++;
            } else if (arr[index][1] == "11") {
                november++;
            } else if (arr[index][1] == "12") {
                desember++;
            }
        });

        let dataset = [januari, februari, maret, april, mei, juni, juli, agustus, september, oktober, november, desember];
        
        myPeminjamanChart.config.data.datasets[0].data = dataset;
        myPeminjamanChart.update();
    });
}

const labels = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
];

const data = {
    labels: labels,
    datasets: [{
      label: 'Peminjaman',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {}
};

const myPeminjamanChart = new Chart(
    document.getElementById('peminjamanChart'),
    config
);
// end chart peminjaman

// chart pinjam dan kembali buku
function pinjamKembaliChart() {
    async function fetchData() {
        const url = "http://localhost:8000/peminjaman/all";
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    fetchData().then(data => {
        let pinjam = 0,
            kembali = 0;

        const status = data.map(
            function(index) {return index.status}
        );
        status.filter(function(value, index, arr) {
            if (arr[index] == "pinjam") {
                pinjam++;
            } else if (arr[index] == "kembali") {
                kembali++;
            }
        });

        let dataset = [pinjam, kembali];
        
        myPinjamKembaliChart.config.data.datasets[0].data = dataset;
        myPinjamKembaliChart.update();
    });
}

const labelsPinjamKembaliCharrt = [
    'Dipinjam',
    'Dikembalikan'
];

const dataPinjamKembaliChart = {
    labels: labelsPinjamKembaliCharrt,
    datasets: [{
      backgroundColor: ['#ff7782', '#41f1b6'],
    }]
};

const configPinjamKembaliChart = {
    type: 'pie',
    data: dataPinjamKembaliChart,
    options: {}
};

const myPinjamKembaliChart = new Chart(
    document.getElementById('pinjamKembaliChart'),
    configPinjamKembaliChart
);
// end chart pinjam dan kembali buku