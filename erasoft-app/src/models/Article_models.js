import { action } from '../config/Redux/Action/actionType';
import {baseUrl} from './config';

export const getArticle = (id=null,user_id=null) => dispatch => {
    return new Promise((resolve,rejct)=>{
        let url = `${baseUrl}/article`;
        if(id!==null) url += `/${id}` 
        if(user_id!==null) url +=`/user/${user_id}`
        fetch(url)
        .then(res=>res.json())
        .then(article=>{
            if(id!==null) dispatch({type:action.detailArticle,value:article})
            resolve(article)
        })
        
    })
}

export const add = (data) => dispatch => {
    return new Promise((resolve,reject)=>{
        fetch(`${baseUrl}/article`,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                title:data.title,
                content:data.content,
                user_id:data.user_id,
                views:0,
                comments:0
            })
        }).then(res=>res.json())
        .then(article=>resolve(article))
    })
}

export const update = (data) => dispatch => {
    return new Promise((resolve,reject)=>{
        fetch(`${baseUrl}/article/${data.id}`,{
            method:'PUT',
            headers:{
                'Content-type' : 'application/json',
            },
            body:JSON.stringify({
                title:data.title,
                content:data.content,
                views:data.views,
                comments:data.comments,
            })
        })
        .then(res=>res.json())
        .then(result=>resolve(result))
    })
}

export const remove = (id) => dispatch => {
    return new Promise((resolve,reject)=>{
        fetch(`${baseUrl}/article/${id}`,{
            method:'DELETE'
        })
        .then(res=>res.json())
        .then(result=>resolve(result))
    })
}