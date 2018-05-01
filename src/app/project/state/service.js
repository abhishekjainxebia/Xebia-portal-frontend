import * as Http from "../../http-call";

export function getProjectsList(){
    let apiEndpoint='/Projectlist/'
    let headers= {
        'Access-Control-Allow-Origin': '*',
        'access-control-allow-credentials':true,
        'content-type':'application/json'
      }
    return Http.getMethod(apiEndpoint,null,headers
    )
    .then( response =>{
        return response.json();
    })
}

export function getProjectById(id){
    let apiEndpoint='/Project/'+id
    let headers= {
        'Access-Control-Allow-Origin': '*',
        'access-control-allow-credentials':true,
        'content-type':'application/json'
      }

    return Http.getMethod(apiEndpoint,null,headers
    )
    .then( response =>{
        return response.json();
    })
}

export function updateProject(editedProjectDetails){
    let apiEndpoint='/Project/'+id
    let headers= {
        'Access-Control-Allow-Origin': '*',
        'content-type':'application/json'
      }

    return fetch("http://"+IP+port+"/Project/"+editedProjectDetails.id, {
        method: 'PUT',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
        credentials: 'include',
        body: JSON.stringify(editedProjectDetails)
    })
    .then( reponse =>{
        return reponse.json();
    })
}

export function saveProject(editedProjectDetails){
    return fetch("http://"+IP+port+"/create/Project/", {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
        credentials: 'include',
        body: JSON.stringify(editedProjectDetails)
    })
    .then( reponse =>{
        return reponse.json();
    })
}
