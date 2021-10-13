import HttpService from './HttpService';

export const addNewCategory = (credentials) => {
  const http = new HttpService();
  let newCategory = "user/category/add";
  credentials.token = localStorage.getItem('user');
  console.log(credentials)
  return http.postData(credentials,newCategory).then((data)=> {
    console.log(data)
    console.log(JSON.stringify(data));
    return data;
  }).catch((error)=> {console.log(error)
    return error; 
  });
}

export const loadCategories = (page) => {
  let token = localStorage.getItem('user');
  let pager = 2;
  let categoryDataUrl; 
  if(page == "") {
    categoryDataUrl = "user/category/get-all/"+token+"/"+pager;
  } else {
    categoryDataUrl = "user/category/get-all/"+token+"/"+pager+"?page="+page;
  }
    
  const http = new HttpService();
  return http.getData(categoryDataUrl).then((data) => {
    return data
  }).catch((error)=>{
    return error
  })  
}

export const loadSearchCategories = (search_category, page) => {
  let token = localStorage.getItem('user');
  let pager = 2;
  let categoryDataUrl ; 
  if(page == "") {
    categoryDataUrl = "user/category/search/"+search_category+"/"+token+"/"+pager; 
  } else {
    categoryDataUrl = "user/category/search/"+search_category+"/"+token+"/"+pager+"?page="+page;
  }
  
  const http = new HttpService();
  return http.getData(categoryDataUrl).then((data) => {
    return data
  }).catch((error)=>{
    return error
  })  
}

export const deleteCategory = (id) => {
  const data = {};

  if(id == "") {

  } else {
    const http = new HttpService();
    let deleteUrl = "user/category/delete/"+id;
    return http.postData(data, deleteUrl).then((data) => {
      return data;
    }).catch((error) => {
      return error; 
    });
  }
}

export const loadSingleCategory = (id) => {
  if(id == "") {

  } else {
    let getDataUrl = "user/category/get-single/"+id;
    const http = new HttpService();
    return http.getData(getDataUrl).then((data) => {
      return data
    }).catch((error)=>{
      return error
    })
  }
}

export const editSingleCategory = (data,id) => {
  if(id == "") {

  } else {
    const http = new HttpService();
    let editDataUrl = "user/category/update/"+id;
    return http.postData(data, editDataUrl).then((data) => {
      return data;
    }).catch((error) => {
      return error; 
    });
  }
}