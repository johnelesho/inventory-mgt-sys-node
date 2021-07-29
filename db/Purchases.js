const pool = require('./index');
const supplier = require("./Supplier")
const product = require("./Product")

purchasesDb= {};




purchasesDb.all = async (req, res) => {
  let conn;

  var sess = req.session;
 if(sess.userId === undefined)
 {
  var message = 'Unauthorized!! Please Login';
  res.render("login.ejs", {message: message});
 }
 else{
     try {
      conn = await pool.getConnection();
     
      let purchase = await conn.query("select PurchaseId, InvoiceNo, SupplierId, PurchaseItemsDetails, PurchaseAmount, PurchaseDiscount, TotalVAT, AmountDue, DATE_FORMAT(PurchaseDate, '%a %D %b %Y') PurchaseDate from purchases");
     // console.log(product)
     console.log("after the connection")
      console.log(purchase)
     
      if(purchase.length > 0)
      {
         var message = 'All Recorded Purchases';
      res.render('view_all_purchases.ejs', {role:sess.user.Role, username: sess.userId, message: message, purchase: purchase })
  
      }
      else{
        var message = 'No recorded Purchases';
        res.render('view_all_purchases.ejs', {role:sess.user.Role, username: sess.userId, message: message, purchase: null })
    
      }
       } catch (err) {
      throw err;
    } finally {
     if(conn) return conn.end();
    }
  }
  
}


purchasesDb.new = async(req, res) => {
  let conn;
 prod = await product.allId();
 sup = await supplier.allId();
  var sess = req.session; 
  if(sess.userId === undefined)
 {
  var message = 'Unauthorized Access!! Please Login';
  res.render("login.ejs", {message: message});
 }

else{
 if(req.method == "POST"){
     console.log(req.body) 
     var items = req.body.purchaseItems.trim();
  console.log(`Inside the purchase `)

  
  values = [req.body.purchaseId,  req.body.invoiceNo,   req.body.supplierId, req.body.purchaseItems, req.body.totalPurchase,req.body.totalDiscount, req.body.totalVAT,  req.body.amountDue,  req.body.date ];
    
  try {
    conn = await pool.getConnection();
   
    let results1 = await  conn.query('insert into purchases(PurchaseId, InvoiceNo, SupplierId, PurchaseItemsDetails, PurchaseAmount, PurchaseDiscount, TotalVAT, AmountDue, PurchaseDate) values (?,?, ?, ?, ?, ?,?,?,?)', values)
     console.log(values)
    
     var item = items.split(';');

    for(i =0; i < (item.length)-1; i++){
     let itemize = item[i].split(',');
     let itemId = itemize[0];
     let itemQuantity = itemize[9];
     let updateQty = await conn.query('UPDATE products SET CurrentQuantity = ?  WHERE ProductId = ?',[itemQuantity, itemId] )
     console.log(updateQty);
    }
    
     var message = 'New Purchases recorded';
     prod = await product.allId();
      res.render('new_purchase', {role:sess.user.Role,username: sess.userId, message: message, product: prod, supplier: sup})
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}else {
  
  message = "Please fill all the fields "
  
    console.log(sup)
    res.render('new_purchase.ejs',{role:sess.user.Role, username: sess.userId, message: message, product: prod, supplier: sup});
} 
 }
}

/*

purchasesDb.all = async (req, res) => {
  let conn;

  var sess = req.session;
 if(sess.userId === undefined)
 {
  var message = 'Unauthorized!! Please Login';
  res.render("login.ejs", {message: message});
 }
 else{
     try {
      conn = await pool.getConnection();
     
      let purchase = await conn.query("select PurchaseId, InvoiceNo, SupplierId, PurchaseItemsDetails, PurchaseAmount, PurchaseDiscount, TotalVAT, AmountDue, DATE_FORMAT(PurchaseDate, '%a %D %b %Y') PurchaseDate from purchases");
     // console.log(product)
     console.log("after the connection")
      console.log(purchase)
     
      var message = 'All Recorded Purchases';
      res.render('view_all_purchases.ejs', {role:sess.user.Role, username: sess.userId, message: message, purchase: purchase })
    } catch (err) {
      throw err;
    } finally {
     if(conn) return conn.end();
    }
  }
  
}

*/

purchasesDb.one = async (req, res) => {
  let conn;

  var sess = req.session;
 if(sess.userId === undefined)
 {
  var message = 'Unauthorized!! Please Login';
  res.render("login.ejs", {message: message});
 }
 else if (req.method == "POST") {
         try {
      conn = await pool.getConnection();
      let purchase = await conn.query("select PurchaseId, InvoiceNo, SupplierId, PurchaseItemsDetails, PurchaseAmount, PurchaseDiscount, TotalVAT, AmountDue, DATE_FORMAT(PurchaseDate, '%a %D %b %Y') PurchaseDate from purchases where PurchaseId=?", req.body.purchaseId );
    
   
     // console.log(product)
     console.log("after the connection")
      console.log(purchase)
     
      if(purchase.length > 0)
      {
         var message = 'purchase ' + req.body.purchaseId;
      res.render('view_purchase.ejs', {role:sess.user.Role, username: sess.userId, message: message, purchase: purchase[0] })
   
      }
      else{
        var message = 'Could not find record';
      purchase =null;
      res.render('view_purchase.ejs', {role:sess.user.Role, username: sess.userId, message: message, purchase })
  
      }
      } catch (err) {
      
      var message = 'Query Error';
      purchase =null;
      res.render('view_purchase.ejs', {role:sess.user.Role, username: sess.userId, message: message, purchase })
   throw err;
    } finally {
     if(conn) return conn.end();
    }
  }
  else{
    var message = 'Enter the purchases Id';
    purchase =null;
    res.render('view_purchase.ejs', {role:sess.user.Role, username: sess.userId, message: message, purchase: purchase })
  }
  
}



purchasesDb.invoice = async (req, res) => {
  let conn;

  var sess = req.session;
 if(sess.userId === undefined)
 {
  var message = 'Unauthorized!! Please Login';
  res.render("login.ejs", {message: message});
 }
 else if (req.method == "POST") {
         try {
           
      conn = await pool.getConnection();
     
      


     let purchase = await conn.query("select p.PurchaseId, p.InvoiceNo, p.SupplierId, p.PurchaseItemsDetails, p.PurchaseAmount, p.PurchaseDiscount, p.TotalVAT, p.AmountDue, DATE_FORMAT(p.PurchaseDate, '%a %D %b %Y') PurchaseDate, s.SupplierLastName, s.SupplierFirstName, s.SupplierOtherName, s.SupplierCompanyName, s.SupplierCompanyEmail, a.HouseNo , a.Street, a.City, a.State, a.Country from purchases as p LEFT JOIN Suppliers as s ON p.SupplierId = s.SupplierId LEFT JOIN Address AS a ON p.SupplierId = a.Id where p.PurchaseId=?", req.body.purchaseId);
     

     console.log("after the connection")
      console.log(purchase)
     
      if(purchase.length>0){
           var message = 'purchase ' + req.body.purchaseId;
      res.render('purchase_invoice.ejs', {role:sess.user.Role, username: sess.userId, message: message, purchase: purchase[0] })
  
      }
      else{
var message = 'Could not find record';
      purchase =null;
      res.render('view_purchase_invoice.ejs', {role:sess.user.Role, username: sess.userId, message: message, purchase })
  
      }
     } catch (err) {
      var message = 'Query Error';
      purchase =null;
      res.render('view_purchase_invoice.ejs', {role:sess.user.Role, username: sess.userId, message: message, purchase  })
  
      
       throw err;
    } finally {
     if(conn) return conn.end();
    }
  }
  else{
    var message = 'Enter the purchase Id';
    purchase =null;
    res.render('view_purchase_invoice.ejs', {role:sess.user.Role, username: sess.userId, message: message, purchase})
  }
  
}






purchasesDb.edit = async (req, res) => {
  let conn;

  var sess = req.session;
  prod = await product.allId();
 if(sess.userId === undefined)
 {
  var message = 'Unauthorized!! Please Login';
  res.render("login.ejs", {message: message});
 }
 else if (req.method == "POST") {
         try {
      conn = await pool.getConnection();
     
      let purchase = await conn.query("select PurchaseId, InvoiceNo, SupplierId, PurchaseItemsDetails, PurchaseAmount, PurchaseDiscount, TotalVAT, AmountDue, DATE_FORMAT(PurchaseDate, '%a %D %b %Y') PurchaseDate from purchases where PurchaseId=?", req.body.purchaseId );
      
      // console.log(product)
     console.log("after the connection")
      console.log(purchase)
    
      if(purchase.length > 0)
      {
         var message = 'Purchases ' + req.body.purchaseId;
      res.render('edit_purchase.ejs', {role:sess.user.Role, username: sess.userId, message: message, purchase: purchase[0] , product:prod})
   
      }
      else{
        var message = 'Could not find record';
        purchase =null;
        res.render('edit_purchase.ejs', {role:sess.user.Role, username: sess.userId, message: message, purchase, product:prod})
    
      }
      } catch (err) {
      
      var message = 'Query Error';
      purchase =null;
      res.render('edit_purchase.ejs', {role:sess.user.Role, username: sess.userId, message: message, purchase, product:prod})
   throw err;
    } finally {
     if(conn) return conn.end();
    }
  }
  else{
    var message = 'Enter the Purchase Id';
   
    purchase =null
    res.render('edit_purchase', {role:sess.user.Role, username: sess.userId, message: message, purchase, product:prod })
  }
  
}

purchasesDb.edit2 = async(req, res) => {
  let conn;
 prod = await product.allId();
 cus = await customer.allId();
  var sess = req.session; 
  if(sess.userId === undefined)
 {
  var message = 'Unauthorized!! Please Login';
  res.render("login.ejs", {message: message});
 }

else{
 if(req.method == "POST"){
     console.log(req.body) 
  console.log(`Inside the Purchase `)

  values = [req.body.purchaseId,  req.body.invoiceNo,   req.body.supplierId, req.body.purchaseItems, req.body.totalPurchase,req.body.totalDiscount, req.body.totalVAT,  req.body.amountDue,  req.body.date ];
    
  try {

  conn = await pool.getConnection();
  let results1 = await  conn.query('update purchases set InvoiceNo=?, SupplierId=?, PurchaseItemsDetails=?, PurchaseAmount=?, PurchaseDiscount=?, TotalVAT=?, AmountDue=?, PurchaseDate=? where PurchaseId=? ', values)
  
     if(results1.affectedRows == 1){
         var message = 'Purchases updated';
      res.render('edit_purchase', {role:sess.user.Role,username: sess.userId, message: message, product: prod, customer: cus})
 
     }
     else{
      var message = 'No Record Updated';
      res.render('edit_purchase', {role:sess.user.Role,username: sess.userId, message: message, product: prod, customer: cus})
 
     }
    } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}else {
  
  message = "Enter Purchase Id "
  
    console.log(cus)
    res.render('edit_purchase.ejs',{role:sess.user.Role, username: sess.userId, message: message, product: prod, customer: cus});
} 
 }
}

purchasesDb.delete = async (req, res) => {
  let conn;

  sess = req.session;
 if(sess.userId === undefined)
 {
  let message = 'Unauthorized!! Please Login';
  res.render("login.ejs", {message: message});
 }
 else if (req.method == "POST") {
         try {
           
      conn = await pool.getConnection();
     console.log(req.body);
      let sales = await conn.query("delete from purchases where PurchaseId=?", req.body.purchaseId);
     

     console.log("after the connection")
      console.log(sales)
      if(sales.affectedRows ==1){ 
         let message = 'Successfully delete Purchases ' + req.body.purchaseId;
      res.render('delete_purchases.ejs', {role:sess.user.Role, username: sess.userId, message: message, sales: sales[0] })
    
      }
      else{
        let message = 'Could not find record';
      
        res.render('delete_purchases.ejs', { role:sess.user.Role, username: sess.userId, message: message, sales: "" })
    
      }
    } catch (err) {
      
      let message = 'Query Error record';
      
      res.render('delete_purchases.ejs', { role:sess.user.Role, username: sess.userId, message: message, sales })
   throw err;
    } finally {
     if(conn) return conn.end();
    }
  }
  else{
    let message = 'Enter the Purchase Id';
    sales =null;
    res.render('delete_purchases.ejs', {role:sess.user.Role, username: sess.userId, message: message, sales })
  }
  
}

module.exports = purchasesDb;