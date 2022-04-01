const config = require('../configs/database');
let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports = {
    index(req,res){
        res.render("dashboard",{
            url : 'http://cadf-20-213-242-75.ngrok.io/',
        });
    }
}