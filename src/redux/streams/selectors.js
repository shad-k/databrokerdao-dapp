import { createSelector } from 'reselect';

//TODO we can optimize performance by checking dependencies in data so we don't have to recalculate
//TODO for now we'll not use selectors, seems overkill to me

export const getFilter = (state) => state.streams.filter;

export const getStreams = (state) => state.streams.streams;
