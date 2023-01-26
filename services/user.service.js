import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

// import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
// const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout,
    // register,
    // getAll,
    // getById,
    // update,
    // delete: _delete
};

function login(username, password) {
    // return fetchWrapper.post(`${baseUrl}/authenticate`, { username, password })
    //     .then(user => {
    //         // publish user to subscribers and store in local storage to stay logged in between page refreshes
    //         userSubject.next(user);
    //         localStorage.setItem('user', JSON.stringify(user));

    //         return user;
    //     });
    return new Promise((resolve, reject) => {
        userSubject.next(JSON.stringify({username, password}));
        return resolve(localStorage.setItem('user', JSON.stringify({username, password})))
    })
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/account/login');
}