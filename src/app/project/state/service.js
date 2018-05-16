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
        return response
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
        return response
    })
}

export function updateProject(editedProjectDetails){
    let apiEndpoint='/Project/'+editedProjectDetails.id
    let headers= {
        'Access-Control-Allow-Origin': '*',
        'content-type':'application/json'
      }

    return Http.putMethod(apiEndpoint,editedProjectDetails,headers
    ).then( response =>{
        return response
    })
}

export function saveProject(editedProjectDetails){
    let apiEndpoint='/create/Project/'
    let headers= {
        'Access-Control-Allow-Origin': '*',
        'content-type':'application/json'
      }

    return Http.postMethod(apiEndpoint,editedProjectDetails,headers
    ).then( response =>{
        return response
    })
}
