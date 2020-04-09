import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Aragon, { events } from '@aragon/api';

const app = new Aragon();


app.store(async (state, { event, returnValues }) => {
    let nextState = { ...state };

    if (state == null) {
      nextState = {
        believers: [],
      };
    }

    switch (event) {
      case events.SYNC_STATUS_SYNCING:
        nextState = { ...nextState, isSyncing: true };
        break;
      case events.SYNC_STATUS_SYNCED:
        nextState = { ...nextState, isSyncing: false };
        break;
      case 'Believed':
        return believed(
          nextState,
          returnValues
        );
      case 'Blessed':
        return blessed(
          nextState,
          returnValues
        );
      case 'Unblessed':
        return unblessed(
          nextState,
          returnValues
        );
      default:
        return state;
    }

    return nextState;
});

async function believed(
  state,
  {
    cyberAddress,
    cosmosAddress,
    ethereumAddress,
    nickname,
    keybase,
    github,
  }
) {
  return {
    ...state,
    believers: [
      ...(state.believers || []),
      {
        cyberAddress,
        cosmosAddress,
        ethereumAddress,
        nickname,
        keybase,
        github,
        status: 0,
      }
    ]
  }
}

async function blessed(
  state,
  { nickname }
) {
  let index = -1;
  for (var i = 0; i < state.believers.length; i++) {
    if (state.believers[i].nickname == nickname) index = i;
  }
  const believer = state.believers[index];

  if (index == -1) {
    return {
      ...state,
      believers: [
        ...state.believers
      ]
    }
  }

  return {
    ...state,
    believers: [
      ...state.believers.slice(0, index),
      {
        ...believer,
        status: 1
      },
      ...state.believers.slice(index+1),
    ]
  };
}

async function unblessed(
  state,
  { nickname }
) {
  let index = -1;
  for (var i = 0; i < state.believers.length; i++) {
    if (state.believers[i].nickname == nickname) index = i;
  }
  const believer = state.believers[index];

  if (index == -1) {
    return {
      ...state,
      believers: [
        ...state.believers
      ]
    }
  }

  return {
    ...state,
    believers: [
      ...state.believers.slice(0, index),
      {
        ...believer,
        status: 2
      },
      ...state.believers.slice(index+1),
    ]
  };
}