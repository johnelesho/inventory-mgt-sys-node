const salesDb = require('./mariadb/SalesDb');


function loadSales()
{
    try{
    let result = salesDb.getAllSales();
    console.log(result)
    //res.json(result);
}catch(e)
{
    console.log(e);
    res.sendStatus(500);
}

}



function appendRow(tbl, itemArray) {
    //var tbl = document.getElementById('my-table'), // table reference
      let  row = tbl.insertRow(tbl.rows.length),      // append table row
        i;
    // insert table cells to the new row
    for (i = 0; i < tbl.rows[0].cells.length; i++) {
        createCell(row.insertCell(i), itemArray[i], 'row');
    }
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

loadSales();