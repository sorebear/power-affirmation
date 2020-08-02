import { db } from './firebase';

/*
 * CREATE Methods
 */
export const createNewRoom = (
  roomName,
  cardsPerUser,
  powColor,
  affColor
) => {
  return db.ref('activeRooms').push({
    roomName,
    cardsPerUser,
    powColor,
    affColor,
    users: [],
  });
};

export const createUser = (roomId, cardsPerUser) => {
  // const powCards = [];
  // const affCards = [];
  // for (let i = 0; i < cardsPerUser; i += 1) {
  //   powCards.push({})
  // }
}

/*
 * READ Methods
 */

export const getGameState = (roomId) => {
  return db.ref(`activeRooms/${roomId}`).once('value');
};

export const getAvailableRooms = () => {
  return db.ref('activeRooms').once('value');
};

/*
 * UPDATE Methods
 */

export const removeCurrentGameChangeListener = (roomId) => {
  db.ref(`activeRooms/${roomId}`).off('value');
};

export const applyCurrentGameChangeListener = (roomId, callback) => {
  db.ref(`activeRooms/${roomId}`).on('value', callback);
};

export const applyGameAddedOrRemovedListener = (callback) => {
  db.ref('activeRooms').on('value', callback);
};

export const removeGameAddedOrRemovedListener = () => {
  db.ref('activeRooms').off('value');
};

export const addPlayer = (roomId, currentPlayerCount) => {
  db.ref(`activeRooms/${roomId}`).update({
    playerCount: currentPlayerCount + 1,
  });
};

export const handleSelectionInPlacementPhase = (
  roomId,
  workerBeingPlaced,
  newData
) => {
  const ref = db.ref(`activeRooms/${roomId}`);
  ref.update({
    workerBeingPlaced: newData.workerBeingPlaced,
    activePlayer: newData.activePlayer,
    gameBoard: newData.gameBoard,
    turnPhase: newData.turnPhase,
  });
};

export const handleSelectionInSelectPhase = (roomId, newData) => {
  const ref = db.ref(`activeRooms/${roomId}`);
  ref.update({
    turnPhase: newData.turnPhase,
    selectedWorker: newData.selectedWorker,
  });
};

export const handleSelectionInMovePhase = (roomId, newData) => {
  const ref = db.ref(`activeRooms/${roomId}`);
  ref.update({
    winConditionMet: newData.selectedWorker.height === 3,
    turnPhase: newData.turnPhase,
    gameBoard: newData.gameBoard,
    currentUpdate: newData.currentUpdate,
    selectedWorker: newData.selectedWorker,
  });
};

export const handleSelectionInBuildPhase = (roomId, newData) => {
  const ref = db.ref(`activeRooms/${roomId}`);
  ref.update({
    turnPhase: newData.turnPhase,
    activePlayer: newData.activePlayer,
    gameBoard: newData.gameBoard,
    currentUpdate: newData.currentUpdate,
    selectedWorker: {
      workerId: '',
      row: 0,
      col: 0,
      height: 0,
    },
  });
};

export const makeRequestToJoin = (roomId, username) => {
  const ref = db.ref(`activeRooms/${roomId}`);
  ref.update({
    pendingRequest: username,
    requestAccepted: false,
    requestRejected: false,
  });
};

export const cancelRequestToJoin = (roomId) => {
  const ref = db.ref(`activeRooms/${roomId}`);
  ref.update({
    pendingRequest: null,
    requestAccepted: false,
    requestRejected: false,
  });
};

export const resetGame = (roomId) => {
  const ref = db.ref(`activeRooms/${roomId}`);
  ref.update({
    activePlayer: Math.ceil(Math.random() * 2),
    // gameBoard: initialGameBoard,
    selectedWorker: {
      workerId: '',
      row: 0,
      col: 0,
      height: 0,
    },
    turnPhase: 'placement',
    winConditionMet: false,
    workerBeingPlaced: 1,
  });
};

export const resolveRequestToJoin = (roomId, acceptRequest, joiningPlayer) => {
  const ref = db.ref(`activeRooms/${roomId}`);
  if (acceptRequest) {
    ref.update({
      activePlayer: Math.ceil(Math.random() * 2),
      // gameBoard: initialGameBoard,
      joiningPlayer: joiningPlayer,
      localGame: false,
      pendingRequest: null,
      requestAccepted: true,
      selectedWorker: {
        workerId: '',
        row: 0,
        col: 0,
        height: 0,
      },
      turnPhase: 'placement',
      workerBeingPlaced: 1,
      winConditionMet: false,
    });
  } else {
    ref.update({
      pendingRequest: null,
      requestRejected: true,
    });
  }
};

/*
 * DELETE Methods
 */

export const removePlayer = (roomId, userId, creator, joiner, playerCount) => {
  const ref = db.ref(`activeRooms/${roomId}`);
  if (userId === 1) {
    ref.update(
      {
        leavingPlayer: creator || 'player',
        creatingPlayer: null,
        playerCount: playerCount - 1,
      },
      (err) => {
        if (!err && playerCount - 1 <= 0) {
          ref.remove();
        }
      }
    );
  } else {
    ref.update(
      {
        leavingPlayer: joiner || 'player',
        joiningPlayer: null,
        playerCount: playerCount - 1,
      },
      (err) => {
        if (!err && playerCount <= 0) {
          ref.remove();
        }
      }
    );
  }
};

export const deleteGame = (roomId) => {
  return db.ref(`activeRooms/${roomId}`).remove();
};
