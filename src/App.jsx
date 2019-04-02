import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { Router, Link } from '@reach/router';
import styled from 'styled-components';

// Global CSS (e.g. body)
import './global.scss';

// Major Components
import FullList from './FullList';
import SingleItem from './SingleItem';
import { Logo, Title2 } from './components/Header.atoms';

import Tombstone from './assets/tombstone.svg';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { data } = this.props;

    const TheList = () => {
      document.title = 'Google Graveyard - Killed by Google';
      return (
        <FullList data={data} />
      );
    };

    const Slug = (props) => {
      const item = data.find(element => element.slug === props.slug);
      document.title = `${item.name} - Killed by Google`;
      const FlexBoxOuter = styled.div`
        display: block;
        justify-content: center;
        align-items: center;
      `;
      const FlexBoxInner = styled.div`
      display: flex;
      text-align: center;
      justify-content: center;
      margin: 0 auto;
      align-items: center;
      border-top: 1px solid #CCC;
      padding-top: 20px;
      max-width: 30em;
    `;
      return (
        <div>
          <SingleItem {...item} />
          <FlexBoxOuter>
            <Link to="/">
              <FlexBoxInner>
                <Logo src={Tombstone} alt="Tombstone" />
                <Title2>
                  {'Killed by Google'}
                </Title2>
              </FlexBoxInner>
            </Link>
          </FlexBoxOuter>
        </div>
      );
    };

    return (
      <div>
        <Router primary>
          <Slug path=":slug" />
          <TheList path="/" default />
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};

// Retrieve static json
fetch('graveyard.json')
  .then((response) => {
    // Process it
    response.json().then((data) => {
      // Sort by the dateClose (date discontinued)
      const graveyard = data.sort((a, b) => new Date(b.dateClose) - new Date(a.dateClose));
      // Render the app
      render(<App data={graveyard} />, document.querySelector('#killedbygoogle'));
    });
  });

if ('serviceWorker' in navigator) {
  const { info, error } = console;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js', { scope: './' })
      .then(registration => info('Service worker registered successfully: ', registration))
      .catch(err => error('Service worker registration failed: ', err));
  });
}
