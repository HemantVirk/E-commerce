const container = document.getElementById("container")
const login = document.getElementById("login")
const logout = document.getElementById("logout")
const signup = document.getElementById("signup")
const loginform = document.getElementById("loginform")
const signupform = document.getElementById("signupform")
const signupBtn = document.getElementById("signupBtn")
const product_card_div = document.getElementById("product_card_div")
const login_list = document.getElementById("login_list")
const signup_list = document.getElementById("signup_list")
const load_btn = document.getElementById("load_btn")
const account = document.getElementById("account")
const nav_components = document.getElementById("nav_components")
const pre_add = document.getElementById("pre_add")
const final_add = document.getElementById("final_add")
const login_password_error = document.getElementById("login_password_err")
const login_email_error = document.getElementById("login_email_err")
const login_email = document.getElementById("login_email")
const login_password = document.getElementById("login_password")
const login_email_err = document.getElementById("login_email_err")
const signup_email_err = document.getElementById("signup_email_err")
const signup_username_err = document.getElementById("signup_username_err")
const signup_password_err = document.getElementById("signup_password_err")
const signup_email = document.getElementById("signup_email")
const signup_username = document.getElementById("signup_username")
const signup_password = document.getElementById("signup_password")
const signup_phone = document.getElementById("signup_phone")
const signup_phone_err = document.getElementById("signup_phone_err")
const login_button = document.getElementById("loginBtn_buyer")
const cart = document.getElementById("cart")
var load = 0;
var popupContent = []
fetchfive()
// login_password


function fetchfive(){
    loadobj = {
        load: load
    }

    fetch("/fetchfive",{
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }, 
        body: JSON.stringify(loadobj)
    })
    .then(function(data){
        return data.json()
        
    })
    .then(data => {

        if(data.error == "error"){
            alert("Something Went Wrong")
        }
        else{
        for(var i=0 ; i<data.length ; i++){
            popupContent.push(data[i]);
        }
        if(data.length == 0){
            alert("No More Products!")
        }
        load = load + 5
        for(var i = 0 ; i<5 ; i++){
            const product_card = document.createElement("div")
            product_card.style.display = "flex"
            product_card.style.flexDirection = "row"
            product_card.style.width = "60%"
            product_card.style.maxHeight = "4%"
            // product_card.style.textAlign = "left"
            product_card.style.padding = "3%"
            product_card.style.margin = "5% auto 0% auto"
            product_card.style.backgroundColor = "white"
            product_card.style.borderColor = "rgb(33,37,41)"
            product_card.style.border = "solid"
            product_card.style.overflow = "hidden"
            product_card.style.borderRadius = "10px"
        
            const product_pic = document.createElement("img")
            product_pic.style.width = "25%"
            product_pic.style.height = "50%"
            product_pic.src = "/productimg/" + data[i].picturename

            product_pic.style.borderRadius = "2%"
            product_pic.style.margin = "auto"

            const product_name_price = document.createElement("div")
            product_name_price.style.display = "flex"
            product_name_price.style.flexDirection = "column"
            product_name_price.style.width = "50%"
            product_name_price.style.marginLeft = "5%"
            product_name_price.style.height = "70%"
            product_name_price.style.backgroundColor = "white"

            const product_name = document.createElement("h1")
            product_name.innerText = data[i].name

            const product_price = document.createElement("h2")
            product_price.innerText = "$ " + data[i].price

            const shipping = document.createElement("h3")
            shipping.innerHTML = "Free shipping"
            shipping.style.color = "rgb(41,168,85)"

            const divider = document.createElement("vl")
            // divider.style.backgroundColor = "rgb(238,238,238)"
            divider.style.backgroundColor = "black"
            divider.style.height = "80%"
            divider.style.width = "20px"
            // divider.style.margin = "0"
            // divider.style.position = "absolute"
            // divider.style.top = "50%"

            const action_div = document.createElement("div")
            action_div.style.display = "flex"
            action_div.style.flexDirection = "column"
            action_div.style.padding = "auto"
            action_div.style.margin = "auto"
            action_div.style.width = "25%"
            action_div.style.height = "70%"

            const details = document.createElement("button")
            details.style.width = "80%"
            details.id = data[i].product_id
            details.onclick = function(){showdetails(this.id)}
            details.style.height = "25%"
            details.style.marginBottom = "5%"
            details.innerText = "Details"

            const add_to_list = document.createElement("button")
            add_to_list.style.width = "80%"
            add_to_list.style.height = "25%"
            add_to_list.id = data[i].product_id
            add_to_list.onclick = function(){addToCart(this.id)}
            add_to_list.innerText = "Add To Cart"

            

            product_name_price.appendChild(product_name)
            product_name_price.appendChild(product_price)
            product_name_price.appendChild(shipping)

            product_card.appendChild(product_pic)
            
            action_div.appendChild(details)
            action_div.appendChild(add_to_list)
            
            product_card.appendChild(product_name_price)
            product_card.appendChild(divider)
            
            product_card.appendChild(action_div)

            const slantedDiv = document.createElement('div');
            product_card.appendChild(slantedDiv)
            // slantedDiv.style.position = 'absolute';
            slantedDiv.style.top = '0';
            slantedDiv.style.right = '0';
            slantedDiv.style.width = '40%';
            slantedDiv.style.height = '10%';
            slantedDiv.style.lineHeight = '50px';
            slantedDiv.style.backgroundColor = 'green';
            slantedDiv.style.textAlign = 'center';
            slantedDiv.style.margin = "8% -10% 0 0%"
            slantedDiv.style.transform = 'rotate(45deg)'
            slantedDiv.style.transformOrigin = 'top right';
            slantedDiv.style.color = 'white';
            slantedDiv.style.fontWeight = 'bold';
            slantedDiv.style.zIndex = '1';
            slantedDiv.textContent = 'Featuring Today';
            
            product_card_div.appendChild(product_card)
        }
    }
        
      })
      .catch(error => {
        // Handle any errors that may have occurred during the request
      });
     
}

console.log()

signup.addEventListener("click", function(){
    console.log("Signup triggered")
    load_btn.style.display = "none"
    product_card_div.style.display = "none"
    loginform.style.display = "none"
    signupform.style.display = "block"
})
login.addEventListener("click", function(){
    signupform.style.display = "none"
    load_btn.style.display = "none"
    product_card_div.style.display = "none"
    loginform.style.display = "block"
})

// logout.addEventListener("click", function(){

//     // signupform.style.display = "none"
//     // load_btn.style.display = "none"
//     // product_card_div.style.display = "none"
//     // loginform.style.display = "block"

// })

signupBtn.addEventListener("click", function(){
    let email = signup_email.value
    let username = signup_username.value
    let password = signup_password.value
    // let address = signup_address.value
    let phone = signup_phone.value

    var cridentials = {
        email: email,
        username: username,
        password: password,
        isVerified: 0,
        phone: phone,
        role:0,
        mailToken: Date.now() 
    };
    console.log(cridentials)
    fetch("/buyersignupform",
        {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(cridentials)
        })
        .then(function (res) {  return res.text()  })
        .then(function (data) { 
            console.log(data);
            console.log(data == "choose_vendor")
            if(data == "email_null"){
                
                signup_email_err.innerText = "This Field cant't be empty !!"
                signup_username_err.innerText = ""
                signup_password_error.innerText = ""
            }
            else if(data == "username_null"){
                signup_email_err.innerText = ""
                signup_username_err.innerText = "This Field cant't be empty !!"
                signup_password_error.innerText = ""
            }
            else if(data == "phone_null"){
                signup_email_err.innerText = ""
                signup_username_err.innerText = ""
                signup_password_err.innerText = ""
                signup_phone_err.innerText = "This Field cant't be empty !!"
            }
            else if(data == "password_null"){
                console.log("avdakadava")
                signup_email_err.innerText = ""
                signup_username_err.innerText = ""
                signup_password_err.innerText = "This Field cant't be empty !!"
            }
            
            else if(data == "email_exist"){
                signup_email_err.innerText = "Email Already Exists !!"
                signup_username_err.innerText = ""
                signup_password_error.innerText = ""
            }
            else if(data == "choose_vendor"){
                console.log("reached")
                signup_email_err.innerText = ""
                signup_username_err.innerText = ""
                signup_password_err.innerText = "Enter password of your vendor account"

            }
            else if(data == "choose_buyer"){
                signup_email_err.innerText = ""
                signup_username_err.innerText = ""
                signup_password_err.innerText = "Enter password of your buyer account"

            }
            else if(data == "error"){
                alert("action can't be completed")
            }
            else if(data == "success"){
                window.location.href = "/successbuyerlogin"
            }
        })
})

login_email.addEventListener("click",function(){
    login_email_err.innerText = ""
})
login_password.addEventListener("click",function(){
    login_password_error.innerText = ""
})
signup_email.addEventListener("click",function(){
    signup_email_err.innerText = ""
})
signup_phone.addEventListener("click",function(){
    signup_phone_err.innerText = ""
})
signup_username.addEventListener("click",function(){
    signup_username_err.innerText = ""
})
signup_password.addEventListener("click",function(){
    signup_password_err.innerText = ""
})

login_button.addEventListener("click", function(){
    let username = login_email.value
    let password = login_password.value

    console.log("username: " + username)

    var cridentials = {
        email: username,
        password: password,
        isVerified: false,
        role: 0
    };
    console.log(cridentials)
    fetch("/buyerloginform",
        {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(cridentials)
        })
        .then(function (res) {  return res.text()  })
        .then(function (data) {
            console.log(data)
            if(data == "email_null"){
                login_email_err.innerText = "Email Can't be empty !"
                login_password_error.innerText = ""
            }
            else if(data == "password_null"){
                login_password_error.innerText = "Password can't be null !"
                login_email_err.innerText = ""
            }
            else if (data == "email_err") {
                login_email_err.innerText = "Email not found !!"
                login_password_error.innerText = ""
            }
            else if(data == "password_err"){
                login_password_error.innerText = "Incorrect Password !!"
                login_email_err.innerText = ""
            }
            else if(data == "error"){
                alert("action can't be completed")
            }
            else if(data == "success"){
                window.location.href = "/successbuyerlogin"
            }
        }
    )
            
})

var modal = document.getElementById('myModal')
var body = document.getElementsByTagName('body')
var btnClose = document.getElementById("closeModal")
var popupPicture = document.getElementById("popupPicture")
var popupitemprice = document.getElementById("popupitemprice")
var popupitemname = document.getElementById("popupitemname")
var popupitemdiscription = document.getElementById("popupitemdiscription")
function showdetails(id){
    console.log("Details clicked")
    console.log(modal)
    console.log(id)
    console.log(popupContent)
    modal.className = "Modal is-visuallyHidden";
    setTimeout(function () {
        // product_card_div.className = "MainContainer is-blurred";
        product_card_div.style.filter = "blur(2px)"
        product_card_div.style.webkitFilter = "blur(2px)"
        modal.className = "Modal";
    }, 100);
    container.parentElement.className = "ModalOpen";
    btnClose.onclick = function () {
        modal.className = "Modal is-hidden is-visuallyHidden";
        body.className = "";
        product_card_div.style.filter = "blur(0px)"
        container.className = "MainContainer";
        container.parentElement.className = "";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.className = "Modal is-hidden";
            body.className = "";
            product_card_div.style.filter = "blur(0px)"
            container.className = "MainContainer";
            container.parentElement.className = "";
        }
    }
    var name
    var price
    var discription
    var pic
    for(var i=0 ; i<popupContent.length ; i++){
        if(popupContent[i].product_id == id){
            name = popupContent[i].name
            price = popupContent[i].price
            pic = popupContent[i].picturename
            discription = popupContent[i].description
        }
    }
    popupitemname.innerText ="Name - " + name
    popupitemdiscription.innerText = discription
    popupPicture.src = "/productimg/" + pic
    popupitemprice.innerText = "$ " + price
}


function addToCart(id){
    
    fetch("/addingtocart",{
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({id: id})
    })
    .then(function (res) {  return res.text()  })
    .then(function(data){
        if(data == "login_404"){
            alert("Login to use this feature")
        }
        else if(data == "200"){
            alert("Products added to cart")
        }
        else{
            alert("Can't add products, some error occured")
        }
    })
}



