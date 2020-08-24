import React, { createContext, useReducer } from 'react';
import actions from './actions';

const initialState = {
  local: {
    firstName: '',
    lastName: '',
  },
  firebase: {
    affColor: null,
    powColor: null,
    cardsPerUser: null,
    roomName: null,
    users: [],
  }
}

const store = createContext(initialState);
const { Provider, Consumer } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case actions.SET_FULL_STATE:
        return action.payload;

      case actions.SET_FIREBASE_STATE:
        return {
          ...state,
          firebase: action.payload,
        };
      
      case actions.UPDATE_FIRST_NAME:
        return {
          ...state,
          local: {
            ...state.local,
            firstName: action.payload
          },
        };

      case actions.UPDATE_LAST_NAME: 
        return {
          ...state,
          local: {
            ...state.local,
            lastName: action.payload
          }
        }

      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { actions, store, StateProvider, Consumer };