import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { navigate } from 'gatsby';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import { db } from '../../firebase';

const IndexPage = () => {
  const [roomName, setRoomName] = useState('');
  const [cardsPerUser, setCardsPerUser] = useState(2);
  const [powColor, setPowColor] = useState('#fff');
  const [affColor, setAffColor] = useState('#fff');
  const [password, setPassword] = useState('');

  const createNewRoom = (e) => {
    console.log('CREATE', roomName, cardsPerUser, powColor, affColor);
    db.createNewRoom(roomName, cardsPerUser, powColor, affColor).then((newRoom) => {
      if (newRoom) {
        console.log('NEW ROOM CREATED', newRoom);
        
        navigate('/');
      }
    });
  }

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Create New Power Affirmation Room</h1>

      <div className="field">
        <label htmlFor="room_name" className="label">Room Name</label>
        <div className="control">
          <input
            id="room_name"
            className="input"
            type="text"
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="num_of_cards" className="label">Number of Cards</label>
        <div className="control">
          <input 
            id="num_of_cards"
            className="input"
            type="number"
            defaultValue="2"
            onChange={(e) => setCardsPerUser(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="admin_pw" className="label">Admin Password</label>
        <div className="control">
          <input
            id="admin_pw"
            className="input"
            type="password"
            onChange={(e => setPassword(e.target.value))}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="pow_card_color" className="label">Color of Power Cards</label>
        <div className="control">
          <div className="select">
            <select
              id="pow_card_color"
              onBlur={(e) => setPowColor(e.target.value)}
            >
              <option value="#fff">White</option>
              <option value="#222">Black</option>
              <option value="#ff00cc">Pink</option>
              <option value="#ff0000">Red</option>
              <option value="orange">Orange</option>
              <option value="yellow">Yellow</option>
              <option value="green">Green</option>
              <option value="#22aaff">Light Blue</option>
              <option value="#1122dd">Blue</option>
              <option value="purple">Purple</option>
            </select>
          </div>
        </div>
      </div>
      <div className="field">
        <label htmlFor="aff_card_color" className="label">Color of Affirmation Cards</label>
        <div className="control">
          <div className="select">
            <select
              id="aff_card_color"
              onBlur={(e) => setAffColor(e.target.value)}
            >
              <option value="#fff">White</option>
              <option value="#222">Black</option>
              <option value="#ff00cc">Pink</option>
              <option value="#ff0000">Red</option>
              <option value="orange">Orange</option>
              <option value="yellow">Yellow</option>
              <option value="green">Green</option>
              <option value="#22aaff">Light Blue</option>
              <option value="#1122dd">Blue</option>
              <option value="purple">Purple</option>
            </select>
          </div>
        </div>
      </div>
      <button
        className="button is-link"
        onClick={createNewRoom}
      >
        Create New Room
      </button>
    </Layout>
  );
};

export default IndexPage;

// export default withRouter(IndexPage);
