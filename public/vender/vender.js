const signuplink = document.getElementById("signuplink")
const loginlink = document.getElementById("loginlink")
const login = document.getElementById("login")
const signup = document.getElementById("signup")
const signupBtn = document.getElementById("signupBtn")
const signup_email = document.getElementById("signup_email")
const signup_username = document.getElementById("signup_username")
const signup_password = document.getElementById("signup_password")
const loginBtn = document.getElementById("loginBtn")
const login_username = document.getElementById("login_username")
const login_password = document.getElementById("login_password")

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

    var cridentials = {
        email: email,
        username: username,
        password: password 
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
            if (data != "err") {
                window.location.href = "/successvendorlogin"
            }
        }
    )
            
})

