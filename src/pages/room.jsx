import React, { useEffect, useContext } from 'react';

import Cards from '../components/cards';
import { store, actions, Consumer } from '../context/store';
import { db } from '../firebase';

const Room = (props) => {
  const globalState = useContext(store);
  const { dispatch, state } = globalState;
  
  const roomId = props.location.search.replace('?id=', '');

  useEffect(() => {
    const { firstName, lastName } = state.local;

    if (!firstName || !lastName) {
      const jsonState = localStorage.getItem('cachedState');
      
      dispatch({
        type: actions.SET_FULL_STATE,
        payload: JSON.parse(jsonState),
      });
    }
    else {
      db.getRoomState(roomId).then((snapshot) => {
        db.createUser(roomId, firstName, lastName, snapshot.val());
      });
    }


    db.updateRoomOnChange(roomId, (snapshot) => {
      const stateToCache = {
        local: state.local,
        firebase: snapshot.val(),
      };
      localStorage.setItem('cachedState', JSON.stringify(stateToCache));
      
      dispatch({
        type: actions.SET_FIREBASE_STATE,
        payload: snapshot.val(),
      });
    });
  }, []);

  return (
    <Consumer>
      {context => {
        console.log('[Context]', context);

        return (
          <Cards />
        );
      }}
    </Consumer>
  );
}

export default Room;