//const mariadb = require('mariadb');
const pool = require('./index');


let inventory = {};



inventory.newSupplier =(values)=>{
   // return new Promise((resolve, reject) =>{ 
        
        pool.query('insert into suppliers (SupplierId, SupplierLastName, SupplierFirstName, SupplierOtherName, SupplierCompanyName, SupplierCompanyEmail, Date) values (?, ?, ?, ?,?,?,?)', values, (err,results)=>{
            if(err){
                return reject(err);
            }

            return results;
            //return resolve(results)
        });
   // });
};
inventory.newAddress =(values)=>{
   // return new Promise((resolve, reject) =>{ 
        
        pool.query(' insert into Address(Id, HouseNo, Street, City, State, Country) values (?, ?, ?, ?, ?,?)', values, (err,results)=>{
            if(err){
                return reject(err);
            }

            return results;
            //return resolve(results)
        });
  //  });
};

inventory.oneSupplier =(values)=>{
   // return new Promise((resolve, reject) =>{ 
     let querySelect = "select SupplierId , SupplierLastName, SupplierFirstName, SupplierOtherName, "
     + "SupplierCompanyName, SupplierCompanyEmail, Date, HouseNo , Street, City, State, "
     + "Country from Suppliers join address "
     + "on suppliers.SupplierId =Address.Id where suppliers.SupplierId= ?";

        pool.query(querySelect, values, (err,results)=>{
            if(err){
                return reject(err);
            }

            return results;
           // return resolve(results)
        });
  //  });
};
inventory.allSupplier =()=>{
  //  return new Promise((resolve, reject) =>{ 
     let querySelect= "select SupplierId , SupplierLastName, SupplierFirstName, SupplierOtherName, SupplierCompanyName, SupplierCompanyEmail, Date, HouseNo , Street, City, State, Country from Suppliers join address where suppliers.SupplierId =Address.Id ";
     
   
        pool.query(querySelect, (err,results)=>{
            if(err){
                return reject(err);
            }
            return results;
            //return resolve(results)
        });
  //  });
};

inventory.allSupplierId =()=>{
  //  return new Promise((resolve, reject) =>{ 
     let querySelect= "select SupplierId, SupplierCompanyName from Suppliers";
     
   
        pool.query(querySelect, (err,results)=>{
            if(err){
                return reject(err);
            }

            return results;
           // return resolve(results)
        });
   // });
};

inventory.oneSupplierId =(values)=>{
   // return new Promise((resolve, reject) =>{ 
     let querySelect= "select SupplierId, SupplierCompanyName from Suppliers where SupplierId = ?";
     
   
        pool.query(querySelect, values, (err,results)=>{
            if(err){
                return reject(err);
            }

            return results;
        });
   // });
};


module.exports = inventory;