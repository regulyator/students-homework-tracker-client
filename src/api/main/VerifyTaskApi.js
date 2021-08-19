const apiVerifiedUrlTasks = '/hwtracker/api/tracker/tasks/verified/';

export function loadAllUnassignedTasks(onlyVerified) {
    return fetch(apiVerifiedUrlTasks + onlyVerified)
        .then(response => response.json())
        .catch(error =>
            alert(error)
        );
}
