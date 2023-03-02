const product_name = document.getElementById("product_name")
const product_price = document.getElementById("product_price")
const product_info = document.getElementById("product_info")
const product_stock = document.getElementById("product_stock")
const product_pic = document.getElementById("product_pic")
const shelfBtn = document.getElementById("shelf")
const shelfForm = document.getElementById("shelfForm")
const listedproducts = document.getElementById("listedproducts")
var popupContent = []
shelf()

shelfBtn.addEventListener("click", function () {
    console.log("Shelfed")
    const formData = new FormData()
    var product_picture = product_pic.files[0]


    formData.append("product_name", product_name.value)
    // formData.append("product_id",Date.now())
    formData.append("product_price", product_price.value)
    formData.append("product_info", product_discription.value)
    formData.append("product_stock", product_stock.value)
    formData.append("product_pic", product_picture)
    console.log(...formData)
    fetch("/product_shelfing",
        {
            method: "POST",
            body: formData
        })
        .then(function (res) { return res.text() })
        .then(function (data) {
            // if (data != "err") {
            //     window.location.href = "/successvendorlogin"
            // }
            console.log("ysss")
            console.log(data)
            window.location.href = "/successvendorlogin"
        }
        )

})


function shelf() {
    console.log("shelf see")
    fetch("/fetch_shelf",
        {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },

        })
        .then(function (res) { return res.json() })
        .then(function (data) {
            for (var i = 0; i < data.length; i++) {
                popupContent.push(data[i]);
                // if(data[i].stock < 0){
                //     i++
                //     continue;
                // }
                const product_card = document.createElement("div")
                product_card.style.display = "flex"
                product_card.style.flexDirection = "row"
                product_card.style.width = "90%"
                product_card.style.maxHeight = "40%"
                product_card.style.padding = "3%"
                product_card.style.margin = "5% auto 0% auto"
                product_card.style.backgroundColor = "rgb(255,255,255)"

                product_card.style.borderBottom = "solid"
                product_card.style.borderWidth = "2px"
                product_card.style.borderColor = "rgb(200,200,200)"
                product_card.style.overflow = "hidden"
                // product_card.style.borderRadius = "10px"

                const imgdiv = document.createElement("div")
                imgdiv.className = "imgdiv"
                imgdiv.style.minWidth = "10%"
                imgdiv.style.display = "flex"

                // imgdiv.style.justifyContent = "space-between"
                imgdiv.style.flexDirection = "row"
                imgdiv.style.minHeight = "100%"

                const imgleft = document.createElement("div")
                imgleft.style.minHeight = "65%"
                imgleft.style.maxHeight = "65%"
                imgleft.style.marginLeft = "10%"
                imgleft.style.marginTop = "5%"
                imgleft.style.backgroundColor = "rgb(252,241,240)"
                imgleft.style.minWidth = "20%"

                const product_pic = document.createElement("img")
                product_pic.width = "100"
                product_pic.height = "100"
                product_pic.style.maxWidth = "200px"
                product_pic.src = "/productimg/" + data[i].picturename

                product_pic.style.borderRadius = "2%"
                // product_pic.style.margin = "auto"
                const imgright = document.createElement("div")
                imgright.style.minHeight = "65%"
                imgright.style.maxHeight = "65%"
                // imgright.style.marginLeft = "10%"
                imgright.style.marginTop = "5%"
                imgright.style.backgroundColor = "rgb(252,241,240)"
                imgright.style.minWidth = "20%"

                const product_name_price = document.createElement("div")
                product_name_price.style.display = "flex"
                product_name_price.style.flexDirection = "column"
                product_name_price.style.width = "50%"
                product_name_price.style.marginLeft = "20%"
                product_name_price.style.height = "70%"
                product_name_price.style.backgroundColor = "white"

                const product_name = document.createElement("h4")
                product_name.innerText = data[i].name

                const product_price = document.createElement("h6")
                product_pic.style.color = "grey";
                product_price.innerText = "$ " + data[i].price

                const divider = document.createElement("vl")
                divider.style.backgroundColor = "black"
                divider.style.height = "80%"
                divider.style.width = "20px"


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
                details.style.backgroundColor = "rgb(240,111,16)"
                details.onclick = function () { showdetails(this.id) }
                details.style.height = "25%"
                details.style.color = "white"
                details.style.border = "none"
                details.style.borderRadius = "25px"
                details.style.marginBottom = "5%"
                details.innerText = "Details"
                details.style.boxShadow = "2px 2px 5px rgba(240,111,16, 0.9)"

                const add_to_list = document.createElement("button")
                add_to_list.style.width = "80%"
                add_to_list.style.height = "25%"
                add_to_list.style.borderRadius = "25px"
                add_to_list.style.marginTop = "5px"
                add_to_list.style.borderColor = "rgb(200,200,200)"
                add_to_list.style.backgroundColor = "white"
                add_to_list.id = data[i].product_id
                add_to_list.onclick = function () { edit(this.id) }
                add_to_list.innerText = "Edit"

                const remove = document.createElement("button")
                remove.style.width = "80%"
                remove.style.height = "25%"
                remove.style.borderRadius = "25px"
                remove.style.marginTop = "5px"
                remove.style.borderColor = "rgb(200,200,200)"
                remove.style.backgroundColor = "white"
                remove.id = data[i].product_id
                remove.onclick = function () { removeitem(this.id) }
                remove.innerText = "Remove"



                product_name_price.appendChild(product_name)
                product_name_price.appendChild(product_price)
                // product_name_price.appendChild(shipping)

                imgdiv.appendChild(imgleft)
                imgdiv.appendChild(product_pic)
                imgdiv.appendChild(imgright)

                product_card.appendChild(imgdiv)
                // product_card.appendChild(product_pic)

                action_div.appendChild(details)
                action_div.appendChild(add_to_list)
                action_div.appendChild(remove)

                product_card.appendChild(product_name_price)
                product_card.appendChild(divider)

                product_card.appendChild(action_div)

                const slantedDiv = document.createElement('div');
                product_card.appendChild(slantedDiv)
                // slantedDiv.style.position = 'absolute';
                slantedDiv.style.top = '0';
                slantedDiv.style.right = '0';
                slantedDiv.style.width = '35%';
                slantedDiv.style.height = '10%';
                slantedDiv.style.lineHeight = '50px';
                // slantedDiv.style.backgroundColor = 'green';
                slantedDiv.style.textAlign = 'center';
                slantedDiv.style.margin = "8% -9% 0 0%"
                slantedDiv.style.transform = 'rotate(45deg)'
                slantedDiv.style.transformOrigin = 'top right';
                slantedDiv.style.color = 'white';
                slantedDiv.style.fontWeight = 'bold';
                slantedDiv.style.zIndex = '1';
                slantedDiv.textContent = quan(data,i,slantedDiv)

                listedproducts.appendChild(product_card)
            }

        }
        )
}
function quan(data,i,view){
    if(data[i].stock > 0){ view.style.backgroundColor = "green"
    return "in stock";}
    else if(data[i].stock == 0){ view.style.backgroundColor = "red"
     return "Out of Stock"}
    else{view.style.backgroundColor = "red"
    return "Removed"}
}

var modal = document.getElementById('myModal')
var body = document.getElementsByTagName('body')
var btnClose = document.getElementById("closeModal")
var popupPicture = document.getElementById("popupPicture")
var popupitemprice = document.getElementById("popupitemprice")
var popupitemname = document.getElementById("popupitemname")
var popupitemdiscription = document.getElementById("popupitemdiscription")
function showdetails(id) {
    console.log("Details clicked")
    console.log(modal)
    console.log(id)
    // console.log(popupContent)
    modal.style.display = "flex";
    modal.style.flexDirection = "column"
    setTimeout(function () {
        // product_card_div.className = "MainContainer is-blurred";
        // product_card_div.style.filter = "blur(2px)"
        // product_card_div.style.webkitFilter = "blur(2px)"
        modal.className = "Modal";
    }, 100);
    container.parentElement.className = "ModalOpen";
    btnClose.onclick = function () {
        modal.style.display = "none";
        body.className = "";
        // product_card_div.style.filter = "blur(0px)"
        container.className = "MainContainer";
        container.parentElement.className = "";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.className = "Modal is-hidden";
            body.className = "";
            // product_card_div.style.filter = "blur(0px)"
            container.className = "MainContainer";
            container.parentElement.className = "";
        }
    }
    var name
    var price
    var discription
    var pic
    for (var i = 0; i < popupContent.length; i++) {
        if (popupContent[i].product_id == id) {
            name = popupContent[i].name
            price = popupContent[i].price
            pic = popupContent[i].picturename
            discription = popupContent[i].description
        }
    }
    popupitemname.innerText = name
    popupitemdiscription.innerText = discription
    popupPicture.src = "/productimg/" + pic
    popupitemprice.innerText = "$ " + price
}

function edit(id) {

    fetch("/fetchtoedit", {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ id: id })
    })
        .then(function (res) { return res.json() })
        .then(function (data) {
            console.log(data[0])
            product_name.value = data[0].name
            product_discription.value = data[0].description
            product_price.value = data[0].price
            product_stock.value = data[0].stock
            shelfBtn.style.display = "none"
            const updateBtn = document.createElement("button")
            updateBtn.className = "btn btn-dark m-auto"
            updateBtn.innerText = "Update"
            shelfForm.appendChild(updateBtn)
            console.log(id)


            updateBtn.addEventListener("click", function () {

                console.log("update initiated")
                const formData = new FormData()
                var product_picture = product_pic.files[0]


                formData.append("product_name", product_name.value)
                // formData.append("product_id",Date.now())
                formData.append("product_price", product_price.value)
                formData.append("product_info", product_discription.value)
                formData.append("product_stock", product_stock.value)
                formData.append("product_pic", product_picture)
                console.log(id)
                formData.append("product_id", id)
                console.log(...formData)
                fetch("/product_updating",
                    {
                        method: "POST",
                        body: formData
                    })
                    .then(function (res) { return res.text() })
                    .then(function (data) {
                        console.log("ysss")
                        console.log(data)
                        window.location.href = "/successvendorlogin"
                    }
                    )
            })
        })
}

function removeitem(id) {
    console.log("removing")
    fetch("/product_remove",
        {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }, 
            body: JSON.stringify({id: id})
        })
        .then(function (res) { return res.text() })
        .then(function (data) {
            console.log("ysss")
            console.log(data)
            // window.location.href = "/successvendorlogin"
        }
    )


    
}
