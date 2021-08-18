const apiBaseUrlHomeWork = '/hwtracker/api/homeworks/';
const apiGroupUrlHomeWork = '/hwtracker/api/homeworks/group/';

export function loadAllHomeWork() {
    return fetch(apiBaseUrlHomeWork)
        .then(response => response.json())
        .catch(error =>
            alert(error)
        );
}

export function loadAllGroupHomeWork(groupId) {
    return fetch(apiGroupUrlHomeWork + groupId)
        .then(response => response.json())
        .catch(error =>
            alert(error)
        );
}

export function saveHomework(homework) {
    const requestOptions = {
        method: homework.id === null ? 'POST' : 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(homework)
    };
    return fetch(apiBaseUrlHomeWork, requestOptions)
        .then(response => response.json());
}
