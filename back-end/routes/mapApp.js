var express = require('express');
  var router = express.Router();
  var Patient = require('../models/patient');
  var User = require('../models/user');
  var Heat= require('../models/heatOfpatient');
  var cors = require('cors')


  
  router.post('/person', async function addToDB(req, res) {
  
    var patient = new Patient({

      _id: req.body._id,
      name: req.body.name,
      surname: req.body.surname,
      tc:req.body.tc,
      phone:req.body.phone

    } );

    var heat = new Heat({

      _id:req.body._id,
      lat: req.body.lat,
      lon: req.body.lon,
      heat:req.body.heat,
      date:req.body.date

    } );
  
    try {
      doc = await patient.save();
      doc = await heat.save();
      return res.status(201).json(doc);
    }
    catch (err) {
      return res.status(501).json(err);
    }
  });
  

 

  router.get('/person',async function(req,res,next){
     
    Patient.find({}, async function (err,patient){
      if(err){
        res.send("error");
        next();
      }
      res.json(patient);
      
   
    });
   });


   router.get('/heat',async function(req,res,next){
 
    Heat.find({}, async function (err,heat){
      if(err){
        res.send("error");
        next();
      }
      res.json(heat);
      console.log(heat);
   
    });
   });


   router.get('/person/:id',async function(req,res,next){ //see te person when you click marker on map!
      
    Patient.findById({_id: req.params.id}, 
     
      async function(err,patient){
        if(err){res.send("error");}
        else { res.json(patient);console.log(patient); }
       }
  
       );
      });

      
 
   router.post('/heatbyDate',async function(req,res){//find by date function for mapping!
    
      console.log("req:"+JSON.stringify(req.body));
    Heat.find({date:req.body.date}, async function (err,docs){
      if(err){
        console.log(err);
        res.send("error");
        
      }
      res.json(docs);
      console.log(docs);
   
    });
   });




  module.exports = router;