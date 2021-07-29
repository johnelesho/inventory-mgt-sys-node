const pool = require('./index'),
 customer = require("./Customer"),
 product = require("./Product"),
 sales = require('./Sales');
userDb= {};


/** New user */

userDb.new = async(req, res) => {
  let conn;
   req.session.destroy();

 let  sess = req.session; 
  
 

  if(req.method == "POST"){
    
     var post  = req.body;
     let userData = [   post.username, post.useremail, post.password, post.role ]
   
  try {
	conn = await pool.getConnection();
    let results = await conn.query('insert into users(username, email, password, role) values (?,?,?,?)', userData)
    console.log(results)
  
    res.redirect('/login');
 
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}else {
  
    res.redirect('/register');
 }
}






userDb.login = async(req, res) => {
  let conn;
  
  let sess = req.session;
  
   var message = 'Please enter your Login details';
 

  if(req.method == "POST"){
    
     var post  = req.body;
     var name= post.username;
     var password = post.userpass;
    var sql="SELECT * FROM `users` WHERE `username`='"+name+"' AND `password`='"+password+"'";
  try {
	conn = await pool.getConnection();
    let results = await conn.query(sql)
   
       if(results.length){
         console.log(results[0])
         sess.userId = results[0].username;
         sess.user = results[0];
         if(sess.user.Role == 'Admin')
         {
            res.redirect('/admin');
         }
         else{
          res.redirect('/index');
         }
        
      }
      else{
         message = 'Wrong Credentials.';
         res.render('login',{message: message});
      }

  } catch (err) {
	  message = 'Error retrieving user.';
         res.render('login',{message: message});
  } finally {
	if (conn) return conn.end();
  }
}else {
  
    res.render('login',{message: message});
 }
}


userDb.dashboard =async(req, res) => {
   
    sess = req.session; 
   let user =  sess.user,
    userId = sess.userId;
   // console.log('user='+userId);
    if(userId === undefined){
      var message = 'Unauthorized!! Please Login';
       res.render("login.ejs", {message: message});
       return;
    }
    else{
    try {
      let conn = await pool.getConnection();
	   nCustomer = await conn.query('select count(*) TotalCustomers from clients'  );
     nSuppliers = await conn.query('select count(*) TotalSuppliers from suppliers'  );
      nSales = await conn.query('SELECT SUM(SalesAmount) SalesAmount FROM sales'  );

      nProducts = await conn.query('select count(*) TotalProduct from Products'  );
      nPurchase = await conn.query('SELECT SUM(PurchaseAmount) PurchaseAmount FROM Purchases'  );

      let sale = await conn.query("select Id, InvoiceNo, ClientId, SalesItemsDetails, SalesAmount, SalesDiscount,TotalVAT, DATE_FORMAT(SalesDate, '%a %D %b %Y') SalesDate, AmountDue from sales");
      let purch = await conn.query("select PurchaseId, InvoiceNo, SupplierId, PurchaseItemsDetails, PurchaseAmount, PurchaseDiscount, TotalVAT, AmountDue, DATE_FORMAT(PurchaseDate, '%a %D %b %Y') PurchaseDate from purchases");

      res.render('index.ejs', { role:sess.user.Role, username:userId, purchase: purch, sales:sale, total_sales:nSales[0], total_purchase:nPurchase[0].PurchaseAmount, no_of_customers: nCustomer[0].TotalCustomers, no_of_products: nProducts[0].TotalProduct, no_of_suppliers: nSuppliers[0].TotalSuppliers });    
      
    /*  if(sess.user.Role == 'Admin')
      {
          res.render('index.ejs', { role:sess.user.Role, username:userId, purchase: purch, sales:sale, total_sales:nSales[0], total_purchase:nPurchase[0].PurchaseAmount, no_of_customers: nCustomer[0].TotalCustomers, no_of_products: nProducts[0].TotalProduct, no_of_suppliers: nSuppliers[0].TotalSuppliers });    
      
      }
      else{
        res.render('index.ejs', {username:userId, purchase: purch, sales:sale, total_sales:nSales[0], total_purchase:nPurchase[0].PurchaseAmount, no_of_customers: nCustomer[0].TotalCustomers, no_of_products: nProducts[0].TotalProduct, no_of_suppliers: nSuppliers[0].TotalSuppliers });    
      
      }
      */
       
    }
    catch (err) {
      throw err;
      } finally {
      
      }
  }
}


userDb.logout=function(req,res){
  req.session.destroy(function(err) {
    var message = 'You have been logged out, Please enter your Login details';
     res.render("login",{message: message});
  })
};


module.exports = userDb;
