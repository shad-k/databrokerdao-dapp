//Import axios

export const STREAMS_TYPES = {
  FETCH_STREAMS: 'FETCH_STREAMS',
  FETCHING_STREAMS: 'FETCHING_STREAMS',
  FETCH_STREAM: 'FETCH_STREAM',
  FETCH_STREAM_TYPES: 'FETCH_STREAM_TYPES'
};

export const STREAMS_ACTIONS = {
  fetchStreams: (dispatch) => {
    //This is where we will do api call to get new streams
    dispatch({
      type: STREAMS_TYPES.FETCHING_STREAMS,
      value: true
    });

    //TODO: replace timeout with api call
    setTimeout(() => {
      dispatch({
        type: STREAMS_TYPES.FETCH_STREAMS,
        streams: {
          12323: {
            id:'12323',
            name:'Barvista temperature',
            type:'temperature'
          },
          3223: {
            id:'3223',
            name:'Seven Oaks temperature',
            type:'temperature'
          }
        }
      });
    },2000);

  },
  fetchStream: (dispatch, streamID) => {
    setTimeout(() => {
      dispatch({
        type: STREAMS_TYPES.FETCH_STREAM,
        stream: {
          id:'63452',
          name:'Detail temperature sensor',
          type:'temperature'
        }
      });
    },1000);
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
