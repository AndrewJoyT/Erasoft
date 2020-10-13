import {baseUrl} from './config';

export const getUser = (email = '',id='') => dispatch => {
    return new Promise((resolve, reject) => {
        let url = baseUrl + '/user';
        if (email !== '') url += `/${email}`
        if (id !== '') url += `/id/${id}`
        fetch(url)
            .then(res => res.json())
            .then(user => resolve(user))
    })
}
export const add = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        fetch(`${baseUrl}/user`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password
            })
        })
            .then(response => response.json())
            .then(json => resolve(json))
    })
}