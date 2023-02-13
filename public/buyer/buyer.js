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
var load = 0;
fetchfive()
var popupContent = []

function fetchfive(){
    load = {
        load: load
    }
    console.log("fetch ongoing")
    fetch("/fetchfive",{
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }, 
        body: JSON.stringify(load)
    })
    .then(function(res){ return res.json(); })
    .then(function(data){
        load = data[0].load
        // console.log(load)
        // console.log(data[1])
        // if(JSON.parse(data[]))
        popupContent.push(JSON.parse(data[1]))
        console.log(popupContent)
        for(var i = 0 ; i<5 ; i++){
            // popupContent.push(JSON.parse(data[i]));
            // console.log(JSON.parse(data[1])[i].product_pic)
            const product_card = document.createElement("div")
            product_card.style.display = "flex"
            product_card.style.flexDirection = "row"
            product_card.style.width = "70%"
            product_card.style.height = "5%"
            product_card.style.padding = "3%"
            product_card.style.margin = "5% 10% 0% 10%"
            product_card.style.backgroundColor = "white"
            product_card.style.borderRadius = "3%"
        
            const product_pic = document.createElement("img")
            product_pic.style.width = "25%"
            product_pic.style.height = "50%"
            product_pic.src = "/productimg/" + JSON.parse(data[1])[i].product_pic
            product_pic.style.borderRadius = "2%"
            product_pic.style.margin = "auto"

            const product_name_price = document.createElement("div")
            product_name_price.style.display = "flex"
            product_name_price.style.flexDirection = "column"
            product_name_price.style.width = "50%"
            product_name_price.style.marginLeft = "5%"
            product_name_price.style.height = "70%"
            product_name_price.style.backgroundColor = "white"
            // product_card.style.margin = "auto"

            const product_name = document.createElement("h1")
            product_name.innerText = JSON.parse(data[1])[i].product_name

            const product_price = document.createElement("h2")
            product_price.innerText = "$ " + JSON.parse(data[1])[i].product_price

            const shipping = document.createElement("h3")
            shipping.innerHTML = "Free shipping"
            shipping.style.color = "rgb(41,168,85)"

            const divider = document.createElement("div")
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
            details.id = JSON.parse(data[1])[i].product_id
            details.onclick = function(){showdetails(this.id)}
            details.style.height = "25%"
            details.style.marginBottom = "5%"
            details.innerText = "Details"

            const add_to_list = document.createElement("button")
            add_to_list.style.width = "80%"
            add_to_list.style.height = "25%"
            add_to_list.innerText = "Add To Wishlist"

            product_name_price.appendChild(product_name)
            product_name_price.appendChild(product_price)
            product_name_price.appendChild(shipping)

            product_card.appendChild(product_pic)
            
            action_div.appendChild(details)
            action_div.appendChild(add_to_list)
            
            product_card.appendChild(product_name_price)
            product_card.appendChild(divider)
            
            product_card.appendChild(action_div)
            product_card_div.appendChild(product_card)
        }
        // console.log(popupContent)
    })
}

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
//     signupform.style.display = "none"
//     load_btn.style.display = "none"
//     product_card_div.style.display = "none"
//     loginform.style.display = "block"
// })

signupBtn.addEventListener("click", function(){
    let email = signup_email.value
    let username = signup_username.value
    let password = signup_password.value

    var cridentials = {
        email: email,
        username: username,
        password: password 
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
        .then(function (res) { return res.json(); })
        .then(function (data) { console.log(data)}
        )
})

loginBtn.addEventListener("click", function(){
    let username = login_username.value
    let password = login_password.value

    var cridentials = {
        username: username,
        password: password 
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
        .then(function (res) { return res.text() })
        .then(function (data) {
            if (data != "err") {
                
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
    console.log(load)
    for(var i=0 ; i<popupContent.length ; i++){
        console.log(popupContent.length)
        for(var j=0 ; j<popupContent[i].length ; j++){

            entity = popupContent[i][j]
            // console.log(entity)
            if(entity != null){
                if(entity.product_id === id){
                    name = entity.product_name
                    price = entity.product_price
                    pic = entity.product_pic
                    discription = entity.product_info
                }
            }
        }
    }
    // popupContent[load/5-1].forEach(function(entity){
    //     console.log(entity)
    //     if(entity != null){
    //         if(entity.product_id === id){
    //             name = entity.product_name
    //             price = entity.product_price
    //             pic = entity.product_pic
    //             discription = entity.product_info
    //         }
    //     }
    // })
    popupitemname.innerText ="Name - " + name
    popupitemdiscription.innerText = discription
    popupPicture.src = "/productimg/" + pic
    popupitemprice.innerText = "$ " + price
}