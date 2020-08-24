import React, { useContext } from 'react';

import { store, actions, Consumer } from '../context/store';
import { db } from '../firebase';

const Cards = () => {
  const globalState = useContext(store);
  const { dispatch, state } = globalState;

  if (!state.firebase.users) {
    return <span />;
  }

  return Object.keys(state.firebase.users).map((userId) => {
    const user = state.firebase.users[userId];

    if (user.cards && user.firstName === state.local.firstName && user.lastName === state.local.lastName) {
      return Object.keys(user.cards).map((cardId) => {
        const card = user.cards[cardId];

        return (
          <div key={cardId} className="card" style={{ backgroundColor: card.color }}>
            <p>{card.type}</p>
            {card.name && (
              <p>{card.name}</p>
            )}
          </div>
        );
      })
    }
  });
}

export default Cards;