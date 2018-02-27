//Import axios

export const STREAMS_TYPES = {
  FETCH_STREAMS: 'FETCH_STREAMS',
  FETCHING_STREAMS: 'FETCHING_STREAMS',
  FETCH_STREAM_TYPES: 'FETCH_STREAM_TYPES'
};

export const STREAMS_ACTIONS = {
  fetchStreams: (dispatch) => {
    //This is where we will do api call to get new streams

    dispatch({
      type: STREAMS_TYPES.FETCHING_STREAMS,
      value: true
    });

    dispatch({
      type: STREAMS_TYPES.FETCH_STREAMS,
      streams: [{name:'Jean Pierre de Sensor'},{name:'Annemieke van Sensorland'}]
    });
  },
  fetchStreamTypes: () => {
    console.log("test test");

    return {
      type: STREAMS_TYPES.FETCH_STREAM_TYPES,
      stream_types: ["temperature","humidity"]
    };
    // return een action met de nieuwe stream types als payload
  }
};
