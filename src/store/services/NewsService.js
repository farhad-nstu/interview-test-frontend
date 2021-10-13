import HttpService from './HttpService';

export const addNewNews = (credentials) => {
  const http = new HttpService();
  let newNews = "user/news/add";
  credentials.token = localStorage.getItem('user');
  console.log(credentials)
  return http.postData(credentials, newNews).then((data) => {
    console.log(data)
    console.log(JSON.stringify(data));
    return data;
  }).catch((error) => {
    return error; 
  });
}
 
export const loadNews = (page) => {
  let token = localStorage.getItem('user');
  let pager = 10;
  let newsDataUrl;

  if(page == "") {
    newsDataUrl = "user/news/get-all/"+token+"/"+pager; 
  } else {
    newsDataUrl = "user/news/get-all/"+token+"/"+pager+"?page="+page;
  }
  
  const http = new HttpService();
  return http.getData(newsDataUrl).then((data) => {
    console.log(data);
    return data
  }).catch((error) => {
    console.log(error)
  })  
}

export const loadSearchNews = (search_content, page) => {
  let token = localStorage.getItem('user');
  let pager = 10;
  let newsDataUrl;

  if(page == "") {
    newsDataUrl = "user/news/search/"+search_content+"/"+token+"/"+pager; 
  } else {
    newsDataUrl = "user/news/search/"+search_content+"/"+token+"/"+pager+"?page="+page;
  }
  
  const http = new HttpService();
  return http.getData(newsDataUrl).then((data) => {
    console.log(data);
    return data
  }).catch((error) => {
    console.log(error)
    return error
  })    
}

export const loadSingleData = (id) => {
  if(id == "") {

  } else {
    let getDataUrl = "user/news/get-single/"+id;
    const http = new HttpService();
    return http.getData(getDataUrl).then((data) => {
      console.log(data);
      return data
    }).catch((error) => {
      console.log(error);
      return error
    })
  }
}

export const editSingleData = (data, id) => {
  if(id == "") {

  } else {
    const http = new HttpService();
    let editDataUrl = "user/news/update/"+id;
    return http.postData(data, editDataUrl).then((data) => {
      console.log(data)
      console.log(JSON.stringify(data));
      return data;
    }).catch((error) => {
      return error; 
    });
  }
}

export const deleteNews = (id) => {
  const data = {};

  if(id == "") {

  } else {
    const http = new HttpService();
    let deleteUrl = "user/news/delete/"+id;
    return http.postData(data, deleteUrl).then((data) => {
      console.log(data)
      console.log(JSON.stringify(data));
      return data;
    }).catch((error) => {
      return error; 
    });
  }
}



