const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const cors = require('cors')

const db = mysql.createPool({

    host: "localhost",
    user: "root",
    password: "RootRoot123",
    database: "onlinestore"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.listen(5000, ()=>{

    console.log('Server is Running on port 5000 test');

})


app.get('/',(req,res)=>{

    const SqlgetContact = "select * from master_user ";
    
    db.query(SqlgetContact,(error,result)=>{

        console.log('id = '+ result[0].Id);
        res.send(result);


    })
})

app.post('/api/post/ukuran',(req,res)=>{

    const {NamaUkuran, Panjang, Lebar} = req.body

    const sqlCheckDuplicate = "select count(*) as 'Row' from master_ukuran where NamaUkuran = ?"

    const SqlCreateCustomer= "insert into master_ukuran (NamaUkuran, CreatedBy, CreatedDate, Width, Height) values (?, 1, now(), ?, ? )";
 
    db.query(sqlCheckDuplicate,NamaUkuran,(error,result)=>{

            if(error){

                console.log(error);

            }else if (parseInt(JSON.stringify(result[0].Row))>0) {

                res.send({
                    message:'Data sudah ada di dalam sistem',
                    num:0
                    })
                
            }else{

                db.query(SqlCreateCustomer,[NamaUkuran, Panjang, Lebar],(error,result)=>{
                    if (error) {
            
                        console.log(error);
                        
                    }else{

                        res.send({
                            message:'Data berhasil di simpan',
                            num:1
                            })
                    }
                })
            

               

            }

            


    })
})