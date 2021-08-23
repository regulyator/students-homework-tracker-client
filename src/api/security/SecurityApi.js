const apiBaseUrlLogin = '/hwtracker/api/user/login/';
const apiBaseUrlRegister = '/hwtracker/api/user/register';

export function authenticate(username, password) {
    const requestOptions = {
        method: 'GET',
        headers: {'Authorization': generateBasicAuthToken(username, password)}
    };
    return fetch(apiBaseUrlLogin + username, requestOptions)
        .catch(reason => console.log(reason));
}

function generateBasicAuthToken(username, password) {
    return 'Basic ' + window.btoa(username + ":" + password)
}

export function register(username, password) {
    let encodedPassword = Buffer.from(password).toString('base64');
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({teacherEmail: username, password: encodedPassword})
    };
    return fetch(apiBaseUrlRegister, requestOptions)
        .catch(reason => console.log(reason));
}