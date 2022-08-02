'use strict';

const SWAPI_URl = 'https://swapi.dev/api';
const category = '/people';
const mainURL = new URL(category, SWAPI_URl);

const search = document.querySelector('.header__search');
const cardList = document.querySelector('.main__list');
const paginationList = document.querySelector('.footer__list');
