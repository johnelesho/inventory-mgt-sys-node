let date = document.querySelector("#date");
let qty = document.querySelector("#qty");
let cost = document.querySelector("#itemCost");
let qtyXcost = document.querySelector("#QtyXCost");
let item = document.querySelector("#item");
let itemCost = document.querySelector("#itemCost");
let unitDiscount = document.querySelector("#unitDiscount");
let unitVat = document.querySelector("#unitVat");
let btnAddItem = document.querySelector("#addItem");
let btnRemoveItem = document.querySelector("#removeItem");
let salesItemDetails = document.querySelector("#salesItemDetails");
let totalSales = document.querySelector("#totalSales");
let totalVAT = document.querySelector("#totalVAT");
let totalDiscount = document.querySelector("#totalDiscount");
let amountDue = document.querySelector("#amountDue");
let salesLabel = document.querySelector("#salesItems");
let customerId = document.querySelector("#customerId");
let salesId = document.querySelector("#salesId");
let invoiceNo = document.querySelector("#invoiceNo");




salesLabel.value = salesLabel.innerHTML.trim();
customerId.value = customerId.value.trim();
salesId.value = salesId.value.trim();
invoiceNo.value = invoiceNo.value.trim();
date.value =date.value.trim();
//qty.value =qty.value.trim();
//qtyXcost.value =qtyXcost.value.trim();
//item.value =item.value.trim();
//itemCost.value =itemCost.value.trim();
//unitDiscount.value =unitDiscount.value.trim();
//unitVat.value =unitVat.value.trim();
//btnAddItem.value =btnAddItem.value.trim();
//btnRemoveItem =btnRemoveItem.value.trim();
//salesItemDetails =salesItemDetails.value.trim();
totalSales.value =totalSales.value.trim()
totalVAT.value =totalVAT.value.trim();
totalDiscount.value =totalDiscount.value.trim();
amountDue.value =amountDue.value.trim()
salesLabel.value =salesLabel.value.trim();


var formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'NGN',
  });
  

//let tDate = new Date();
//date.value = `${tDate.getDate()}/${tDate.getMonth()}/${tDate.getFullYear()}`;
btnAddItem.addEventListener("click", ()=>{
    let productId = item.value.split("-")[0];
    let prodName = item.value.split("-")[1];
    let nCost = cost.value;
   let nQty = qty.value;
    let nVat = unitVat.value;
    let nDiscount = unitDiscount.value; 

    let totalCost = calCost(nQty, nCost);
    amtSales= +totalSales.value + +totalCost;
  
    

    let nTotalDiscount = calDiscount(nQty, nCost, nDiscount);
    amtDiscount = +totalDiscount.value + +nTotalDiscount;
   
    
    let nTotalVat = calVat(nQty, nCost, nVat);
    amtVAT = +totalVAT.value + +nTotalVat;
    

    let nAmountDue = calAmountDue(Number(amtSales), Number(amtDiscount ), Number(amtVAT));
    amtDue = +amountDue.value + +nAmountDue;

    product = item.value;
   var newQuantity  = Number(product.split('-')[3]) - Number(nQty);

    details = [productId, prodName,nCost, nVat, nDiscount, nQty, totalCost, nTotalDiscount, nTotalVat, newQuantity ]

    
    if(newQuantity > -1){
appendRow(salesItemDetails, details);
totalSales.value = amtSales;
amountDue.value = amtDue;
totalDiscount.value = amtDiscount;
totalVAT.value = amtVAT;
   
    alert(`The remaining quantity will be ${newQuantity}`);
    }
    else{
        alert(`There is not enough stock of the product`);
        exit(0)
    }
 qty.value = "";
    qtyXcost.value =""
    unitDiscount.value="";
    unitVat.value=""

    
});

btnRemoveItem.addEventListener("click",()=>{
    alert("Are you sure you want to remove item")
    salesItemDetails.deleteRow(-1);
    
  //  details = [productId, prodName,nCost, nVat, nDiscount, nQty, totalCost, nTotalDiscount, nTotalVat, newQuantity ]

    pur = salesLabel.value.split(";");
    console.log(pur);
  ite =  pur[pur.length-2].split(',');

   console.log(`Total Cost: ${ite[6]}`);
   console.log(`Total Discount: ${ite[7]}`);
   console.log(`Total VAT: ${ite[8]}`);
   console.log(`Amount Due: ${+ite[6] + +ite[8] - +ite[7]} `);
newDue = +ite[6] + +ite[8] - +ite[7];

   totalSales.value -= +ite[6];
   amountDue.value -= +newDue;
   totalDiscount.value -= +ite[7] ;
   totalVAT.value -= +ite[8];

    salesLabel.value ="";
 
    for(i=0; i<pur.length -2;i++)
    {
     salesLabel.value += pur[i] + ";  "
    }
    
    
  //  details = [productId, prodName,nCost, nVat, nDiscount, nQty, totalCost, nTotalDiscount, nTotalVat, newQuantity ]


    //deleteRow(salesItemDetails)
})

qtyXcost.onfocus = setCost;
qty.onchange = setCost;
cost.onchange = setCost;
cost.oninput = setCost;
qty.oninput = setCost;
item.onchange = setItemCost;
itemCost.onfocus = setItemCost;

//salesItemDetails.onclick = deleteRow

function setItemCost(){
    product = item.value;
    itemCost.value = product.split('-')[2]
}
function setCost(){
   
        if((Number.parseFloat(qty.value)) && Number.parseFloat(cost.value))
        {
            let nQty = +qty.value;
            let nCost = +cost.value;
            qtyXcost.value = calCost(nQty, nCost);
           
            
        }
        else{
            qtyXcost.value = 0;
        }
  
}


function calAmountDue(tSales, tDiscount, tVat){
    return (tSales + tVat - tDiscount)
}
function calCost(qty, cost)
{
   return cost * qty;
}
function calVat(qty, cost, unitVat)
{
   return qty * cost * (unitVat/100);
}
function calDiscount(qty, cost, unitDiscount)
{
   return qty * cost * (unitDiscount/100);
}

function appendRow(tbl, itemArray) {
    //var tbl = document.getElementById('my-table'), // table reference
        salesLabel.value += itemArray + ";"
        
        
    //details = [productId, prodName,nCost, nVat, nDiscount, nQty, totalCost, nTotalDiscount, nTotalVat, newQuantity ];

    itemArray[2] = formatter.format(itemArray[2]);
    itemArray[6] = formatter.format(itemArray[6]);
    itemArray[7] = formatter.format(itemArray[7]);
    itemArray[8] = formatter.format(itemArray[8]);

        let  row = tbl.insertRow(tbl.rows.length);      // append table row
        
    // insert table cells to the new row
    for (i = 0; i < tbl.rows[0].cells.length; i++) {
        createCell(row.insertCell(i), itemArray[i], 'row');
    }
    alert("A row added");
 
}
 
// create DIV element and append to the table cell
function createCell(cell, text, style) {
    var div = document.createElement('div'), // create DIV element
        txt = document.createTextNode(text); // create text node
    div.appendChild(txt);                    // append text node to the DIV
    div.setAttribute('class', style);        // set DIV class attribute
    div.setAttribute('className', style);    // set DIV class attribute for IE (?!)
    cell.appendChild(div);                   // append DIV to the table cell

}

function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    salesItemDetails.deleteRow(i);
    alert("A row removed");
}