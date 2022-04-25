// Focus div based on nav button click
function reveal(divName) {
    let divs = document.querySelectorAll("div:not(#resultsTable)");
    divs.forEach(section => {
        section.setAttribute("class", "hidden");
    });
    document.getElementById(divName).setAttribute("class", "");
}

// Flip one coin and show coin image to match result when button clicked
async function flipCoin(event) {
    event.preventDefault();
    
    const endpoint = "app/flip/";
    const url = document.baseURI+endpoint;

    const formEvent = event.currentTarget;

    try {
        const formData = new FormData(formEvent);
        const result = await sendData({ url, formData });

        console.log(result);
        document.getElementById("side").innerHTML = "Result: " + result.flip;
        document.getElementById("sideImg").setAttribute("src", "./assets/img/" + result.flip + ".png");
    } catch (error) {
        console.log(error);
    }
}

// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series
async function flipCoins(event) {
    event.preventDefault();
    
    const endpoint = "app/flip/coins/";
    const url = document.baseURI+endpoint;

    const formEvent = event.currentTarget;

    try {
        const formData = new FormData(formEvent);
        const flips = await sendData({ url, formData });

        console.log(flips);

        let coinsFlipped = "";
        for (var i = 0; i < flips.summary.heads; i++) {
            coinsFlipped += "<img class='smallcoin' src='./assets/img/heads.png'>"
        }
        for (var i = 0; i < flips.summary.tails; i++) {
            coinsFlipped += "<img class='smallcoin' src='./assets/img/tails.png'>"
        }

        document.getElementById("heads").innerHTML = "Heads: "+flips.summary.heads;
        document.getElementById("tails").innerHTML = "Tails: "+flips.summary.tails;
        document.getElementById("resultsTable").innerHTML = coinsFlipped;
    } catch (error) {
        console.log(error);
    }
}


// Guess a flip by clicking either heads or tails button
async function guessFlip(event) {
    event.preventDefault();
    
    const endpoint = "app/flip/call/";
    const url = document.baseURI+endpoint;

    const formEvent = event.currentTarget;

    try {
        const formData = new FormData(formEvent);
        const results = await sendData({ url, formData });

        console.log(results);
        document.getElementById("call").innerHTML = "Call: "+ results.call;
        document.getElementById("callImg").setAttribute("src", "./assets/img/" + results.call + ".png");
        document.getElementById("flip").innerHTML = "Flip: "+ results.flip;
        document.getElementById("flipImg").setAttribute("src", "./assets/img/" + results.flip + ".png");
        document.getElementById("result").innerHTML = "Result: "+ results.result;
    } catch (error) {
        console.log(error);
    }
}

// Create a data sender
async function sendData({ url, formData }) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJson = JSON.stringify(plainFormData);
    console.log(formDataJson);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: formDataJson
    };

    const response = await fetch(url, options);
    return response.json();
}