module.exports = {
    index(req,res){
        res.render("home",{
            url : 'http://localhost:8000/',
        });
    }
}