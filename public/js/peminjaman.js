$(document).ready(function(){
    getAnggota.loadData = "/anggota/all";
    getBuku.loadData = "/buku/all";
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