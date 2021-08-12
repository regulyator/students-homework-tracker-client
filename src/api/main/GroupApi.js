const apiBaseUrlGroups = '/hwtracker/api/data/groups/';

export function loadAllGroups() {
    return fetch(apiBaseUrlGroups)
        .then(response => response.json())
        .catch(error =>
            alert(error)
        );
}