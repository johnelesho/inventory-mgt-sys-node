const mariadb = require('mariadb');
const pool = require('./index');

//const pool = Conn.;


let inventory = {};



inventory.newPurchase =(values)=>{
    return new Promise((resolve, reject) =>{ 
        
        pool.query("insert into Purchases(PurchaseId, InvoiceNo, SupplierId, PurchaseItemsDetails, PurchaseAmount, PurchaseDiscount, TotalVAT, AmountDue, PurchaseDate)" + " values (?,?, ?, ?, ?, ?,?,?,?)", values, (err,results)=>{
            if(err){
                return reject(err);
            }

            return resolve(results)
        });
    });
};

inventory.getAllPurchase =()=>{
    return new Promise((reolve, reject) =>{
        let querySelect = "select PurchaseId, InvoiceNo, SupplierId, PurchaseItemsDetails, PurchaseAmount, PurchaseDiscount, TotalVAT, AmountDue, PurchaseDate from Purchases ";
       
        pool.query(querySelect, (err,results)=>{
            if(err){
                return reject(err);
            }

            return resolve(results)
        });
    });
};

inventory.onePurchase =(values)=>{
    return new Promise((resolve, reject) =>{ 
     let querySelect = "select * from Purchases where PurchaseId = ?";

        pool.query(querySelect, values, (err,results)=>{
            if(err){
                return reject(err);
            }

            return resolve(results)
        });
    });
};

inventory.updatePurchase =(values)=>{
    return new Promise((resolve, reject) =>{ 
    let queryInsert = "update purchases set InvoiceNo =?, SupplierId=?, PurchaseItemsDetails=?, PurchaseAmount=?, PurchaseDiscount=?, TotalVAT=?,AmountDue=?, PurchaseDate=? where PurchaseId=?";

        pool.query(querySelect, values, (err,results)=>{
            if(err){
                return reject(err);
            }

            return resolve(results)
        });
    });
};



inventory.getPurchaseItemsDetails =(values)=>{
    return new Promise((reolve, reject) =>{
        pool.query('select PurchaseItemsDetails from purchases where PurchaseId = ?', values, (err,results)=>{
            if(err){
                return reject(err);
            }

            return resolve(results)
        });
    });
};





module.exports = inventory;