import "whatwg-fetch";


let IP="192.168.1.209"
let port=":9090"

export function getEmployeesList(){
    return fetch("http://"+IP+port+"/employeelist/",{
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'access-control-allow-credentials':true,
            'content-type':'application/json'
          },
        credentials:'include'
    })
    .then( response =>{
        return response.json();
    })
}

export function getEmployeeById(id){
    return fetch("http://"+IP+port+"/employee/"+id,{
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'access-control-allow-credentials':true,
            'content-type':'application/json'
          },
        credentials: 'include'
    })
    .then( response =>{
        return response.json();
    })
}

export function updateEmployee(editedEmployeeDetails){
    return fetch("http://"+IP+port+"/employee/"+editedEmployeeDetails.emp_id, {
        method: 'PUT',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
        credentials: 'include',
        body: JSON.stringify(editedEmployeeDetails)
    })
    .then( reponse =>{
        return reponse.json();
    })
}

export function saveEmployee(editedEmployeeDetails){
    return fetch("http://"+IP+port+"/create/employee/", {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          },
        credentials: 'include',
        body: JSON.stringify(editedEmployeeDetails)
    })
    .then( reponse =>{
        return reponse.json();
    })
}

