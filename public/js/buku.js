$(document).ready(function() {
    getBuku.loadData = "/all/buku";
});

const getBuku = {
    set loadData(data) {
        const url = "http://localhost:8000" + data;
        Functions.prototype.getRequest(getBuku, url);
    },
    set successData(response) {
        let buku = response;
        const table = $("#tabel-buku");
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
        for (let i = 0; i < buku.length; i++) {
            table.append(`
                <tr>
                    <td>${buku[i].judul}</td>
                    <td>${buku[i].pengarang}</td>
                    <td>${buku[i].penerbit}</td>
                    <td>${buku[i].tahun_terbit}</td>
                    <td>${buku[i].stok}</td>
                    <td class="danger delete" data-id="${buku[i].id}">Hapus</td>
                    <td class="primary edit" data-id="${buku[i].id}"
                                             data-judul="${buku[i].judul}"
                                             data-penulis="${buku[i].penulis}"
                                             data-penerbit="${buku[i].penerbit}"
                                             data-tahun_terbit="${buku[i].tahun_terbit}"
                                             data-stok="${buku[i].stok}">Edit</td>
                </tr>
            `);
        }
    }
}

const editModal = document.querySelector('#editModal');
const closeEditModal = document.getElementById('closeEditModal');

const hapusModal = document.querySelector('#hapusModal');
const closeHapusModal = document.getElementById('closeHapusModal');

$('#tabel-buku').on('click', '.edit', function() {
    var id = $(this).data('id');
    var judul = $(this).data('judul');
    var penerbit = $(this).data('penerbit');
    var penulis = $(this).data('penulis');
    var tahun_terbit = $(this).data('tahun_terbit');
    var stok = $(this).data('stok');
    $('.id').val(id);
    $('.judul').val(judul);
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