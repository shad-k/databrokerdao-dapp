import React, { Component } from 'react';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
} from 'react-md';
import styled from 'styled-components';

export default class PurchasesTable extends Component {

  render(){
    const LeftTableColumn = styled(TableColumn)`
      padding-left:0 !important;
    `;

    const purchases = [{name:'test'}];//TODO test data weghalen

    if(purchases.length === 0)
      return(
        <p>When you purchase access to a stream, it will be listed here.</p>
      );
    else
      return(
        <DataTable plain>
          <TableHeader>
            <TableRow>
              <LeftTableColumn grow>Name</LeftTableColumn>
              <TableColumn>Type</TableColumn>
              <TableColumn>Frequency</TableColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
              <TableRow>
                <LeftTableColumn>Bar Vista Temp 2882</LeftTableColumn>
                <TableColumn>Temperature</TableColumn>
                <TableColumn>Daily</TableColumn>
              </TableRow>
          </TableBody>
        </DataTable>
      );
  }
}
