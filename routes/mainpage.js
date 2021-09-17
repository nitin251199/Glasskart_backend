var express = require('express');
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");

router.get('/fetchallmainpage', function(req, res, next) {
 
    pool.query("select * from mainpage",function(error,result){
        if(error)
        {
          res.status(500).json([])
        }
        else
        {
          res.status(200).json({data:result})
        }
      })
  });

router.post('/insertmainpage',upload.single("picture"), function(req, res, next) {
    console.log("BODY:", req.body);
    console.log("FILE", req.file);
    pool.query("insert into mainpage (adstatus,position,picture) values(?,?,?)",
    [req.body.adstatus, req.body.position,req.body.myfilename],function(error,result){
        if(error)
        { console.log(error)
          res.status(500).json(false)
        }
        else
        {
          res.status(200).json(true)
        }
      })
  });

  router.post('/editmainpagepicture',upload.single("picture"), function(req, res, next) {
    pool.query("update mainpage set picture=? where pictureid=?",[req.body.myfilename,req.body.pictureid],function(error,result){
        if(error)
        {  console.log(error);
          res.status(500).json(false)
        }
        else
        {
          res.status(200).json(true)
        }
      })
  });
  
  router.post('/deletemainpage', function(req, res, next) {
    pool.query("delete from mainpage where pictureid=?",[req.body.pictureid],function(error,result){
        if(error)
        {
          res.status(500).json(false)
        }
        else
        {
          res.status(200).json(true)
        }
      })
  });

  router.post('/updatemainpage', function(req, res, next) {
    console.log("BODY:", req.body);
    pool.query("update mainpage set position=?, adstatus=?, picture=? where pictureid=?",
    [req.body.position,req.body.adstatus,req.body.myfilename,req.body.pictureid],function(error,result){
        if(error)
        { 
          res.status(500).json(false)
        }
        else
        { 
          res.status(200).json(true)
        }
      })
  });

module.exports = router;