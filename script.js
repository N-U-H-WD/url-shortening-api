let form = document.querySelector(".shorten-form");
let nav = document.querySelector(".nav");
let menu = document.querySelector(".menu");
let body = document.querySelector("body");
var input = document.querySelector(".shorten-form__input");
let button = document.querySelector(".shorten-form__button");

input.addEventListener('invalid', () => {
    var invalidMessage = input.nextElementSibling;
    invalidMessage.style.display = "flex";
    input.style.border = "3px solid var(--red)";
})

input.addEventListener('input', () => {
    var invalidMessage = input.nextElementSibling;
    invalidMessage.style.display = 'none';
    input.style.border = "1px solid hsl(0, 0%, 75%)";
})

form.addEventListener('submit', addShortenedLink);

//Menu

function acionaMenu() {
    if (nav.style.width == "335px")
        closeMenu();
    else
        openMenu();
}

function openMenu() {
    nav.style.width = "335px";
    nav.style.display = "flex";
    nav.style.flexDirection = "column";
    menu.style.color = "var(--very-dark-blue)"
    body.classList.toggle("body--disable");
}

function closeMenu() {
    nav.style.width = "0";
    nav.style.display = "none";
    body.classList.toggle("body--disable");
    menu.style.color = "var(--grayish-violet)"
}

let divCount = 0;

function clearInput() {
    document.querySelector(".shorten-form__input").value = "";
}
function addShortenedLink() {   

    //HTTP Request
    var request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://api.shrtco.de/v2/shorten?url=' + document.querySelector(".shorten-form__input").value, true)


    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        console.log(data.ok);
        if (data.ok) {

            if (divCount > 2) {
                let elem = document.querySelector("div[id^=div]");
                elem.remove();
            }
            
            let mainContainer = document.querySelector(".dynamic-url-shortened")
            let container = document.createElement("div");
            container.setAttribute("id", `div${divCount}`);

            let row = document.createElement("div");
            row.classList.add("row");

            let unshortenedLinkContainer = document.createElement("p");
            unshortenedLinkContainer.classList.add("unshortened-link");
            unshortenedLinkContainer.value = input.value;
            var shortenedLinkText = document.createTextNode(data.result.short_link);
            
            let shortenedLinkContainer = document.createElement("p");
            shortenedLinkContainer.classList.add("shortened-link");
            shortenedLinkContainer.appendChild(shortenedLinkText);

            let unshortenedLinkText = document.createTextNode(document.querySelector(".shorten-form__input").value);

            let copyButton = document.createElement("button");            
            copyButton.textContent = "Copy!";
            copyButton.classList.add("unshortened-link");
            copyButton.addEventListener("click", function() {
                let div = copyButton.parentNode
                let shortenedLink = div.querySelector(".shortened-link");
                navigator.clipboard.writeText(shortenedLink.innerHTML);
            });

            unshortenedLinkContainer.appendChild(unshortenedLinkText);
            mainContainer.appendChild(container);
            container.appendChild(unshortenedLinkContainer);
            container.appendChild(row);
            container.appendChild(shortenedLinkContainer);
            copyButton.addEventListener("click", copyToClipboard())
            container.appendChild(copyButton);

            divCount++;

            clearInput();
        } else {
            var invalidMessage = input.nextElementSibling;
            invalidMessage.style.display = "flex";
            input.style.border = "3px solid var(--red)";
        }
    }
    // Send request
    request.send();


}
function setLocalStorageItens() {
    localStorage.getItem("div")
}
function copyToClipboard() {
    let text = document.querySelector(".shortened-link").innerHTML;
    navigator.clipboard.writeText(text);
}