/**
* Module dependencies.
*/

var express = require('express')
  , routes = require('./routes')
 // , user = require('./routes/user')
  , userDb = require('./db/new_user')
  , customer = require('./db/Customer')
  , supplier = require('./db/Supplier')
  , product = require('./db/Product')
  , sales = require('./db/Sales')
  , purchases = require('./db/Purchases')
  , invoice = require('./db/Invoice')
  , http = require('http')
  , path = require('path');
//var methodOverride = require('method-override');
var session = require('express-session');
var app = express();
var bodyParser=require("body-parser");
var connection = require("./db/index")
 
 
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
              secret: 'buinotech',
              resave: true,
              saveUninitialized: true,
              cookie: { maxAge: 600000 }
            }))

 
// development only
 
app.get('/', routes.index);//call for main index page
app.get('/index', userDb.dashboard);
app.get('/admin', userDb.dashboard);


//call for main index page
//app.get('/register', userDb.newUser);//call for signup page
//app.post('/register', userDb.newUser);//call for signup post 

app.get('/login', userDb.login);//call for login page
app.post('/login', userDb.login);//call for login post

app.get('/logout', userDb.logout);
app.get('/register', routes.register);
app.post('/register', userDb.new)

app.post('/new_customer', customer.new)
app.get('/new_customer', customer.new)
app.get('/customer', customer.new)
app.get('/view_all_customer', customer.all)


app.post('/view-customer', customer.view)
app.post('/viewCustomer', customer.viewOne)
app.get('/view_customer', customer.one)
app.post('/view_customer', customer.one)
app.get('/update_customer', customer.update)
app.post('/update_customer', customer.update)
app.post('/update-customer', customer.ones)
//app.get('/edit_customer', customer.edit)
app.post('/edit_customer', customer.edit)
app.get('/delete_customer', customer.delete)
app.post('/delete_customer',customer.delete)


app.post('/new_supplier', supplier.new)
app.get('/new_supplier', supplier.new)
app.get('/supplier', supplier.new)
app.get('/view_all_supplier', supplier.all)
app.get('/view_supplier', supplier.one)
app.post('/view_supplier', supplier.one)
app.get('/edit_supplier', supplier.edit)
app.post('/edit_supplier', supplier.edit)
app.post('/edit-supplier', supplier.edit2)
app.get('/delete_supplier', supplier.delete)
app.post('/delete_supplier',supplier.delete)


app.post('/new_product', product.new) 
app.get('/product', product.new)
app.get('/new_product', product.new)
app.get('/view_all_product', product.all)
app.get('/view_product', product.one)
app.post('/view_product', product.one)
app.get('/edit_product', product.edit)
app.post('/edit_product', product.edit)
app.post('/edit-product', product.edit2)
app.get('/delete_product', product.delete)
app.post('/delete_product',product.delete)

app.post('/new_sales', sales.new)
app.get('/new_sales', sales.new)
app.get('/sales', sales.new)
app.get('/view_all_sales', sales.all)
app.get('/view_sales', sales.one)
app.post('/view_sales',sales.one)
app.get('/edit_sales', sales.edit)
app.post('/edit_sales',sales.edit)
app.post('/edit-sales', sales.edit2)
app.get('/view_sales_invoice', sales.invoice)
app.post('/sales_invoice', sales.invoice)
app.get('/delete_sales', sales.delete)
app.post('/delete_sales',sales.delete)

app.post('/new_purchase', purchases.new)
app.get('/new_purchase', purchases.new)
app.get('/purchase', purchases.new)
app.get('/view_all_purchases', purchases.all)
app.get('/view_purchase', purchases.one)
app.post('/view_purchase',purchases.one)
app.get('/edit_purchase', purchases.edit)
app.post('/edit_purchase',purchases.edit)
app.post('/edit-purchase', sales.edit2)
app.get('/view_purchase_invoice', purchases.invoice)
app.post('/purchase_invoice', purchases.invoice)
app.get('/delete_purchases', purchases.delete)
app.post('/delete_purchases',purchases.delete)




app.get('/home/dashboard', userDb.dashboard);//call for dashboard page after login
//app.get('/home/logout', userDb.logout);//call for logout
app.get('/*', routes.others);//call for other index page
//Middleware
app.listen(8080|| process.env.PORT)
