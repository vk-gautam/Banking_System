const express=require('express');
const bodyParser=require('body-parser');
const knex=require('knex');
const cors=require('cors');
const { response } = require('express');

const app=express();
app.use(bodyParser.json())
app.use(cors());

const database=knex({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'banking_system'
    }
});

app.get('/',(req,res)=>{
    res.send('this is working working');
})

app.get('/customers',(req,res)=>{
    database.select('*').from('customers').orderBy('id', 'asc').then(data=>{
        res.send(data);
    })
    
})

app.get('/customers/:id',(req,res)=>{
    const {id}=req.params;
    database('customers').where('id',id).then(data=>{
        res.send(data);
    })
})

app.put('/transaction',(req,res)=>{
   const {sender_name}=req.body;
   const {bal}=req.body;
   const {reciever_name}=req.body;
   
   database('customers')
  .where('name', '=', sender_name)
  .decrement('amount', bal)
  .returning('amount')
  .then(()=>{
    database('customers')
    .where('name', '=', reciever_name)
    .increment('amount', bal)
    .returning('amount')
    .then(()=>{
        database.select('*')
        .from('customers')
        .then(data=>{
            res.send(data);
        })
    })

  })
   

})

app.post('/transactionHistory',(req,res)=>{
    const {sender_name,bal,reciever_name}=req.body;
    database('transactions')
        .insert({
        senders_name:sender_name,
        amount:bal,
        recievers_name:reciever_name,
        time:new Date()
    })
    .then(()=>{
        database.select('*')
        .from('transactions')
        .orderBy('serial_no', 'desc')
        .then(data=>{
            res.send(data);
        })
    })
})

app.get('/transactionHistory',(req,res)=>{
    database.select('*').from('transactions').orderBy('serial_no', 'desc')
    .then(data=>{
        res.send(data);
    })
    
})

// database.select('*').from('customers').then(data=>{
//     console.log(data);
// });

app.listen(3002,()=>{
    console.log('app is running on 3002');
})