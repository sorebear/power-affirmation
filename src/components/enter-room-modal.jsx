import React, { useContext } from 'react';
import { Link } from 'gatsby';

import { store, actions, Consumer } from '../context/store';

const Modal = ({ roomId, closeModal }) => {
  const globalState = useContext(store);
  const { dispatch, state } = globalState;

  return (
    <Consumer>
      {context => {
        console.log('[Context]', context);

        return (
          <div className="modal" style={{ display: roomId ? 'flex' : 'none' }}>
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Join Room</p>
                <button
                  onClick={closeModal}
                  className="delete"
                  aria-label="close"
                ></button>
              </header>
              <section className="modal-card-body">
                <h2>Please Enter Your Name:</h2>

                <div className="field">
                  <label htmlFor="firstName" className="label">
                    First Name
                  </label>
                  <div className="control">
                    <input
                      id="firstName"
                      name="firstName"
                      className="input"
                      type="text"
                      onChange={(e) =>
                        dispatch({
                          type: actions.UPDATE_FIRST_NAME,
                          payload: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="lastName" className="label">
                    Last Name
                  </label>
                  <div className="control">
                    <input
                      id="lastName"
                      name="lastName"
                      className="input"
                      type="text"
                      onChange={(e) =>
                        dispatch({
                          type: actions.UPDATE_LAST_NAME,
                          payload: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </section>
              <footer className="modal-card-foot">
                <Link to={`/room?id=${roomId}`} className="button is-success">
                  Join
                </Link>
                <button
                  onClick={closeModal}
                  className="button"
                  aria-label="close"
                >
                  Cancel
                </button>
              </footer>
            </div>
          </div>
        );
      }}
    </Consumer>
  );
}

export default Modal;