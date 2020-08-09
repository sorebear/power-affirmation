import React, { useState, useEffect, useContext } from 'react';

import { store, actions, Consumer } from '../context/store';
import { db } from '../firebase';

const Room = (props) => {
  const globalState = useContext(store);
  const { dispatch, state } = globalState;
  
  const roomId = props.location.search.replace('?id=', '');

  useEffect(() => {
    db.getRoomState(roomId).then((snapshot) => {
      db.createUser(roomId, snapshot.val());


      // console.log('Room', snapshot.val());
      // dispatch({
      //   type: actions.SET_ROOM_STATE,
      //   payload: snapshot.val(),
      // });
    });

    db.updateRoomOnChange(roomId, (snapshot) => {
      dispatch({
        type: actions.SET_ROOM_STATE,
        payload: snapshot.val(),
      });
    });

  }, []);


  return (
    <Consumer>
      {context => {
        console.log('[Context]', context);

        return (
          <div />
        );
      }}
    </Consumer>
  );
}

export default Room;