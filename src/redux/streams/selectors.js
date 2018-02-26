import { createSelector } from 'reselect';

export const getFilter = state => state.filter;

export const getStreams = createSelector(
  getFilter,
  (filter) => {
    console.log("trying to get streams");
  }
);
