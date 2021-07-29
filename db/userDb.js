const pool = require('./index');

//const pool = Conn.;


let inventory = {};

inventory.newUser = (req, res)=>{
    
        message = 'Please, Register! It takes only few steps';
        if(req.method=="POST"){

            let userData = [  
                req.body.username, req.body.useremail, req.body.password ]
            let conn = pool.getConnection();
               
  try {
	conn =  pool.getConnection();
	 console.log("query");
   conn.query('insert into users(username, email, password) values (?,?,?)', userData)
     
       message = "Succesfully! Your account has been created.";
      res.redirect('login',{message: message});
       }
catch (err) {
   message = "Seems you have already registered, kindly log in.";
   res.redirect('login',{message: message});
  } finally {
	if (conn) return conn.end();
  }
            
        
}
  else{
           res.render('register',{message: message});
        }
    };
/*inventory.newUser =(values)=>{
    return new Promise((resolve, reject) =>{ 
        
        pool.query('insert into Users(username, email, password) values (?,?,?)', values, (err,results)=>{
            if(err){
                return reject(err);
            }

            return resolve(results)
        });
    }).then();
};
*/

inventory.oneUser = (req, res)=>{
    var message = 'Please enter your Login details';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var name= post.username;
      
     var sql="SELECT * FROM `users` WHERE `username`='"+name+"'";
      //let querySelect = `SELECT * FROM users WHERE username = '${name}'`;
      let conn = pool.getConnection();
      console.log(conn)
               
      try {
       conn = pool.getConnection();
        console.log(conn);
       let results = conn.query(sql)
       console.log(name);
       console.log(results);
          if(results.length){
            req.session.userId = results[0].username;
            req.session.user = results[0];
            console.log(results[0].id);
            res.redirect('/home/dashboard');
         }
         else{
            message = 'Wrong Credentials.';
            res.render('login',{message: message});
         }
           }
    catch (err) {
       message = "Error, Try again.";
       res.redirect(404,'login',{message: message});
      } finally {
       if (conn) return conn.end();
      }
          
   } else {
      res.render('login.ejs',{message: message});
   }
     

};


inventory.logout=function(req,res){
    req.session.destroy(function(err) {
       res.redirect("login");
    })
 };


inventory.dashboard = function(req, res, next){
           
    var user =  req.session.user,
    userId = req.session.username;
    console.log('Username: '+userId);
    if(userId == null){
       res.redirect("/login");
       return;
    }
 
    var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";
 
    db.query(sql, function(err, results){
       res.render('index.ejs', {user:user});    
    });       
 };
 
inventory.updateUser =(values)=>{
   // return new Promise((resolve, reject) =>{ 
    let queryInsert = "update users set email=?, password=? where username=?";
  

        pool.query(querySelect, values, (err,results)=>{
            if(err){
                return reject(err);
            }

            return resolve(results)
        });
   // });
};








module.exports = inventory;