$(document).ready(function(){
    getAnggota.loadData = "/anggota/all";
    getPetugas.loadData = "/petugas/profile";

    sebaranAnggotaChart();
});

const getAnggota = {
    set loadData(data) {
        const url = "http://localhost:8000" + data;
        Functions.prototype.getRequest(getAnggota, url);
    },
    set successData(response) {
        paginatedResult(response, $("#tabel-anggota"), $("#pagination-anggota"), 1);
    }
}

const editModal = document.querySelector('#editModal');
const closeEditModal = document.getElementById('closeEditModal');

const hapusModal = document.querySelector('#hapusModal');
const closeHapusModal = document.getElementById('closeHapusModal');

$('#tabel-anggota').on('click', '.edit', function() {
    var id_anggota = $(this).data('id_anggota');
    var nama_anggota = $(this).data('nama_anggota');
    var jenis_kelamin = $(this).data('jenis_kelamin');
    var telepon_anggota = $(this).data('telepon_anggota');
    var alamat_anggota = $(this).data('alamat_anggota');
    $('#id_anggota').val(id_anggota);
    $('.nama_anggota').val(nama_anggota);
    $('.jk_update').val(jenis_kelamin);
    $('.telepon_anggota').val(telepon_anggota);
    $('.alamat_anggota').val(alamat_anggota);

    editModal.classList.add('show');

})
closeEditModal.addEventListener('click', function() {
    editModal.classList.remove('show');
});

$('#tabel-anggota').on('click', '.delete', function() {
    var id_anggota = $(this).data('id_anggota');
    $('.id_anggota_hapus').val(id_anggota);
    hapusModal.classList.add('show');
})
closeHapusModal.addEventListener('click', function() {
    hapusModal.classList.remove('show');
});

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

// chart persebaran anggota
function sebaranAnggotaChart() {
    async function fetchData() {
        const url = "http://localhost:8000/anggota/all";
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    fetchData().then(data => {
        let laki = 0,
            perempuan = 0;

        const jk = data.map(
            function(index) {return index.jenis_kelamin}
        );
        jk.filter(function(value, index, arr) {
            if (arr[index] == "L") {
                laki++;
            } else if (arr[index] == "P") {
                perempuan++;
            }
        });

        let dataset = [laki, perempuan];
        
        mySebaranAnggotaChart.config.data.datasets[0].data = dataset;
        mySebaranAnggotaChart.update();

        mySebaranAnggotaBarChart.config.data.datasets[0].data = dataset;
        mySebaranAnggotaBarChart.update();
    });
}

const dataSebaranAnggotaChart = {
    labels: ['Laki-laki', 'Perempuan'],
    datasets: [{
        label: 'Jenis Kelamin Anggota',
        backgroundColor: ['#ff7782', '#41f1b6'],
    }]
};

const configSebaranAnggotaChart = {
    type: 'pie',
    data: dataSebaranAnggotaChart,
    options: {}
};

const mySebaranAnggotaChart = new Chart(
    document.getElementById('anggotaPieChart'),
    configSebaranAnggotaChart
);
// end chart persebaran anggota

// bar chart persebaran anggota
const configSebaranAnggotaBarChart = {
    type: 'bar',
    data: dataSebaranAnggotaChart,
    options: {}
};

const mySebaranAnggotaBarChart = new Chart(
    document.getElementById('anggotaBarChart'),
    configSebaranAnggotaBarChart
);
// end bar chart persebaran anggota

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
            <th>Nama</th>
            <th>Telepon</th>
            <th width="40%">Alamat</th>
            <th></th>
        </tr>
    `);
    for (let i = 0; i < results.results.length; i++) {
        table.append(`
            <tr>
                <td>${results.results[i].nama_anggota}</td>
                <td>${results.results[i].telepon}</td>
                <td>${results.results[i].alamat}</td>
                <td class="danger delete" data-id_anggota="${results.results[i].id}">Hapus</td>
                <td class="primary edit" data-id_anggota="${results.results[i].id}"
                                         data-nama_anggota="${results.results[i].nama_anggota}"
                                         data-jenis_kelamin="${results.results[i].jenis_kelamin}" 
                                         data-telepon_anggota="${results.results[i].telepon}"
                                         data-alamat_anggota="${results.results[i].alamat}">Edit</td>
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