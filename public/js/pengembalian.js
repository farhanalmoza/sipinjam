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

    pengembalianChart();
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

// chart pengembalian
function pengembalianChart() {
    async function fetchData() {
        const url = "http://localhost:8000/pengembalian/all";
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

        const tgl_kembali = data.map(
            function(index) {return index.tgl_pengembalian}
        );
        tgl_kembali.filter(function(value, index, arr) {
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
        
        myPengembalianChart.config.data.datasets[0].data = dataset;
        myPengembalianChart.update();
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
      label: 'Pengembalian',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {}
};

const myPengembalianChart = new Chart(
    document.getElementById('pengembalianChart'),
    config
);
// end chart pengembalian