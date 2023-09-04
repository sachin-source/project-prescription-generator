export const httpService = {
    getPatientList
};

const apiEndPoint =  "https://prescription-backend.onrender.com/" // "http://localhost:3005/";

function getPatientList() {
    return fetch(apiEndPoint + 'patient').then(res => res.json())
}