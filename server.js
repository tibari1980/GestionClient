const express=require('express');
const path=require('path');
const app=express();

app.use(express.static(__dirname+'/dist/GestionClient'));
app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/GestionClient/index.html'))
});


//app.all('*',(req,res)=>{
//    res.status(200).sendFile(__dirname+'/dist/GestionClient/index.html');
//});
app.listen(process.env.PORT || 8080);