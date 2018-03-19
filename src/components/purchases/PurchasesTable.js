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

    // console.log("Purchases:");
    // console.log(this.props.purchases);

    if(this.props.purchases.length === 0)
      return(
        <p>When you purchase access to a stream, it will be listed here.</p>
      );
    else
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
                <TableColumn>Daily</TableColumn>
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
  fetchingPurchases:state.purchases.fetchingPurchases
})

function mapDispatchToProps(dispatch) {
  return {
    fetchPurchases: () => PURCHASES_ACTIONS.fetchPurchases(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PurchasesTable));
