$(document).ready(function() {
    getBuku.loadData = "/buku/all";
    getKategori.loadData = "/kategori/all";
    getPetugas.loadData = "/petugas/profile";

    kategoriChart();
});

window.jsPDF = window.jspdf.jsPDF;

const getBuku = {
    set loadData(data) {
        const url = "http://localhost:8000" + data;
        Functions.prototype.getRequest(getBuku, url);
    },
    set successData(response) {
        paginatedResult(response, $("#tabel-buku"), $("#pagination-buku"), 1);
    }
}

const getKategori = {
    set loadData(data) {
        const url = "http://localhost:8000" + data;
        Functions.prototype.getRequest(getKategori, url);
    },
    set successData(response) {
        let kategori = response;
        const allKategori = $(".sales-analytics");
        for (let i = 0; i < kategori.length; i++) {
            allKategori.append(`
            <div class="item online">
                <div class="right">
                    <div class="info">
                        <h3 class="nama-kategori">${kategori[i].kategori}</h3>
                    </div>
                    <h3 class="danger delete" data-id="${kategori[i].id_kategori}">Hapus</h3>
                </div>
            </div>
            `);
        }

        // for form add
        const option = document.createElement("option");
        option.value = "";
        option.innerHTML = "Pilih Kategori";
        document.getElementById("id_kategori").appendChild(option);
        for (let i = 0; i < kategori.length; i++) {
            const option = document.createElement("option");
            option.value = kategori[i].id_kategori;
            option.innerHTML = kategori[i].kategori;
            document.getElementById("id_kategori").appendChild(option);
        }

        // for form update
        const optionUpdate = document.createElement("option");
        optionUpdate.value = "";
        optionUpdate.innerHTML = "Pilih Kategori";
        document.getElementsByClassName("id_kategori")[0].appendChild(optionUpdate);
        for (let i = 0; i < kategori.length; i++) {
            const optionUpdate = document.createElement("option");
            optionUpdate.value = kategori[i].id_kategori;
            optionUpdate.innerHTML = kategori[i].kategori;
            document.getElementsByClassName("id_kategori_after")[0].appendChild(optionUpdate);
        }
    }
}

const editModal = document.querySelector('#editModal');
const closeEditModal = document.getElementById('closeEditModal');
const hapusModal = document.querySelector('#hapusModal');
const closeHapusModal = document.getElementById('closeHapusModal');

const addKategoriModal = document.querySelector('#addKategoriModal');
const addKategori = document.querySelector('.add-kategori');
const closeAddKategoriModal = document.getElementById('closeAddKategoriModal');
const hapusKategoriModal = document.querySelector('#hapusKategoriModal');
const closeHapusKategoriModal = document.getElementById('closeHapusKategoriModal');

$('#tabel-buku').on('click', '.edit', function() {
    var id = $(this).data('id');
    var judul = $(this).data('judul');
    var kategori = $(this).data('kategori');
    var penerbit = $(this).data('penerbit');
    var penulis = $(this).data('penulis');
    var tahun_terbit = $(this).data('tahun_terbit');
    var stok = $(this).data('stok');
    $('.id').val(id);
    $('.judul').val(judul);
    $('#id_kategori_before').val(kategori);
    $('.id_kategori_after').val(kategori);
    $('.penerbit').val(penerbit);
    $('.penulis').val(penulis);
    $('.tahun_terbit').val(tahun_terbit);
    $('.stok').val(stok);

    editModal.classList.add('show');

})
closeEditModal.addEventListener('click', function() {
    editModal.classList.remove('show');
});

$('#tabel-buku').on('click', '.delete', function() {
    var id_buku = $(this).data('id');
    $('.id_buku').val(id_buku);
    hapusModal.classList.add('show');
})
closeHapusModal.addEventListener('click', function() {
    hapusModal.classList.remove('show');
});

addKategori.addEventListener('click', function() {
    addKategoriModal.classList.add('show');
});
closeAddKategoriModal.addEventListener('click', function() {
    addKategoriModal.classList.remove('show');
});

$('#kategori-buku').on('click', '.delete', function() {
    var id_kategori = $(this).data('id');
    $('.id_kategori').val(id_kategori);
    hapusKategoriModal.classList.add('show');
});
closeHapusKategoriModal.addEventListener('click', function() {
    hapusKategoriModal.classList.remove('show');
});

function generatePDF() {
    reportBuku.loadData = "/buku/all";
}

const reportBuku = {
    set loadData(data) {
        const url = "http://localhost:8000" + data;
        Functions.prototype.getRequest(reportBuku, url);
    },
    set successData(response) {
        var buku = "Daftar Buku Sipinjam \n";
        for (let i = 0; i < response.length; i++) {
            let judul = JSON.stringify(response[i].judul);
            let penulis = JSON.stringify(response[i].penulis);
            let penerbit = JSON.stringify(response[i].penerbit);
            let tahun_terbit = JSON.stringify(response[i].tahun_terbit);
            let stok = JSON.stringify(response[i].stok);
            buku = buku + "\n"
                   + "Judul : " + judul + "\n"
                   + "Penulis : " + penulis + "\n"
                   + "Penerbit : " + penerbit + "\n"
                   + "Tahun Terbit : " + tahun_terbit + "\n"
                   + "Stok : " + stok + "\n";
        }
        const doc = new jsPDF();
        doc.text(buku, 10, 10);
        doc.save("Laporan Buku.pdf");
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

// pie chart kategori
function kategoriChart() {
    async function fetchData() {
        const url = "http://localhost:8000/kategori/all";
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    fetchData().then(data => {
        const kategori = data.map(
            function(index) {return index.kategori}
        );
        const jumlah = data.map(
            function(index) {return index.jumlah}
        );

        myKategoriChart.config.data.labels = kategori;
        myKategoriChart.config.data.datasets[0].data = jumlah;
        myKategoriChart.update();

        // bar kategori char
        myBarKategoriChart.config.data.labels = kategori;
        myBarKategoriChart.config.data.datasets[0].data = jumlah;
        myBarKategoriChart.update();
    });
}

const dataKategori = {
    datasets: [{
        label: 'Kategori Buku',
        backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],borderWidth: 1
    }]
}

const configKategori = {
    type: 'pie',
    data: dataKategori,
}

const myKategoriChart = new Chart(
    document.getElementById('chartKategori'),
    configKategori
);
// end pie chart kategori

// bar chart kategori
const configBarKategori = {
    type: 'bar',
    data: dataKategori,
}

const myBarKategoriChart = new Chart(
    document.getElementById('bukuBarChart'),
    configBarKategori
);
// end bar chart kategori

// pagination
function paginatedResult(response, table, pagination, page) {
    const limit = 10

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    if (endIndex < response.length) {
        results.next = {
            page: page + 1,
        }
    }
    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
        }
    }

    results.results = response.slice(startIndex, endIndex)
    
    table.empty();
    table.append(`
        <tr>
            <th width="35%">Judul</th>
            <th>Pengarang</th>
            <th>Penerbit</th>
            <th>Tahun</th>
            <th>Stok</th>
            <th></th>
        </tr>
    `);
    for (let i = 0; i < results.results.length; i++) {
        table.append(`
            <tr>
                <td>${results.results[i].judul}</td>
                <td>${results.results[i].penulis}</td>
                <td>${results.results[i].penerbit}</td>
                <td>${results.results[i].tahun_terbit}</td>
                <td>${results.results[i].stok}</td>
                <td class="danger delete" data-id="${results.results[i].id_buku}">Hapus</td>
                <td class="primary edit" data-id="${results.results[i].id_buku}"
                                        data-judul="${results.results[i].judul}"
                                        data-kategori="${results.results[i].id_kategori}"
                                        data-penulis="${results.results[i].penulis}"
                                        data-penerbit="${results.results[i].penerbit}"
                                        data-tahun_terbit="${results.results[i].tahun_terbit}"
                                        data-stok="${results.results[i].stok}">Edit</td>
            </tr>
        `);
    }
    
    pagination.empty();
    if (results.previous) {
        pagination.append(`
            <li class="page-item">
                <a class="page-link" href="#" data-page="${results.previous.page}" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </a>
            </li>
        `);
    } else {
        pagination.append(`
            <li class="page-item disabled">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </a>
            </li>
        `);
    }

    for (let i = 1; i <= Math.ceil(response.length / limit); i++) {
        if (i == page) {
            pagination.append(`
                <li class="page-item active">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `);
        } else {
            pagination.append(`
                <li class="page-item">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `);
        }
    }

    if (results.next) {
        pagination.append(`
            <li class="page-item">
                <a class="page-link" href="#" data-page="${results.next.page}" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                </a>
            </li>
        `);
    } else {
        pagination.append(`
            <li class="page-item disabled">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                </a>
            </li>
        `);
    }

    $('.page-link').click(function(e) {
        e.preventDefault();
        const page = $(this).data('page');
        paginatedResult(response, table, pagination, page);
    });
}