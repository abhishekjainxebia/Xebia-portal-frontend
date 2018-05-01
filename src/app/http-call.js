import "whatwg-fetch";

let IP="localhost"
let port=":8080"

export function getMethod(apiEndpoint,body,headers){
    return fetch("http://"+IP+port+apiEndpoint,{
        method: 'GET',
        credentials:'include'
    })
    .then( response =>{
        return response.json();
    })
}

export function putMethod(apiEndpoint,body,headers){
    return fetch("http://"+IP+port+apiEndpoint, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(body)
    })
    .then( reponse =>{
        return reponse.json();
    })
}

export function postMethod(apiEndpoint,body,headers){
    return fetch("http://"+IP+port+apiEndpoint, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(body)
    })
    .then( reponse =>{
        return reponse.json();
    })
}

