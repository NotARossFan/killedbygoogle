import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { format, formatDistance, parseISO } from 'date-fns';
import styled from 'styled-components';

import updateMeta from './updateMeta';

import Tombstone from './assets/tombstone.svg';
import Guillotine from './assets/guillotine.svg';


const Icon = styled.img`
  height: 200px;
  width: 200px;
  display: block;
  margin: 0 auto;
`;

const Name = styled.h1`
  font-size: 2em;
  font-weight: lighter;
  margin-bottom: 5px;
  text-align: left;
  @media screen and ( max-width: 700px ) {
    text-align: center;
  }
`;

const DateContainer = styled.div`
  text-align: left;
  font-size: 1.5em;
  font-weight: lighter;
  margin-top: 15px;
  @media screen and ( max-width: 700px ) {
    text-align: center;
    font-size: 1.25em;
  }
`;

const IconContainer = styled.div`
  flex: 0 0 250px;
`;

export default class SingleItem extends Component {
  componentWillMount() {
    const { ...grave } = this.props;
    document.title = `${grave.name}: ${format(parseISO(grave.dateOpen), 'yyyy')} - ${format(parseISO(grave.dateClose), 'yyyy')}`;
    updateMeta(grave);
  }

  getIcon() {
    return (this.isPast()) ? <Icon src={Tombstone} alt="Tombstone" /> : <Icon src={Guillotine} alt="Guillotine" />;
  }

  getYears() {
    const { dateClose, dateOpen } = this.props;
    const duration = formatDistance(parseISO(dateClose), parseISO(dateOpen));

    return (` It was ${duration} old.`);
  }

  isPast() {
    const { dateClose } = this.props;
    return new Date() > new Date(dateClose);
  }

  timePhrase() {
    const { dateClose, dateOpen } = this.props;
    const bornDate = format(parseISO(dateOpen), 'MMMM d, yyyy');
    const deathDate = format(parseISO(dateClose), 'MMMM d, yyyy');

    if (this.isPast()) {
      return (
        <span>
          {`${bornDate} - ${deathDate}`}
        </span>
      );
    }

    return (
      <span>
        {deathDate}
      </span>
    );
  }


  render() {
    const { ...grave } = this.props;
    const FlexBox = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 40px;
      padding-bottom: 40px;
      @media screen and ( max-width: 700px ) {
        display: block;
      }
      @media screen and ( min-width: 700px ) {
        padding-top: 160px;
        padding-bottom: 80px;
      }
    `;
    return (
      <FlexBox>
        <IconContainer>
          <div>{this.getIcon()}</div>
        </IconContainer>
        <div>
          <Name><a href={grave.link} target="_blank" rel="noopener noreferrer">{grave.name}</a></Name>
          <DateContainer>
            {this.timePhrase()}
          </DateContainer>
        </div>
      </FlexBox>
    );
  }
}

SingleItem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  dateClose: PropTypes.string.isRequired,
  dateOpen: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
