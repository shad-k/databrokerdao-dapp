//import { createAction } from '../../libs/redux-saga-utils/saga-utils'

const ns = 'streams';

export const STREAMS_TYPES = {
  FETCH_STREAMS: `${ns}/FETCH_STREAMS`
}

export const STREAMS_ACTIONS = {
  fetchStreams: (dispatch) => {
    setTimeout(() => {
        dispatch(STREAMS_ACTIONS.testStream(true));
    }, 5000);
  },
  testStream: (working) => {
    console.log(`Test stream ${working}`);
  }
}
