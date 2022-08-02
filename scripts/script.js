'use strict';

const SWAPI_URl = new URL('/api', 'https://swapi.dev');
const category = '/people';
const mainURL = new URL(SWAPI_URl.pathname + category, SWAPI_URl);

const search = document.querySelector('.header__search');
const cardList = document.querySelector('.main__list');
const paginationList = document.querySelector('.footer__list');

init(mainURL);

paginationList.onclick = onChoosePaginationItem;

async function getData(queryParam, queryVal) {
    const queryURL = new URL(mainURL.href);

    if (queryParam && queryVal) {
        queryURL.searchParams.set(queryParam, queryVal);
    }

    console.log(queryURL.href); // for tests

    const response = await fetch(queryURL.href);

    return await response.json();
}

function init() {
    getData('', '').then(drawPage);
}

function onChoosePaginationItem(event) {
    const paginationItem = event.target.closest('.footer__item');

    if (!paginationItem) {
        return;
    }

    getData('page', paginationItem.textContent).then(drawPage);
}

function drawPage(pageInfo) {
    if (pageInfo.count > 0)  {
        drawCards(pageInfo.results);
        drawPagination(Math.ceil(pageInfo.count / 10));
    }
}

function drawCards(cardsArr) {
    cardList.innerHTML = cardsArr.reduce((prevPersons, person) => prevPersons + `
        <li class="main__item">${person.name}</li>
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