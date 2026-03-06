const map = document.getElementById("map")
const image = document.getElementById("locationImage")
const result = document.getElementById("result")

let guess = {x:0, y:0}
let currentLocation
let currentMap

// Liste der Maps
const maps = [
    "maps/theisland.jpg",
]

// Liste mit Bildern und echten Positionen
const locations = [
    {image:"images/location1.jpg", x:300, y:250},
    {image:"images/location2.jpg", x:150, y:420},
    {image:"images/location3.jpg", x:480, y:100},
    {image:"images/location4.jpg", x:420, y:350}
]

// zufällige Map auswählen
function loadRandomMap(){
    const randomIndex = Math.floor(Math.random() * maps.length)
    currentMap = maps[randomIndex]
    map.src = currentMap
}

// zufälligen Ort laden
function loadRandomLocation(){
    const randomIndex = Math.floor(Math.random() * locations.length)
    currentLocation = locations[randomIndex]
    image.src = currentLocation.image
    loadRandomMap()
    clearMarkers()
    result.innerText=""
}

// Klick auf Karte
map.addEventListener("click", function(event){
    const rect = map.getBoundingClientRect()
    guess.x = event.clientX - rect.left
    guess.y = event.clientY - rect.top
    showMarker(guess.x, guess.y)
})

function showMarker(x, y){
    const old = document.querySelector(".marker")
    if(old) old.remove()
    const marker = document.createElement("div")
    marker.className="marker"
    marker.style.left=x+"px"
    marker.style.top=y+"px"
    map.parentElement.appendChild(marker)
}

function showRealMarker(x, y){
    const marker = document.createElement("div")
    marker.className="realMarker"
    marker.style.left=x+"px"
    marker.style.top=y+"px"
    map.parentElement.appendChild(marker)
}

function clearMarkers(){
    const markers = document.querySelectorAll(".marker, .realMarker")
    markers.forEach(m => m.remove())
}

// Bestätigen
function confirmGuess(){
    const distance = Math.sqrt(
        (guess.x-currentLocation.x)**2 +
        (guess.y-currentLocation.y)**2
    )
    result.innerText="Entfernung: "+Math.round(distance)+" Pixel"
    showRealMarker(currentLocation.x, currentLocation.y)
}

// nächste Runde
function nextRound(){
    loadRandomLocation()
}

// Spiel starten
loadRandomLocation()