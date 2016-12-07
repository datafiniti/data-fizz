var express = require("express");
var path    = require("path");
var router = express.Router();

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/data/book1.html'));
});

router.get('/:id', function (req, res) {
    var id = req.params.id;
    if (id > 0 && id <= 20) {
        res.sendFile(path.join(__dirname+'/data/book'+id+'.html'));
    } else {
        res.sendFile(path.join(__dirname+'/error/index.html'));
    }

});

module.exports = router;