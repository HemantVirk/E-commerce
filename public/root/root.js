const pic1 = document.getElementById("crouselImg1")
const pic2 = document.getElementById("crouselImg2")
const pic3 = document.getElementById("crouselImg3")
const pic4 = document.getElementById("crouselImg4")
const pic5 = document.getElementById("crouselImg5")

const name1 = document.getElementById("crouselh1")
const name2 = document.getElementById("crouselh2")
const name3 = document.getElementById("crouselh3")
const name4 = document.getElementById("crouselh4")
const name5 = document.getElementById("crouselh5")

const desc1 = document.getElementById("crouselp1")
const desc2 = document.getElementById("crouselp2")
const desc3 = document.getElementById("crouselp3")
const desc4 = document.getElementById("crouselp4")
const desc5 = document.getElementById("crouselp5")

onload()

function onload(){
    fetch("/fetchfive",{
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }, 
        body: JSON.stringify({load: 0})
    })
    .then(function(data){
        return data.json()
        
    })
    .then(data => {
        console.log(data)
        pic1.src = "/productimg/" + data[0].picturename
        pic2.src = "/productimg/" + data[1].picturename
        pic3.src = "/productimg/" + data[2].picturename
        pic4.src = "/productimg/" + data[3].picturename
        pic5.src = "/productimg/" + data[4].picturename 

        name1.innerText = data[0].name
        name2.innerText = data[1].name
        name3.innerText = data[2].name
        name4.innerText = data[3].name
        name5.innerText = data[4].name

        // desc1.innerText = data[0].description
        // desc2.innerText = data[1].description
        // desc3.innerText = data[2].description
        // desc4.innerText = data[3].description
        // desc5.innerText = data[4].description
    })

}


