const mariadb = require('mariadb');
const pool = require('./index');

//const pool = Conn.;


let inventory = {};



inventory.newProduct =(values)=>{
    //return new Promise((resolve, reject) =>{ 
        
        pool.query('insert into Products(ProductId, ProductName,ProductCategory,SupplierId, ProductCostPrice, ProductSellingPrice, CurrentQuantity, MinimumRequired, Date) values (?, ?, ?, ?, ?,?,?,?,?)', values, (err,results)=>{
            if(err){
                return reject(err);
            }

            return resolve(results)
        });
   // });
};


inventory.oneProduct =(values)=>{
  //  return new Promise((resolve, reject) =>{ 
     let querySelect = "select * from Products where ProductId = ? ";

        pool.query(querySelect, values, (err,results)=>{
            if(err){
                return reject(err);
            }

            return results;
        });
  //  });
};
inventory.updateProduct =(values)=>{
  //  return new Promise((resolve, reject) =>{ 
    let queryInsert = "update products set ProductName = ?, ProductCategory=?,SupplierId =?, ProductCostPrice=?, ProductSellingPrice=?, CurrentQuantity=?, MinimumRequired=?, Date=? where ProductId=?";
  

        pool.query(querySelect, values, (err,results)=>{
            if(err){
                return reject(err);
            }

            return results;
        });
  //  });
};



inventory.getSellingPrice =(values)=>{
  //  return new Promise((reolve, reject) =>{
        pool.query('select ProductSellingPrice from Products where ProductId= ?', values, (err,results)=>{
            if(err){
                return reject(err);
            }

            return results;
        });
   // });
};
inventory.getProductId =()=>{
   // return new Promise((reolve, reject) =>{
        pool.query('select ProductName, ProductId from Products', (err,results)=>{
            if(err){
                return reject(err);
            }

            return resolve(results)
        });
   // });
};

inventory.getAllProduct =()=>{
   // return new Promise((reolve, reject) =>{
        pool.query('select * from Products', (err,results)=>{
            if(err){
                return reject(err);
            }

            return results;
        });
   // });
};


module.exports = inventory;