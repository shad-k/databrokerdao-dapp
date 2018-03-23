import _ from 'lodash';
import axios from '../../utils/axios';
import Bluebird from 'bluebird';
import moment from 'moment';

export const PURCHASES_TYPES = {
  FETCH_PURCHASES: 'FETCH_PURCHASES',
  FETCHING_PURCHASES: 'FETCHING_PURCHASES',
  PURCHASE_ACCESS: 'PURCHASE_ACCESS',
  PURCHASING_ACCESS: 'PURCHASING_ACCESS'
};

export const PURCHASES_ACTIONS = {
  fetchPurchases: () => {
    return (dispatch, getState) => {
      const state = getState();

      dispatch({
        type: PURCHASES_TYPES.FETCHING_PURCHASES,
        value: true
      });

      const authenticatedAxiosClient = axios(null,true);

      //Test code to test getting purchases
      authenticatedAxiosClient.get(`/purchaseregistry/list`).then(response => {
        console.log("purchases:");
        console.log(response);
      }).catch(error => {
        console.log(error);
      });


      //TODO hear from Silke in what format purchases are supplied
      const parsedResponse = [
          {
            key:"brolol123",
            name:"Barvista Toilet sensor",
            type:"Temperture"
          },
          {
            key:"0x94c3eebfc04828cf75475108a627de78bbf1d8e6",
            name:"Luftdaten Hum 9566",
            type:"PM25"
          }
        ];

      dispatch({
        type: PURCHASES_TYPES.FETCH_PURCHASES,
        purchases: parsedResponse
      });
    }
  },
  purchaseAccess: (stream,endTime) => {
    return (dispatch, getState) => {
      console.log("Purchase access");
      dispatch({
        type: PURCHASES_TYPES.PURCHASING_ACCESS,
        value: true
      });

      const authenticatedAxiosClient = axios(null,true);

      const duration = moment.duration(moment(endTime).diff(moment()));
      const purchasePrice = stream.price * duration;

      function getDtxTokenRegistry() {
        return authenticatedAxiosClient.get("/dtxtokenregistry/list");
      }

      function getPurchaseRegistry() {
        return authenticatedAxiosClient.get("/purchaseregistry/list");
      }

      function getMetadataHash() {
        return authenticatedAxiosClient.post("/ipfs/add/json",{
          data:{
            email: localStorage.getItem('email')
          }
        });
      }

      Bluebird.all([getDtxTokenRegistry(),getPurchaseRegistry(),getMetadataHash()])
        .then((responses) => {
          const deployedTokenContractAddress = responses[0].data.items[0].contractaddress;
          const spenderAddress = responses[1].data.base.key;
          const metadataHash = responses[2].data[0].hash;

          // Time to approve the tokens
          authenticatedAxiosClient.post(`/dtxtoken/${deployedTokenContractAddress}/approve`,{
            spender: spenderAddress, // The contract that will spend the tokens (some function of the contract will)
            value: purchasePrice.toString()
          }).then(response => {
            console.log(response);

            //Tokens have been allocated - now we can make the purchase!
            authenticatedAxiosClient.post(`/purchaseregistry/purchaseaccess`,{
              stream:"0xfa27d79843e9f1536061f1d22385239872781551",
              endtime:"1521882000",
              metadata:metadataHash
            }).then(response => {
              console.log("Purchase successful");
              console.log(response);
              dispatch({
                type: PURCHASES_TYPES.PURCHASING_ACCESS,
                value: false
              });
            });

          }).catch(error => {
            console.log(error);
          });
        })
    }
  }
};
