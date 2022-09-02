import React from "react";
import { NormalBreadcrumb } from '../../components/common'
import { OverAllCountCard, InstituteWiseEnrollCountCard, ExtendedDaysCandidate,TotalEarn } from '../../components/pages';
import { getSummaryCandidate } from '../../api/dashboard'
import { getAllUser } from '../../api/user'
import './dashboard.scss'

export class Dashboard extends React.Component {
  state = {
    summaryCounts: {},
    branchCandList: [],
    usersList: [],
    extendedDayCandList:[],
    isFormLoader: false

  }

  componentDidMount() {
    this.setState({ isFormLoader: true })
    getSummaryCandidate().then(({ summaryCounts = '', branchCandidateList = [], extendedDayCandList=[] }) => {
      console.log('extendedDayCandList------------>',branchCandidateList)

      this.setState({ summaryCounts, branchCandList: branchCandidateList, extendedDayCandList });

    }).catch((error) => {
      this.setState({ isFormLoader: false })

    });

    this.handleUserList();
  }


  handleUserList = () => {


    getAllUser().then((usersList) => {
      if (usersList?.length > 0) {
        this.setState({ usersList })
      }
    })
      .catch((error) => {
        this.setState({ isFormLoader: false })
      });

  };

  render() {
    let { summaryCounts = {}, branchCandList = [], extendedDayCandList = [],usersList=[] } = this.state;
    return (
      <div>
        <NormalBreadcrumb label='Dashboard' />
        <div className="row ">

          <div className="col-md-3 col-sm-12 mb-4">
            <OverAllCountCard color='primary' title="This Weekely Enroll" count={summaryCounts?.weekCount} icon='fa-calendar-week' />
          </div>
          <div className="col-md-3 col-sm-12 mb-4">
            <OverAllCountCard color='warning' title="This Monthly Enroll" count={summaryCounts?.monthSummary} icon='fa-calendar-day' />
          </div>
          <div className="col-md-3 col-sm-12 mb-4">
            <OverAllCountCard color='info' title="Last Three Months Enroll" count={summaryCounts?.lastThreeMonthSUmmary} icon='fa-calendar-days' />
          </div>
          <div className="col-md-3 col-sm-12 mb-4">
            <OverAllCountCard color='danger' title="OverAll Enroll" count={summaryCounts?.overAllSummary} icon='fa-calendar' />
          </div>


        </div>

        <div className="row mb-4">
          <div className="col-md-6 col-sm-12">
            <InstituteWiseEnrollCountCard branchCandList={branchCandList} />
          </div>
          <div className="col-md-6 col-sm-12">
            <ExtendedDaysCandidate extendedDayCandList={extendedDayCandList} usersList={usersList}/>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-12 col-sm-12">
            <TotalEarn branchCandList={branchCandList}/>
          </div>
         
        </div>

      </div>
    );
  }
}
