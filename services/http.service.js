
export const apiEndPoint =  "https://prescription-backend.onrender.com/" // "http://localhost:3005/";

function getPatientList() {
    return fetch(apiEndPoint + 'patient').then(res => res.json())
}
// export const httpService = {
//     getPatientList, apiEndPoint
// };
