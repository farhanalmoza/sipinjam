$(document).ready(function(){
    getPetugas.loadData = "/petugas/profile"
});

const getPetugas = {
    set loadData(data) {
        const url = "http://localhost:8000" + data;
        Functions.prototype.getRequest(getPetugas, url);
    },
    set successData(response) {
        const data = response;
        document.getElementById("nama").value = data[0].nama;
        document.getElementById("username").value = data[0].username;
        document.getElementById("nama-petugas").innerHTML = data[0].nama;
    }
}