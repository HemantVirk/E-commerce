const product_name = document.getElementById("product_name")
const product_price = document.getElementById("product_price")
const product_info = document.getElementById("product_info")
const product_stock = document.getElementById("product_stock")
const product_pic = document.getElementById("product_pic")
const shelfBtn = document.getElementById("shelf")

shelfBtn.addEventListener("click", function(){
    console.log("Shelfed")
    const formData = new FormData()
    var product_picture = product_pic.files[0]
    // console.log(product_picture)
    // console.log(product_info)
    // var id = Date.now()
    // console.log(id)
    
    formData.append("product_name",product_name.value)
    // formData.append("product_id",Date.now())
    formData.append("product_price",product_price.value)
    formData.append("product_info",product_discription.value)
    formData.append("product_stock",product_stock.value)
    formData.append("product_pic",product_picture)
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