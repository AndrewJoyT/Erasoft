import {baseUrl} from './config';

export const add = (data) => dispatch =>  {
    return new Promise((resolve,reject)=>{
        fetch(`${baseUrl}/comment`,{
            method:'POST',
            headers:{
                'Content-type' : 'application/json'
            },
            body:JSON.stringify({
                user_id:data.user_id,
                text:data.text,
                article_id:data.article_id
            })
        })
        .then(res=>res.json())
        .then(result=>resolve(result))
    })
}

export const update = (data) => dispatch => {
    return new Promise((resolve,reject)=>{
        fetch(`${baseUrl}/comment/${data.id}`,{
            method:'PUT',
            headers:{
                'Content-type' : 'application/json'
            },
            body:JSON.stringify({
                text:data.text
            })
        })
        .then(res=>res.json())
        .then(result=>resolve(result))
    })
}

export const remove = (id) => dispatch => {
    return new Promise((resolve,reject)=>{
        fetch(`${baseUrl}/comment/${id}`,{
            method:'DELETE'
        }).then(res=>res.json())
        .then(result=>resolve(result))
    })
}

export const getComment = (id) => dispatch => {
    return new Promise((resolve,reject)=>{
        fetch(`${baseUrl}/comment/article_id/${id}`)
        .then(res=>res.json())
        .then(result=>resolve(result))
    })
}