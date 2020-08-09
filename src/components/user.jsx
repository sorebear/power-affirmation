import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    this.startCardCount = props.startCardCount
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.state = {
      cards: [],
    }
  }

  componentDidMount() {
    const cards = [];

    for (let i = 0; i < this.startCardCount; i += 1) {
      cards.push({
        type: 'power',
        color: this.props.powColor
      });

      cards.push({
        type: 'affirmation',
        color: this.props.affColor,
        name: `${this.firstName} ${this.lastName}`,
      });
    }

    this.setState({ cards });
  }

  getName() {
    return `${this.firstName} ${this.lastName}`;
  }

  getInitials() {
    const firstInitial = this.firstName.substring(0, 1).toUpperCase();
    const lastInitial = this.lastName.substring(0, 1).toUpperCase();
    return `${firstInitial}${lastInitial}`;
  }
}