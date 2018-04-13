import React, { Component } from 'react';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  TablePagination,
} from 'react-md';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { PURCHASES_ACTIONS } from '../../redux/purchases/actions';

class PurchasesTable extends Component {
  componentDidMount(){
    if(this.props.token)
      this.props.fetchPurchases();
  }

  handlePagination(start, rowsPerPage) {
      console.log("Handle pagination");
  }

  onViewPurchaseDetails(key) {
    this.props.history.push(`/stream-details/${key}`);
  }

  render(){
    const LeftTableColumn = styled(TableColumn)`
      padding-left:0 !important;
    `;

    const StyledTableRow = styled(TableRow)`
      cursor: pointer;
    `;

    if(this.props.fetchingPurchases){
      return(
        <p>Loading...</p>
      );
    }

    if(this.props.purchases.length === 0){
      return(
        <p>When you purchase access to a stream, it will be listed here.</p>
      );
    }

    return(
      <DataTable baseId="purchases-table" plain>
        <TableHeader>
          <TableRow>
            <LeftTableColumn grow>Name</LeftTableColumn>
            <TableColumn>Type</TableColumn>
            <TableColumn>Frequency</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.props.purchases.map((purchase) => (
            <StyledTableRow key={purchase.key} onClick={() => this.onViewPurchaseDetails(purchase.key)}>
              <LeftTableColumn>{purchase.name}</LeftTableColumn>
              <TableColumn>{purchase.type}</TableColumn>
              <TableColumn>{purchase.updateinterval === 86400000?"daily":`${purchase.updateinterval/1000}\'\'`}</TableColumn>
            </StyledTableRow>
          ))}
        </TableBody>
        <TablePagination rows={this.props.purchases.length} rowsPerPageLabel="Rows" onPagination={() => this.handlePagination}/>
      </DataTable>
    );
  }
}

const mapStateToProps = state => ({
  purchases:state.purchases.purchases,
  fetchingPurchases:state.purchases.fetchingPurchases,
  token: state.auth.token //Used to verify if a user is signed in, if not we don't have to get purchases from API
})

function mapDispatchToProps(dispatch) {
  return {
    fetchPurchases: () => dispatch(PURCHASES_ACTIONS.fetchPurchases())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PurchasesTable));
