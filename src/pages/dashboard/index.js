import React from "react";
import { NormalBreadcrumb } from '../../components/common'
import { OverAllCountCard,InstituteWiseEnrollCountCard } from '../../components/pages';
import { getSummaryCandidate } from '../../api/dashboard'


export class Dashboard extends React.Component {
  state = {
    summaryCounts: {},
    branchCandList:[]

  }

  componentDidMount() {
    getSummaryCandidate().then(({summaryCounts='',branchCandidateList=[]}) => {
      this.setState({ summaryCounts,branchCandList:branchCandidateList });

    }).catch((error) => {
      console.log('--------- err', error);
      // setFormLoader(false);

    });
  }



  render() {
    let { summaryCounts={},branchCandList=[] } = this.state;
    return (
      <div>
        <NormalBreadcrumb label='Dashboard' />
        <div className="row mb-4">

          <div className="col-md-3 col-sm-12">
            <OverAllCountCard color='primary' title="This Weekely Enroll" count={summaryCounts?.weekCount} icon='fa-calendar-week' />
          </div>
          <div className="col-md-3 col-sm-12">
            <OverAllCountCard color='warning' title="This Monthly Enroll" count={summaryCounts?.monthSummary} icon='fa-calendar-day' />
          </div>
          <div className="col-md-3 col-sm-12">
            <OverAllCountCard color='info' title="Last Three Months Enroll" count={summaryCounts?.lastThreeMonthSUmmary} icon='fa-calendar-days' />
          </div>
          <div className="col-md-3 col-sm-12">
            <OverAllCountCard color='danger' title="OverAll Enroll" count={summaryCounts?.overAllSummary} icon='fa-calendar' />
          </div>


        </div>

        <div className="row mb-4">
          <div className="col-md-6 col-sm-12">
            <InstituteWiseEnrollCountCard branchCandList={branchCandList} />
          </div>
        </div>

      </div>
    );
  }
}
