import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import { db } from '../firebase';

const IndexPage = () => {
  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    db.getAvailableRooms().then((availableRooms) => {
      setAvailableRooms(availableRooms.val());
    });
  }, []);

  const renderAvailableRooms = () => {
    return Object.keys(availableRooms).map((roomId) => {
      const room = availableRooms[roomId];
      return (
        <div key={roomId} className="is-one-quarter">
          <Link to={`/room?id=${roomId}`}>
            <div className="card">
              <div className="card-content">
                <p className="title is-4">{room.roomName}</p>
              </div>
            </div>
          </Link>
        </div>
      );
    });
  };

  return (
    <Layout>
      <SEO title="Power and Affirmation" />
      <h1>Hi people</h1>
      <Link to="/admin">Admin Section</Link>
      <div className="mt-0 columns">
        {renderAvailableRooms()}
      </div>
    </Layout>
  );
};

export default IndexPage;
