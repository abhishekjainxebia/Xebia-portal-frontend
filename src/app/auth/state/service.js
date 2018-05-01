import "whatwg-fetch";

// export function login(){
//     return fetch("http://"+IP+port+"/login/")
//     .then( response =>{
//         return response.json();
//     })
// }
let IP="192.168.1.209"
let port=":9090"
export function getStateById(id){
    return fetch("http://"+IP+port+"/api/states/"+id)
    .then( response =>{
        return response.json();
    })
}

export function saveState(stateView){
    return fetch("http://"+IP+port+"/api/states/"+stateView.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(stateView)
    })
}

export function login(user){
    return fetch("http://"+IP+port+"/login/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Proxy-Authorization':'m88BdZpuDX2VLGWAN6hggQZ32Xb3kulo',
            'Access-Control-Allow-Origin': '*',
            'access-control-allow-credentials': true,
            'Access-Control-Allow-Headers':true
          },
        credentials:'include',
        body: JSON.stringify(user)
    }).then( response =>{
        console.log(response.headers);
        return response.json();
    })
}

