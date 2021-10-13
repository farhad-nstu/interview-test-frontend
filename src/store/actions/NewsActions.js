import {
  addNewNews,
  loadNews,
  loadSearchNews,
  loadSingleData,
  editSingleData,
  deleteNews
} from '../services/NewsService'

export const addNewsUser = (credentials) => {
  return (dispatch) => {
    dispatch({type:'RESTART_ADD_UPDATE_RESPONSE'});
    dispatch({type:'LOADING'});
    addNewNews(credentials).then((res) => {
      console.log(res);
      dispatch({type:'NEW_NEWS_SUCCESS', res})
    },
    error => {
      dispatch({type:'NEW_NEWS_CODE_ERROR', error});
    })
  }
} 

export const loadNewsUser = (page) => {
  return (dispatch) => {
    loadNews(page).then((res) => {
      console.log(res)
      dispatch({type:'LOAD_NEWS', res});
    },
    error => {
      dispatch({type:'FETCH_NEWS_ERROR', error})
      console.log(error)
    })
  }
}

export const loadSearchNewsUser = (search_content, page) => {
  return (dispatch) => {
    loadSearchNews(search_content, page).then((res) => {
      console.log(res)
      dispatch({type:'LOAD_NEWS_SEARCH', res});
    },
    error=>{
      dispatch({type:'FETCH_NEWS_ERROR', error})
      console.log(error)
    })
  }   
}

export const loadSingleDataUser = (id) => { 
  return (dispatch) => {
    loadSingleData(id).then((res) => {
      console.log(res)
      dispatch({type:'LOAD_SINGLE_DATA', res});
    },
    error => {
      dispatch({type:'FETCH_SINGLE_DATA_ERROR', error})
      console.log(error)
    })
  }
}

export const editNewsUser = (credentials, id) => {
  return (dispatch) => {
    dispatch({type:'RESTART_ADD_UPDATE_RESPONSE'});
    dispatch({type:'LOADING'});
    editSingleData(credentials, id).then((res) => {
      console.log(res);
      dispatch({type:'UPDATE_NEWS_SUCCESS', res})
    },
    error=>{
      dispatch({type:'UPDATE_NEWS_CODE_ERROR', error});
    })
  }
}

export const deleteNewsUser = (id) => {
  return (dispatch) => {
    deleteNews(id).then((res) => {
      console.log(res);
      res.id = id;
      dispatch({type:'DATA_DELETE_SUCCESSFULLY', res})
    },
    error => {
      dispatch({type:'DATA_DELETE_ERROR', error});
    })
  }
}