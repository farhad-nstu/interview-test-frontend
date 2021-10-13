import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import DefaultImg from '../../img/default-img.png'
import {loadSingleDataUser, editNewsUser} from '../../store/actions/NewsActions'
import { loadCategoryUser } from '../../store/actions/CategoryActions'

class EditNews extends Component {

  constructor(props) {
    super(props)
    this.state ={
      title:'',
      category_id:'',
      description:'',
      profile_image:'',
      file_directory:'',
      new_image:''
    }
  } 

  componentDidMount = () => {
    console.log(this.props);
    const { id } = this.props.match.params;
    this.props.loadSingleDataUser(id);

    const page = "";
    this.props.loadCategoryUser(page);
  }
  
  componentDidUpdate = async(prevProps,prevState) =>{
    if(prevProps.loadSingleNews !== this.props.loadSingleNews){
      let singleData = this.props.loadSingleNews;
      this.setState({
        title:singleData.data.title,
        category_id:singleData.data.category_id,
        description:singleData.data.description,
        new_image:singleData.data.image_file,
        file_directory:singleData.file_directory  
      })
    }
  }
    
  handleChange = (e) => {
    this.setState({
      [e.target.id] : e.target.value
    })
  }
    
  //this converts a blob type image to base64 encoded string
  getBase64 = (file,callback) => {
    const reader = new FileReader();
    reader.addEventListener('load',()=>callback(reader.result));
    reader.readAsDataURL(file);
  }


  fileTransform = (e) => {
    this.getBase64(e.target.files[0],(base64String)=>{
      this.state.profile_image = base64String;
      console.log(this.state)
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    this.props.editNewsUser(this.state, id);
  }

  render() {
    const {newsResponse} = this.props; 
    const {loadCategories} = this.props;

    return (
      <div>

        <h1>Edit an existing news</h1>

        <form   autoComplete="off" onSubmit={this.handleSubmit}>

          <TextField
          id="title"
          label="title"
          style={{ margin: 8,maxWidth:1000 }}
          placeholder="enter title"
          fullWidth
          margin="normal"
          variant="outlined"
          required
          value = {this.state.title || ''}
          onChange={this.handleChange}
          />

          <div className="row">
            <label className="col-sm-2" id="demo-simple-select-label">Category</label>
            <div className="col-sm-9">
              <select style={{margin: 7}} id="category_id" className="form-control" onChange={this.handleChange}>
                <option>Select Category</option>
                {loadCategories && loadCategories.hasOwnProperty('data') ? loadCategories.data.data.map(row => (
                  <option value={row.id}>{row.title}</option>
                )) :null }
              </select>
            </div>
          </div>

          <TextField
            id="description"
            label="description"
            style={{ margin: 8,maxWidth:1000 }}
            placeholder="enter description"
            fullWidth
            margin="normal"
            variant="outlined"
            type="description"
            value = {this.state.description || ''}
            onChange={this.handleChange}
          />

          {
            <div>
              {
                this.state.new_image == "" ?
                <img src={DefaultImg} className="image-restyle" />
                :<img className="image-restyle" src={this.state.file_directory+"/"+this.state.new_image} />
              }         
            </div>
          }

          <input type="file" id="file_input"  onChange={this.fileTransform}/><br/>

          <br/>

          <Button variant="contained" type="submit"  style={{width:1000}} color="primary" >
            Update
          </Button><br/>

          <b>{newsResponse!=null?newsResponse:null}</b>

        </form> 
      </div>
    )
  }
}

const mapStateToProps = (state)=> {
  return{
    loadSingleNews: state.news.loadSingleNews,
    newsResponse : state.news.newsResponse,
    loadCategories: state.category.loadCategories
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    loadSingleDataUser: (id) => dispatch(loadSingleDataUser(id)),
    editNewsUser: (credentials, id) => dispatch(editNewsUser(credentials, id)),
    loadCategoryUser: (page) => dispatch(loadCategoryUser(page))  
  }   
}

export default connect(mapStateToProps,mapDispatchToProps)(EditNews)