function getAirports() {
    return fetch('https://aerobites-app-fa488b45d1f9.herokuapp.com')
        .then(response => {
            if(!response.ok) {
                console.log('error')
            }
            return response.json();
        })
}

function getTerminals() {
    return fetch('https://aerobites-app-fa488b45d1f9.herokuapp.com/terminals')
        .then(response => {
            if(!response.ok) {
                console.log('error')
            }
            return response.json();
        })
}

function getBusinesses() {
    return fetch('https://aerobites-app-fa488b45d1f9.herokuapp.com/businesses')
    .then(response => {
        if(!response.ok) {
            console.log('error')
        }
        return response.json();
    })
}

export { getAirports, getTerminals, getBusinesses }