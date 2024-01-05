//final https://aerobites-app-fa488b45d1f9.herokuapp.com

function getAirports() {
    return fetch('http://localhost:8080')
        .then(response => {
            if(!response.ok) {
                // throw new Error (`${error}: Failed to fetch data`)
                console.log('error')
            }
            // console.log(response.json())
            return response.json();
        })
}

function getTerminals() {
    return fetch('http://localhost:8080/terminals')
        .then(response => {
            if(!response.ok) {
                console.log('error')
            }
            return response.json();
        })
}

function getBusinesses() {
    return fetch('http://localhost:8080/businesses')
    .then(response => {
        if(!response.ok) {
            console.log('error')
        }
        return response.json();
    })
}



export { getAirports, getTerminals, getBusinesses }