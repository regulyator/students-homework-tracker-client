const apiBaseUrlVerifiedTasks = '/hwtracker/api/tracker/tasks/';
const apiVerifiedUrlTasks = '/hwtracker/api/tracker/tasks/verified/';
const apiUpdateTasks = '/hwtracker/api/tracker/scan';

export function loadAllUnassignedTasks(onlyVerified) {
    return fetch(apiVerifiedUrlTasks + onlyVerified)
        .then(response => response.json())
        .catch(error =>
            alert(error)
        );
}

export function saveTask(task) {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(task)
    };
    return fetch(apiBaseUrlVerifiedTasks, requestOptions)
        .then(response => response.json());
}

export function scanRepositories() {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    };
    return fetch(apiUpdateTasks, requestOptions);
}
