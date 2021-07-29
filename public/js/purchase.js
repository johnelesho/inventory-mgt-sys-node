
let qty = document.querySelector("#qty");
let cost = document.querySelector("#itemCost");
let qtyXcost = document.querySelector("#QtyXCost");
let item = document.querySelector("#item");
let itemCost = document.querySelector("#itemCost");
let unitDiscount = document.querySelector("#discount");
let unitVat = document.querySelector("#vat");
let btnAddItem = document.querySelector("#addItem");
let btnRemoveItem = document.querySelector("#removeItem");
let purchaseItemDetails = document.querySelector("#purchaseItemDetails");
let totalPurchase = document.querySelector("#totalPurchase");
let totalVAT = document.querySelector("#totalVAT");
let totalDiscount = document.querySelector("#totalDiscount");
let amountD = document.querySelector("#amountDue");
let purchaseLabel = document.querySelector("#purchaseItems");
let supplierId = document.querySelector("#supplierId");
let purchaseId = document.querySelector("#purchaseId");
let invoiceNo = document.querySelector("#invoiceNo");



var formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'NGN',
  });
  
  
purchaseLabel.value = purchaseLabel.innerText.trim();

supplierId.value = supplierId.value.trim();
purchaseId.value = purchaseId.value.trim();
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
totalPurchase.value =totalPurchase.value.trim()
totalVAT.value =totalVAT.value.trim();
totalDiscount.value =totalDiscount.value.trim();
amountDue.value =amountDue.value.trim()
purchaseLabel.value =purchaseLabel.value.trim();


btnAddItem.addEventListener("click", ()=>{
    let productId = item.value.split("-")[0];
    let prodName = item.value.split("-")[1];
    let nCost = cost.value;
   let nQty = qty.value;
    let nVat = unitVat.value;
    let nDiscount = unitDiscount.value; 

    let totalCost = calCost(nQty, nCost);
    amtPurchase = +totalPurchase.value + +totalCost;
   

    let nTotalDiscount = calDiscount(nQty, nCost, nDiscount);
    amtDiscount = +totalDiscount.value + +nTotalDiscount;
    
    
    let nTotalVat = calVat(nQty, nCost, nVat);
    amtVAT = +totalVAT.value + +nTotalVat;
   

    let nAmountDue = calAmountDue(Number(amtPurchase), Number(amtDiscount ), Number(amtVAT));
    amtDue = Number(amountD.value) + Number(nAmountDue);
    
    product = item.value;
   
    var newQuantity  = Number(product.split('-')[3]) + Number(nQty);

    details = [productId, prodName,nCost, nVat, nDiscount, nQty, totalCost, nTotalDiscount, nTotalVat, newQuantity ]

    
    if(newQuantity > 0){
appendRow(purchaseItemDetails, details);
totalPurchase.value = amtPurchase;
amountD.value = amtDue;
totalDiscount.value = amtDiscount;
totalVAT.value = amtVAT;
   
    alert(`The remaining quantity will be ${newQuantity}`);
    }
    else{
        alert(`There seems to be an error`);
        exit(0)
    }

    qty.value = "";
    qtyXcost.value =""
    unitDiscount.value="";
    unitVat.value=""
})

/*function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    purchaseItemDetails.deleteRow(i);
  }
*/
btnRemoveItem.addEventListener("click",()=>{
    alert("Are you sure you want to remove item")
    purchaseItemDetails.deleteRow(-1);

   pur = purchaseLabel.textContent.split(";");
 ite =  pur[pur.length-2].split(',');
 console.log(`Total Cost: ${ite[6]}`);
   console.log(`Total Discount: ${ite[7]}`);
   console.log(`Total VAT: ${ite[8]}`);
   console.log(`Amount Due: ${+ite[6] + +ite[8] - +ite[7]} `);
newDue = +ite[6] + +ite[8] - +ite[7];

   totalPurchase.value -= +ite[6];
   amountDue.value -= +newDue;
   totalDiscount.value -= +ite[7] ;
   totalVAT.value -= +ite[8];


   purchaseLabel.textContent ="";

   for(i=0; i<pur.length -2;i++)
   {
    purchaseLabel.textContent += pur[i] + ";  "
   }
   
  



    //deleteRow(salesItemDetails)
})


qtyXcost.onfocus = setCost;
qty.onchange = setCost;
cost.onchange = setCost;
cost.oninput = setCost;
qty.oninput = setCost;
item.onchange = setItemCost;
//purchaseItemDetails.onclick = deleteRow(0)


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
        else
        {
            qtyXcost.value = 0;
        }
        
  
}
function convert2Dec(val)
{
  return  (Math.round((val * 100) / 100).toFixed(2))
}

function calAmountDue(tpurchase, tDiscount, tVat){
    val = tpurchase + tVat - tDiscount;

    return convert2Dec(val)
}
function calCost(qty, cost)
{
   val = cost * qty;
   return convert2Dec(val)
}
function calVat(qty, cost, unitVat)
{
   val= qty * cost * (unitVat/100);

   return convert2Dec(val)
}
function calDiscount(qty, cost, unitDiscount)
{
 val = qty * cost * (unitDiscount/100);
   return convert2Dec(val)
}

function appendRow(tbl, itemArray) {
    //var tbl = document.getElementById('my-table'), // table reference
       purchaseLabel.value += itemArray + ";  ";
        let  row = tbl.insertRow(tbl.rows.length);     // append table row
        
        itemArray[2] = formatter.format(itemArray[2]);
    itemArray[6] = formatter.format(itemArray[6]);
    itemArray[7] = formatter.format(itemArray[7]);
    itemArray[8] = formatter.format(itemArray[8]);
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