const pool = require('./index');
const customer = require("./Customer")
const product = require("./Product")

salesDb= {};

salesDb.new = async(req, res) => {
  let conn;

 cus = await customer.allId();
  let sess = req.session; 
  if(sess.userId === undefined)
 {
  let message = 'Unauthorized!! Please Login';
  res.render("login.ejs", {message: message});
 }

else{
 if(req.method == "POST"){
   let items = req.body.salesItems.trim();
     //console.log(items) 

    

  console.log(`Inside the Sales `)

  values = [
    req.body.salesId,  req.body.invoiceNo,   req.body.customerId, items, req.body.totalSales,  req.body.totalDiscount, req.body.totalVAT,  req.body.salesDate,  req.body.amountDue ];
    
  try {
	conn = await pool.getConnection();
    let results1 = await  conn.query('insert into Sales(Id, InvoiceNo, ClientId, SalesItemsDetails, SalesAmount, SalesDiscount,TotalVAT, SalesDate, AmountDue) values (?,?, ?, ?, ?, ?,?,?,?)', values)
    
    let item = items.split(';');

    for(i =0; i < (item.length)-1; i++){
     let itemize = item[i].split(',');
     let itemId = itemize[0];
     let itemQuantity = itemize[9];
     let updateQty = await conn.query('UPDATE products SET CurrentQuantity = ?  WHERE ProductId = ?',[itemQuantity, itemId] )
     console.log(updateQty);
    }
    
    
     let message = 'New Sales recorded';
     prod = await product.allId();
      res.render('new_sales', {role:sess.user.Role, username: sess.userId, message: message, product: prod, customer: cus})
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}else {
  
  message = "Please fill all the fields "
  
    console.log(cus)
    prod = await product.allId();
    
    res.render('new_sales.ejs',{ role:sess.user.Role, username: sess.userId, message: message, product: prod, customer: cus});
    //Location.reload(true); 
} 
 }
}


salesDb.totalSales = () => {
  let conn;

     try {
     // conn = pool.getConnection();
      let totalsales = pool.query('SELECT SUM(SalesAmount) FROM sales'  );
    // console.log(totalsales)
     return totalsales;
    } catch (err) {
      throw err;
    } 
  }
  
salesDb.all = async (req, res) => {
  let conn;

  let sess = req.session;
 if(sess.userId === undefined)
 {
  let message = 'Unauthorized!! Please Login';
  res.render("login.ejs", {message: message});
 }
 else{
     try {
      conn = await pool.getConnection();
     
      let sales = await conn.query("select Id, InvoiceNo, ClientId, SalesItemsDetails, SalesAmount, SalesDiscount,TotalVAT, DATE_FORMAT(SalesDate, '%a %D %b %Y') SalesDate, AmountDue from sales order by Id");
     // console.log(product)
     console.log("after the connection")
     // console.log(sales)
     
      let message = 'All Recorded Sales';
      res.render('view_all_sales.ejs', { role:sess.user.Role,username: sess.userId, message: message, sales: sales })
    } catch (err) {
      throw err;
    } finally {
     if(conn) return conn.end();
    }
  }
  
}



salesDb.one = async (req, res) => {
  let conn;

  let sess = req.session;
 if(sess.userId === undefined)
 {
  let message = 'Unauthorized!! Please Login';
  res.render("login.ejs", {message: message});
 }
 else if (req.method == "POST") {
         try {
      conn = await pool.getConnection();
     
      let sales = await conn.query("select Id, InvoiceNo, ClientId, SalesItemsDetails, SalesAmount, SalesDiscount,TotalVAT, DATE_FORMAT(SalesDate, '%a %D %b %Y') SalesDate, AmountDue from sales where Id=?", req.body.salesId);
     // console.log(product)
     console.log("after the connection")
     // console.log(sales)
     if(sales.length >0)
     {
         let message = 'Sales ' + req.body.salesId;
      res.render('view_sales.ejs', { role:sess.user.Role,username: sess.userId, message: message, sales: sales[0] })
   
     }
     else{
      let message = 'Could not find record';
      sales =null
      res.render('view_sales.ejs', { role:sess.user.Role,username: sess.userId, message: message, sales: sales })
  
     }
     } catch (err) {
      
      let message = 'Error ';
      sales =null;
      res.render('view_sales.ejs', { role:sess.user.Role,username: sess.userId, message: message, sales: sales })
   throw err;
    } finally {
     if(conn) return conn.end();
    }
  }
  else{
    let message = 'Enter the sales Id';
    console.log(message)
    sales =null;
    res.render('view_sales', {role:sess.user.Role, username: sess.userId, message: message, sales: sales })
  }
  
}



salesDb.edit = async (req, res) => {
  let conn;
  cus = await customer.allId();
  prod = await product.allId();
  let sess = req.session;
 if(sess.userId === undefined)
 {
  let message = 'Unauthorized!! Please Login';
  res.render("login.ejs", {message: message});
 }
 else if (req.method == "POST") {
         try {
      conn = await pool.getConnection();
     
      let sales = await conn.query("select Id, InvoiceNo, ClientId, SalesItemsDetails, SalesAmount, SalesDiscount,TotalVAT, DATE_FORMAT(SalesDate, '%a %D %b %Y') SalesDate, AmountDue from sales where Id=?", req.body.salesId);
     // console.log(product)
     //console.log("after the connection")
     // console.log(sales)
     if(sales.length > 0)
     {
         let message = 'Sales ' + req.body.salesId;
      res.render('edit_sales.ejs', {role:sess.user.Role, username: sess.userId, message: message, sales: sales[0],customer:cus, product:prod  })
   
     }
     else{
      let message = 'Could not find record';
      sales =null;
     
      res.render('edit_sales.ejs', { role:sess.user.Role,username: sess.userId, message: message, customer:cus, product:prod, sales: sales })
     }
     } catch (err) {
      
      let message = 'Error';
      sales =null;
     
      res.render('edit_sales.ejs', { role:sess.user.Role,username: sess.userId, message: message, customer:cus, product:prod, sales: sales })
   throw err;
    } finally {
     if(conn) return conn.end();
    }
  }
  else{
    let message = 'Enter the sales Id';
    sales ='';
    res.render('edit_sales', {role:sess.user.Role, username: sess.userId, customer:cus, product:prod, message: message, sales: sales })
  }
  
}

salesDb.edit2 = async(req, res) => {
  let conn;
 let prod = await product.allId();
 let cus = await customer.allId();
  let sess = req.session; 
  if(sess.userId === undefined)
 {
  let message = 'Unauthorized!! Please Login';
  res.render("login.ejs", {message: message});
 }

else{
 if(req.method == "POST"){
     console.log(req.body) 
 // console.log(`Inside the Sales `)

  values = [
     req.body.invoiceNo,   req.body.customerId, req.body.salesItems, req.body.totalSales,  req.body.totalDiscount, req.body.totalVAT,  req.body.amountDue,  req.body.salesId ];
    
  try {
	conn = await pool.getConnection();
    let results1 = await  conn.query('update sales set InvoiceNo=?, ClientId=?, SalesItemsDetails=?, SalesAmount=?, SalesDiscount=?,TotalVAT=?, AmountDue=? where Id=?', values)
    //console.log(results1);
     
     let message = 'Sales updated';
      res.render('edit_sales', {role:sess.user.Role,username: sess.userId, message: message, product: prod, customer: cus})
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}else {
  
  message = "Enter Sales Id "
  
    //console.log(cus)
    res.render('edit_sales.ejs',{ role:sess.user.Role,username: sess.userId, message: message, product: prod, customer: cus});
} 
 }
}




salesDb.invoice = async (req, res) => {
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
     
      let sales = await conn.query("select s.Id, s.InvoiceNo, s.ClientId, s.SalesItemsDetails, s.SalesAmount, s.SalesDiscount,s.TotalVAT, DATE_FORMAT(s.SalesDate, '%a %D %b %Y') SalesDate, s.AmountDue, c.ClientLastName, c.ClientFirstName, c.ClientOtherName, c.ClientCompanyName, c.Email, a.HouseNo , a.Street, a.City, a.State, a.Country from sales as s LEFT JOIN Clients as c ON s.ClientId = c.ClientId LEFT JOIN Address AS a ON s.ClientId = a.Id where s.Id=?", req.body.salesId);
     

     console.log("after the connection")
      console.log(sales)
     
      let message = 'Sales ' + req.body.salesId;
      res.render('sales_invoice.ejs', {role:sess.user.Role, username: sess.userId, message: message, sales: sales[0] })
    } catch (err) {
      
      let message = 'Could not find record';
      
      res.render('view_sales.ejs', { role:sess.user.Role, username: sess.userId, message: message, sales: "" })
   throw err;
    } finally {
     if(conn) return conn.end();
    }
  }
  else{
    let message = 'Enter the sales Id';
    sales =''
    res.render('view_sales_invoice.ejs', {role:sess.user.Role, username: sess.userId, message: message, sales: "" })
  }
  
}


salesDb.delete = async (req, res) => {
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
      let sales = await conn.query("delete from sales where Id=?", req.body.salesId);
     

     console.log("after the connection")
      console.log(sales)
     
      if(sales.affectedRows ==1){
         let message = 'Successfully deleted Sales ' + req.body.salesId;
      res.render('delete_sales.ejs', {role:sess.user.Role, username: sess.userId, message: message, sales: sales[0] })
    
      }
      else{
        let message = 'Could not find record';
      
      res.render('delete_sales.ejs', { role:sess.user.Role, username: sess.userId, message: message })
      }
     } catch (err) {
      
      let message = 'Query Error';
      
      res.render('delete_sales.ejs', { role:sess.user.Role, username: sess.userId, message: message })
   throw err;
    } finally {
     if(conn) return conn.end();
    }
  }
  else{
    let message = 'Enter the sales Id';
    
    res.render('delete_sales.ejs', {role:sess.user.Role, username: sess.userId, message: message })
  }
  
}

module.exports = salesDb;
