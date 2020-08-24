  var express = require('express');
  var router = express.Router();
  var User = require('../models/user');
  var passport = require('passport');
  /* GET users listing. */
  // router.get('/', function(req, res, next) {
  //   res.send('respond with a resource');
  // });
  
 

  router.post('/register', function (req, res, next) {
    addToDB(req, res);
    console.log(req.body.username);
  });
  
  
  async function addToDB(req, res) {
  
    var user = new User({
      email: req.body.email,
      username: req.body.username,
      password: User.hashPassword(req.body.password),
      status:"",
      currentTask:"",
      imageUrl:"",
      startDate:"15.06.64",
      endDate:"",
      isAdmin:false,
      oldTasks:[]
    });
  
    try {
      doc = await user.save();
      return res.status(201).json(doc);
    }
    catch (err) {
      return res.status(501).json(err);
    }
  }
  
  
  router.post('/login',function(req,res,next){
    passport.authenticate('local', function(err, user, info) {
      if (err) { return res.status(501).json(err); }
      if (!user) { return res.status(501).json(info); }
      req.logIn(user, function(err) {
        if (err) { return res.status(501).json(err); }
        return res.status(200).json({message:'Login Success'});
      });
    })(req, res, next);
  });
  
  router.get('/user',isValidUser,function(req,res,next){
    return res.status(200).json(req.user);
  });
  
  router.get('/logout',isValidUser, function(req,res,next){
    req.logout();
    return res.status(200).json({message:'Logout Success'});
  });


 


  router.put('/user/:id', function(req,res,next){ //CURRENT TASK UPDATE
      console.log("put fonksiyonu");

     User.findByIdAndUpdate(req.params.id,
      {
              $set:  { currentTask: `${req.body.currentTask}`,
                     startDate: req.body.startDate,
                     endDate: req.body.endDate }
      },
      {
        new:true
      },
      function(err,updatedTask){
        if(err){res.send("error");}
        else { res.json(updatedTask); }
      }); 
});

router.put('/user/edit/:id', function(req,res,next){  //USER INFO UPDATE 
 /*  console.log("put 2");

 User.findByIdAndUpdate(req.params.id,
  {    
      $set:  { username:"yazdi",
               imageUrl: req.body.imageUrl,
               status: req.body.status }
  },
  {
    new:true
  },
  function(err,updatedUser){
    if(err){res.send("error");}
    else { res.json(updatedUser); }
   }
   
   );
  console.log(req.params.id);
  console.log(req.body.imageurl);
  console.log(req.body);
  console.log(req); */

  //other way to do it .
  User.findOneAndUpdate({_id: req.params.id}, 
    {    
        $set:  { username:req.body.username,
                 imageUrl: req.body.imageUrl,
                 password: User.hashPassword(req.body.password),
                 status: req.body.status }
    },
    {
      upsert: true,
      new:true
    },
    function(err,updatedUser){
      if(err){res.send("error");}
      else { res.json(updatedUser); }
     }

     );
     

});


router.get('/dashboard',isValidUser,function(req,res,next){
 
 User.find({}, function (err,users){
   if(err){
     res.send("error");
     next();
   }
   res.json(users);
   console.log(users);

 });
});
 // return res.status(200).json(req.user);


 router.delete('/dashboard/:id',isValidUser,function(req,res,next){
  
  
 // console.log(req.params.id)
  

  User.findOneAndRemove({_id: req.params.id})
  .then((docs)=>{
     if(docs) {
        resolve({"success":true,data:docs});
     } else {
        reject({"success":false,data:"no such user exist"});
     }
})
 
 
 });




  
  
  function isValidUser(req,res,next){
    if(req.isAuthenticated()) next();
    else return res.status(401).json({message:'Unauthorized Request'});
  }
  
  module.exports = router;