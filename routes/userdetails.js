var express = require('express');
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");

router.post('/checkusermobilenumber', function (req, res) {
    pool.query("select * from userdetails where mobileno=?", [req.body.mobileno], function (error, result) {

        if (error) {
            res.status(500).json([])
        }
        else {
            if (result.length == 1) {
                var data = [req.body.email, req.body.mobileno, req.body.username]
                res.status(200).json({ data: result, result: true })
            }
            else {
                res.status(200).json({ data: [], result: false })
            }
        }
    })
})

router.post('/checklogin', function (req, res) {
  pool.query("select * from userdetails where mobileno=? and password=?", [req.body.mobileno,req.body.password], function (error, result) {

      if (error) {
          res.status(500).json([])
      }
      else {
          if (result.length == 1) {
              res.status(200).json({ data: result, result: true })
          }
          else {
              res.status(200).json({ data: [], result: false })
          }
      }
  })
})

router.post('/insertuser',function(req,res){
    pool.query("insert into userdetails values(?,?,?,?)",[req.body.emailid,req.body.mobileno,req.body.username,req.body.password],function(error,result){
        if(error){
            res.status(500).json({result:false})
        }
        else{
            var data = {emailid:req.body.emailid,mobileno:req.body.mobileno,username:req.body.username}
            res.status(200).json({data:data,result:true})
        }
    })
})

router.post('/fetchalladdresses', function(req,res){
    pool.query("select * from useraddress where mobileno=?",[req.body.mobileno],function(error,result){
        if(error)
       {
         res.status(500).json([])
       }
       else
       { 
         res.status(200).json({data:result})
       }
    })
})

router.post('/insertaddress', function(req, res, next) {
    console.log("BODY:", req.body);
    pool.query("insert into useraddress (mobileno, name, mobilenumber, pincode, housenumber, address, landmark, city, state) values(?,?,?,?,?,?,?,?,?) ",[req.body.mobileno,req.body.name,req.body.mobilenumber,req.body.pincode,req.body.housenumber,req.body.address,req.body.landmark,req.body.city,req.body.state],function(error,result){
        if(error)
        {
            console.error(error);
          res.status(500).json(false)
        }
        else
        {
          res.status(200).json(true)
        }
      })
  });

  router.post('/updateaddress', function(req, res, next) {
    console.log("BODY:", req.body);
    pool.query("update useraddress set mobileno=?, name=?, mobilenumber=?, pincode=?, housenumber=?, address=?, landmark=?, city=?, state=? where addressid=?",[req.body.mobileno,req.body.name,req.body.mobilenumber,req.body.pincode,req.body.housenumber,req.body.address,req.body.landmark,req.body.city,req.body.state,req.body.addressid],function(error,result){
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

  router.post('/deleteaddress', function(req, res, next) {
    pool.query("delete from useraddress where addressid=?",[req.body.addressid],function(error,result){
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

module.exports = router