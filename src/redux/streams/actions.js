//Import axios

export const STREAMS_TYPES = {
  FETCH_STREAMS: 'FETCH_STREAMS',
  FETCHING_STREAMS: 'FETCHING_STREAMS',
  FETCH_STREAM: 'FETCH_STREAM',
  FETCH_AVAILABLE_STREAM_TYPES: 'FETCH_AVAILABLE_STREAM_TYPES',
  REMOVE_FILTER_TYPE: 'REMOVE_FILTER_TYPE',
  ADD_FILTER_TYPE: 'ADD_FILTER_TYPE'
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
            type:'temperature',
            geo: {
              lat: '50.848451',
              lng: '4.692932'
            }
          },
          3223: {
            id:'3223',
            name:'Seven Oaks temperature',
            type:'temperature',
            geo: {
              lat: '50.878451',
              lng: '4.699932'
            }
          }
        }
      });
    },1000);

  },
  fetchStream: (dispatch, streamID) => {
    setTimeout(() => {
      dispatch({
        type: STREAMS_TYPES.FETCH_STREAM,
        stream: {
          id:'63452',
          name:'Detail temperature sensor',
          type:'temperature',
          geo: {
            lat: '50.878451',
            lng: '4.699932'
          }
        }
      });
    },1000);
  },
  fetchAvailableStreamTypes: (dispatch) => {
    dispatch({
      type: STREAMS_TYPES.FETCH_AVAILABLE_STREAM_TYPES,
      availableStreamTypes: [
        {
          id:'temperature',
          name:'Temperature'
        },
        {
          id:'humidity',
          name:'Humidity'
        },
        {
          id:'pm10',
          name:'PM10'
        },
        {
          id:'pm25',
          name:'PM2.5'
        }
      ]
    });
  },
  removeFilterType: (dispatch, removedTypeID) => {
    console.log("remove filter type action");

    dispatch({
      type: STREAMS_TYPES.REMOVE_FILTER_TYPE,
      removedTypeID //ES6 syntax sugar
    });

    //TODO: get updated set of streams from api
  },
  addFilterType: (dispatch, addedType) => {
    dispatch({
      type: STREAMS_TYPES.ADD_FILTER_TYPE,
      addedType //ES6 syntax sugar
    });

    //TODO: get updated set of streams from api
  }
};
