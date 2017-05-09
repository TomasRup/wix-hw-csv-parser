const apiGet = (url) => {
    return fetch(url, { method: 'GET' })
        .then(response => response.json())
}

const apiPost = (url, bodyJson) => {
    return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyJson)
        })
        .then(response => response.json());
}

export default {
    apiGet,
    apiPost
};