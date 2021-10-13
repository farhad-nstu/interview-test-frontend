import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import {loadSingleCategoryUser, editCategoryUser} from '../../../store/actions/CategoryActions';

class EditCategory extends Component {

  constructor(props) {
    super(props)
    this.state ={
      title: '',
      description: '',
    }
  } 

  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.props.loadSingleCategoryUser(id);
  }
  
  componentDidUpdate = async (prevProps, prevState) =>{
    if(prevProps.loadSingleCategory !== this.props.loadSingleCategory){
      let singleData = this.props.loadSingleCategory;
      this.setState({
        title:singleData.data.title,
        description:singleData.data.description, 
      })
    }
  }
    
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    const { id } = this.props.match.params;
    this.props.editCategoryUser(this.state, id);
  }

  render() {

    const {categoryResponse} = this.props; 

    return (
      <div>
        <h1>Edit Category</h1>

        <form autoComplete="off" onSubmit={this.handleSubmit}>
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

          <TextField
            id="description"
            label="description"
            style={{ margin: 8,maxWidth:1000 }}
            placeholder="enter description"
            fullWidth
            margin="normal"
            variant="outlined"
            value= {this.state.description || ''}
            onChange={this.handleChange}
          />

          <br/>

          <Button variant="contained" type="submit"  style={{width:1000}} color="primary" >
            Update
          </Button><br/>

          <b>{categoryResponse !=null ? categoryResponse : null}</b>

        </form>  
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loadSingleCategory: state.category.loadSingleCategory,
    categoryResponse: state.category.categoryResponse
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    loadSingleCategoryUser: (id) => dispatch(loadSingleCategoryUser(id)),
    editCategoryUser: (credentials,id) =>dispatch(editCategoryUser(credentials, id)) 
  }   
}

export default connect(mapStateToProps,mapDispatchToProps)(EditCategory)