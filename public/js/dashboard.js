$(document).ready(function() {
    getAnggota.loadData = "/anggota/all";
    getBuku.loadData = "/buku/all";
    getPeminjaman.loadData = "/peminjaman/all";
    getPetugas.loadData = "/petugas/profile";
    bukuChart();
    dashboardPieChart();
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

// buku chart
function bukuChart() {
    async function fetchData() {
        const url = "http://localhost:8000/buku/all";
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    fetchData().then(data => {
        const buku = data.map(
            function(index) {return index.judul}
        );

        const stok = data.map(
            function(index) {return index.stok}
        );
        
        myBukuChart.config.data.labels = buku;
        myBukuChart.config.data.datasets[0].data = stok;
        myBukuChart.update();
    });
}

const data = {
    datasets: [{
        label: 'Stok buku',
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
}

const config = {
    type: 'bar',
    data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
}

const myBukuChart = new Chart(
    document.getElementById('bukuChart'),
    config
);
// end buku chart

// buku chart
function dashboardPieChart() {
    async function fetchData() {
        const url = "http://localhost:8000/buku/all";
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    fetchData().then(data => {
        const buku = data.map(
            function(index) {return index.judul}
        );

        const stok = data.map(
            function(index) {return index.stok}
        );
        
        myDashPie.config.data.labels = buku;
        myDashPie.config.data.datasets[0].data = stok;
        myDashPie.update();
    });
}

const dataDashPie = {
    datasets: [{
        label: 'Stok buku',
        backgroundColor: [
            '#7380ec',
            '#ff7782',
            '#41f1b6',
            '#ffbb55',
            '#111e88',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
}

const configDashPie = {
    type: 'pie',
    data: dataDashPie,
}

const myDashPie = new Chart(
    document.getElementById('dashboardPieChart'),
    configDashPie
);
// end buku chart

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