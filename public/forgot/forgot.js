const forgotbtn = document.getElementById("forgotBtn")
const email = document.getElementById("email")
forgotbtn.addEventListener("click", function(){
    console.log("kaboom!!")
    // let email = email.value;
    var cridential = {
        email: email.value
    }
    fetch("/forgotpassword",{
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(cridential)
    })
    .then(function (res) { return res.json(); })
    .then(function (data) { console.log(data)})
})