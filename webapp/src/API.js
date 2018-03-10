
class API {

    static REST_API_URL = "http://localhost:3001/";

    static _GET(path) {

        return fetch(API.REST_API_URL + path)
            .then((response) => {
                return response.json();
            })
            .then((json) => {

                return json;
            });
    }

    static _POST(path, params) {

        fetch(path, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        })
        .then((response) => {
            return response.json()
        });
    }

    static newProduct() {


    }
}

export default API;