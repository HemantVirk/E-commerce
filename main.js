const express = require('express')
const app = express()
var session = require('express-session')
const port = 3000
const sql = require('mssql/msnodesqlv8');
const fs = require("fs")
const connect = require("./methods/connect")
const sendEmail = require("./methods/sendEmail")
const plusminus = require("./methods/plusminus")
const fetchquantity = require("./methods/fetchquantity")
const fetchshelf = require("./methods/fetchshelf")
const fetchtoedit = require("./methods/fetchtoedit")
const addtoorder = require("./methods/addtoorder")
const addToCart = require("./methods/addingToCart")
const gettingFromCart = require("./methods/gettingFromCart")
const verificationUser = require("./methods/verificationUser")
const changePasswordDb = require("./methods/changePasswordDb")
const multer = require("multer")
const { send } = require('process')
const checkAuth = require('./middlewares/checkAuth')
const checkAuthVender = require('./middlewares/checkAuthVender')
const { Console } = require('console')
const emptyValidation = require('./methods/emptyValidation');
const userSignup = require('./methods/userSignup');
const fetchproduct = require('./methods/fetchproduct');
const userLogin = require('./methods/userLogin');
const productDb = require('./methods/productDb');
const upload = multer({ dest: 'public/productimg' })
app.set('view engine', 'ejs')

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

var config = {
    database: 'antiquites',
    server: 'DESKTOP-0KG1NTU',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }

};

app.get("/", function (req, res) {
    res.render("root")
})
app.get("/logout", function (req, res) {
    req.session.destroy()
    res.render("root")
    // res.redirect("/buyerlogin")
})

app.route("/changepassword").get(function (req, res) {

    res.render('changepassword')
})
    .post(function (req, res) {
        changePasswordDb(req.body,connect)
        .then(function(data){
            console.log(data)
            console.log(data.rowsAffected);
            if(data.rowsAffected && data.rowsAffected[0] == 1){
                req.session.is_logged_in = true
                req.session.acc.name = req.body.username;
                // console.log(req.session.acc)
                res.send("200")
            }
            else if(data.Error == "404"){
                res.send("404")
            }
        })
        .catch((err) => {
            res.send("error")
        });
        
    })

app.get('/venderlogin', checkAuthVender, (req, res) => {
    if (!req.session.is_logged_in)
        res.render('vender', { name: req.session.acc.username })
    else if (req.session.acc.isVerified == 1)
        res.render('venderhome', { name: req.session.acc.name })
    else {
        res.render('verify', {
            message: 'Please verify your account to continue'
        });
    }
})

app.get('/buyerlogin', checkAuth, (req, res) => {
    console.log("haha")
    console.log(req.session.acc)
    console.log(req.session.is_logged_in)
    if (!req.session.is_logged_in)
        res.render('buyer', { name: req.session.acc.username })
    else if (req.session.acc.isVerified == 1)
        res.render('buyer', { name: req.session.acc.name });
    else {
        res.render('verify', {
            message: 'Please verify your account to continue'
        });
    }
})


app.get("/verifyemail/:token", function (req, res) {
    const { token } = req.params
    console.log(token)
    verificationUser(token, connect)
        .then(function (data) {
            console.log(data)
            console.log(data.role)
            req.session.acc = data.result.recordset[0];
            req.session.is_logged_in = true
            req.session.acc.isVerified = 1
            if (data.role == 0)
                res.redirect("/buyerlogin")
            else if (data.role == 1)
                res.redirect("/venderlogin")

        })
        .catch((err) => {
            res.send("error")
        });

})

app.get("/forgotverifyemail/:token", function (req, res) {
    const { token } = req.params
    fs.readFile("./buyerlogindata.json", "utf-8", function (err, data) {
        // console.log("yupp")
        if (data.length > 0) {
            cridentials = JSON.parse(data)
        }
        cridentials.forEach(function (cridential) {

            if (token == cridential.mailToken) {
                req.session.acc = cridential
                console.log("yupp : " + req.session)
                res.redirect("/changepassword")
                // console.log("yupp")
                // if(req.session.acc){
                //     req.session.acc.isVerified = true
                //     console.log(cridential.isVerified)
                //     cridential.isVerified = true
                //     console.log("mili: " + req.session.acc.inVerified)
                //     fs.writeFile("./buyerlogindata.json",JSON.stringify(cridentials),function(err){

                //         res.end()
                //     })
                //     res.redirect("/buyerlogin")

                // }
                // else{
                //     req.session.acc = cridential;
                //     req.session.is_logged_in = true
                //     req.session.acc.isVerified = true
                //     res.redirect("/buyerlogin")
                // }
            }
        })



    })
})

// app.get("/buyerlogout", function(req,res){
//     res.render("buyer",{name: "Account"})
// })

app.post('/fetchfive', function (req, res) {

    var load = req.body.load
    console.log(load)
    fetchproduct(load,connect)
        .then(function (data) {
            console.log("dgibdkjcbkjabcjkbkj")
            console.log(data)
            res.json(data)
        })
        .catch((err) => {
            res.json({error: "error"})
        });

})

app.post("/addingtocart", function (req, res) {
    
    console.log(req.session.is_logged_in)
    console.log(req.session.acc)
    if(!req.session.is_logged_in){
        console.log("khtm")
        res.send("login_404")
    }
    else{
        addToCart(req.session.acc.user_id, req.body.id, connect)
            .then(function (data) {

                console.log("yp reached")
                console.log(data)
                res.send("200")
            })
            .catch((err) => {
                // console.log('Error adding item to cart:', err.message);
                res.send("error")
              });

    }
})

app.get("/mycart", function (req, res) {
    console.log("hn yi")
    console.log(req.session.is_logged_in)
    if (req.session.is_logged_in) {
        res.render('cart', { name: req.session.acc.username })
    }
})
app.post("/mycart", function (req, res) {
    gettingFromCart(req.session.acc.user_id, connect)
        .then(function (data) {
            console.log(data)
            console.log(data.recordset)
            res.json(data.recordset)
        })
        .catch((err) => {
            res.json({error: "error"})
        });
})


app.post('/venderloginform', (req, res) => {
    var x
    x = emptyValidation(req.body.email, "req.body.username", req.body.password)
    console.log(x)
    if (x == 0) {

        userLogin(req.body, connect)
            .then(function (data) {
                console.log("matched")
                // console.log(data.recordset[0].role)
                // console.log(re.body.role)
                if (data.recordset[0] != null && (data.recordset[0].role == req.body.role || data.recordset[0].role == 2)) {
                    console.log("matched")
                    // console.log(data.recordset[0])
                    if (data.recordset[0].password == req.body.password) {

                        req.session.is_logged_in = true
                        req.session.acc = req.body
                        req.session.acc.username = data.recordset[0].name
                        req.session.acc.isVerified = data.recordset[0].is_verified
                        req.session.acc.user_id = data.recordset[0].user_id
                        res.send("success")
                    }
                    else {
                        console.log(("Wrong Password"))
                        res.send("password_err")
                    }
                }
                else {
                    console.log("email not found")
                    res.send("email_err")
                }
            })
            .catch((err) => {
                res.send("error")
            });
    }
    else {

        if (x == 5) {

            res.send("password_null")
            // res.json({error:"password_null"})  
        }
        else if (x == 3) {
            console.log("yupp")
            res.send("email_null")
            // res.json({error:"email_null"})
        }
    }

})


app.get("/successvendorlogin", function (req, res) {
    console.log(req.session.acc.isVerified)
    console.log("vendor loading")
    

    if (req.session.acc.isVerified == 1)
        res.render('venderhome', { name: req.session.acc.username });
    else {
        res.render('verify', {
            message: 'Please verify your account to continue'
        });
    }
})


app.get("/successbuyerlogin", function (req, res) {
    console.log(req.session.acc.isVerified)
    if (req.session.acc.isVerified == 1)
        res.render('buyer', { name: req.session.acc.username });
    else {
        res.render('verify', {
            message: 'Please verify your account to continue'
        });
    }
})

app.post("/product_shelfing", upload.single('product_pic'), function (req, res) {
    var products;
    console.log("ankh dikhata")
    console.log(req.body)
    console.log(req.file.filename)
    console.log(req.session.acc.email)
    productDb(0,req.body, req.file.filename, req.session.acc.email, connect)
        .then(function (data) {
            console.log(data.rowsAffected)
            if (data.rowsAffected[0] == 1) {
                console.log("qwerty")
                // res.render('venderhome',{name:req.session.acc.username,status:"Item Added"})
                res.send("Item Added")
            }

        })
        .catch((err) => {
            res.send("error")
        });

})

app.post("/product_updating", upload.single('product_pic'), function (req, res) {
    
    productDb(1,req.body, req.file.filename, req.session.acc.email, connect)
        .then(function (data) {
            console.log(data.rowsAffected)
            if (data.rowsAffected[0] == 1) {
                console.log("qwerty")
                // res.render('venderhome',{name:req.session.acc.username,status:"Item Added"})
                res.send("Item Added")
            }

        })
        .catch((err) => {
            res.send(err)
        });
})
app.post("/product_remove", function (req, res) {
    console.log("removing")
    console.log(req.body)
    productDb(2,req.body, "", "", connect)
        .then(function (data) {
            console.log(data.rowsAffected)
            if (data.rowsAffected[0] == 1) {
                console.log("qwerty")
                // res.render('venderhome',{name:req.session.acc.username,status:"Item Added"})
                res.send("Item Added")
            }
        })
        .catch((err) => {
            res.send(err)
        });

})

app.post('/vendersignupform', (req, res) => {
    var x
    var cridentials;

    x = emptyValidation(req.body.email, req.body.username, req.body.password)
    if (x == 0) {
        userSignup(req.body, connect, sendEmail)
            .then(function (r) {
                console.log("finally done")
                console.log(req.body)
                console.log(r.result)
                if (r.result == "choose_vendor") {
                    console.log("choose_vendor3")
                    res.send("choose_vendor")
                }
                else if (r.result == "choose_buyer") {
                    res.send("choose_buyer")
                }
                else if (r.result.rowsAffected) {
                    console.log("wooooo")
                    // req.session.is_logged_in = true
                    req.session.acc = req.body
                    console.log(req.session.acc)
                    req.session.acc.isVerified = r.isVerified
                    // req.session.acc.username = r.username
                    // console.log(req.session.acc)
                    res.send("success")
                }
                else {
                    console.log(r)
                }
            })
            .catch((err) => {
                res.send("error")
            });

    }
    else {

        if (x == 4) {

            res.send("username_null")
        }
        else if (x == 5) {

            res.send("password_null")
        }
        else if (x == 3) {
            res.send("email_null")
        }
    }

})

app.post('/buyersignupform', (req, res) => {
    var x;
    x = emptyValidation(req.body.email, req.body.username, req.body.password, req.body.phone)
    if (x == 0) {
        userSignup(req.body, connect, sendEmail)
            .then(function (r) {
                console.log("finally done")
                console.log(req.body)
                console.log(r.result)
                if (r.result == "choose_vendor") {
                    console.log("choose_vendor3")
                    res.send("choose_vendor")
                }
                else if (r.result == "choose_buyer") {
                    res.send("choose_buyer")
                }
                else if (r.result.rowsAffected) {
                    console.log("wooooo")
                    // req.session.is_logged_in = true
                    req.session.acc = req.body
                    console.log(req.session.acc)
                    req.session.acc.isVerified = r.isVerified
                    // req.session.acc.username = r.username
                    // console.log(req.session.acc)
                    res.send("success")
                }
                else {
                    console.log(r)
                }
            })
            .catch((err) => {
                res.send("error")
            });
    }
    else {

        if (x == 4) {

            res.send("username_null")
        }
        else if (x == 5) {

            res.send("password_null")
        }
        else if (x == 3) {
            res.send("email_null")
        }
        else if (x == 6) {
            res.send("phone_null")
        }
    }


})

app.post('/buyerloginform', (req, res) => {
    var x = 0;
    console.log(req.body)
    x = emptyValidation(req.body.email, "req.body.username", req.body.password)
    if (x == 0) {

        userLogin(req.body, connect)
            .then(function (data) {
                console.log(data.recordset[0])
                if (data.recordset[0] != null && (data.recordset[0].role == req.body.role || data.recordset[0].role == 2)) {
                    console.log("matched")
                    console.log(data.recordset[0])
                    if (data.recordset[0].password == req.body.password) {
                        req.session.is_logged_in = true
                        req.session.acc = req.body
                        req.session.acc.username = data.recordset[0].name
                        console.log("hello")
                        req.session.acc.isVerified = data.recordset[0].is_verified
                        req.session.acc.user_id = data.recordset[0].user_id
                        console.log(req.session)
                        console.log(req.session.acc)
                        res.send("success")
                    }
                    else {
                        console.log(("Wrong Password"))
                        res.send("password_err")
                    }
                }
                else {
                    console.log("email not found")
                    res.send("email_err")
                }
            })
            .catch((err) => {
                res.send("error")
            });
    }
    else {

        if (x == 5) {

            res.send("password_null")
            // res.json({error:"password_null"})  
        }
        else if (x == 3) {
            console.log("yupp")
            res.send("email_null")
            // res.json({error:"email_null"})
        }
    }
})

app.post("/plus", function(req,res){
    plusminus(req.body.id,"plus",connect)
    .then(function(data){
        console.log(data)
        res.end()
    })
    .catch((err) => {
        res.send("error")
    });
})
app.post('/minus', function(req,res){
    console.log("minus to hua",req.body)
    console.log(req.body)

    if(req.body.quan == 1){
        plusminus(req.body.id,"delete",connect)
        .then(function(data){
            console.log(data)
            res.end()
        })
        .catch((err) => {
            res.send("error")
        });
    }
    else{
        plusminus(req.body.id,"minus",connect)
        .then(function(data){
            console.log(data)
            res.end()
        })
        .catch((err) => {
            res.send("error")
        });
    }
})

app.route("/forgotpassword").get(function (req, res) {
    res.render("forgot")
})
    .post(function (req, res) {
        var x = 1
        fs.readFile("./buyerlogindata.json", "utf-8", function (err, data) {
            console.log(data)
            if (data.length === 0) {
                cridentials = []
            }
            else {
                cridentials = JSON.parse(data)
            }
            var subject = "Forgot Password"
            var text = "Click to update password"

            cridentials.forEach(function (cridential) {
                if (req.body.email === cridential.email) {
                    x = 2
                    console.log("welcome: " + JSON.stringify(req.body))
                    req.session.acc = cridential


                }
                if (x == 2) {
                    console.log("abcdef")
                    sendEmail(req.body.email, req.session.acc.mailToken, subject, text, function (err) {
                        console.log("abcdef")
                        res.redirect("/buyerlogin")
                    })
                }
                else {
                    console.log("Account not found!!")
                }
            })
        })
    })

app.post("/quantity", function(req,res){

    fetchquantity(req.body.id,connect)
    .then(function(data){
        res.send(data + "")
    })
})


app.post("/fetch_shelf", function(req,res){
    // console.log("qwerty")
    console.log(req.session.acc)
    fetchshelf(req.session.acc.user_id,connect)
    .then(data => {
        console.log(data.recordset)
        res.json(data.recordset)
    })
})

app.post("/fetchtoedit", function(req,res){
    console.log("qwerty")
    // console.log(req.session.acc)
    fetchtoedit(req.body.id,connect)
    .then(data => {
        console.log(data.recordset)
        res.json(data.recordset)
    })
})

app.post("/order", function(req,res){
    console.log("ordering")
    addtoorder(req.body.shipping_address,req.session.acc.user_id,connect)
    .then(data => {
        console.log(data)
        // res.json(data.recordset)
    })
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
