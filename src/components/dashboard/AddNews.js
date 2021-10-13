import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import  { addNewsUser } from  '../../store/actions/NewsActions'
import { loadCategoryUser } from '../../store/actions/CategoryActions'

class AddNews extends Component {

  constructor(props) {
    super(props)
    this.state ={
      title:'',
      category_id:'',
      description:'',
      profile_image:'',
    }
  }

  componentDidMount = () => {
    const page = "";
    this.props.loadCategoryUser(page);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id] :e.target.value
    })
  }
    
  //this converts a blob type image to base64 encoded string
  getBase64 = (file, callback) => {
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
    console.log(this.state);
    this.props.addNewsUser(this.state)
  }

  render() {
    const {newsResponse} = this.props; 
    const {loadCategories} = this.props;

    return (
      <div>

        <h1>Add a news</h1>

        <form   autoComplete="off" onSubmit={this.handleSubmit}>

          <TextField
            id="title"
            label="title"
            style={{ margin: 8,maxWidth:1000 }}
            placeholder="enter your title"
            fullWidth
            margin="normal"
            variant="outlined"
            required
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
            onChange={this.handleChange}
          />
     
          <input type="file" id="file_input"  onChange={this.fileTransform}/><br/>

          <br/>

          <Button variant="contained" type="submit"  style={{width:1000}} color="primary" >
            Add A News
          </Button><br/>

          <b>{newsResponse!=null?newsResponse:null}</b>

        </form>
               
      </div>
    )
  }
}

const mapDisPatchToProps = (dispatch) => {
  return {
    addNewsUser: (creds) => dispatch(addNewsUser(creds)),
    loadCategoryUser: (page) => dispatch(loadCategoryUser(page))
  }
}

const mapStateToProps = (state) => {
  return{
    newsResponse:state.news.newsResponse,
    loadCategories: state.category.loadCategories
  }
}

export default connect(mapStateToProps,mapDisPatchToProps)(AddNews)