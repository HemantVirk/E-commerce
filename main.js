const express = require('express')
const app = express()
var session = require('express-session')
const port = 3000
const fs = require("fs")
const sendEmail = require("./methods/sendEmail")
const multer = require("multer")
const { send } = require('process')
const checkAuth = require('./middlewares/checkAuth')
const { Console } = require('console')
const emptyValidation = require('./methods/emptyValidation')
const upload = multer({ dest: 'public/productimg' })
app.set('view engine','ejs')

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }))

app.get("/", function(req,res){
    res.render("root")
})
app.get("/logout", function(req,res){
    req.session.destroy()
    res.redirect("/buyerlogin")
})

app.route("/changepassword").get(function(req,res){

    res.render('changepassword')
})
.post(function(req,res){
    fs.readFile("./buyerlogindata.json","utf-8", function(err,data){
        // console.log("yupp")
        if(data.length > 0){
            cridentials = JSON.parse(data)
        }
        cridentials.forEach(function (cridential) {

            console.log(req.session)
            if (req.session.acc.username == cridential.username) {
                console.log(req.body)
                cridential.password = req.body.newpass
                var subject = "Password Changed"
                var text = "Password for your account has been changed"
                fs.writeFile("./buyerlogindata.json",JSON.stringify(cridentials),function(err){
                    sendEmail(cridential.email,0,subject,text,function(err){
                        req.session.is_logged_in = true
                        req.session.acc.name = req.body.username;
                        console.log(req.session.acc)
                        res.redirect("/buyerlogin")
                    })
                    // res.end()
                })
            }
        })

        
        
    })
})

app.route('/venderlogin').get((req,res) => {
    res.render('vender')
})

app.get('/buyerlogin',checkAuth,(req,res) => {
    console.log("haha")
    // if(req.session.is_logged_in && req.session.acc.isVerified){
    //     console.log("yo")
    //     res.render('buyer',{name: req.session.acc.username})
    //     return
    // }
    // else if(req.session.is_logged_in && !req.session.acc.isVerified){
    //     console.log("yoyo")
    //     res.render('notVerified')
    //     return
    // }
    // // res.session.buyeracc = "" 
    // if(req.session.acc.username)
    console.log(req.session)
    res.render('buyer',{name: req.session.acc.username})
})


app.get("/verifyemail/:token", function(req,res){
    const { token } = req.params
    // console.log(token)
    fs.readFile("./buyerlogindata.json","utf-8", function(err,data){
        console.log("yupp")
        if(data.length > 0){
            cridentials = JSON.parse(data)
        }
        cridentials.forEach(function (cridential) {
            console.log("yupp")
            if (token == cridential.mailToken) {
                console.log("yupp")
                if(req.session.acc){
                    req.session.acc.isVerified = true
                    console.log(cridential.isVerified)
                    cridential.isVerified = true
                    console.log("mili: " + req.session.acc.inVerified)
                    fs.writeFile("./buyerlogindata.json",JSON.stringify(cridentials),function(err){
                        
                        res.end()
                    })
                    res.redirect("/buyerlogin")
                    
                }
                else{
                    req.session.acc = cridential;
                    req.session.is_logged_in = true
                    req.session.acc.isVerified = true
                    res.redirect("/buyerlogin")
                }
            }
        })

        
        
    })
})

app.get("/forgotverifyemail/:token", function(req,res){
    const { token } = req.params
    // console.log(token)
    fs.readFile("./buyerlogindata.json","utf-8", function(err,data){
        // console.log("yupp")
        if(data.length > 0){
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

app.post('/fetchfive', function(req,res){
    var products = [];
    var load =req.body.load
    // console.log(req.body)
    fs.readFile("./productdata.json","utf-8", function(err,data){
        // console.log("data:" + data)
        console.log(req.body)
        // console.log("JSON:" + JSON.stringify(JSON.parse(data)[0]))
        if(data.length === 0){
            products = []
        }
        else{
            for(var i = load ; i<=load+4 ; i++){
                products.push(JSON.parse(data)[i])
            }
            // products = JSON.parse(data)
        }
        
        console.log(products)
        products = JSON.stringify(products)
        var product_load = [{"load": load+5}]
        product_load.push(products)
        console.log(product_load[0])
        // console.log(product_load[1])
        res.json(product_load)
    })
})



app.post('/venderloginform',(req,res)=>{

    var cridentials;
    fs.readFile("./venderlogindata.json","utf-8", function(err,data){
        console.log(data)
        if(data.length === 0){
            cridentials = []
        }
        else{
            cridentials = JSON.parse(data)
        }
        
        cridentials.forEach(function (cridential) {
            if (req.body.username === cridential.username && req.body.password === cridential.password) {
                x = 2
                console.log("welcome")
                req.session.is_logged_in = true;
                req.session.acc = req.body.username;
                console.log(req.session.acc)
                res.send(req.body.username)
                
                // res.render('venderhome',{name: req.body.username});
            }
            else if(req.body.username === cridential.username && req.body.password != cridential.password){
                x = 1
            }
        })
        if (x === 1) {
            // res.send("  <h1 id=\"message\">Wrong password</h1><a href=\"/\">Back To Home</a>");
            console.log("Wrong password")
        }
        else if(x===0){
            // res.send("  <h1 id=\"message\">Username not found</h1><a href=\"/\">Back To Home</a>");
            console.log("No Such Username found !!")
        }
				
    })
})


app.get("/successvendorlogin", function(req,res){
    res.render('venderhome',{name:req.session.acc});
})

app.get("/successbuyerlogin", function(req,res){
    res.render('buyer',{name:req.session.acc.username});
})

app.post("/product_shelfing",upload.single('product_pic'), function(req,res){
    var products;
    fs.readFile("./productdata.json","utf-8", function(err,data){
        // console.log("data:" + data)
        // console.log(req)
        if(data.length === 0){
            products = []
        }
        else{
            products = JSON.parse(data)
        }
        
        products.push({
            product_name: req.body.product_name,
            product_id: req.body.product_id,
            product_price: req.body.product_price,
            product_info: req.body.product_info,
            product_pic: req.file.filename

        })
            // console.log(products)
            products = JSON.stringify(products)
            fs.writeFile("./productdata.json",products,"utf8", function (err) {

                res.end()

            })
				
    })
})


app.post('/vendersignupform',(req,res)=>{

    var cridentials;
    fs.readFile("./venderlogindata.json","utf-8", function(err,data){
        // console.log(data)
        var isAvailable = true;
        if(data.length === 0){
            cridentials = []
        }
        else{
            cridentials = JSON.parse(data)
        }
        console.log(cridentials)
        cridentials.forEach(function (cridential) {
            
            if (req.body.email === cridential.email) {
                isAvailable = false;
            }
        })
        if (isAvailable) {
            console.log("yeh boy")
            console.log(cridentials)
            cridentials.push(req.body)
            // console.log(cridentials)
            cridentials = JSON.stringify(cridentials)
            fs.writeFile("./venderlogindata.json",cridentials,"utf8", function (err) {

                res.end()

            })
            console.log("avalable")
            // req.session.acc = req.body.username;
            // req.session.is_logged_in = true
            // res.redirect("/account")
        } 
        else {
            res.send("<h1 id=\"message\">Already User Exists</h1><a href=\"/\">Back To Home</a>");
        }
				
    })
})

app.post('/buyersignupform',(req,res)=>{
    var x;
    var cridentials;
    fs.readFile("./buyerlogindata.json","utf-8", function(err,data){
        // console.log(data)
        var isAvailable = true;
        if(data.length === 0){
            cridentials = []
        }
        else{
            cridentials = JSON.parse(data)
        }
        // console.log(cridentials)
        x = emptyValidation(req.body.email,req.body.username,req.body.password)
        if(x==0){
            cridentials.forEach(function (cridential) {
                
                if (req.body.email === cridential.email) {
                    
                    // req.session.acc = cridential;
                    // console.log(req.session)
                    isAvailable = false;
                }
            })
            if (isAvailable) {
                console.log("Available")
                // console.log(cridentials)
                cridentials.push(req.body)
                // console.log(email)
                req.session.acc = req.body
                console.log(req.session.acc)
                // console.log("email from: " + cridentials.email)
                cridentials = JSON.stringify(cridentials)
                var subject = "Verify Account"
                var text = "Click to verify your account"
                fs.writeFile("./buyerlogindata.json",cridentials,"utf8", function (err) {
                    sendEmail(req.body.email,req.body.mailToken,subject,text,function(err){
                        req.session.is_logged_in = true
                        // req.session.acc = req.body
                        req.session.acc.name = req.body.username;
                        console.log(req.session.acc)
                        res.redirect("/buyerlogin")
                    })

                }) 
                // console.log("avalable")
            } 
            else {
                res.send("email_exist")
            }
        }
        else{
            
            if (x == 4) {
             
                res.send("username_null")
            }
            else if(x==5){

                res.send("password_null")
            }
            else if(x == 3){
                res.send("email_null")
            }
        }
				
    })
})

app.post('/buyerloginform',(req,res)=>{
    var x=0;
    var cridentials;
    fs.readFile("./buyerlogindata.json","utf-8", function(err,data){
        console.log(data)
        if(data.length === 0){
            cridentials = []
        }
        else{
            cridentials = JSON.parse(data)
        }
        x = emptyValidation("q",req.body.username,req.body.password)
        if(x == 0){
            
            cridentials.forEach(function (cridential) {

                if (req.body.username === cridential.username && req.body.password === cridential.password) {
                    x = 2
                    console.log("welcome: " + JSON.stringify(req.body))
                    req.session.is_logged_in = true;
                    req.session.acc = req.body
                    req.session.acc.isVerified = cridential.isVerified
                    res.end()
                }
                else if(req.body.username === cridential.username && req.body.password != cridential.password){
                    x = 1
                }
            })
            if (x === 1) {
                res.send("password_err")
            }
            else if(x==0){
               
                res.send("username_err")
            }
        }
        else{
            
            if (x == 4) {
             
                res.send("username_null")
            }
            else if(x==5){

                res.send("password_null")
            }
        }	
    })
})

app.route("/forgotpassword").get(function (req, res) {
    res.render("forgot")
})
    .post(function (req, res) {
        var x=1
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
                if(x==2){
                    console.log("abcdef")
                    sendEmail(req.body.email,req.session.acc.mailToken,subject,text,function(err){
                        console.log("abcdef")
                        res.redirect("/buyerlogin")
                    })
                }
                else{
                    console.log("Account not found!!")
                }
            })
        })
    })

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
