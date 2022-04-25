// Focus div based on nav button click
function reveal(divName) {
    let divs = document.querySelectorAll("div");
    divs.forEach(section => {
        section.setAttribute("class", "hidden");
    });
    document.getElementById(divName).setAttribute("class", "");
}

// Flip one coin and show coin image to match result when button clicked

// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series
async function flipCoins(event) {
    event.preventDefault();
    
    const endpoint = "app/flip/coins/"
    const url = document.baseURI+endpoint

    const formEvent = event.currentTarget

    try {
        const formData = new FormData(formEvent);
        const flips = await sendFlips({ url, formData });

        console.log(flips);
        document.getElementById("heads").innerHTML = "Heads: "+flips.summary.heads;
        document.getElementById("tails").innerHTML = "Tails: "+flips.summary.tails;
    } catch (error) {
        console.log(error);
    }
}
// Create a data sender
async function sendFlips({ url, formData }) {
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
    return response.json()
}
// Guess a flip by clicking either heads or tails button
