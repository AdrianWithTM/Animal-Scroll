let dogFact = document.getElementById("Fact");
let foxFact = document.getElementById("Fact");
let catFact = document.getElementById("Fact");
let on = false;
let which = 0;
let constant = 0;
let lever;
let isOnCooldown = false;
let blocker = true;

async function fetchDogData(){

    if (isOnCooldown) return;
    isOnCooldown = true;

    try{
        const response = await fetch(`https://dog.ceo/api/breeds/image/random`);

        const data = await response.json();
        const cutePic = data.message;
        const imgElement = document.getElementById("cutePic");

        imgElement.src = cutePic;

        dogFact.innerHTML = ""

        fetch(`https://dogapi.dog/api/facts`)
        .then(response => response.json())
        .then(data => {dogFact.innerHTML += `${data.facts}`});

    }
    catch(error){
        console.error(error);
    }

    document.getElementById("cdfact").innerHTML = "Dog fact:"

    setTimeout(function(){
        isOnCooldown = false;
    }, 1000);
}


async function fetchCatData() {

    if (isOnCooldown) return;
    isOnCooldown = true;

    try{
        const response = await fetch(`https://api.thecatapi.com/v1/images/search`);

        const data = await response.json();
        const cutePic = data[0].url;
        const imgElement2 = document.getElementById("cutePic");

        imgElement2.src = cutePic;


        dogFact.innerHTML = ""

        fetch(`https://catfact.ninja/fact?max_length=140`)
        .then(response => response.json())
        .then(data => {catFact.innerHTML += `${data.fact}`});

    }
    catch(error){
        console.error(error);
    }

    document.getElementById("cdfact").innerHTML = "Cat fact:";

    setTimeout(function(){
        isOnCooldown = false;
    }, 1000);
}

function autoScroll() {

    console.log("clicked");
    let lever = document.getElementById("autoScrollText");

    if(on === false){
        on = true;
        blocker = true;
        lever.style.color = "white";
        lever.style.background = "hsl(187, 100%, 47%)";
        lever.innerHTML = "Auto Scroll: on";

        if(which === 0){
            fetchDogData();
            which = 1;
        } else {
            fetchCatData();
            which = 0;
        }
        constant = setInterval(function() {
            console.log("4 seconds passed");

            if(which === 0){
                fetchDogData();
                which = 1;
            } else {
                fetchCatData();
                which = 0;
            }

        }, 4000);

    } else {
        on = false;
        blocker = false;
        lever.style.color = "lightgray";
        lever.style.background = "hsl(187, 100%, 39%)";
        lever.innerHTML = "Auto Scroll: off";
        clearInterval(constant);
    }
} 



