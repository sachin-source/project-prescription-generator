export const httpService = {
    getPatientList
};

const apiEndPoint = "http://localhost:3005/";

function getPatientList() {
    return fetch(apiEndPoint + 'patient').then(res => res.json())
}