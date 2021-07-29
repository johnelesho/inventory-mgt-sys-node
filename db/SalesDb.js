
const pool = require('../mariadb/index');

//const pool = Conn.;


let inventory = {};



inventory.newSales =(values)=>{
   // return new Promise((resolve, reject) =>{ 
        
        pool.query(" insert into Sales(Id, InvoiceNo, ClientId, SalesItemsDetails, SalesAmount, SalesDiscount,TotalVAT, SalesDate, AmountDue) values (?,?, ?, ?, ?, ?,?,?,?)", values, (err,results)=>{
            if(err){
                return reject(err);
            }

            return results;
      //  });
    });
};

inventory.getAllSales =()=>{
  //  return new Promise((reolve, reject) =>{
        pool.query('select * from Sales', (err,results)=>{
            if(err){
                return reject(err);
            }

            return results;
        });
    //});
};

inventory.oneSales =(values)=>{
    return new Promise((resolve, reject) =>{ 
     let querySelect = "select * from Sales where Id = ?";

        pool.query(querySelect, values, (err,results)=>{
            if(err){
                return reject(err);
            }

            return resolve(results)
        });
    });
};
inventory.updateSales =(values)=>{
    return new Promise((resolve, reject) =>{ 
    let queryInsert = "update Sales set InvoiceNo =?, ClientId=?, SalesItemsDetails=?, SalesAmount=?, SalesDiscount=?, TotalVAT=?, SalesDate=?, AmountDue=? where Id=?";

  

        pool.query(querySelect, values, (err,results)=>{
            if(err){
                return reject(err);
            }

            return resolve(results)
        });
    });
};



inventory.getSalesItemsDetails =(values)=>{
 //   return new Promise((reolve, reject) =>{
        pool.query('select SalesItemsDetails from Sales where Id = ?', values, (err,results)=>{
            if(err){
                return reject(err);
            }

            return resolve(results)
        });
   // });
};





module.exports = inventory;