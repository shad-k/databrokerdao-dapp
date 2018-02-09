import React, { Component } from 'react';
// import { Helmet } from 'react-helmet';
import { Toolbar, Autocomplete, Button } from 'react-md';
import Logo from '../../assets/logo-white.png';
import { Switch, Route } from 'react-router-dom';
import Notifications from 'react-notification-system-redux';
// import { beforeRoutes, afterRoutes } from '../navigation';
import { getSafely } from '@settlemint/lib-utils';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import '../../styles/search.css';

class SearchContainer extends Component {
  state = { value: '', searching: false };

  handleNavClick = () => {
    this.setState({ searching: false });
  };

  handleActionClick = () => {
    if (this.state.searching) {
      this.setState({ value: '' });
    } else {
      this.setState({ searching: true });
    }
  };

  handleChange = value => {
    this.setState({ value });
  };

  handleAutocomplete = (id, index, matches) => {
    const toolbar = document.getElementById('fixed-toolbar-example');
    const item = document.getElementById(id);
    if (!item || !toolbar) {
      return;
    }

    let scrollTop = item.offsetTop - toolbar.offsetHeight;
    let scrollContainer = null;
    if (this.props.mobile) {
      scrollContainer = document.getElementById('phone-emulator-demo');
    } else {
      scrollContainer = toolbar.parentNode;
      scrollTop -= scrollContainer.parentNode.querySelector('header')
        .offsetHeight;
    }

    scrollContainer.scrollTop = scrollTop;
    this.setState({ value: matches[index].name });
  };

  render() {
    const { searching, value } = this.state;

    return (
      <Toolbar
        id="fixed-toolbar-example"
        fixed
        colored
        nav={
          <div className="md-inline-block">
            <img src={Logo} alt="DataBroker DAO" className="headerLogo" />
          </div>
        }
      />
    );
  }
}
const mapDispatchToProps = dispatch => ({
  changeRoute: url => {
    dispatch(push(url.slice(1)));
  }
});

const mapStateToProps = state => ({
  token: state.auth.token,
  notifications: getSafely(state.notifications)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
