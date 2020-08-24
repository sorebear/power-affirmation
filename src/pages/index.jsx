import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { db } from '../firebase';
import EnterRoomModal from '../components/enter-room-modal';

const IndexPage = () => {
  const [availableRooms, setAvailableRooms] = useState({});
  const [modalRoomId, setModalRoomId] = useState(null);

  useEffect(() => {
    db.getAvailableRooms().then((availableRooms) => {
      setAvailableRooms(availableRooms.val());
    });
  }, []);

  const renderAvailableRooms = () => {
    if (availableRooms) {
      return Object.keys(availableRooms).map((roomId) => {
        const room = availableRooms[roomId];
        return (
          <div key={roomId} className="is-one-quarter">
            <div onClick={() => setModalRoomId(roomId)} className="card">
              <div className="card-content">
                <p className="title is-4">{room.roomName}</p>
              </div>
            </div>
          </div>
        );
      });
    }

    return (
      <h2>No Active Rooms</h2>
    )
  };

  return (
    <Layout>
      <SEO title="Power and Affirmation" />
      <h1>Hi people</h1>
      <Link to="/admin">Admin Section</Link>
      <div className="mt-0 columns">
        {renderAvailableRooms()}
      </div>
      <EnterRoomModal roomId={modalRoomId} closeModal={() => setModalRoomId(null)} />
    </Layout>
  );
};

export default IndexPage;
