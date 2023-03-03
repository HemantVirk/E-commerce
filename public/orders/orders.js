// const ejs = require("ejs");
const container = document.getElementById("container")
// var track = ejs.render("trackline")
getorder()

function getorder(){
    fetch("/getorders",{
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        // body: JSON.stringify({shipping_address: address.value})
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data)
        // console.log(data.length)
        showcards(data)
    })
}

function showcards(data){
    const timelineHTML = `
  <div class="row">
    <div class="col-lg-12">
      <div class="horizontal-timeline">
        <ul class="list-inline items d-flex justify-content-between">
          <li class="list-inline-item items-list">
            <p id="ord" class="py-1 px-2 rounded text-white" style="background-color: #f37a27;">Ordered</p>
          </li>
          <li class="list-inline-item items-list">
            <p id="ship" class="py-1 px-2 rounded text-white" style="background-color: #f37a27;">Shipped</p>
          </li>
          <li class="list-inline-item items-list">
            <p id="on" class="py-1 px-2 rounded text-white" style="background-color: #f37a27;">On the way</p>
          </li>
          <li class="list-inline-item items-list text-end" style="margin-right: 8px;">
            <p id="del" style="margin-right: -8px;">Delivered</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
`;
    var totalamountvalue = 0
    var totalcountvalue = 0
    for(var i=0 ; i<data.length ; i++){
        // var ord = timelineHTML.getElementById("ord")
        // // console.log(ord)
        // var ship = document.getElementById("ship")
        // var on = document.getElementById("on")
        // var del = document.getElementById("del")
        if(i==0 || data[i].order_id != data[i-1].order_id){
            totalamountvalue = 0
            totalcountvalue = 0
            const card = document.createElement("div")
            card.className = "card"
            var left = document.createElement("div")
            left.className = "left"
            const items = document.createElement("h4")
            items.className = "items"
            items.innerText = "Order Items"
            const right = document.createElement("div")
            right.className = "right"
            // const devider = document.createElement("div")
            // devider.className = "devider"
            
            container.appendChild(card)
            card.appendChild(left)
            // card.appendChild(devider)
            left.appendChild(items)
            card.appendChild(right)

            const itemdiv = document.createElement("div")
            itemdiv.className = "itemdiv"
            const itempic = document.createElement("img")
            itempic.className = "itempic"
            itempic.src = "/productimg/" + data[i].picturename
            const iteminfo = document.createElement("div")
            iteminfo.className = "iteminfo"
            const itemname = document.createElement("h5")
            itemname.className = "itemname"
            itemname.innerText = data[i].name
            const itemcount = document.createElement("h6")
            itemcount.className = "itemcount"
            itemcount.innerText = "Quantity : " + data[i].product_quantity
            const itemprice = document.createElement("h6")
            itemprice.className = "itemprice"
            totalamountvalue = totalamountvalue + data[i].product_amount * data[i].product_quantity
            totalcountvalue = totalcountvalue + data[i].product_quantity
          
            itemprice.innerText = "Price : $" + data[i].product_amount * data[i].product_quantity
            itemdiv.appendChild(itempic)
            iteminfo.appendChild(itemname)
            iteminfo.appendChild(itemcount)
            iteminfo.appendChild(itemprice)
            itemdiv.appendChild(iteminfo)
            left.appendChild(itemdiv)

            const totals = document.createElement("div")
            totals.className = "totals"
            right.appendChild(totals)

            var totalamount = document.createElement("h5")
            totalamount.className = "totalamount"
            totalamount.innerText = "Total : $" + totalamountvalue
            var totalcount = document.createElement("h5")
            totalcount.className = "totalcount"
            totalcount.innerText =  "Quantity : " + totalcountvalue
            var address = document.createElement("h5")
            address.innerText = "Address : " + data[i].address
            totals.appendChild(totalamount)
            totals.appendChild(totalcount)
            totals.appendChild(address)
            const track = document.createElement("div")
            track.className = "track"
            track.innerHTML = timelineHTML
            right.appendChild(track)
            // if(data[i].status == 0){
            //     document.getElementById("ord").style.backgroundColor = "#f37a27"
            //     // document.getElementById("ship").className = "list-inline-item items-list text-end"
            //     document.getElementById("ship").style.backgroundColor = "white"
            //     // document.getElementById("ship").style.color = "rgb(123,131,139)"
            //     // document.getElementById("on").className = "list-inline-item items-list text-end"
            //     document.getElementById("on").style.backgroundColor = "white"
            //     // document.getElementById("on").style.color = "rgb(123,131,139)"

            //     // document.getElementById("del").className = "list-inline-item items-list"
            //     // document.getElementById("del").style.backgroundColor = "#f37a29"
            //     // document.getElementById("del").style.color = "rgb(123,131,139)"
            // }
            
        }
        else{
            const itemdiv = document.createElement("div")
            itemdiv.className = "itemdiv"
            const itempic = document.createElement("img")
            itempic.className = "itempic"
            itempic.src = "/productimg/" + data[i].picturename
            const iteminfo = document.createElement("div")
            iteminfo.className = "iteminfo"
            const itemname = document.createElement("h5")
            itemname.className = "itemname"
            itemname.innerText = data[i].name
            const itemcount = document.createElement("h6")
            itemcount.className = "itemcount"
            itemcount.innerText = "Quantity : " + data[i].product_quantity
            const itemprice = document.createElement("h6")
            itemprice.className = "itemprice"
            itemprice.innerText = "Price : $" + data[i].product_amount * data[i].product_quantity
            totalamountvalue = totalamountvalue + data[i].product_amount * data[i].product_quantity
            totalcountvalue = totalcountvalue + data[i].product_quantity
            
            itemdiv.appendChild(itempic)
            iteminfo.appendChild(itemname)
            iteminfo.appendChild(itemcount)
            iteminfo.appendChild(itemprice)
            itemdiv.appendChild(iteminfo)
            left.appendChild(itemdiv)
            totalamount.innerText = "Total : $" + totalamountvalue
            totalcount.innerText = "Quantity : " + totalcountvalue
            
        }
        
    }
}