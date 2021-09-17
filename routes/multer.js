var multer=require("multer");
var uniqid=require('uniqid');
var savefile=multer.diskStorage({
    destination:(req,file,path)=>{
        path(null,'public/images')
    },
    filename:(req,file,path)=>{
        var name=uniqid()+file.originalname.substr(file.originalname.indexOf('.'))
        req.body['myfilename']=name
        path(null,name)
    }
})
var upload=multer({storage:savefile})
module.exports=upload;