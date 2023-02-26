const product_card_div = document.getElementById("product_card_div")
const checkout_box = document.getElementById("checkout_box")
// console.log("hello")

// var totamountvalue = 0
// var totitemvalue = 0

const totamount = document.createElement("p")
totamount.innerHTML = "Total Amount"
const totamount2 = document.createElement("p")
// totamount2.innerHTML = totamountvalue
const totitem = document.createElement("p")
totitem.innerHTML = "Total Items"
const totitem2 = document.createElement("p")
// totitem2.innerHTML = totitemvalue

checkout_box.appendChild(totamount)
checkout_box.appendChild(totamount2)
checkout_box.appendChild(totitem)
checkout_box.appendChild(totitem2)

const checkout_button = document.createElement("button")
checkout_button.style.width = "80%"
checkout_button.style.height = "25%"
checkout_button.id = "checkout"
checkout_button.style.backgroundColor = "RGB(33 37 41)"
checkout_button.style.color = "RGB(118 122 134)"
checkout_button.onclick = function () { }
checkout_button.innerText = "Proceed to checkout"
checkout_box.appendChild(checkout_button)

onload()



function onload() {
    fetch("/mycart", {
        method: "POST",
    })
        .then(function (data) {
            return data.json()
        })
        .then(function (data) {
            if(data.error == "error"){
                alert("Some Error occured")
            }
            else{
                data.forEach(toload => {
                    showitems(toload)
                });
            }
            
        })
}

function showitems(toload) {
    const product_card_main = document.createElement("div")
    product_card_main.style.display = "flex"
    product_card_main.style.flexDirection = "column"
    product_card_main.id = toload.product_id
    product_card_main.style.width = "70%"
    product_card_main.style.height = "5%"
    product_card_main.style.padding = "3%"
    product_card_main.style.margin = "5% 10% 0% 5%"
    product_card_main.style.backgroundColor = "white"
    product_card_main.style.borderRadius = "3%"

    const head = document.createElement("h1")
    head.innerText = "Your Cart"
    product_card_main.appendChild(head)
    const product_card = document.createElement("div")
    product_card.style.display = "flex"
    product_card.style.flexDirection = "row"
    product_card.style.width = "70%"
    product_card.style.height = "5%"
    product_card.style.padding = "3%"
    product_card.style.margin = "5% 10% 0% 10%"
    product_card.style.backgroundColor = "white"
    product_card.style.borderBottomStyle = "solid"
    // product_card.style.borderColor = "grey"
    // product_card.style.borderRadius = "3%"
    const product_pic = document.createElement("img")
    product_pic.style.width = "25%"
    product_pic.style.height = "50%"
    product_pic.src = "/productimg/" + toload.picturename

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
    product_name.innerText = toload.name

    const product_price = document.createElement("h2")
    product_price.innerText = "$ " + toload.price

    const shipping = document.createElement("h3")
    shipping.innerHTML = "Free shipping"
    shipping.style.color = "rgb(41,168,85)"


    const action_div = document.createElement("div")
    action_div.style.display = "flex"
    action_div.style.flexDirection = "column"
    action_div.style.padding = "auto"
    action_div.style.margin = "auto"
    action_div.style.width = "25%"
    action_div.style.height = "70%"

    const quantity = document.createElement("h4")
    quantity.innerHTML = "Quantity :"

    const quantity_box = document.createElement("div")
    quantity_box.style.width = "50%"
    quantity_box.style.height = "7%"
    quantity_box.style.display = "flex"
    quantity_box.style.flexDirection = "row"
    quantity_box.style.justifyContent = "space-around"
    // quantity_box.style.margin = "15%"
    const quantitymeter = document.createElement("div")
    quantitymeter.innerText = toload.quantity
    quantitymeter.style.width = "max-content"
    quantitymeter.style.height = "90%"
    const quantityminus = document.createElement("button")
    quantityminus.innerText = "-"
    quantityminus.id = "minus" + toload.product_id
    // console.log(toload[i].product_id)
    // var id = toload[i].product_id
    // var quant = toload[i].quantity
    // var price = toload[i].price
    quantityminus.addEventListener("click", function () {
        // console.log(quna)
        fetch("/minus", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({ id: toload.product_id, quan: quantitymeter.innerText })
        })
            .then(function (data) {
                console.log(data)
                quantitymeter.innerText = Number(quantitymeter.innerText) - 1
                totitem2.innerText = (totitem2.innerText * 1) - 1
                totamount2.innerHTML = (totamount2.innerText * 1) - (toload.price)

                if(quantitymeter.innerText == 0){
                    product_card_div.removeChild(document.getElementById(toload.product_id))
                }
            })
    })





    const quantityplus = document.createElement("button")
    quantityplus.innerText = "+"
    quantityplus.id = "plus" + toload.product_id

    quantityplus.addEventListener("click", function () {

        fetch("/plus", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({ id: toload.product_id })
        })
            .then(function (data) {
                console.log(data)
                quantitymeter.innerText = Number(quantitymeter.innerText) + 1
                totitem2.innerText = (totitem2.innerText * 1) + 1
                totamount2.innerHTML = (totamount2.innerText * 1) + (toload.price)
            })
    })

    quantity_box.appendChild(quantityminus)
    quantity_box.appendChild(quantitymeter)
    quantity_box.appendChild(quantityplus)


    action_div.appendChild(quantity)
    action_div.appendChild(quantity_box)

    product_name_price.appendChild(product_name)
    product_name_price.appendChild(product_price)
    product_name_price.appendChild(shipping)

    product_card.appendChild(product_pic)

    product_card.appendChild(product_name_price)

    product_card.appendChild(action_div)
    product_card_main.appendChild(product_card)
    product_card_div.appendChild(product_card_main)

    totamount2.innerText = (totamount2.innerText * 1) + (toload.quantity * toload.price)
    totitem2.innerText = (totitem2.innerText * 1) + toload.quantity
}


