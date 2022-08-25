

import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import moment from "moment"


import { NormalBreadcrumb, NormalModal, Normaltabs, NormalSearch, Normalselect, NormalButton, NormalAlert } from '../../components/common';
import { CandidateList, CandidateFrom } from '../../components/pages';
import { CANDIDATE_COURSE_STATUS, ATTENDANCE, CLASS_TYPE, YES_NO, INSTITUTE_BRANCH, EXIST_LOCAL_STORAGE } from '../../services/constants'
import { candidateFormObj, attendanceFormObject } from '../../services/entity'
import { getStorage, isEmpty } from '../../services/helperFunctions'
import { getCandidate, searchCandidate, updateCandidate } from '../../api/candidate'
import { updateAtendance, getAttendance } from '../../api'
export const Candidate = () => {
  const [isCandidateModal, setIsCandidateModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Processing');
  const [candidateObj, setCandidateObj] = useState({ ...candidateFormObj });
  const [candidateList, setCandidateList] = useState([])
  const [candidateFilterList, setCandidateFilterList] = useState([]);
  const [attendanceReqList, setAttendanceReqList] = useState([])
  const [isAttendanceApiLoader, setIsAttendanceApiLoader] = useState(false);
  const [isUpdateAttendanceModal, setIsUpdateAttendanceModal] = useState(false);
  const [isLeaveAttendanceModal, setIsLeaveAttendanceModal] = useState(false);
  const [candidateFilter, setCandidateFilter] = useState({
    searchText: "",
    classType: ""

  })


  const params = useParams();

  const tabData = ['Processing', 'Completed', 'Pending', 'Hold', 'Discontinued',]


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
  }


  const handleAttendance = (value) => {
    if (value) {
      let reqobj = candidateList.map(({ attObj }) => ({ ...attObj }));
      let candList = candidateList.map((data, i) => ({ ...data,attObj:{...data?.attObj} }));
    
      console.log('reqobj--------->', reqobj)
      setIsAttendanceApiLoader(true)
      updateAtendance(reqobj).then((data) => {
        setCandidateList([...candList])
        setIsAttendanceApiLoader(false)
        setIsUpdateAttendanceModal(false)
      }).catch((error) => {
        console.log('--------- err', error);
        setIsAttendanceApiLoader(false)
        setIsUpdateAttendanceModal(false)
        // setFormLoader(false);

      });
    } else {
      setIsUpdateAttendanceModal(false)
    }
  }

  const handleApplyLeave = (value) => {
    if (value) {

      let reqobj = candidateList.map(({ attObj }, i) => ({ ...attObj, atd: ATTENDANCE.LEAVE, candId: candidateList[i]?.id, batchId: params?.batchId, atdDate: moment().format('DD/MM/YYYY'), atdTime: moment().format('HH:mm'), }));
      let candList = candidateList.map((data, i) => ({ ...data,attObj:{...data?.attObj, atd: ATTENDANCE.LEAVE, candId: candidateList[i]?.id, batchId: params?.batchId, atdDate: moment().format('DD/MM/YYYY'), atdTime: moment().format('HH:mm'),} }));
     
      setIsAttendanceApiLoader(true)
      updateAtendance(reqobj).then((data) => {
        setCandidateList([...candList])
        setIsAttendanceApiLoader(false);
        setIsLeaveAttendanceModal(false)
      }).catch((error) => {
        setIsAttendanceApiLoader(false)
        setIsLeaveAttendanceModal(false)
        // setFormLoader(false);

      });
    } else {
      setIsLeaveAttendanceModal(false)
    }
  }



  return (
    <div className='Candidate-page'>

      <NormalBreadcrumb className="mb-0" label={'Candidate'} rightSideBtn={true}
        buttonLabel={!params?.batchId ? "Add New" : "Update Attendance"}
        btnIsLoader={isAttendanceApiLoader}
        onBtnClick={() => !params?.batchId ? setIsCandidateModal(true) : setIsUpdateAttendanceModal(true)}
        rightSideChild={!!params?.batchId && <NormalButton label={'Apply Leave'} color='error' onClick={() => setIsLeaveAttendanceModal(true)} className='add-new-btn' size="small" variant="outlined" />}
      />

      <div className="row mt-4">
        <div className="col-md-6 col-sm-12">
          <h4 className="sub-page-titel mb-4">{candidateFilterList.length} Total</h4>
        </div>
      </div>

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
          <CandidateList isFromBatch={params?.batchId} handleToggleAttendance={handleToggleAttendance} selectedTab={selectedTab} candidateList={candidateList} onGetEditData={handleEditCandidate} candidateDelete={handleCandidateDelete} />
        </div>
      </div>

      <NormalAlert isLoader={isAttendanceApiLoader} isShow={isUpdateAttendanceModal} title='Are You sure want to Update the Attendance' toggle={() => setIsUpdateAttendanceModal(false)} onClick={handleAttendance} />
      <NormalAlert isLoader={isAttendanceApiLoader} isShow={isLeaveAttendanceModal} title='Are You sure want to Applay Leave' toggle={() => isLeaveAttendanceModal(false)} onClick={handleApplyLeave} />
      <NormalModal className='modal-right' toggle={handleCandidateFormClose} title="Add Candidate" isShow={isCandidateModal}>
        <CandidateFrom onClose={handleCandidateFormClose} sucessSaved={handleCandidateFormClose} candidateEditObj={candidateObj} />
      </NormalModal>
    </div>
  );




}
