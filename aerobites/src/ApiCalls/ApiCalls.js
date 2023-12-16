


export default function getAirports() {
    fetch('http://localhost:3000')
        .then(response => {
            if(!response.ok) {
                throw new Error (`${error}: Failed to fetch data`)
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        })
}
