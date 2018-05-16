import * as Http from "../../http-call";

export function login(user,loginResult){
    let apiEndpoint='/login/'
    let headers= {
        'Content-Type': 'application/json',
        'Proxy-Authorization':'m88BdZpuDX2VLGWAN6hggQZ32Xb3kulo',
        'Access-Control-Allow-Origin': '*',
        'access-control-allow-credentials': true,
        'Access-Control-Allow-Headers':true
        }
    return Http.postMethod(apiEndpoint,user,headers
    ).then( response =>{
        loginResult(response)
        return response;
    })
}

