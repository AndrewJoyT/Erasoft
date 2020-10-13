const intialState = {
    navigation:'',
    isLogin : "true",
    user:{},
    article:[],
    detailArticle:[],
    inputComment:false
}

const reducer = (state=intialState,action) => {
    switch(action.type){
        case "SET_NAVIGATION" : 
            state = {
                ...state,
                navigation : action.value
            }
            return state
        case "SET_ISLOGIN" : 
            state = {
                ...state,
                isLogin : "false"
            }
            return state
        case "SET_USER" : 
            state = {
                ...state,
                user : action.value
            }
            return state
        case "SET_ARTICLE" : 
            state = {
                ...state,
                article : action.value
            }
            return state
        case "SET_DETAILARTICLE" : 
            state = {
                ...state,
                detailArticle : action.value
            }
            return state
        case "SET_COMMENTARTICLE" : 
            state = {
                ...state,
                commentArticle : action.value
            }
            return state
        case "SET_INPUTCOMMENT" : 
            state = {
                ...state,
                inputComment : action.value
            }
            return state
        default : return state
    }
}

export default reducer