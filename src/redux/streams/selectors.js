import { createSelector } from 'reselect';

export const streamsSlice = state => state.streams;

export const streams = createSelector(
  streamsSelector,
  streamsSelector => slice.streams
)
