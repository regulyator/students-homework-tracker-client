const apiBaseUrlStudent = '/hwtracker/api/data/students/';

export function loadAllStudents() {
    return fetch(apiBaseUrlStudent)
        .then(response => response.json())
        .catch(error =>
            alert(error)
        );
}

export function loadStudentById(studentId) {
    return fetch(apiBaseUrlStudent + studentId)
        .then(response => response.json())
        .catch(error =>
            alert(error)
        );
}

export function saveStudent(student) {
    const requestOptions = {
        method: student.id === null ? 'POST' : 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(student)
    };
    return fetch(apiBaseUrlStudent, requestOptions)
        .then(response => response.json());
}

export function deleteStudent(id) {
    return fetch(apiBaseUrlStudent + id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    });
}