import React, { createContext, useReducer } from 'react';
import actions from './actions';

const initialState = {
  affColor: null,
  powColor: null,
  cardsPerUser: null,
  roomName: null,
  users: [],
}

const store = createContext(initialState);
const { Provider, Consumer } = store;

const StateProvider = ({ children }) => {
  let newState;
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case actions.SET_ROOM_STATE:
        let newState = action.payload;
        return newState;

      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { actions, store, StateProvider, Consumer };