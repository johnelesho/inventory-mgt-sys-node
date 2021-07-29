const pool = require('./index');
const supp = require("./Supplier")

productDb= {};

productDb.new = async(req, res) => {
  let conn;
 
  let sess = req.session; 
  supplier = await supp.allId();
  if(sess.userId===undefined)
  {
   
    let message = 'Unauthorized Access!! Please Login';
    res.render("login.ejs", {message: message});
  }
  else
  {
 
 if(req.method == "POST"){
     console.log(req.body) 
  console.log(`Inside the Product `)

  values = [
    req.body.prodId,     req.body.prodName,     req.body.productCategory,    req.body.supId,    req.body.costPrice,    req.body.sellingPrice,     req.body.initialQty,     req.body.minimumQty,   req.body.date ];
    
  try {
	conn = await pool.getConnection();
    let results1 = await  conn.query('insert into Products(ProductId, ProductName,ProductCategory,SupplierId, ProductCostPrice, ProductSellingPrice, CurrentQuantity, MinimumRequired, Date) values (?, ?, ?, ?, ?,?,?,?,?)', values);
    
     
    if(results1.affectedRows==1){
      let message = 'New Product added';
      res.render('new_product', {role:sess.user.Role,username: sess.userId, message: message, supplier: supplier})
      console.log(message)
    }else{
      let message = 'Could not add new Product';
      res.render('new_product', {role:sess.user.Role,username: sess.userId, message: message, supplier: supplier})
      console.log(message)
    }
     
  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}else {
 
    message = "Please fill all the fields "
    res.render('new_product.ejs',{role:sess.user.Role,username: sess.userId, message: message, supplier: supplier});
  }
   
 }
}


productDb.edit = async (req, res) => {
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
    let product = await conn.query("select ProductId, ProductName,productCategory,SupplierId, ProductCostPrice, ProductSellingPrice, CurrentQuantity, MinimumRequired, DATE_FORMAT(Date, '%a %D %b %Y') Date from products where ProductId= ? ",  req.body.prodId );

    if(product.length >0){

    
    product= product[0]
    // console.log(product)
    // console.log( product[0].ClientId)

 //Object.keys(product).map(k => product[k] = product[k].trim());
 // product[k] = product[k].trim()  );
      console.log(product)
      
      let message = 'Details of product with Id ' + req.body.prodId; 
      res.render('edit_product.ejs', {role:sess.user.Role, username: sess.userId, message: message, productDetails: product })
    }
    else{
      let message = 'Could not find details of product with Id ' + req.body.prodId; 
      res.render('edit_product.ejs', {role:sess.user.Role, username: sess.userId, message: message, productDetails: null })
    }  
    } catch (err) {
      let message = 'Error executing query';
    productD = " "
    res.render('edit_product.ejs', {role:sess.user.Role, username: sess.userId, message: message, productDetails:productD})
    } finally {
     if(conn) return conn.end();
    }
  }
  else
  {
    let message = 'Enter product Id';
    productD = " "
    res.render('edit_product.ejs', {role:sess.user.Role, username: sess.userId, message: message, productDetails:productD})
  }
}
  
}



productDb.edit2 = async(req, res) => {
  let conn;
 
  let sess = req.session; 
  //supplier = await supp.allId();
  if(sess.userId===undefined)
  {
   
    let message = 'Unauthorized Access!! Please Login';
    res.render("login.ejs", {message: message});
  }
  else
  {
 
 if(req.method == "POST"){
     //console.log(req.body) 
  console.log(`Inside the Product `)

  //values = [ req.body.costPrice,    req.body.sellingPrice,     req.body.initialQty,     req.body.minimumQty,   req.body.date, req.body.prodId ];
  
  //values = [        req.body.prodName,     req.body.productCategory,    req.body.supId,    req.body.costPrice,    req.body.sellingPrice,     req.body.initialQty,     req.body.minimumQty,   req.body.date, req.body.prodId ];

  values = [        req.body.prodName,     req.body.productCategory,    req.body.supId,    req.body.costPrice,    req.body.sellingPrice,     req.body.initialQty,     req.body.minimumQty,  req.body.prodId ];
     
  try {
    console.log(values) 
  conn = await pool.getConnection();
  
 // let results1 = await  conn.query(`update products  set ProductName=?, productCategory=?, SupplierId=?, ProductCostPrice=?, ProductSellingPrice=?, CurrentQuantity=?, MinimumRequired=?, Date=? WHERE ProductId=?`, values);
//update products set ProductName = ?, ProductCategory=?,SupplierId =?, ProductCostPrice=?, ProductSellingPrice=?, CurrentQuantity=?, MinimumRequired=?, Date=? where ProductId=?";
           
   let results1 = await  conn.query("update products set ProductName = ?, productCategory=?,SupplierId =?, ProductCostPrice=?, ProductSellingPrice=?, CurrentQuantity=?, MinimumRequired=? where ProductId=?", values);

   if(results1.affectedRows==1){

   console.log(results1)

   //let results1 = await conn.query(`update products  set ProductName='${values[0]}', ProductCategory='${values[1]}', SupplierId='${values[2]}', ProductCostPrice='${values[3]}', ProductSellingPrice='${values[4]}', CurrentQuantity='${values[5]}', MinimumRequired='${values[6]}', Date='${values[7]}' where ProductId='${values[8]}'`);
     
     let message = 'Product Details edited';
      res.render('edit_product', {role:sess.user.Role,username: sess.userId, message: message, productDetails:""})
     // console.log(message)
}
else{
  let message = 'Could not update product details';
      res.render('edit_product', {role:sess.user.Role,username: sess.userId, message: message, productDetails:""})
}  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}else {
 
    message = "Please fill all the fields "
    res.render('edit_product.ejs',{role:sess.user.Role,username: sess.userId, message: message, supplier: supplier});
  }
   
 }
}

productDb.all = async (req, res) => {
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
     
      let product = await conn.query('select ProductId, ProductName,productCategory,SupplierId, ProductCostPrice, ProductSellingPrice, CurrentQuantity, MinimumRequired, DATE_FORMAT(Date, "%a %D %b %Y") Date from products');
     // console.log(product)
     console.log("after the connection")
      console.log(product)
     
      if(product.length >0){
        let message = 'All Available Product';
      res.render('view_all_product.ejs', {role:sess.user.Role, username: sess.userId, message: message, product: product })
 
      }
      else{
        let message = 'No Available Product';
        product = null;
      res.render('view_all_product.ejs', {role:sess.user.Role, username: sess.userId, message: message, product: product })
      }
         } catch (err) {
      throw err;
    } finally {
     if(conn) return conn.end();
    }
  }
  
}




productDb.one = async (req, res) => {
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
      let product = await conn.query("select ProductId, ProductName,productCategory,SupplierId, ProductCostPrice, ProductSellingPrice, CurrentQuantity, MinimumRequired, DATE_FORMAT(Date, '%a %D %b %Y') Date from products where ProductId= ? ",  req.body.prodId );
     // console.log(product)
     if(product.length >0)
     {
       console.log( product[0].ClientId)
      let message = 'Details of product with Id ' + req.body.prodId; 
      res.render('view_product.ejs', {role:sess.user.Role, username: sess.userId, message: message, productDetails: product[0] })
     }
     else{
      
      let message = 'Could not find details of product with Id ' + req.body.prodId; 
      res.render('view_product.ejs', {role:sess.user.Role, username: sess.userId, message: message, productDetails: "" })
     }
     
    } catch (err) {
      let message = 'Record not found';
    productD = " "
    res.render('view_product.ejs', {role:sess.user.Role, username: sess.userId, message: message, productDetails:productD})
    } finally {
     if(conn) return conn.end();
    }
  }
  else
  {
    let message = 'Enter product Id';
    productD = " "
    res.render('view_product.ejs', {role:sess.user.Role, username: sess.userId, message: message, productDetails:productD})
  }
}
  
}


productDb.allId = () => {
  let conn;

     try {
     // conn = pool.getConnection();
      let product = pool.query('select ProductId, ProductName, ProductSellingPrice, CurrentQuantity, MinimumRequired from Products'  );
     console.log(product)
     return product;
    } catch (err) {
      throw err;
    } 
  }
  productDb.oneCost = (id) => {
    let conn;
  
       try {
       // conn = pool.getConnection();
        let product = pool.query('select ProductSellingPrice from Products where `ProductId`= "' + id + '"' );
       console.log(product)
       return product;
      } catch (err) {
        throw err;
      } 
    }
    
    productDb.count = () => {
      let conn;
    
         try {
         // conn = pool.getConnection();
          let product = pool.query('select count(*) from Products'  );
         console.log(product)
         return product;
        } catch (err) {
          throw err;
        } 
      }

      productDb.delete = async (req, res) => {
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
            let sales = await conn.query("delete from products where ProductId=?", req.body.productId);
           
      
           console.log("after the connection")
            console.log(sales)
            if(sales.affectedRows ==1){ 
               let message = 'Successfully delete Purchases ' + req.body.productId;
            res.render('delete_product.ejs', {role:sess.user.Role, username: sess.userId, message: message})
          
            }
            else{
              let message = 'Could not find record';
            
              res.render('delete_product.ejs', { role:sess.user.Role, username: sess.userId, message: message })
          
            }
          } catch (err) {
            
            let message = 'Query Error record';
            
            res.render('delete_product.ejs', { role:sess.user.Role, username: sess.userId, message: message})
         throw err;
          } finally {
           if(conn) return conn.end();
          }
        }
        else{
          let message = 'Enter the Product Id';
          
          res.render('delete_product.ejs', {role:sess.user.Role, username: sess.userId, message: message })
        }
        
      }
      

module.exports = productDb;
