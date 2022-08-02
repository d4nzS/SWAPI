'use strict';

const SWAPI_URl = new URL('/api', 'https://swapi.dev');
const category = '/people';
const mainURL = new URL(SWAPI_URl.pathname + category, SWAPI_URl);

const search = document.querySelector('.header__search');
const cardList = document.querySelector('.main__list');
const paginationList = document.querySelector('.footer__list');

init(mainURL);

function init(url) {
    getData(url).then(drawPage);
}

function drawPage(pageInfo) {
    console.log(pageInfo)

    if (pageInfo.count > 0)  {
        const paginationListCount = Math.ceil(pageInfo.count / 10);

        drawCards(pageInfo.results);
        // drawPagination();
    }
}

function drawCards(arr) {
    cardList.innerHTML = arr.reduce((prevPersons, person) => prevPersons += `<li class="main__item">${person.name}</li>`, '')
}

async function getData(url) {
    const response = await fetch(url);

    return await response.json();
}