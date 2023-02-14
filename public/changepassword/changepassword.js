const change = document.getElementById("changeBtn")
const confirm = document.getElementById("confirm_password")
const newPassword = document.getElementById("new_password")

change.addEventListener("click", function(){
    console.log("change triggered")
    if(isMatching()){
        changePassword()
    }

})
// var isPassMatching = false

function isMatching(){
    if(newPassword.value === confirm.value){
        // isPassMatching = true
        return true
    }
    else{
        // isPassMatching = false
        return false
    }
}

function changePassword(){
    var newpass = newPassword.value
    var cridentials = {
        newpass: newpass
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
            if (data != "err") {
                
                window.location.href = "/successbuyerlogin"
            }
    })
}