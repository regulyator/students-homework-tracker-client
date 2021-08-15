const apiBaseUrlCourse = '/hwtracker/api/data/courses/';

export function loadAllCourses() {
    return fetch(apiBaseUrlCourse)
        .then(response => response.json())
        .catch(error =>
            alert(error)
        );
}

export function saveCourse(course) {
    const requestOptions = {
        method: course.id === null ? 'POST' : 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(course)
    };
    return fetch(apiBaseUrlCourse, requestOptions)
        .then(response => response.json());
}

export function deleteCourse(id) {
    return fetch(apiBaseUrlCourse + id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    });
}