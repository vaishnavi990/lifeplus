var express = require("express");
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017";
const dbName = 'hospital';
let db;
MongoClient.connect(url, { useUnifiedTopology: true ,useNewUrlParser: true}, (err, client) => {
    if (err) return console.log(err);
    db = client.db(dbName);
    console.log(`Connected Database: ${url}`);
    console.log(`Database : ${dbName}`);
    
});
router.get('/',function(req,res){
    res.render('../views/home');
});
router.get('/home',function(req,res){
    res.render('../views/home');
});
router.get('/hospital',function(req,res){
    db.collection("hospitaldetails").find().toArray().then(result => res.render('../views/hospital',{record:result}));
});

router.get('/ventilator',function(req,res){
    db.collection("ventilatordetails").find().toArray().then(result => res.render('../views/ventilator',{record:result}));
});
router.get('/transplant',function(req,res){
    res.render('../views/transplant');
});

//adding new data
router.post('/hm',function(req,res,next){
    Hospital.create(req.body).then(function(hospital){
        res.send(hospital)
    }).catch(next)
})

router.post('/vm',function(req,res,next){
    Ventilator.create(req.body).then(function(ventilator){
        res.send(ventilator)
    }).catch(next)
})

//updation
router.put('/hm/:id',function(req,res,next){
    Hospital.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(hospital){
        hospital.findOne({_id: req.params.id}).then(function(hospital){
            res.send(hospital)
        })
    })
})

router.put('/vm/:id',function(req,res,next){
    Ventilator.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(ventilator){
        ventilator.findOne({_id: req.params.id}).then(function(ventilator){
            res.send(ventilator)
        })
    })
})

router.delete('/hm/:id',function(req,res,next){
    Hospital.findByIdAndRemove({_id: req.params.id}).then(function(hospital){
        res.send(hospital)
    })
})

router.delete('/vm/:id',function(req,res,next){
    Ventilator.findByIdAndRemove({_id: req.params.id}).then(function(ventilator){
        res.send(ventilator)
    })
})

module.exports = router;







// router.get('/',(req,res,next)=>{
//     console.log('1')
//     db.collection("hospitalDetails").find({}).toArray( function(err, result) {
//         if (err) throw err;
//         res.send(result);
//         console.log(result);
//     });
// });