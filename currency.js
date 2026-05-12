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
    EUR: "EU",
    AUD: "AU",
    GBP: "GB",
    CAD: "CA",
    JPY: "JP",
    CNY: "CN"

};

dropdowns.forEach((select) => {

    select.addEventListener("change", (evt) => {

        updateFlag(evt.target);

    });

});

function updateFlag(element){

    let currCode = element.value;

    let countryCode = countryList[currCode];

    let img = element.parentElement.querySelector("img");

    img.src =
    `https://flagsapi.com/${countryCode}/flat/64.png`;

}

async function updateExchangeRate(){

    let amount = document.querySelector(".amount input");

    let amtVal = amount.value;

    if(amtVal === "" || amtVal < 1){

        amtVal = 1;

        amount.value = "1";

    }

    const URL =
    `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);

    let data = await response.json();

    let rate =
    data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount = amtVal * rate;

    msg.innerText =
    `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;

}

btn.addEventListener("click", (evt)=>{

    evt.preventDefault();

    updateExchangeRate();

});

window.addEventListener("load", ()=>{

    updateExchangeRate();

});