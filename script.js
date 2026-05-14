const BASE_URL =
"https://latest.currency-api.pages.dev/v1/currencies";

const btn = document.querySelector("button");

const fromCurr = document.querySelector(".from select");

const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");

const dropdowns = document.querySelectorAll("select");

const countryList = {

    USD: "US",
    INR: "IN",
    EUR: "FR",
    AUD: "AU",
    GBP: "GB",
    CAD: "CA",
    JPY: "JP",
    CNY: "CN"

};

// CHANGE FLAG + UPDATE RATE WHEN DROPDOWN CHANGES

dropdowns.forEach((select) => {

    select.addEventListener("change", (evt) => {

        updateFlag(evt.target);

        updateExchangeRate();

    });

});

// UPDATE FLAG FUNCTION

function updateFlag(element){

    let currCode = element.value;

    let countryCode = countryList[currCode];

    let img = element.parentElement.querySelector("img");

    img.src =
    `https://flagsapi.com/${countryCode}/shiny/64.png`;

}

// FETCH EXCHANGE RATE

async function updateExchangeRate(){

    let amount = document.querySelector(".amount input");

    let amtVal = amount.value;

    if(amtVal === "" || amtVal < 1){

        amtVal = 1;

        amount.value = "1";

    }

    const URL =
    `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    try{

        let response = await fetch(URL);

        let data = await response.json();

        let rate =
        data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

        let finalAmount = amtVal * rate;

        msg.innerText =
        `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;

    }

    catch(error){

        msg.innerText = "Something went wrong!";

    }

}

// BUTTON CLICK

btn.addEventListener("click", (evt)=>{

    evt.preventDefault();

    updateExchangeRate();

});

// PAGE LOAD

window.addEventListener("load", ()=>{

    updateExchangeRate();

});