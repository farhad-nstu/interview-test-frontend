const initState = {
  newsResponse:null,
  contactMessage:null,
  loadNews:null,
  loadSingleNews:null
};
 

const NewsReducer = (state = initState, action) => {
  switch(action.type) {
    
    case 'RESTART_ADD_UPDATE_RESPONSE':
      return {
        ...state,
        newsResponse:null
      }

    case 'LOADING':
      return {
        ...state,
        newsResponse:'loading...'
      }

    case 'NEW_NEWS_SUCCESS':
      return{
        ...state,
        newsResponse: action.res.message
      }

    case 'NEW_NEWS_CODE_ERROR':
      return {
        ...state,
        newsResponse:action.error
      }

    case 'CLEAR_NEWS_STATE':
      return {
        ...state,
        loadNews:null
      }

    case 'LOAD_NEWS':
      return{
        ...state,
        loadNews:action.res
      }

    case 'LOAD_NEWS_SEARCH':
      return{
        ...state,
        loadNews:action.res
      }

    case 'FETCH_NEWS_ERROR':
      return{
        ...state,
        loadNews:action.error
      }

    case 'LOAD_SINGLE_DATA':
      return{
        ...state,
        loadSingleNews:action.res
      }

    case 'FETCH_SINGLE_DATA_ERROR':
      return{
        ...state,
        loadSingleNews:action.error
      }

    case 'UPDATE_NEWS_SUCCESS':
      return{
        ...state,
        newsResponse: action.res.message
      }

    case 'UPDATE_NEWS_CODE_ERROR':
      return {
        ...state,
        newsResponse:action.error
      }

    case 'DATA_DELETE_SUCCESSFULLY':
      let { loadNews } = state;
      let data = loadNews.data.data.filter(items => items.id !== action.res.id);
      console.log(data);
      loadNews.data.data = [];
      data.map((mappingData) => {
        loadNews.data.data.push({
          "id":mappingData.id,
          "title":mappingData.title,
          "category_id":mappingData.category_id,
          "description":mappingData.description,
          "user_id":mappingData.user_id,
          "image_file":mappingData.image_file,
        })
      })

      return{
        ...state,
        loadNews:{...state.loadNews, loadNews}
      }
                                
                    
    case 'DATA_DELETE_ERROR':
      return {
        ...state,
        newsResponse:action.error
      }

    default:
      return state
  }
      
}

export default NewsReducer;