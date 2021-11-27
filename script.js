let form = document.querySelector(".shorten-form");
let nav = document.querySelector(".nav");
let menu = document.querySelector(".menu");
let body = document.querySelector("body");
let input = document.querySelector(".shorten-form__input");
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

button.addEventListener('submit', addShortenedLink);

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

function clearInput(){
    document.querySelector(".shorten-form__input").value = "";
}
function addShortenedLink(){
    let mainContainer = document.querySelector(".dynamic-url-shortened")
    let container = document.createElement("div");

    let row = document.createElement("div");
    row.classList.add("row");

    let unshortenedLinkContainer = document.createElement("p");
    unshortenedLinkContainer.classList.add("unshortened-link");

    let shortenedLinkContainer = document.createElement("p");
    shortenedLinkContainer.classList.add("shortened-link");
    
    

    let unshortenedLinkText = document.createTextNode(document.querySelector(".shorten-form__input").value);
    let shortenedLinkText = document.createTextNode("htpps://placeholder.com")
        
    let copyButton = document.createElement("button");
    
    copyButton.textContent = "Copy!";
    unshortenedLinkContainer.appendChild(unshortenedLinkText);
    shortenedLinkContainer.appendChild(shortenedLinkText);
    mainContainer.appendChild(container);
    container.appendChild(unshortenedLinkContainer);
    container.appendChild(row);
    container.appendChild(shortenedLinkContainer);

    
    container.appendChild(copyButton);



    //localStorage.setItem("div1", text)
    clearInput();
}

function setLocalStorageItens(){
localStorage.getItem("div")
}




