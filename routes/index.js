/*
* GET home page.
*/
 db = {};

db.index = function(req, res){
    var message = 'Enter Your Login Details';
  res.render('login',{message: message});
 
};

db.register = function(req, res){
  req.session.destroy();
  var message = 'Please all the fields correctly';
  res.render('register',{message: message});
}

db.others = function(req, res)
{
  sess = req.session; 
  var user =  sess.user,
  userId = sess.userId;

    console.log(req.originalUrl);
  if(userId === undefined ){ 
      var message = 'Unauthorized Access!! Please Login';
      res.render("login.ejs", {message: message});
      return;
   }
   else{
    try{
       res.render(`${req.originalUrl.substring(1)}`,{username: userId, root: __dirname, message:"Please fill all the fields"});
    }catch(err)
        {
          var message = 'The page does not exist';
          res.render('login',{message: message});
        }
     }
    
  
  
 
  };

 

module.exports = db;