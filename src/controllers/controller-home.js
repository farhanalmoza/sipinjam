module.exports = {
    index(req,res){
        res.render("home",{
            url : 'http://cadf-20-213-242-75.ngrok.io/',
        });
    }
}