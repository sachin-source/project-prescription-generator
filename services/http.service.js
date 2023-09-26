
export const apiEndPoint = "http://localhost:3005/"; // "https://prescription-backend.onrender.com/" // "http://localhost:3005/";

function getPatientList() {
    return fetch(apiEndPoint + 'patient').then(res => res.json())
}
// export const httpService = {
//     getPatientList, apiEndPoint
// };
