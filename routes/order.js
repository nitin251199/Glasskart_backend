var express = require("express");
var router = express.Router();
var pool = require("./pool");


router.post("/addinvoice", (req,res)=> {
    pool.query("insert into invoicedetails (invoiceno, emailid, mobileno, totalamount, invoicedate) values(?,?,(select mobileno from userdetails where emailid=?),?,?)",
    [req.body.invoiceno,req.body.emailid,req.body.emailid,req.body.amount,req.body.invoicedate], (error,result)=>{
      if(error){
        console.log("=>>>>>>>>>>>>",error);
          res.status(500).json(false);
      }
      else{
        res.status(200).json(true);
      }
    })
})


router.post("/addorders",  function (req, res) {
    console.log(req.body);
    var q = "insert into orders ( orderdate,customername, productid, productname, price, offerprice, qty, amount, emailid, mobileno, address, city, state, zipcode, paymentmode, paymentype, transactionid, deliverystatus, status, invoiceno,color) values ?";
    pool.query(
      q,
      [req.body.cart.map((item) => [req.body.orderdate,req.body.name,item.productid,item.productname,item.price,item.offerprice,item.qty,req.body.amount,req.body.email,req.body.mobileno,req.body.address,req.body.city,req.body.state,req.body.zipcode,req.body.paymentmode,req.body.paymenttype,req.body.transactionid,req.body.deliveryStatus,req.body.status,req.body.invoiceno,item.colorid])],
      function (error, result) {
        if (error) {
          console.log("=>>>>>>>>>>>>",error);
          res.status(500).json({ result: false });
        } else {
          res.status(200).json({ result: true });
        }
      }
    );
  });

  

  router.get("/fetchallorders", function (req, res, next) {
    pool.query("select * from orders", function (error, result) {
      if (error) {
        res.status(500).json([]);
      } else {
        res.status(200).json({ data: result });
      }
    });
  });

  
  router.post("/fetchallordersbyclick", function (req, res, next) {
    console.log(req.body)
    pool.query("select * from orders where invoiceno=?",[req.body.id], function (error, result) {
      if (error) {
        res.status(500).json([]);
      } else {
        res.status(200).json({ data: result });
      }
    });
  });
  
    
  router.post("/orderminus", function (req, res, next) {
    console.log(req.body)
    var qty= parseInt(req.body.qty)
    pool.query("select * from finalproduct where productid=? and colorid=?",[req.body.productid,req.body.color], function (error, result) {
      if (error) {
        res.status(500).json([]);
      } else {
        console.log(result)
        console.log(result[0].stock)
        var stk=parseInt(result[0].stock)

        console.log(stk-qty)
       var  currentstock=stk-qty

       pool.query("update finalproduct set stock=? where productid=? and colorid=?;update orders set status='Confirmed' where orderno=?",[currentstock,req.body.productid,req.body.color,req.body.orderno],function(error,result){
         if (error){
           console.log(error)

           res.status(500).json({ check: false });
         }
         else{
            console.log('stock updated')
            res.status(200).json({ check: true });
         }
       })




      }
    });
  });
  
   
   module.exports = router;