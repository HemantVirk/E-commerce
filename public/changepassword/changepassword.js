const change = document.getElementById("changeBtn")
const confirm_email = document.getElementById("confirm_email")
const confirm = document.getElementById("confirm_password")
const newPassword = document.getElementById("new_password")
const login_error_msg = document.getElementById("login_error_msg")
change.addEventListener("click", function(){
    console.log("change triggered")
    if(isMatching()){
        changePassword()
    }

})
// var isPassMatching = false
confirm.addEventListener("click", function(){
    login_error_msg.innerText = ""
})
confirm_email.addEventListener("click", function(){
    login_error_msg.innerText = ""
})
function isMatching(){
    if(newPassword.value === confirm.value){
        // isPassMatching = true
        return true
    }
    else{
        // isPassMatching = false
        login_error_msg.innerText = "Passwords didn't matched"
        return false
    }
}

function changePassword(){
    let newpass = newPassword.value
    let email = confirm_email.value
    var cridentials = {
        email: email,
        newpassword: newpass
    }
    console.log(cridentials)
    console.log(JSON.stringify(cridentials))
    fetch("/changepassword",{
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(cridentials)
    })
    .then(function (res) { return res.text() })
    .then(function (data) {
            console.log("data id : " + data)
            if (data == "200") {
                alert("Password Changed")
                window.location.href = "/successbuyerlogin"
            }
            else if(data="404"){
                login_error_msg.innerText = "Email not found !!"
            }
            else if(data == "error"){
                alert("action can't be completed")
            }
    })
}