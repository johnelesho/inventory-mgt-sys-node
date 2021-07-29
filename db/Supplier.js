const pool = require('./index');

supplierDb= {};

supplierDb.new = async(req, res) => {
  let conn;
 
  let sess = req.session; 
 if(req.method == "POST"){
     console.log(req.body) 
  console.log(`Inside the Supplier `)

  let address = [      req.body.supId,       req.body.houseNo,       req.body.street,       req.body.city,        req.body.state,       req.body.country       ].map(string => string.trim());;

      //ClientId, ClientLastName, ClientFirstName, ClientOtherName, ClientCompanyName, Email, Date
      let supplier = [  
        req.body.supId, req.body.lastName,         req.body.firstName, req.body.otherName,        req.body.companyName, req.body.companyEmail,        req.body.date ].map(string => string.trim());
    
  try {
	conn = await pool.getConnection();
    let results1 =  await conn.query(' insert into Address(Id, HouseNo, Street, City, State, Country) values (?, ?, ?, ?, ?,?)', address);
     let results2 = await conn.query('insert into suppliers (SupplierId, SupplierLastName, SupplierFirstName, SupplierOtherName, SupplierCompanyName, SupplierCompanyEmail, Date) values (?, ?, ?, ?,?,?,?)', supplier);
     
     
     console.log(results1, results2)
     if(results1.affectedRows==1 && results2.affectedRows==1){
        let message = 'Successfully added a new Supplier';
        res.render('new_supplier', {role:sess.user.Role,username: sess.userId, message: message})
     }
    else{
      let message = 'Could not add a new Supplier';
      res.render('new_supplier', {role:sess.user.Role,username: sess.userId, message: message})
  
    }
     
    
  } catch (err) {
    message= "Error in executing query"
    res.render('new_supplier', {role:sess.user.Role,username: sess.userId, message})
  } finally {
	if (conn) return conn.end();
  }
}else {
    
    
    username = sess.userId;
    if(username===undefined)
    {
     
      let message = 'Unauthorized!! Please Login';
      res.render("login.ejs", {message: message});
    }
    else
    {
      message = "Please fill all the fields "
      res.render('new_supplier.ejs',{role:sess.user.Role,username: sess.userId,message: message});
    }
    
 }
}



supplierDb.all = async (req, res) => {
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
      let supplier = await conn.query("select SupplierId , SupplierLastName, SupplierFirstName, SupplierOtherName, SupplierCompanyName, SupplierCompanyEmail,  DATE_FORMAT(Date, '%a %D %b %Y') Date, HouseNo , Street, City, State, Country from Suppliers join address on suppliers.SupplierId =Address.Id "     );
     // console.log(supplier)
     if(supplier.length >0){
      let message = 'All Registered Suppliers';
      res.render('view_all_supplier.ejs', {role:sess.user.Role, username: sess.userId, message: message, supplier: supplier })
  
     }
     else
     {
      let message = 'No supplier in the records';
      supplier = null;
      res.render('view_all_supplier.ejs', {role:sess.user.Role, username: sess.userId, message: message, supplier: supplier })
  
     }
     } catch (err) {
      throw err;
    } finally {
     if(conn) return conn.end();
    }
  }
  
}




supplierDb.one = async (req, res) => {
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
      let supplier = await conn.query("select SupplierId , supplierLastName, SupplierFirstName, SupplierOtherName, SupplierCompanyName, SupplierCompanyEmail,  DATE_FORMAT(Date, '%a %D %b %Y') Date, HouseNo , Street, City, State, Country from Suppliers join address on suppliers.SupplierId =Address.Id where SupplierId=?",  req.body.supId );
     // console.log(supplier)
     

     if(supplier.length >0){
      console.log( supplier[0].SupplierId)
       let message = 'Details of supplier with Id ' + req.body.supId; 
      res.render('view_supplier.ejs', {role:sess.user.Role, username: sess.userId, message: message, supplierDetails: supplier[0] })
  
     }
     else{
       let message = 'Record not found';
    supplierD = " ";
    res.render('view_supplier.ejs', {role:sess.user.Role, username: sess.userId, message: message, supplierDetails:supplierD})
    
     }
        } catch (err) {
          let message = 'Error querying Database';
          supplierD = " ";
          res.render('view_supplier.ejs', {role:sess.user.Role, username: sess.userId, message: message, supplierDetails:supplierD})
          
      } finally {
     if(conn) return conn.end();
    }
  }
  else
  {
    let message = 'Enter Supplier Id';
    supplierD = " "
    res.render('view_supplier.ejs', {role:sess.user.Role, username: sess.userId, message: message, supplierDetails:supplierD})
  }
}
  
}


supplierDb.edit = async (req, res) => {
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
      let supplier = await conn.query("select SupplierId , supplierLastName, SupplierFirstName, SupplierOtherName, SupplierCompanyName, SupplierCompanyEmail,  DATE_FORMAT(Date, '%a %D %b %Y') Date, HouseNo , Street, City, State, Country from Suppliers join address on suppliers.SupplierId =Address.Id where SupplierId=?",  req.body.supId );
     // console.log(supplier)
    
     if(supplier.length > 0){
        console.log( supplier[0].SupplierId)
         let message = 'Details of supplier with Id ' + req.body.supId; 
      res.render('edit_supplier.ejs', {role:sess.user.Role, username: sess.userId, message: message, supplierDetails: supplier[0] })
  
     }
     else{
      let message = 'Record cannot be found with Id ' + req.body.supId; 
      res.render('edit_supplier.ejs', {role:sess.user.Role, username: sess.userId, message: message, supplierDetails: supplier[0] })
  
     }
       } catch (err) {
      let message = 'Record not found';
    supplierD = " "
    res.render('edit_supplier.ejs', {role:sess.user.Role, username: sess.userId, message: message, supplierDetails:supplierD})
    } finally {
     if(conn) return conn.end();
    }
  }
  else
  {
    let message = 'Enter Supplier Id';
    supplierD = " "
    res.render('edit_supplier.ejs', {role:sess.user.Role, username: sess.userId, message: message, supplierDetails:supplierD})
  }
}
  
}

supplierDb.edit2 = async(req, res) => {
  let conn;
 
  let sess = req.session; 
 if(req.method == "POST"){
   //  console.log(req.body) 
  console.log(`Inside the Supplier `)

  let address = [       req.body.houseNo,       req.body.street,       req.body.city,        req.body.state,       req.body.country, req.body.supId,             ];

      //ClientId, ClientLastName, ClientFirstName, ClientOtherName, ClientCompanyName, Email, Date
      let supplier = [req.body.lastName, req.body.firstName, req.body.otherName, req.body.companyName, req.body.companyEmail, req.body.supId ];
      
      //let supplier = [req.body.lastName, req.body.firstName, req.body.otherName, req.body.companyName, req.body.companyEmail, req.body.date, req.body.supId ];

        // let supAdd = [req.body.houseNo, req.body.street, req.body.city, req.body.state, req.body.country,req.body.lastName, req.body.firstName, req.body.otherName, req.body.companyName, req.body.companyEmail, req.body.date, req.body.supId , req.body.supId  ];
    
  try {
  //  console.log(supAdd)
  conn = await pool.getConnection();
 

  let results1 = await conn.query(`update Address set HouseNo=?, Street=?, City=?, State=?, Country=? where Id=?` , address);

  console.log(results1);

  let results2 = await conn.query(`update suppliers set supplierLastName=?, SupplierFirstName=?, SupplierOtherName=?, SupplierCompanyName=?, SupplierCompanyEmail=? where SupplierId=?`, supplier);

  console.log(results2);
  //let results1 = await conn.query(`update Address set HouseNo=${address[0]}, Street =${address[1]}, City=${address[2]}, State=${address[3]}, Country=${address[4]} where Id=${address[5]}`);
   //let results2 = await conn.query('update suppliers set supplierLastName=?, SupplierFirstName=?, SupplierOtherName=?, SupplierCompanyName=?, SupplierCompanyEmail=?, Date=? where SupplierId= ?', supplier);
     
   if(results1.affectedRows==1 && results2.affectedRows==1){
     let message = 'Successfully edited Supplier details';
    
      res.render('edit_supplier', {role:sess.user.Role,username: sess.userId, message: message, supplierDetails: ""})
    
   } 
   else{
    supplier =null;
    message = "Could not complete the update"
    res.render('edit_supplier', {role:sess.user.Role,username: sess.userId, message: message, supplierDetails: supplier})
  
   }
   
  } catch (err) {
    supplier =null;
    message = "Error occurred"
    res.render('edit_supplier', {role:sess.user.Role,username: sess.userId, message: message, supplierDetails: supplier})
  
  } finally {
	if (conn) return conn.end();
  }
}else {
    
    
    username = sess.userId;
    if(username===undefined)
    {
     
      let message = 'Unauthorized!! Please Login';
      res.render("login.ejs", {message: message});
    }
    else
    {
      message = "Enter supplier Id ";
      supplier ="";
      res.render('edit_supplier.ejs',{role:sess.user.Role,username: sess.userId,message: message, supplierDetails: supplier});
    }
    
 }
}



supplierDb.allId = () => {
  let conn;

     try {
     // conn = pool.getConnection();
      let supplier = pool.query('select SupplierId, SupplierCompanyName from suppliers'  );
     console.log(supplier)
     return supplier;
    } catch (err) {
      throw err;
    } 
  }

  
  supplierDb.delete = async (req, res) => {
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
        let sales = await conn.query("delete suppliers, address from suppliers inner join address on suppliers.SupplierId=address.Id where SupplierId=?", req.body.supplierId);
        
  
       console.log("after the connection")
        console.log(sales)
       if(sales.affectedRows == 2 )
       {
           let message = 'Successfully deleted Customer ' + req.body.supplierId;
        res.render('delete_supplier.ejs', {role:sess.user.Role, username: sess.userId, message: message })
   
       }
       else{
        let message = 'Could not find record';
        
        res.render('delete_supplier.ejs', { role:sess.user.Role, username: sess.userId, message: message, })
    
       }

         } catch (err) {
        
        let message = 'Query Error';
        
        res.render('delete_supplier.ejs', { role:sess.user.Role, username: sess.userId, message: message, })
     throw err;
      } finally {
       if(conn) return conn.end();
      }
    }
    else{
      let message = 'Enter the supplier Id';
      
      res.render('delete_supplier.ejs', {role:sess.user.Role, username: sess.userId, message: message })
    }
    
  }
  
  

module.exports = supplierDb;
