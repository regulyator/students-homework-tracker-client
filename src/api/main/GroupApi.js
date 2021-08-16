const apiBaseUrlGroups = '/hwtracker/api/data/groups/';

export function loadAllGroups() {
    return fetch(apiBaseUrlGroups)
        .then(response => response.json())
        .catch(error =>
            alert(error)
        );
}

export function saveGroup(group) {
    const requestOptions = {
        method: group.id === null ? 'POST' : 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(group)
    };
    return fetch(apiBaseUrlGroups, requestOptions)
        .then(response => response.json());
}

export function deleteGroup(id) {
    return fetch(apiBaseUrlGroups + id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    });
}