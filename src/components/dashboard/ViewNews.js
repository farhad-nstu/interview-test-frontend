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
import {loadNewsUser, loadSearchNewsUser, deleteNewsUser } from '../../store/actions/NewsActions'


class ViewNews extends Component {

  constructor(props) {
    super(props)
    this.state = {
      search_content:""
    }
  }

  componentDidMount = () => {
    const page = "";
    this.props.loadNewsUser(page);
  }

  handleKeyUp = async (e) => {
    await  this.setState({
        [e.target.id] :e.target.value
      })
      console.log(this.state)
    if(this.state.search_content=="") {

    } else {
      let page ="";
      this.props.loadSearchNewsUser(this.state.search_content,page);
    }
  }

  onChange = (currentPage) => {
    if(this.state.search_content == "") {
      this.props.loadNewsUser(currentPage)
    } else {
      this.props.loadSearchNewsUser(this.state.search_content, currentPage)
    }      
  }

  loadEditpage = (e, id) => {
    this.props.history.push('/dashboard/edit-news/'+id);
  }

  DeleteNews = (e, id) => {
    const confirmDialog  = window.confirm("are you sure you want to delete this news?");
    if(confirmDialog == true) {
      this.props.deleteNewsUser(id);
    } else {

    }
  }

  render() {

    const {loadNews} = this.props;   
    
    return (
      <div>

        <TextField
          id="search_content"
          label="Search"
          style={{ margin: 8,maxWidth:1000 }}
          placeholder="Search by title"
          fullWidth
          margin="normal"
          required
          onKeyUp={this.handleKeyUp}
        />

        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Author</TableCell>
              <TableCell align="right">profile image</TableCell>
              <TableCell align="right" >Edit</TableCell>
              <TableCell align="right" >Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loadNews && loadNews.hasOwnProperty('data')? loadNews.data.data.map(row => (
              <TableRow key={row.id }>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.category_id}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.user_id}</TableCell>
                <TableCell align="right">     
                  <img src={loadNews.file_directory+"/"+row.image_file} width={50} height={50} />
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    id={row.id}
                    onClick={(e)=>this.loadEditpage(e,row.id)}
                  >
                    Edit
                  </Button>
                </TableCell>

                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    id={row.id}
                    onClick = {(e)=>this.DeleteNews(e, row.id)}
                  >
                    Delete
                  </Button>
                </TableCell>

              </TableRow>
            ))
            :null
            }
          </TableBody>
        </Table>

        {loadNews? 
          <Pagination defaultPageSize={2} current={loadNews.data.current_page}
          className="pagination-restyle"
          total={loadNews.data.total} 
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
  return {
    loadNews: state.news.loadNews
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    loadNewsUser: (page) => dispatch(loadNewsUser(page)),
    loadSearchNewsUser: (search_content, page) => dispatch(loadSearchNewsUser(search_content, page)),
    deleteNewsUser: (id) => dispatch(deleteNewsUser(id))
  }   
}

export default connect(mapStateToProps,mapDispatchToProps)(ViewNews)



