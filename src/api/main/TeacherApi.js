const apiBaseUrlTeacher = '/hwtracker/api/data/teachers/';

export function loadAllTeachers() {
    return fetch(apiBaseUrlTeacher)
        .then(response => response.json())
        .catch(error =>
            alert(error)
        );
}

export function loadTeacherById(teacherId) {
    return fetch(apiBaseUrlTeacher + teacherId)
        .then(response => response.json())
        .catch(error =>
            alert(error)
        );
}

export function saveTeacher(teacher) {
    const requestOptions = {
        method: teacher.id === null ? 'POST' : 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(teacher)
    };
    return fetch(apiBaseUrlTeacher, requestOptions)
        .then(response => response.json());
}

export function deleteTeacher(id) {
    return fetch(apiBaseUrlTeacher + id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    });
}