const initState = {
  categoryResponse:null,
  categoryMessage:null,
  loadCategories:null,
  loadSingleCategory:null
};

const CategoryReducer = (state=initState, action) => {
  switch(action.type){
    case 'RESTART_ADD_UPDATE_RESPONSE':
      return {
        ...state,
        categoryResponse:null
      }

    case 'LOADING':
      return {
        ...state,
        categoryResponse:'loading...'
      }

    case 'NEW_CATEGORY_SUCCESS':
      console.log(action);
      return{
        ...state,
        categoryResponse: action.res.message
      }

    case 'NEW_CATEGORY_CODE_ERROR':
      return {
        ...state,
        categoryResponse:action.error
      }

    case 'LOAD_CATEGORIES':
      return {
        ...state,
        loadCategories:action.res
      }

    case 'FETCH_CATEGORY_ERROR':
      return{
        ...state,
        loadCategories:action.error
      }

    case 'LOAD_CATEGORIES_SEARCH':
      return{
        ...state,
        loadCategories:action.res
      }

    case 'LOAD_SINGLE_CATEGORY':
      return {
        ...state,
        loadSingleCategory: action.res
      }

    case 'FETCH_SINGLE_CATEGORY_ERROR':
      return {
        ...state,
        loadSingleCategory: action.error
      }

    case 'UPDATE_CATEGORY_SUCCESS':
      return {
        ...state,
        categoryResponse: action.res.message
      }
                    
    case 'UPDATE_CATEGORY_CODE_ERROR':
      return {
        ...state,
        categoryResponse: action.error
      }

    case 'CATEGORY_DELETE_SUCCESSFULLY':
      let { loadCategories } = state;
      let data = loadCategories.data.data.filter(items => items.id !== action.res.id);
      loadCategories.data.data = [];
      data.map((mappingData) => {
        loadCategories.data.data.push({
          "id": mappingData.id,
          "title": mappingData.title,
          "alias": mappingData.alias,
        })
      })
      return{
        ...state,
        loadCategories: {...state.loadCategories, loadCategories}
      }
                                
                    
    case 'CATEGORY_DELETE_ERROR':
      return {
        ...state,
        categoryResponse:action.error
      }

    default:
      return state
  }    
}

export default CategoryReducer;