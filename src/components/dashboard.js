import React , {useEffect} from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import  useStyles from '../layout/dashboard/GeneralJSXstyling'
import Sidebar from '../layout/dashboard/Sidebar'
import '../layout/dashboard/dashboard.css'
import {Switch,Route} from 'react-router-dom'
import ViewNews from '../components/dashboard/ViewNews'
import AddNews from '../components/dashboard/AddNews'
import EditNews from '../components/dashboard/EditNews'
import {useDispatch} from 'react-redux';
import {resetAuthResponsePerComponent} from '../store/actions/AuthAction';
import AddCategory from '../components/dashboard/category/AddCategory';
import ViewCategory from '../components/dashboard/category/ViewCategory';
import EditCategory from '../components/dashboard/category/EditCategory';


const Dashboard = (props) => {

  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetAuthResponsePerComponent())
  }, [dispatch])

  return (
    <div>  
      <Sidebar props={props}/>
      <div className="main-content">
        <main className={classes.content}>
        <div className={classes.toolbar} />
        
          <Switch>
            <Route exact path={props.match.path} component={ViewNews} />
            <Route exact path={`${props.match.path}/view-news`}  component={ViewNews} />
            <Route exact path={`${props.match.path}/add-news`} component={AddNews} />
            <Route exact path={`${props.match.path}/edit-news/:id`}  component={EditNews} />
            <Route exact path={`${props.match.path}/add-category`} component={AddCategory} />
            <Route exact path={`${props.match.path}/view-category`} component={ViewCategory} />
            <Route exact path={`${props.match.path}/edit-category/:id`} component={EditCategory} />
          </Switch>
        
        </main>
      </div>  
    </div>
  );
}

Dashboard.propTypes = {
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default Dashboard;
