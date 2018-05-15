import _ from 'lodash';
import axios from '../../utils/axios';
import Bluebird from 'bluebird';
import { fetchSensors } from '../../api/sensors';

export const DATASET_TYPES = {
  FETCHING_DATASETS: 'FETCHING_DATASETS',
  FETCH_DATASETS: 'FETCH_DATASETS',
  FETCH_DATASET: 'FETCH_DATASET',
  CHALLENGING_DATASET: 'CHALLENGING_DATASET',
  FETCH_CHALLENGES: 'FETCH_CHALLENGES',
  FETCHING_CHALLENGES: 'FETCHING_CHALLENGES',
  UPDATED_FILTER: 'UPDATED_FILTER',
  FETCH_DATASET_COUNTER: 'FETCH_DATASET_COUNTER',
  FETCH_AVAILABLE_CATEGORIES: 'FETCH_AVAILABLE_CATEGORIES',
  FETCH_AVAILABLE_FILETYPES: 'FETCH_AVAILABLE_FILETYPES'
};

export const DATASET_ACTIONS = {
  fetchDatasets: _filter => {
    return (dispatch, getState) => {
      const state = getState();

      dispatch({
        type: DATASET_TYPES.FETCHING_DATASETS,
        value: true
      });

      // Start with filtering only the datasets
      let filterUrlQuery = 'sensortype=DATASET';

      // Filter on category
      const filter = _filter ? _filter : state.datasets.filter;
      if (filter.categories && filter.categories.length === 1)
        filterUrlQuery += `category=${filter.categories[0]}`;
      else
        filterUrlQuery += _.map(filter.categories, cat => {
          return `category[]=${cat}`;
        }).join('&');

      // Filter on filetype
      if (filter.filetypes && filter.filetypes.length === 1)
        filterUrlQuery += `filetype=${filter.filetypes[0]}`;
      else
        filterUrlQuery += _.map(filter.filetype, type => {
          return `filetype[]=${type}`;
        }).join('&');

      if (_filter) {
        dispatch({
          type: DATASET_TYPES.UPDATED_FILTER,
          filter
        });
      }

      const limit = 5000;

      const authenticatedAxiosClient = axios(null, true);
      const fetchDatasetCounter = state.datasets.fetchDatasetCounter + 1;

      // Counter to keep track of calls so when response arrives we can take the latest
      // (counter => {
      // fetchSensors(
      //   authenticatedAxiosClient,
      //   {
      //     limit,
      //     filterUrlQuery
      //   },
      //   true
      // )
      //   .then(response => {
      const response = {
        data: require('./test-datasets.json')
      };

      // if (counter !== getState().datasets.fetchDatasetCounter) {
      //   return;
      // }

      const parsedResponse = {};
      _.each(response.data.items, item => {
        parsedResponse[item.key] = {
          id: item._id,
          key: item.key,
          name: item.name,
          type: item.type,
          price: item.price,
          stake: item.stake,
          example: item.example,
          owner: item.owner,
          numberofchallenges: item.numberofchallenges,
          challengesstake: item.challengesstake,
          category: item.category,
          filetype: item.filetype,
          credentials: item.credentials
        };
      });

      dispatch({
        type: DATASET_TYPES.FETCH_DATASETS,
        datasets: parsedResponse
      });
      // })
      // .catch(error => {
      //   console.log(error);
      // });
      // })(fetchDatasetCounter);
      // dispatch({
      //   type: DATASET_TYPES.FETCH_DATASET_COUNTER,
      //   value: fetchDatasetCounter
      // });
    };
  },
  fetchAvailableFiletypes: () => {
    return (dispatch, getState) => {
      dispatch({
        type: DATASET_TYPES.FETCH_AVAILABLE_FILETYPES,
        availableFiletypes: {
          json: {
            name: 'json',
            id: 'json'
          },
          xls: {
            name: 'xls',
            id: 'xls'
          },
          csv: {
            name: 'csv',
            id: 'csv'
          }
        }
      });
    };
  },
  fetchAvailableCategories: () => {
    return (dispatch, getState) => {
      dispatch({
        type: DATASET_TYPES.FETCH_AVAILABLE_CATEGORIES,
        availableCategories: {
          agriculture: {
            name: 'Agriculture',
            id: 'agriculture'
          },
          environment: {
            name: 'Environment',
            id: 'environment'
          },
          publicsector: {
            name: 'Public sector',
            id: 'publicsector'
          },
          energy: {
            name: 'Energy',
            id: 'energy'
          }
        }
      });
    };
  }
};
