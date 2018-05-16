import * as Http from "../../http-call";

export function getEmployeesList() {
    let apiEndpoint = '/employeelist/'
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'access-control-allow-credentials': true,
        'content-type': 'application/json'
    }
    return Http.getMethod(apiEndpoint, null, headers
    )
        .then(response => {
            return response
        })
}

export function getEmployeeById(id) {
    let apiEndpoint = '/employee/' + id
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'access-control-allow-credentials': true,
        'content-type': 'application/json'
    }

    return Http.getMethod(apiEndpoint, null, headers
    )
        .then(response => {
            return response
        })
}


export function updateEmployee(editedEmployeeDetails) {
    let apiEndpoint = '/employee/' + editedEmployeeDetails.emp_id
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json'
    }

    return Http.putMethod(apiEndpoint, editedEmployeeDetails, headers
    ).then(response => {
        return response
    })
}

export function saveEmployee(editedEmployeeDetails) {
    let apiEndpoint = '/create/employee/'
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json'
    }

    return Http.postMethod(apiEndpoint, editedEmployeeDetails, headers
    ).then(response => {
        return response
    })
}

export function getEmployeeProjects(id) {
    let apiEndpoint = '/empprojmap/' + id
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'access-control-allow-credentials': true,
        'content-type': 'application/json'
    }

    return Http.getMethod(apiEndpoint, null, headers
    )
        .then(response => {
            return response
        })
}

export function getEmployeePermenentAddress(id) {
    let apiEndpoint = '/address/' + id + '/permanent'
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'access-control-allow-credentials': true,
        'content-type': 'application/json'
    }
    return Http.getMethod(apiEndpoint, null, headers
    )
        .then(response => {
            return response
        })
}

export function getEmployeeCurrentAddress(id) {
    let apiEndpoint = '/address/' + id + '/current'
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'access-control-allow-credentials': true,
        'content-type': 'application/json'
    }
    return Http.getMethod(apiEndpoint, null, headers
    )
        .then(response => {
            return response
        })
}

export function updateEmployeeAddress(emp_id,updatedAddressDetails) {
    let apiEndpoint = '/address/' + emp_id+'/'+ updatedAddressDetails.address_type //:id/:type
    let headers = {
        'Access-Control-Allow-Origin': '*',
        'content-type': 'application/json'
    }

    return Http.putMethod(apiEndpoint, updatedAddressDetails, headers
    ).then(response => {
        console.log(response)
        return response
    })
}
