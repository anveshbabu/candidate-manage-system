import React from "react";
import { NormalBreadcrumb } from '../../components/common'
import { OverAllCountCard } from '../../components/pages'

export class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <NormalBreadcrumb label='Dashboard' />
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div className="row">
              <div className="col-md-3 col-sm-121">
                <OverAllCountCard color='primary' title="This Weekely Enroll" count='5' icon='fa-calendar-week'/>
              </div>
              <div className="col-md-3 col-sm-121">
                <OverAllCountCard color='warning' title="This Monthly Enroll" count='5' icon='fa-calendar-day'/>
              </div>
              <div className="col-md-3 col-sm-121">
                <OverAllCountCard color='info' title="This Year Enroll" count='5' icon='fa-calendar-days'/>
              </div>
              <div className="col-md-3 col-sm-121">
                <OverAllCountCard color='danger' title="OverAll Enroll" count='5' icon='fa-calendar'/>
              </div>
            </div>

          </div>

        </div>

      </div>
    );
  }
}
