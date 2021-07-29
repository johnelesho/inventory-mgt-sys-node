const pool = require('./index');

customerDb = {};

customerDb.new = async (req, res) => {
  let conn;
  
  let sess = req.session;
  //console.log(req);
  console.log(sess);
  console.log("Session " + sess);
  if (req.method == "POST") {
   // console.log(req.body)
    //console.log(`Inside the Customer `)

    let address = [req.body.customerId, req.body.houseNo, req.body.street, req.body.city, req.body.state, req.body.country].map(string => string.trim());

  //  console.log(address)
    //ClientId, ClientLastName, ClientFirstName, ClientOtherName, ClientCompanyName, Email, Date
    let customer = [req.body.customerId, req.body.lastName, req.body.firstName, req.body.otherName, req.body.companyName, req.body.companyEmail, req.body.date].map(string => string.trim());
    //console.log(address)

    try {
      conn = await pool.getConnection();
      let results1 = await conn.query(' insert into Address(Id, HouseNo, Street, City, State, Country) values (?, ?, ?, ?, ?,?)', address);
      let results2 = await conn.query('insert into clients (ClientId, ClientLastName, ClientFirstName, ClientOtherName, ClientCompanyName, Email, Date) values (?, ?, ?, ?,?,?,?)', customer);

      let message = 'New Customer added';
      res.render('new_customer', {role:sess.user.Role, username: sess.userId, message: message})
    } catch (err) {
      let message = "error";
      res.render('new_customer', {role:sess.user.Role, username: sess.userId, message: message})
    } finally {
      if(conn) return conn.end();
    }
  } else {
    
    username = sess.userId;
  //  console.log(sess);
    if(username===undefined)
    {
     
      let message = 'Unauthorized!! Please Login';
      res.render("login.ejs", {message: message});
    }
    else
    {
      message = "Please fill all the fields "
     res.render('new_customer.ejs',{role:sess.user.Role, username: sess.userId,message: message});
    }
   
   // res.render('new_customer.ejs',{role:sess.user.Role, username: "john", message: message});
  }
}




customerDb.all = async (req, res) => {
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
      let customer = await conn.query("select ClientId , ClientLastName, ClientFirstName, ClientOtherName, ClientCompanyName, Email,   DATE_FORMAT(Date, '%a %D %b %Y')  Date, HouseNo , Street, City, State, Country from clients join address where clients.ClientId =Address.Id "  );
     // console.log(customer)
     
     if(customer.length > 0){
       let message = 'All Registered Customers';
      res.render('view_all_customer.ejs', { role:sess.user.Role, username: sess.userId, message: message, customer: customer })
  
     }
     else{
      let message = "Customer's Record can not be found";
      customer=null;
      res.render('view_all_customer.ejs', {role:sess.user.Role, username: sess.userId, message: message, customer })
  
     }
        } catch (err) {
      let message = err || "Error in retrieving data from the database";
      customer = null;
      res.render('view_all_customer.ejs', {role:sess.user.Role, username: sess.userId, message: message, customer })
  
    } finally {
     if(conn) return conn.end();
    }
  }
  
}

customerDb.one = async (req, res) => {
  let conn;

  let sess = req.session;
 if(sess.userId === undefined)
 {
  let message = 'Unauthorized!! Please Login';
  res.render("login.ejs", {message: message});
 }
 else{
  if (req.method == "POST") {
     try {
      conn = await pool.getConnection();
      let customer = await conn.query("select ClientId , ClientLastName, ClientFirstName, ClientOtherName, ClientCompanyName, Email,   DATE_FORMAT(Date, '%a %D %b %Y')  Date, HouseNo , Street, City, State, Country from clients join address on clients.ClientId =Address.Id where clients.ClientId= ? ",  req.body.customerId );
      //console.log(customer)
     
     if(customer.length >0)
     {
        console.log( customer[0].ClientId);
        let message = 'Details of Customer with Id ' + req.body.customerId; 
      res.render('view_customer.ejs', { role:sess.user.Role, username: sess.userId, message: message, customerDetails: customer[0] })
  
     }
     else{
      let message = 'Record not found';
      customerD = null;
      res.render('view_customer.ejs', {role:sess.user.Role,  username: sess.userId, message: message, customerDetails:customerD})
    

     }
       } catch (err) {
      let message = 'Error querying database';
    customerD = null;
    res.render('view_customer.ejs', {role:sess.user.Role,  username: sess.userId, message: message, customerDetails:customerD})
    } finally {
     if(conn) return conn.end();
    }
  }
  else
  {
    let message = 'Enter Customer Id';
    customerD = null
    res.render('view_customer.ejs', { role:sess.user.Role, username: sess.userId, message: message, customerDetails:customerD})
  }
}
  
}



customerDb.view = async (req, res) => {
  let conn;

  let sess = req.session;
 if(sess.userId === undefined)
 {
  let message = 'Unauthorized!! Please Login';
  res.render("login.ejs", {message: message});
 }
 else{
  if (req.method == "POST") {
     try {
      conn = await pool.getConnection();
      let customer = await conn.query("select Trim(ClientId) as ClientId , Trim(ClientLastName) as ClientLastName, Trim(ClientFirstName) as ClientFirstName, Trim(ClientOtherName) as ClientOtherName, Trim(ClientCompanyName) as ClientCompanyName,Trim(Email) as Email,   Trim(DATE_FORMAT(Date, '%a %D %b %Y'))  Date, Trim(HouseNo) as HouseNo ,Trim(Street) as Street, Trim(City) as City, Trim(State) as State, Trim(country) as Country from clients join address on clients.ClientId =Address.Id where clients.ClientId= ? ",  req.body.customerId ).map(string => string.trim());;
    
    // customer.map(Function.prototype.call, String.prototype.trim)
    if(customer.length > 0){
      let message = 'Details of Customer with Id ' + req.body.customerId; 
      res.render('update_customer.ejs', { role:sess.user.Role, username: sess.userId, message: message, customerDetails: customer[0] })
    
    }
    else{
      let message = 'Record not found';
      customer = null;
      res.render('update_customer.ejs', { role:sess.user.Role, username: sess.userId, message: message, customerDetails:customer})
    
    }
      } catch (err) {
      let message = 'Error querying database';
    customer = ""
    res.render('update_customer.ejs', { role:sess.user.Role, username: sess.userId, message: message, customerDetails:customer})
    } finally {
     if(conn) return conn.end();
    }
  }
  else
  {
    let message = 'Enter Customer Id';
    customer = null
    res.render('update_customer.ejs', { role:sess.user.Role, username: sess.userId, message: message, customerDetails:customer})
  }
}
  
}




customerDb.viewOne = async (req, res) => {
  let conn;

  let sess = req.session;
 if(sess.userId === undefined)
 {
  let message = 'Unauthorized!! Please Login';
  res.render("login.ejs", {message: message});
 }
 else{
  if (req.method == "POST") {
     try {
      conn = await pool.getConnection();
      console.log(req.body.customerId )
      let customer = await conn.query("select ClientId , ClientLastName, ClientFirstName, ClientOtherName, ClientCompanyName, Email,   DATE_FORMAT(Date, '%a %D %b %Y')  Date, HouseNo , Street, City, State, Country from clients join address on clients.ClientId =Address.Id where clients.ClientId=?",  req.body.customerId ).map(string => string.trim());;
     // console.log(customer)
    
     if(customer.length > 0){
        console.log( customer[0].ClientId);
         let message = 'Details of Customer with Id ' + req.body.customerId; 
      res.render('edit_customer.ejs', {role:sess.user.Role, username: sess.userId, message: message, customerDetails: customer[0] })
  
     }
     else{
      let message = 'Record not found';
      customerD = null;
      res.render('edit_customer.ejs', { username: sess.userId, message: message, customerDetails:customerD})
    
     }
       } catch (err) {
      let message = 'Error querying database';
    customerD = null;
    res.render('edit_customer.ejs', { username: sess.userId, message: message, customerDetails:customerD})
    } finally {
     if(conn) return conn.end();
    }
  }
  else
  {
    let message = 'Enter Customer Id';
    customerD = null;
    res.render('edit_customer.ejs', { username: sess.userId, message: message, customerDetails:customerD})
  }
}
  
}



customerDb.ones = async (req, res) => {
  let conn;

  if (req.method == "POST") {
     try {
      conn = await pool.getConnection();
      let customer = await conn.query("select ClientId , ClientLastName, ClientFirstName, ClientOtherName, ClientCompanyName, Email,   DATE_FORMAT(Date, '%a %D %b %Y')  Date, HouseNo , Street, City, State, Country from clients join address on clients.ClientId =Address.Id where clients.ClientId= ? ",  req.body.customerId );
     // console.log(customer)
    
     if(customer.length > 0){
         console.log( customer[0].ClientId);
 let message = 'Details of Customer with Id ' + req.body.customerId; 
      res.render('update_customer.ejs', { role:sess.user.Role, username: sess.userId, message: message, customerDetails: customer[0] })
   
     }
     else{
      let message = 'Record not found';
      customerD = null;
      res.render('update_customer.ejs', { role:sess.user.Role, username: sess.userId, message: message, customerDetails:customerD})
      
     }
     } catch (err) {
      let message = 'Error querying the database';
    customerD = null;
    res.render('update_customer.ejs', { role:sess.user.Role, username: sess.userId, message: message, customerDetails:customerD})
    } finally {
     if(conn) return conn.end();
    }
  }

}


customerDb.update = async (req, res) => {
  let conn;
  
  let sess = req.session;
 // console.log("Session " + sess);
  if (req.method == "POST") {
   // console.log(req.body)
   // console.log(`Inside the Customer `)

    let address = [ req.body.houseNo, req.body.street, req.body.city, req.body.state, req.body.country, req.body.customerId];

    //ClientId, ClientLastName, ClientFirstName, ClientOtherName, ClientCompanyName, Email, Date
    let customerD = [ req.body.lastName, req.body.firstName, req.body.otherName, req.body.companyName, req.body.companyEmail,  req.body.customerId];

//req.body.date,
    try {
      conn = await pool.getConnection();
      
      console.log(customerD);
      let results2 = await conn.query("UPDATE clients set ClientLastName=?, ClientFirstName=?, ClientOtherName=?, ClientCompanyName=?, Email=? WHERE ClientId=?", customerD);
      console.log(results2);
       let results1 = await conn.query("update Address set HouseNo=?, Street=?, City=?, State=?, Country=? where Id=?" , address);
     console.log("Address updated");
    console.log(results1);


if(results1.affectedRows ==1 && results2.affectedRows==1){
      let customer = await conn.query("select ClientId , ClientLastName, ClientFirstName, ClientOtherName, ClientCompanyName, Email,   DATE_FORMAT(Date, '%a %D %b %Y')  Date, HouseNo , Street, City, State, Country from clients join address on clients.ClientId =Address.Id where clients.ClientId= ? ",  req.body.customerId );

      console.log(`Updated Customer:`)
      console.log(customer);
  
      let message = 'Customer Detail updated';
     
      res.render('update_customer', { role:sess.user.Role,username: sess.userId, message: message,  customerDetails:customer })
  
}
else{
  let message = "No record uodated";
  customer=null;
  res.render('update_customer', {role:sess.user.Role, username: sess.userId, message: message, customerDetails:customer })

}
    } catch (err) {
      let message = "Error Somewhere";
      customer=null;
      res.render('update_customer', {role:sess.user.Role, username: sess.userId, message: message, customerDetails:customer })
    } finally {
      if(conn) return conn.end();
    }
  } else {
    
    username = sess.userId;
    if(username===undefined)
    {
     
      let message = 'Unauthorized!! Please Login';
      res.render("login.ejs", {message: message});
    }
    else
    {
      message = "Enter Customer Id ";
      customerD = null;
    res.render('update_customer.ejs', { role:sess.user.Role,username: sess.userId, message: message, customerDetails:customerD})
   }
   
    //  res.render('new_customer.ejs',{username: "john", message: message, product: product, customer: customer});
  }
}


customerDb.edit = async (req, res) => {
  let conn;
  
  let sess = req.session;
  console.log("Session " + sess);
  if (req.method == "POST") {
    console.log(req.body)
    console.log(`Inside the Customer `)

    let address = [ req.body.houseNo, req.body.street, req.body.city, req.body.state, req.body.country, req.body.customerId];

    //ClientId, ClientLastName, ClientFirstName, ClientOtherName, ClientCompanyName, Email, Date
    let customer = [ req.body.lastName, req.body.firstName, req.body.otherName, req.body.companyName, req.body.companyEmail, req.body.date, req.body.customerId];


    try {
      conn = await pool.getConnection();
      let results1 = await conn.query(' update Address set HouseNo =?, Street =?, City=?, State=?, Country=? where Id=?', address);
      let results2 = await conn.query('update clients set ClientLastName=?, ClientFirstName=?, ClientOtherName=?, ClientCompanyName=?, Email=?, Date=? where ClientId=?', customer);

      if(results1.affectedRows ==1 && results2.affectedRows==1){
        let message = 'Customer Detail updated';
      res.render('edit_customer', { role:sess.user.Role,username: sess.userId, message: message})

      }
      else{
        let message = 'No recorded updated';
        res.render('edit_customer', { role:sess.user.Role,username: sess.userId, message: message})
  
      }
          } catch (err) {
      let message = "Error executing querying";
      res.render('edit_customer', {role:sess.user.Role, username: sess.userId, message: message})
    } finally {
      if(conn) return conn.end();
    }
  } else {
    
    username = sess.userId;
    if(username===undefined)
    {
     
      let message = 'Unauthorized!! Please Login';
      res.render("login.ejs", {message: message});
    }
    else
    {
      message = "Enter Customer Id ";
      customerD = null;
    res.render('edit_customer.ejs', { role:sess.user.Role,username: sess.userId, message: message, customerDetails:customerD})
   }
   
    //  res.render('new_customer.ejs',{username: "john", message: message, product: product, customer: customer});
  }
}

customerDb.allId = () => {
  let conn;

     try {
     // conn = pool.getConnection();
      let customer = pool.query('select ClientId, ClientCompanyName from clients'  );
     console.log(customer)

     return customer;
    } catch (err) {
      throw err;
    } 
  }
  


  
customerDb.count = () => {
 // let conn = await pool.getConnection();
      let ncustomer =  pool.query('select count(*) from clients'  );
     // console.log(customer)
     
 return ncustomer
  
  
}


customerDb.delete = async (req, res) => {
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
      let sales = await conn.query("delete clients, address from clients inner join address on clients.ClientId=address.Id where ClientId=?", req.body.customerId);

    //  let sales = await conn.query("delete suppliers, address from suppliers inner join address on suppliers.SupplierId=address.Id where SupplierId=?", req.body.supplierId);
        
     console.log(sales);
if(sales.affectedRows ==2){
   console.log("after the connection")
      console.log(sales)
     
      let message = 'Successfully deleted Customer ' + req.body.customerId;
      res.render('delete_customer.ejs', {role:sess.user.Role, username: sess.userId, message: message })
   
}
else{
  let message = 'Could not find record';
      
  res.render('delete_customer.ejs', { role:sess.user.Role, username: sess.userId, message: message, })

}
     } catch (err) {
      
      let message = 'Error executing query';
      
      res.render('delete_customer.ejs', { role:sess.user.Role, username: sess.userId, message: message, })
   throw err;
    } finally {
     if(conn) return conn.end();
    }
  }
  else{
    let message = 'Enter the customer Id';
    
    res.render('delete_customer.ejs', {role:sess.user.Role, username: sess.userId, message: message })
  }
  
}



module.exports = customerDb;
