

import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import moment from "moment"


import { NormalBreadcrumb, NormalModal, Normaltabs, NormalSearch, Normalselect, NormalButton, CustomDateRangePicker } from '../../components/common';
import { CandidateList, CandidateFrom } from '../../components/pages';
import { CANDIDATE_COURSE_STATUS, ATTENDANCE, CLASS_TYPE, YES_NO, INSTITUTE_BRANCH, EXIST_LOCAL_STORAGE } from '../../services/constants'
import { candidateFormObj, attendanceFormObject } from '../../services/entity'
import { getStorage, userGetByRole } from '../../services/helperFunctions'
import { getCandidate, updateCandidate } from '../../api/candidate'
import { updateAtendance } from '../../api'

export const Candidate = () => {
  const [isCandidateModal, setIsCandidateModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState('All');
  const [candidateObj, setCandidateObj] = useState({ ...candidateFormObj });
  const [candidateList, setCandidateList] = useState([])
  const [candidateFilterList, setCandidateFilterList] = useState([]);
  const [attendanceReqList, setAttendanceReqList] = useState([])
  const [isAttendanceApiLoader, setIsAttendanceApiLoader] = useState(false)
  const [isMultyUpdateIndex, setMultyUpdateIndex] = useState([]);
  const [candidateFilter, setCandidateFilter] = useState({
    searchText: "",
    classType: ""

  })


  const params = useParams();

  const tabData = ['All','Processing','Yet to start', 'Completed', 'Pending', 'Hold', 'Discontinued',]


  useEffect(() => {
    if (!params?.batchId) {
      // handleGetList(params?.batchId)
      handleGetList(selectedTab)
    } else {
      handleGetAttendanceList()
    }



  }, []);


  const handleGetAttendanceList = () => {
    let batchCandidateList = JSON.parse(getStorage(EXIST_LOCAL_STORAGE.BATCH_CANDIDATE_LIST));

    setCandidateList(batchCandidateList ? batchCandidateList : []);
    setCandidateFilterList(batchCandidateList ? batchCandidateList : []);

  }


  useEffect(() => {
    if (!params?.batchId) {
      // handleGetList(params?.batchId)
      handleGetList(selectedTab)
    } else {
      handleGetAttendanceList();
    }
  }, [selectedTab]);







  const handleGetList = (body) => {
    getCandidate(body, !!params?.batchId).then((data) => {
      // var result = data.map(person => ({ ...person, joinedCourses: [{ ...person?.joinedCourses[0] }], status: [person?.joinedCourses[0]?.status]
      // ,trainerIDs:[person?.joinedCourses[0]?.trainer]
      // ,classTimeIDs:[person?.joinedCourses[0]?.classTime]

      // }));
      // console.log('result 222--------------------->', result)
      // result.map((data)=>{
      //   updateCandidate(Object.assign({}, data), data.id)

      // })


      setCandidateList(data)
      setCandidateFilterList(data)


    }).catch((error) => {
      // setFormLoader(false);

    });
  }


  const handleTabChange = (i) => {
    setSelectedTab(tabData[i]);
    handleGetList(tabData[i])

  };


  const handleEditCandidate = (obj) => {
    setCandidateObj(obj);
    setIsCandidateModal(true)
  }

  const handleCandidateFormClose = () => {
    setCandidateObj({});
    setIsCandidateModal(false)
  }

  const handleCandidateDelete = (index) => {
    candidateList.splice(index, 1);
    setCandidateList(candidateList);
    setCandidateFilterList(candidateList)
  }



  const handleCandidateFilter = (event) => {
    let { value, name } = event.target;
    setCandidateFilter({
      ...candidateFilter,
      [name]: value
    });

    let filterValue = value.toLowerCase();
    let result = filterValue.length > 0 ? candidateFilterList.filter(({ name, phone, joinedCourses }) => name?.toLowerCase().includes(filterValue)
      || phone?.toLowerCase().includes(filterValue)
      || !!joinedCourses?.find(({ classType, settlementStatus, instituteBranch }) => classType?.toLowerCase().includes(filterValue)
        || settlementStatus?.toLowerCase().includes(filterValue) || instituteBranch?.toLowerCase().includes(filterValue))


    ) : candidateFilterList;
    setCandidateList(result)




  }


  const handleToggleAttendance = (isAtd, candIndex) => {
    let attendanceObj = {
      ...attendanceFormObject,
      atd: isAtd ? ATTENDANCE.PRESENT : ATTENDANCE.ABSENT,
      candId: candidateList[candIndex]?.id,
      batchId: params?.batchId,
      atdDate: moment().format('DD/MM/YYYY'),
      atdTime: moment().format('HH:mm'),

    };
    candidateList[candIndex].attObj = attendanceObj;
    setCandidateList([...candidateList])
  };


  const handleToggleComplited = (isComp, candIndex) => {
    delete candidateList[candIndex].attObj;
    const courseIndex = candidateList[candIndex]?.joinedCourses?.findIndex(({ classTime }) => params?.batchId);
    if (courseIndex !== -1) {
      candidateList[candIndex].joinedCourses[courseIndex].status = isComp ? 'Completed' : 'Processing';
    };
    candidateList[candIndex].status = candidateList[candIndex]?.joinedCourses?.map(({ status }) => status);
    isMultyUpdateIndex.push(candIndex);
    setMultyUpdateIndex([...isMultyUpdateIndex])
    updateCandidate({ ...candidateList[candIndex] }, candidateList[candIndex].id).then((data) => {
      const updateIndex = isMultyUpdateIndex?.findIndex((loaderIndex) => loaderIndex === candIndex);
      if (updateIndex !== -1) { // only splice array when item is found
        isMultyUpdateIndex.splice(updateIndex, 1); // 2nd parameter means remove one item only
        setMultyUpdateIndex([...isMultyUpdateIndex])
      }

    }).catch((error) => {
      const updateIndex = isMultyUpdateIndex?.findIndex((loaderIndex) => loaderIndex === candIndex);
      if (updateIndex !== -1) { // only splice array when item is found
        isMultyUpdateIndex.splice(updateIndex, 1); // 2nd parameter means remove one item only
        setMultyUpdateIndex([...isMultyUpdateIndex])
      }
    });

  }


  const handleAttendance = () => {
    let reqobj = candidateList.map(({ attObj }) => ({ ...attObj }));
    console.log('reqobj--------->', reqobj)
    setIsAttendanceApiLoader(true)
    updateAtendance(reqobj).then((data) => {
      console.log('getAttendance--------->', data)
      setIsAttendanceApiLoader(false)
    }).catch((error) => {
      console.log('--------- err', error);
      setIsAttendanceApiLoader(false)
      // setFormLoader(false);

    });
  };

  const handleDateRangeFilter = ({ start, end }) => {

    let result = candidateFilterList.filter(({ name, phone, joinDate,joinedCourses }) =>  moment(joinDate, 'YYYY-MM-DD').isBetween(start, end));
    setCandidateList(result)

  }



  return (
    <div className='Candidate-page'>

      <NormalBreadcrumb className="mb-0" label={'Candidate'}
        // buttonLabel={!params?.batchId ? "Add New" : "Update Attendance"}
        // btnIsLoader={isAttendanceApiLoader}
        // onBtnClick={() => !params?.batchId ? setIsCandidateModal(true) : handleAttendance()}
        rightSideChild={<CustomDateRangePicker onChange={handleDateRangeFilter} />}
      />

      <div className="row mt-4">
        <div className="col-md-6 col-sm-12">
          <h4 className="sub-page-titel mb-4">{candidateFilterList.length} Total</h4>


        </div>
        <div className="col-md-6 text-end col-sm-12">
          <NormalButton className='add-new-btn' size="small" variant="outlined" label={!params?.batchId ? "Add New" : "Update Attendance"} isLoader={isAttendanceApiLoader} onClick={() => !params?.batchId ? setIsCandidateModal(true) : handleAttendance()} />

        </div>
      </div >

      {!params?.batchId && <div className="row mt-4">
        <div className="col-md-4 col-sm-12 mb-4">
          <NormalSearch value={candidateFilter.searchText} name='searchText' label="Search Candidate name" className='w-100' size="small" onChange={handleCandidateFilter} />
        </div>
        <div className="col-md-3 col-sm-12 mb-4">
          <Normalselect label='Institute Branch'
            value={candidateFilter.InstituteBranch}
            options={INSTITUTE_BRANCH}
            name='InstituteBranch'
            size="small"
            onChange={handleCandidateFilter}
          />
        </div>
        <div className="col-md-2 col-sm-12 mb-4">
          <Normalselect label='Class Type'
            onChange={handleCandidateFilter}
            value={candidateFilter.classType}
            options={CLASS_TYPE}
            name='classType'
            size="small"
          />
        </div>
        <div className="col-md-2 col-sm-12 mb-4">
          <Normalselect label='Settlement Status'
            onChange={handleCandidateFilter}
            value={candidateFilter.settlementStatus}
            options={YES_NO}
            name='settlementStatus'
            size="small"
          />
        </div>
      </div>}
      <div className="row mt-4">


        <div className="col-md-12 col-sm-12 mb-5 ">
          {!params?.batchId && <Normaltabs data={tabData} onChange={handleTabChange} />}
          <CandidateList isMultyUpdateIndex={isMultyUpdateIndex} isFromBatch={params?.batchId} handleToggleAttendance={handleToggleAttendance} handleToggleComplited={handleToggleComplited} selectedTab={selectedTab} candidateList={candidateList} onGetEditData={handleEditCandidate} candidateDelete={handleCandidateDelete} />
        </div>
      </div>


      <NormalModal className='modal-right' toggle={handleCandidateFormClose} title="Add Candidate" isShow={isCandidateModal}>
        <CandidateFrom onClose={handleCandidateFormClose} sucessSaved={handleCandidateFormClose} candidateEditObj={candidateObj} />
      </NormalModal>
    </div >
  );




}
