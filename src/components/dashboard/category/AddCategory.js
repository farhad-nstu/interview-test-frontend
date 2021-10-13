import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import  { addCategoryUser } from  '../../../store/actions/CategoryActions'


class AddCategory extends Component {

  constructor(props) {
    super(props)
    this.state ={
      title:'',
      description:'',
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id] : e.target.value
    })
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    console.log(this.state);
    this.props.addCategoryUser(this.state)
  }

  render() {
    const {categoryResponse} = this.props; 
    return (
      <div>
        <h1>Add Category</h1>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <TextField
            id="title"
            label="Title"
            style={{ margin: 8,maxWidth:1000 }}
            placeholder="enter title"
            fullWidth
            margin="normal"
            variant="outlined"
            required
            onChange={this.handleChange}
          />
    
          <TextField
            id="description"
            label="Description"
            style={{ margin: 8,maxWidth:1000 }}
            placeholder="enter description"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={this.handleChange}
          />

          <br/>

          <Button variant="contained" type="submit"  style={{width:1000}} color="primary">Save</Button><br/>

          <b>{categoryResponse!=null?categoryResponse:null}</b>

        </form>              
      </div>
    )
  }
}

const mapDisPatchToProps = (dispatch) => {
  return {
    addCategoryUser:(creds) =>dispatch(addCategoryUser(creds))
  }
}

const mapStateToProps = (state) => {
  return {
    categoryResponse:state.category.categoryResponse
  }
}

export default connect(mapStateToProps,mapDisPatchToProps)(AddCategory)