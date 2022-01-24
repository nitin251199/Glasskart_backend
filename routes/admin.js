var express = require('express');
var router = express.Router();
var pool = require("./pool");
const jwt = require("jsonwebtoken");
const config = require("../nodemon.json");


/* GET home page. */

router.post('/checkadminlogin', function(req, res, next) {
 
  pool.query("select * from administrator where emailid=? and password=?",[req.body.email,req.body.password],function(error,result){
      if(error)
      {  console.log(error)
        res.status(500).json([])
      }
      else
      {  
        if(result.length==1)
        {
          const token = jwt.sign({ sub: result[0].emailid },config.secret,  {
            expiresIn: "7d",
          });
          res.status(200).json({result:true,data:result,token:token})
        }
        else
        {
          console.log(req.body)
          res.status(200).json({result:false});
        }
      }
    })
});

 
module.exports = router;