

import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import moment from "moment"


import { NormalBreadcrumb, NormalModal, Normaltabs, NormalSearch, Normalselect } from '../../components/common';
import { CandidateList, CandidateFrom } from '../../components/pages';
import { getModelList } from '../../redux/actions/model';
import { CANDIDATE_COURSE_STATUS, COURSE_LIST, CLASS_TYPE, YES_NO, INSTITUTE_BRANCH } from '../../services/constants'
import { candidateFormObj } from '../../services/entity'
import { getCandidate, searchCandidate, updateCandidate } from '../../api/candidate'
export const Candidate = () => {
  const [isCandidateModal, setIsCandidateModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Processing');
  const [candidateObj, setCandidateObj] = useState({ ...candidateFormObj });
  const [candidateList, setCandidateList] = useState([])
  const [candidateFilterList, setCandidateFilterList] = useState([])
  const [candidateFilter, setCandidateFilter] = useState({
    searchText: "",
    classType: ""

  })


  const params = useParams();

  const tabData = ['Processing', 'Completed', 'Pending', 'Hold', 'Discontinued',]


  useEffect(() => {
    handleGetList(selectedTab)
  }, []);


  useEffect(() => {

    handleGetList(selectedTab)
  }, [selectedTab]);

  const handleGetList = (body) => {
    getCandidate(body).then((data) => {
      // var result = data.map(person => ({ ...person, joinedCourses: [{...person?.joinedCourses[0], trainer:'Anvesh babu',  classTime: moment().format('HH:MM'),instituteBranch:person?.InstituteBranch}] }));
      // console.log('result--------------------->',result)
      // // result.map((data)=>{
      // //   updateCandidate(Object.assign({}, data), data.id)

      // // })


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



  return (
    <div className='Candidate-page'>

      <NormalBreadcrumb className="mb-0" label={'Candidate'} rightSideBtn={true} buttonLabel="Add New" onBtnClick={() => setIsCandidateModal(true)} />


      <div className="row mt-4">
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
        <div className="col-md-12 col-sm-12 mb-5 ">
          <Normaltabs data={tabData} onChange={handleTabChange} />
          <CandidateList selectedTab={selectedTab} candidateList={candidateList} onGetEditData={handleEditCandidate} candidateDelete={handleCandidateDelete} />
        </div>
      </div>


      <NormalModal className='modal-right' toggle={handleCandidateFormClose} title="Add Candidate" isShow={isCandidateModal}>
        <CandidateFrom onClose={handleCandidateFormClose} sucessSaved={handleCandidateFormClose} candidateEditObj={candidateObj} />
      </NormalModal>
    </div>
  );




}
