const signuplink = document.getElementById("signuplink")
const loginlink = document.getElementById("loginlink")
const login = document.getElementById("login")
const signup = document.getElementById("signup")
const signupBtn = document.getElementById("signupBtn")
const loginBtn_vendor = document.getElementById("loginBtn_vendor")

const login_username = document.getElementById("login_email")
const login_password = document.getElementById("login_password")
const login_email = document.getElementById("login_email")
const login_email_err = document.getElementById("login_email_err")
const login_password_err = document.getElementById("login_password_err")

const signup_email_err = document.getElementById("signup_email_err")
const signup_username_err = document.getElementById("signup_username_err")
const signup_password_err = document.getElementById("signup_password_err")
const signup_email = document.getElementById("signup_email")
const signup_username = document.getElementById("signup_username")
const signup_password = document.getElementById("signup_password")
const signup_phone = document.getElementById("signup_phone")
const signup_phone_err = document.getElementById("signup_phone_err")


signuplink.addEventListener('click',function(){
    login.style.display = "none"
    signup.style.display = "block"
})

loginlink.addEventListener('click',function(){
    signup.style.display = "none"
    login.style.display = "block"
})


signupBtn.addEventListener("click", function(){
    let email = signup_email.value
    let username = signup_username.value
    let password = signup_password.value
    let phone = signup_phone.value
    var cridentials = {
        email: email,
        username: username,
        password: password,
        isVerified: 0,
        phone: phone,
        role:1,
        mailToken: Date.now()
    };
    console.log(cridentials)
    fetch("/vendersignupform",
        {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(cridentials)
        })
        .then(function (res) {return res.text()})
        .then(function (data) { 
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
                window.location.href = "/successvendorlogin"
            }
        }
        )
})

login_email.addEventListener("click",function(){
    login_email_err.innerText = ""
})
login_password.addEventListener("click",function(){
    login_password_err.innerText = ""
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

loginBtn_vendor.addEventListener("click", function(){
    let username = login_email.value
    let password = login_password.value

    var cridentials = {
        email: username,
        password: password,
        isVerified: false,
        role: 1
    };
    console.log(cridentials)
    fetch("/venderloginform",
        {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(cridentials)
        })
        .then(function (res) { return res.text() })
        .then(function (data) {
            if(data == "email_null"){
                login_email_err.innerText = "Email Can't be empty !"
                login_password_err.innerText = ""
            }
            else if(data == "password_null"){
                login_password_err.innerText = "Password can't be null !"
                login_email_err.innerText = ""
            }
            else if (data == "email_err") {
                login_email_err.innerText = "Email not found !!"
                login_password_err.innerText = ""
            }
            else if(data == "password_err"){
                login_password_err.innerText = "Incorrect Password !!"
                login_email_err.innerText = ""
            }
            else if(data == "error"){
                alert("action can't be completed")
            }
            else if(data == "success"){
                window.location.href = "/successvendorlogin"
            }
        }
    )
            
})
login_email.addEventListener("click",function(){
    login_email_err.innerText = ""
})
login_password.addEventListener("click",function(){
    login_password_err.innerText = ""
})
signup_email.addEventListener("click",function(){
    signup_email_err.innerText = ""
})
signup_username.addEventListener("click",function(){
    signup_username_err.innerText = ""
})
signup_password.addEventListener("click",function(){
    signup_password_err.innerText = ""
})

