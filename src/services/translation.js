import { ES_AR, EN_US } from "../enums/languages";

const PROJECT_ID = '58';

let translations = null;
let language = ES_AR

export async function getTranslations(lang = language, callback){
    localStorage.clear();
    language = lang;

    if(language === ES_AR){
        return;
    }

    return await 
    fetch(`https://traduci-la-strapi.herokuapp.com/api/translations/${PROJECT_ID}/${language}`)
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('translations', JSON.stringify(data));
        translations = data;
        if(callback) callback()
    });
   
}

export function getPhrase(key) {
    if (!translations) {
        const locals = localStorage.getItem('translations');
        translations = locals ? JSON.parse(locals) : null;
    }
 
 
    let phrase = key;
    if (translations && translations[key]) {
        phrase = translations[key];
    }

    return phrase;

}

function isAllowedLanguge(language) {
    const allowedLanguages = [ES_AR, EN_US];
    return allowedLanguages.includes(language);
}

export function getLanguageConfig() {
    let languageConfig;

    console.log(window.location.href);
    
    const path = window.location.pathname !== '/' ? window.location.pathname : null;
    const params = new URL(window.location.href).searchParams;
    const queryLang = params.get('lang');

    languageConfig = path ?? queryLang;

    if (languageConfig) {
        if (isAllowedLanguge(languageConfig)) {
            return languageConfig;
        }
    }

    const browserLanguage = window.navigator.language;
    if (isAllowedLanguge(browserLanguage)) {
        return browserLanguage;
    }

    return ES_AR;
}