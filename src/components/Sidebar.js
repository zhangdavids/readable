import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import { 
  fetchCategories, 
  setSorting, 
  setCommentSorting 
} from '../actions';
import '../styles/app.css';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Sidebar extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  componentWillMount () {
    this.props.fetchData()
  }
  handleSort = val => {
    this.props.dispatch(setSorting(val))
  };

  handleCommentSort = val => {
    this.props.dispatch(setCommentSorting(val))
  };

  render () {
    return (
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="sidebar">
            <Menu theme="dark" mode="inline">
              {this.props.sortBy &&
                <div>
                  <h2 style={{ marginBottom: 0 }}>Sort Posts By</h2>
                  <ul style={{ marginTop: '8px' }}>
                    <li
                      className='clickable'
                      onClick={() =>
                        this.handleSort(
                          this.props.sortBy === 'BY_SCORE_LOWEST'
                            ? 'BY_SCORE_HIGHEST'
                            : 'BY_SCORE_LOWEST'
                        )}
                    >
                      <Button type="primary">Votes</Button>
                    </li>
                    <li
                      className='clickable'
                      onClick={() =>
                        this.handleSort(
                          this.props.sortBy === 'BY_DATE_NEWEST'
                            ? 'BY_DATE_OLDEST'
                            : 'BY_DATE_NEWEST'
                        )}
                    >
                      <Button type="primary">Date</Button>
                    </li>
                  </ul>
                </div>}

              <h2 style={{ marginBottom: 0 }}>Categories</h2>
              <ul style={{ marginTop: '8px' }}>
                <li>
                  <Link to='/'><Button type="dashed">All</Button></Link>
                </li>
                {this.props.categories &&
                  this.props.categories.length > 0 &&
                  this.props.categories.map(category =>
                    <li key={category.path}>
                      <Link to={`/${category.name}`}>
                        <Button type="dashed">{category.name}</Button>
                      </Link>
                    </li>
                  )}
              </ul>
              {this.props.sortCommentsBy &&
                <div>
                  <h2>Sort Comments By:</h2>
                  <ul>
                    <li
                      className='clickable'
                      onClick={() =>
                        this.handleCommentSort(
                          this.props.sortCommentsBy === 'BY_SCORE_LOWEST'
                            ? 'BY_SCORE_HIGHEST'
                            : 'BY_SCORE_LOWEST'
                        )}
                    >
                      <Button type="primary">Votes</Button>
                    </li>
                    <li
                      className='clickable'
                      onClick={() =>
                        this.handleCommentSort(
                          this.props.sortCommentsBy === 'BY_DATE_NEWEST'
                            ? 'BY_DATE_OLDEST'
                            : 'BY_DATE_NEWEST'
                        )}
                    >
                      <Button type="primary">Date</Button>
                    </li>
                  </ul>
                </div>}
            </Menu>
          </div>
        </Sider>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.receiveCategories
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  fetchData: () => dispatch(fetchCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)