
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

        return fetch(API.REST_API_URL + path, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
    }

    static _PUT(path, params) {

        return fetch(API.REST_API_URL + path, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
    }

    static _DELETE(path, params) {
        console.log(API.REST_API_URL + path);
        return fetch(API.REST_API_URL + path, {
            method: "DELETE"
        });
    }
}

export default API;