import {
  addNewCategory, loadCategories, loadSearchCategories, deleteCategory, loadSingleCategory, editSingleCategory
  } from '../services/CategoryService'

export const addCategoryUser = (credentials) => {
  return (dispatch) => {
    dispatch({type:'RESTART_ADD_UPDATE_RESPONSE'});
    dispatch({type:'LOADING'});
    addNewCategory(credentials).then((res)=>{
        console.log(res);
        dispatch({type:'NEW_CATEGORY_SUCCESS',res})
      },
      error=>{
        dispatch({type:'NEW_CATEGORY_CODE_ERROR',error});
      }     
    )
  }
}

export const loadCategoryUser = (page) => {
  return (dispatch) => {
    loadCategories(page).then((res)=> {
      dispatch({type:'LOAD_CATEGORIES', res});
    },
    error => {
      dispatch({type:'FETCH_CATEGORY_ERROR',error})
    })
  }
}

export const loadSearchCategoryUser = (search_category, page) => {
  return (dispatch) => {
    loadSearchCategories(search_category, page).then((res)=>{
      dispatch({type:'LOAD_CATEGORIES_SEARCH', res});
    },
    error => {
      dispatch({type:'FETCH_CATEGORY_ERROR', error})
    })
  }   
}

export const deleteCategoryUser = (id) => {
  return (dispatch) => {
    deleteCategory(id).then((res) => {
      res.id = id;
      dispatch({type:'CATEGORY_DELETE_SUCCESSFULLY', res})
    },
    error => {
      dispatch({type:'CATEGORY_DELETE_ERROR', error});
    })
  }
}

export const loadSingleCategoryUser = (id) => {    
  return (dispatch) => {
    loadSingleCategory(id).then((res) => {
      dispatch({type:'LOAD_SINGLE_CATEGORY', res});
    },
    error=>{
      dispatch({type:'FETCH_SINGLE_CATEGORY_ERROR', error})
    })
  }
}

export const editCategoryUser = (credentials, id) => {
  return (dispatch) => {
    dispatch({type:'RESTART_ADD_UPDATE_RESPONSE'});
    dispatch({type:'LOADING'});
    editSingleCategory(credentials, id).then((res) => {
      dispatch({type:'UPDATE_CATEGORY_SUCCESS', res})
    },
    error=>{
      dispatch({type:'UPDATE_CATEGORY_CODE_ERROR', error});
    })
  }
}