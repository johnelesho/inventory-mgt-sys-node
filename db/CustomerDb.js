const maria = require('mariadb');
const pool = require('./index');


let inventory = {};



inventory.newCustomer =(values)=>{
 //   return new Promise((resolve, reject) =>{ 
        
        pool.query('insert into clients (ClientId, ClientLastName, ClientFirstName, ClientOtherName, ClientCompanyName, Email, Date) values (?, ?, ?, ?,?,?,?)', values, (err,results)=>{
            if(err){
                return reject(err);
            }

            return resolve(results)
        });
  //  });
};
inventory.newAddress =(values)=>{
 //   return new Promise((resolve, reject) =>{ 
        
        pool.query(' insert into Address(Id, HouseNo, Street, City, State, Country) values (?, ?, ?, ?, ?,?)', values, (err,results)=>{
            if(err){
                return reject(err);
            }

            return resolve(results)
        });
  //  });
};

inventory.oneCustomer =(values)=>{
   // return new Promise((resolve, reject) =>{ 
     let querySelect = "select ClientId , ClientLastName, ClientFirstName, ClientOtherName, ClientCompanyName, Email, Date, HouseNo , Street, City, State, Country from clients join address where clients.ClientId =Address.Id and clients.ClientId=? ";

        pool.query(querySelect, values, (err,results)=>{
            if(err){
                return reject(err);
            }

            return resolve(results)
        });
  //  });
};
inventory.allCustomer =()=>{
  //  return new Promise((resolve, reject) =>{ 
     let querySelect= "select ClientId , ClientLastName, ClientFirstName, ClientOtherName, ClientCompanyName, Email, Date, HouseNo , Street, City, State, Country from clients join address where clients.ClientId =Address.Id ";
   
        pool.query(querySelect, (err,results)=>{
            if(err){
                return reject(err);
            }

            return resolve(results)
        });
 //   });
};





module.exports = inventory;