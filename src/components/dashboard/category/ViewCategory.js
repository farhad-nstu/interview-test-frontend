import React, { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Pagination from 'rc-pagination'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from 'react-redux'
import {loadCategoryUser, loadSearchCategoryUser, deleteCategoryUser } from '../../../store/actions/CategoryActions'

class ViewCategory extends Component {

  constructor(props) {
    super(props)
    this.state = {
      search_category: ""
    }
  }

  componentDidMount = () => {
    const page = "";
    this.props.loadCategoryUser(page);
  }

  handleKeyUp = async (e) => {
    await this.setState({
      [e.target.id] :e.target.value
    })

    if(this.state.search_category == "") {

    } else {
      let page = "";
      this.props.loadSearchCategoryUser(this.state.search_category, page);
    }
  }

  onChange = (currentPage) => {
    if(this.state.search_category == "") {
      this.props.loadCategoryUser(currentPage)
    } else {
      this.props.loadSearchCategoryUser(this.state.search_category, currentPage)
    }    
  }

  loadEditCategoryPage = (e, id) => {
    this.props.history.push('/dashboard/edit-category/'+id);
  }

  DeleteCategory = (e, id) => {
    const confirmDialog  = window.confirm("are you sure you want to delete this category?");
    if(confirmDialog == true) {
      this.props.deleteCategoryUser(id);
    } else {

    }
  }

  render() {

    const {loadCategories} = this.props;   
    
    return (
      <div>

        <TextField
          id="search_category"
          label="search"
          style={{ margin: 8,maxWidth:1000 }}
          placeholder="enter title or alias"
          fullWidth
          margin="normal"
          required
          onKeyUp={this.handleKeyUp}
        />


        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">edit</TableCell>
              <TableCell align="right">delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadCategories && loadCategories.hasOwnProperty('data') ? loadCategories.data.data.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">{row.title}</TableCell>
                <TableCell align="right">{row.description}</TableCell>

                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    id={row.id}
                    onClick={(e)=>this.loadEditCategoryPage(e, row.id)}
                  >
                    Edit
                  </Button>
                </TableCell>

                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    id={row.id}
                    onClick = {(e)=>this.DeleteCategory(e, row.id)}
                  >
                    Delete
                  </Button>
                </TableCell>

              </TableRow>
            )) :null }

          </TableBody>
        </Table>

        {loadCategories ? 
          <Pagination defaultPageSize={2} current={loadCategories.data.current_page}
            className="pagination-restyle"
            total={loadCategories.data.total} 
            onChange={this.onChange} 
            prevIcon={<ArrowBackIosIcon/>}
            jumpNextIcon={<ArrowForwardIcon/>}
            jumpPrevIcon={<ArrowBackIcon/>}
            nextIcon={<ArrowForwardIosIcon/>}
          /> 
          : null
        }
      </div>
    )
        
  }

}

const mapStateToProps = (state) => {
  return{
    loadCategories: state.category.loadCategories
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    loadCategoryUser: (page) => dispatch(loadCategoryUser(page)),
    loadSearchCategoryUser: (search_category, page) => dispatch(loadSearchCategoryUser(search_category, page)),
    deleteCategoryUser: (id) => dispatch(deleteCategoryUser(id))
  }   
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewCategory)