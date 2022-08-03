'use strict';

const SWAPI_URL = new URL('/api', 'https://swapi.dev');
const category = '/people';
const mainURL = new URL(SWAPI_URL.pathname + category, SWAPI_URL);

const personParams = {
    name: 'Name',
    birth_year: 'Birth year',
    gender: 'Gender',
    mass: 'Mass',
    height: 'Height',
    skin_color: 'Skin color',
    eye_color: 'Eye color'
};

const hidingElements = document.querySelectorAll('.header__search, .main__nav, .footer');
const cardInfo = document.querySelector('.card-info');

const search = document.querySelector('.header__search');
const cardList = document.querySelector('.main__list');
const paginationList = document.querySelector('.footer__list');
const btnGoBack = document.querySelector('.card-info__button');

init();

let timer;
search.oninput = onSearch;
cardList.onclick = onChooseCardItem;
paginationList.onclick = onChoosePaginationItem;
btnGoBack.onclick = onBack;

async function getData(url, queryParam, queryVal) {
    const queryURL = new URL(url);

    if (queryParam && queryVal) {
        queryURL.searchParams.set(queryParam, queryVal);
    }

    console.log(queryURL.href); // for tests

    const response = await fetch(queryURL.href);

    return await response.json();
}

function init() {
    getData(mainURL).then(drawPage);
}

function onSearch() {
    clearTimeout(timer);
    timer = setTimeout(() => getData(mainURL, 'search', search.value)
        .then(drawPage), 500);
}

function onChooseCardItem(event) {
    const cardItem = event.target.closest('.main__item');

    if (!cardItem) {
        return;
    }

    getData(cardItem.dataset.url).then(drawCardInfo);
}

function onChoosePaginationItem(event) {
    const paginationItem = event.target.closest('.footer__item');

    if (!paginationItem) {
        return;
    }

    getData(mainURL, 'page', paginationItem.textContent).then(drawPage);
}

function onBack() {
    cardInfo.hidden = true;
    hidingElements.forEach(el => el.hidden = false);
}

function drawPage(pageInfo) {
    drawCards(pageInfo.results);
    drawPagination(Math.ceil(pageInfo.count / 10));
}

function drawCards(cardsArr) {
    cardList.innerHTML = cardsArr.reduce((prevPersons, person) => prevPersons + `
        <li data-url="${person.url}" class="main__item">
            <div class="main__description description">
                <p class="description__name">${person.name}</p>
                <p class="description__birth">Birth year: ${person.birth_year}</p>
                <p class="description__gender">Gender: ${person.gender}</p>
            </div>
        </li>
    `, '');
}

function drawPagination(paginationItemsAmount) {
    paginationList.innerHTML = '';

    for (let i = 1; i <= paginationItemsAmount; i++) {
        paginationList.innerHTML += `
            <li class="footer__item ${i === 1 ? 'footer__item_active' : ''}">${i}</li>
        `;
    }
}

function drawCardInfo(personInfo) {
    const cardInfoList = document.querySelector('.card-info__list');

    hidingElements.forEach(el => el.hidden = true);
    cardInfo.hidden = false;
    cardInfoList.innerHTML = Object.keys(personParams)
        .reduce((prevParams, param) => prevParams + `
            <li class=".card-info__item">${personParams[param]} ${personInfo[param]}</li>
        `, '');
}