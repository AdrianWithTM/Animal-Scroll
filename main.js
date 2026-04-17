let dogFact = document.getElementById("Fact");
let foxFact = document.getElementById("Fact");
let catFact = document.getElementById("Fact");
let dogBtn = document.getElementById("rngDog");
let catBtn = document.getElementById("rngCat");
let on = false;
let which = 0;
let constant = 0;
let lever;
let isOnCooldown = false;
let blocker = false;

async function fetchDogData(){

    if (isOnCooldown || blocker) return;

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

    if (isOnCooldown || blocker) return;
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


async function fetchDogData2(){//(Ziņa skolotajam)  Šis ir identisks fetchDogData bet vajadzeja 2 atsevišķus, vienu priekš parestajam pogam, un otru priekš autoscroll funkcijas. Jo citadi es nevareju bloķet tas pogas kamer auto scroll bija aktīvs nesabojajot autoscroll funkciju.

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


async function fetchCatData2() {//(Ziņa skolotajam) Šis ir identisks fetchCatData bet vajadzeja 2 atsevišķus, vienu priekš parestajam pogam, un otru priekš autoscroll funkcijas. Jo citadi es nevareju bloķet tas pogas kamer auto scroll bija aktīvs nesabojajot autoscroll funkciju.

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

    let lever = document.getElementById("autoScrollText");

    if(on === false){
        on = true;
        blocker = true;
        console.log("Blocker true");
        lever.style.color = "white";
        lever.style.background = "hsl(187, 100%, 47%)";
        lever.innerHTML = "Auto Scroll: on";
        
        catBtn.textContent = 'Blocked';
        catBtn.style.color = "lightgray";
        catBtn.style.background = "hsl(187, 100%, 39%)";
        dogBtn.textContent = 'Blocked';
        dogBtn.style.color = "lightgray";
        dogBtn.style.background = "hsl(187, 100%, 39%)";

        if(which === 0){
            fetchDogData2();
            which = 1;
        } else {
            fetchCatData2();
            which = 0;
        }
        constant = setInterval(function() {

            if(which === 0){
                fetchDogData2();
                which = 1;
            } else {
                fetchCatData2();
                which = 0;
            }

        }, 4000);

    } else {
        on = false;
        blocker = false;
        console.log("Blocker false");
        lever.style.color = "lightgray";
        lever.style.background = "hsl(187, 100%, 39%)";
        lever.innerHTML = "Auto Scroll: off";

        catBtn.textContent = 'Random Cat';
        catBtn.style.color = "white";
        catBtn.style.background = "hsl(187, 100%, 47%)";
        dogBtn.textContent = 'Random Dog';
        dogBtn.style.color = "white";
        dogBtn.style.background = "hsl(187, 100%, 47%)";

        clearInterval(constant);
    }
} 



