import {makeAutoObservable} from "mobx";

export default class TestTestCenter {
    constructor(){
        this._types = [
            {id: 1, name: 'Математика'},
            {id: 2, name: 'Оқу сауаттылығы'},
            {id: 3, name: 'Дүниетану'},
            {id: 4, name: 'Тағы бірдеңке'},
        ]
        this._langs = [
            {id: 1, name: 'Қазақ'},
            {id: 2, name: 'Орыс'}
        ]
        this._tests = [
            {id: 1, name: 'Қосу', grade: 1, rating: 5, img: 'http://memesmix.net/media/created/jgkwel.jpg'},
            {id: 2, name: 'Қосу', grade: 1, rating: 5, img: 'http://memesmix.net/media/created/jgkwel.jpg'},
            {id: 3, name: 'Қосу', grade: 1, rating: 5, img: 'http://memesmix.net/media/created/jgkwel.jpg'},
            {id: 4, name: 'Қосу', grade: 1, rating: 5, img: 'http://memesmix.net/media/created/jgkwel.jpg'},
        ]
        this._selectedType = {}

        this._selectedLang = {}
        makeAutoObservable(this); 
    }

    setTypes(types) {
        this._types = types;
    }
    setLang(langs){
        this._langs = langs;
    }
    setTests(tests){
        this._tests = tests;
    }

    setSelectedType(type) {
        this._selectedType = type;
    }
    setSelectedLang(lang) {
        this._selectedLang = lang;
    }

    get types() {
        return this._types;
    }
    get langs() {
        return this._langs;
    }
    get tests() {
        return this._tests;
    }
    get selectedType() {
        return this._selectedType;
    }
    get selectedLang() {
        return this._selectedLang;
    }
}