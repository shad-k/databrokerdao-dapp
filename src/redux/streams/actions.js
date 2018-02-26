//Import axios

export const STREAMS_ACTION_TYPES = {
  FETCH_STREAMS: 'FETCH_STREAMS',
  FETCH_STREAM_TYPES: 'FETCH_STREAM_TYPES'
};

export const STREAMS_ACTION_FUNCTIONS = {
  fetchStreams: () => {
    console.log("hoikes");
  },
  fetchStreamTypes: () => {
    console.log("test test");

    return {
      type: STREAMS_ACTION_TYPES.FETCH_STREAMS,
      streams: {name:'Jean Pierre de Sensor'}
    };
    // return een action met de nieuwe stream types als payload
  }
};
