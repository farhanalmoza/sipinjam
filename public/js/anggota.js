$(document).ready(function(){
    getAnggota.loadData = "/anggota/all";
    getPetugas.loadData = "/petugas/profile";
});

const getAnggota = {
    set loadData(data) {
        const url = "http://localhost:8000" + data;
        Functions.prototype.getRequest(getAnggota, url);
    },
    set successData(response) {
        let anggota = response;
        const table = $("#tabel-anggota");
        table.empty();
        table.append(`
            <tr>
                <th>Nama</th>
                <th>Telepon</th>
                <th width="40%">Alamat</th>
                <th></th>
            </tr>
        `);
        for (let i = 0; i < anggota.length; i++) {
            table.append(`
                <tr>
                    <td>${anggota[i].nama_anggota}</td>
                    <td>${anggota[i].telepon}</td>
                    <td>${anggota[i].alamat}</td>
                    <td class="danger delete" data-id_anggota="${anggota[i].id}">Hapus</td>
                    <td class="primary edit" data-id_anggota="${anggota[i].id}"
                                             data-nama_anggota="${anggota[i].nama_anggota}" 
                                             data-telepon_anggota="${anggota[i].telepon}"
                                             data-alamat_anggota="${anggota[i].alamat}">Edit</td>
                </tr>
            `);
        }
    }
}

const editModal = document.querySelector('#editModal');
const closeEditModal = document.getElementById('closeEditModal');

const hapusModal = document.querySelector('#hapusModal');
const closeHapusModal = document.getElementById('closeHapusModal');

$('#tabel-anggota').on('click', '.edit', function() {
    var id_anggota = $(this).data('id_anggota');
    var nama_anggota = $(this).data('nama_anggota');
    var telepon_anggota = $(this).data('telepon_anggota');
    var alamat_anggota = $(this).data('alamat_anggota');
    $('#id_anggota').val(id_anggota);
    $('.nama_anggota').val(nama_anggota);
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