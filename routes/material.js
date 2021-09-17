var express = require('express');
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");


/* GET home page. */

router.post('/fetchallfinalproductsbyproductid', function(req, res, next) {
  q="select fp.*,(select productname from product where productid=fp.productid)as productname,(select colorname from color where colorid=fp.colorid )as colorname from finalproduct as fp where productid=?"
   console.log(req.body)
    pool.query(q,[req.body.productid],function(error,result){
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
 

router.get('/fetchallmaterials', function(req, res, next) {
 
  pool.query("select * from material",function(error,result){
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

router.post('/insertmaterial',upload.single("adpicture"), function(req, res, next) {
  console.log("BODY:", req.body);
  console.log("FILE", req.file);
  pool.query("insert into material (materialname,adpicture,status) values(?,?,?)",
  [req.body.materialname,req.body.myfilename,req.body.status],function(error,result){
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

router.post('/editadpicture',upload.single("adpicture"), function(req, res, next) {
  pool.query("update material set adpicture=? where materialid=?",[req.body.myfilename,req.body.materialid],function(error,result){
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

router.post('/updatematerialdata', function(req, res, next) {
  console.log("BODY:", req.body);
  pool.query("update material set materialname=?, status=? where materialid=?",
  [req.body.materialname,req.body.status,req.body.materialid],function(error,result){
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

router.post('/deletematerial', function(req, res, next) {
  pool.query("delete from material where materialid=?",[req.body.materialid],function(error,result){
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
