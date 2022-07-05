import React from "react";
import {NormalBreadcrumb} from '../../components/common'


export class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <NormalBreadcrumb label='Dashboard'/>
        <h4 className="page-titel mb-4">
          Welcome to iTrain
        </h4>
      
      </div>
    );
  }
}
