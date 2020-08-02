import React, { useState } from 'react';

const Room = (props) => {
  const roomId = props.location.search.replace('?id=', '');
  console.log('GAME ID', roomId);

  return <div />;
}

export default Room;