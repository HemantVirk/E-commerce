const product_card_div = document.getElementById("product_card_div")
const checkout_box = document.getElementById("checkout_box")
const confirm_order = document.getElementById("confirm_order")
const address = document.getElementById("address")
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
checkout_button.style.marginLeft = "10%"
checkout_button.style.marginBottom = "5%"
checkout_button.style.borderRadius = "25px"
checkout_button.style.border = "none"
checkout_button.style.color = "white"
checkout_button.style.boxShadow = "2px 2px 5px rgba(240,111,16, 0.9)"
checkout_button.style.backgroundColor = "rgb(240,111,16)"
// checkout_button.onclick = function () {  }
checkout_button.innerText = "Proceed to checkout"
checkout_box.appendChild(checkout_button)

onload()

function checkquan(view, toload) {
    fetch("/quantity", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ id: toload.product_id })
    })
        .then(function (res) { return res.text() })
        .then(function (data) {
            view.innerText = "Available Stock : " + data
        })
}

// var to;

function onload() {
    fetch("/mycart", {
        method: "POST",
    })
        .then(function (data) {
            return data.json()
        })
        .then(function (data) {
            if (data.error == "error") {
                alert("Some Error occured")
            }
            else {
                data.forEach(toload => {
                    // to = toload.product_id
                    // console.log(toload.product_id)
                    showitems(toload)
                });
            }

        })
}
// console.log(to)
const product_card_main = document.createElement("div")
product_card_main.style.display = "flex"
product_card_main.style.flexDirection = "column"
product_card_main.id = "product_card_main"
product_card_main.style.width = "90%"
product_card_main.style.height = "5%"
product_card_main.style.padding = "3%"
product_card_main.style.margin = "10% 10% 0% 5%"
product_card_main.style.backgroundColor = "white"
product_card_main.style.borderRadius = "3%"

product_card_main.innerHTML = `
    <h2 >Your Cart</h2>
    <hr>`


function showitems(toload) {

    const product_card = document.createElement("div")
    product_card.style.display = "flex"
    product_card.id = "toload.product_id"
    product_card.style.flexDirection = "row"
    product_card.style.width = "70%"
    product_card.style.height = "5%"
    product_card.style.padding = "3%"
    product_card.id = toload.product_id
    product_card.style.margin = "5% 10% 0% 10%"
    product_card.style.backgroundColor = "white"
    product_card.style.borderBottomStyle = "solid"

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


    const product_name = document.createElement("h3")
    product_name.innerText = toload.name

    const product_price = document.createElement("h4")
    product_price.innerText = "$ " + toload.price

    const shipping = document.createElement("h6")
    shipping.innerHTML = checkquan(shipping, toload)
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
    quantitymeter.style.fontSize = "20px"
    quantitymeter.style.height = "100%"
    quantitymeter.style.marginLeft = "4%"
    quantitymeter.style.marginRight = "4%"
    const quantityminus = document.createElement("button")
    quantityminus.innerText = "-"
    quantityminus.style.borderRadius = "50%"
    quantityminus.style.color = "white"
    quantityminus.style.border = "none"
    quantityminus.style.padding = "8% 16% 8% 16%"
    quantityminus.style.backgroundColor = "rgb(240,111,16)"
    quantityminus.id = "minus" + toload.product_id

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

                quantitymeter.innerText = Number(quantitymeter.innerText) - 1
                totitem2.innerText = (totitem2.innerText * 1) - 1
                totamount2.innerHTML = (totamount2.innerText * 1) - (toload.price)

                if (quantitymeter.innerText == 0) {
                    product_card_main.removeChild(document.getElementById(toload.product_id))
                }
            })
    })





    const quantityplus = document.createElement("button")
    quantityplus.innerText = "+"
    quantityplus.id = "plus" + toload.product_id
    quantityplus.style.border = "none"
    quantityplus.style.borderRadius = "50%"
    quantityplus.style.color = "white"
    quantityplus.style.padding = "8% 16% 8% 16%"
    quantityplus.style.backgroundColor = "rgb(240,111,16)"

    quantityplus.addEventListener("click", function () {

        if (Number(shipping.innerText.match(/\d+/)) == Number(quantitymeter.innerText)) {
            alert("Max Stock reached")
        }
        else {
            fetch("/plus", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({ id: toload.product_id })
            })
                .then(function (data) {

                    quantitymeter.innerText = Number(quantitymeter.innerText) + 1
                    totitem2.innerText = (totitem2.innerText * 1) + 1
                    totamount2.innerHTML = (totamount2.innerText * 1) + (toload.price)
                })
        }
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



checkout_box.addEventListener("click", function () {
    // var data = {
    //     totalamount: totamount2.innerText,
    //     totalitems: totitem2.innerText
    // }
    console.log("yess")
    fetch("/mycart", {
        method: "POST",
    })
        .then(function (data) {
            return data.json()
        })
        .then(function (data) {
            if (data.error == "error") {
                alert("Some Error occured")
            }
            else {
                var modal = document.getElementById('myModal')
                console.log(modal)
                var body = document.getElementsByTagName('body')
                var left = document.getElementById("left")
                var h5itemcount = document.getElementById("h5itemcount")
                var h5itemcountval = 0;
                var h5totalamount = document.getElementById("h5totalamount")
                var h5totalamountval = 0;
                
                // var right = document.getElementById("right")
                // var btnClose = document.getElementById("closeModal")

                showorderdetails(data)

                
                function showorderdetails(data) {
                   
                    modal.style.display = "block";
                    console.log(modal)
                    setTimeout(function () {
                        // product_card_div.className = "MainContainer is-blurred";
                        product_card_div.style.filter = "blur(2px)"
                        product_card_div.style.webkitFilter = "blur(2px)"
                        modal.className = "Modal";
                    }, 100);
                    container.parentElement.className = "ModalOpen";
                    data.forEach(toload => {
                        console.log(toload)
                        const itemarea = document.createElement("div")
                        itemarea.className = "itemarea"
                        // itemarea.style.display = "flex"
                        // itemarea.style.flexDirection = "row"
                        itemarea.style.marginLeft = "20%"
                        const iteminfo = document.createElement("div")
                        iteminfo.className = "iteminfo"
                        const orderitemname = document.createElement("h6")
                        orderitemname.innerText = "Name : " + toload.name
                        const orderitemprice = document.createElement("h6")
                        orderitemprice.innerText = "Price : $ " + toload.price
                        const orderitemamount = document.createElement("h6")
                        orderitemamount.innerText = "Quantity : "  + toload.quantity
                        iteminfo.appendChild(orderitemname)
                        iteminfo.appendChild(orderitemprice)
                        iteminfo.appendChild(orderitemamount)
                        const pic = document.createElement("img")
                        pic.className = "pic"
                        pic.src = "/productimg/" + toload.picturename
                        itemarea.appendChild(pic)
                        itemarea.appendChild(iteminfo)
                        left.append(itemarea)
                        h5itemcountval+=toload.quantity
                        h5totalamountval+=toload.price
                    });
                    h5itemcount.innerText = "Total Items : " + h5itemcountval
                
                    h5totalamount.innerText = "Toatal Amount = $ " + h5totalamountval
                    
                }
            }

        })

})


confirm_order.addEventListener("click", function(){
    console.log("allocate")
    fetch("/order",{
        method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({shipping_address: address.value})
    })
    .then(function (res) {  return res.text()  })
    .then(data => {

        if(data == 200){
            window.location.href = "/ordertrack"
        }
    }
    )

})