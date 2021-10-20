import express, { application } from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import mysql from 'mysql2';
 
//USES
const app = express();
app.use(cors());
app.use(bodyparser.json());
app.listen(3000, () => {
    console.log("Server running...")
})


//Database connexion
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'simpledb',
    port : 3306
});
 

//check database connection
db.connect(err=>{
    if(err){
        console.log(err, 'err');
    }
    console.log('database connected...');
});


//Get all data
app.get('/user',(req,res)=>{
    
    let qr = `select * from user`;
    db.query(qr,(err,result) =>{
        if(err){
            console.log(err, "errs");
        }
        if(result.length>0){
            res.send({
                message : "All user data",
                data : result
            });
        }
    });  
});


//Get single Data
app.get('/user/:id', (req,res)=>{

    let gID = req.params.id;
    let qr = `select * from user where id = ${gID}`
    db.query(qr,(err,result)=>{
        if (err) {
            console.log(err, 'errs');
        }
        if(result.length>0){    
            res.send({
                message: 'user data for ID n°' + gID ,
                data : result
            });
        }
        else{
            res.send("Data not found");
        }
    });
});


//POST DATA
app.post('/user', (req, res)=>{

    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let mb = req.body.mobile;

    let qr = `insert into user(fullname, email, mobile) values('${fullName}', '${eMail}', '${mb}')` ;

    db.query(qr,(err,result)=>{
            if (err) {
                console.log(err);
            }
            console.log(result, "resultat");
            res.send({
                message : "Enregistrement effectuer."
            })
        });
});


//UPDATE DATA
app.put('/user/:id', (req, res)=>{
    
    let gID = req.params.id;
    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let mb = req.body.mobile;

    let qr = `update user set fullName = '${fullName}', email = '${eMail}', mobile = '${mb}'
            where id = ${gID}` ;
    
    db.query(qr,(err,result)=>{
        
        if (err) {
            console.log(err, 'errs');
        }

        res.send({
            message:'data updated'
        })

    });

});


//DELETE DATA 
app.delete('/user/:id', (req,res)=>{
    let qID = req.params.id;
    let qr = `delete from user where id = ${qID}` ;
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'err');
        }
        res.send({
            message : " User has been deleted"
        })
    })
});
