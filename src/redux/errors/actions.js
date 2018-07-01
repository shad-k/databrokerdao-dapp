export const ERROR_TYPES = {
  GOOGLE_MAP_ERROR: "GOOGLE_MAP_ERROR",
};

export const ERROR_ACTIONS = {
  setMapError: (error) => {
    return (dispatch) => {
      dispatch({
        type: ERROR_TYPES.GOOGLE_MAP_ERROR,
        error: error
      });
    }
  }
};