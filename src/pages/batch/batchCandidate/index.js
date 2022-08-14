import { useState, useEffect } from "react";
import { NormalBreadcrumb, Normaltabs } from '../../../components/common'
import { CandidateList } from '../../../components/pages'
import { candidateFormObj } from '../../../services/entity'
import { getBatchListWithCandidate } from '../../../api/masters';
import { getCandidate, searchCandidate, updateCandidate } from '../../../api/candidate'
import { getAttendance } from '../../../api'
import { useParams } from "react-router-dom"
export function BatcheCandidate() {
    const params = useParams();
    const [isCandidateModal, setIsCandidateModal] = useState(false);
    const [candidateObj, setCandidateObj] = useState({ ...candidateFormObj });
    const [candidateList, setCandidateList] = useState([])
    const [candidateFilterList, setCandidateFilterList] = useState([])
    const [candidateFilter, setCandidateFilter] = useState({
        searchText: "",
        classType: ""

    });

    useEffect(() => {
        handleGetList()
    }, []);


    const handleEditCandidate = (obj) => {
        setCandidateObj(obj);
        setIsCandidateModal(true)
    }

    const handleCandidateDelete = (index) => {
        candidateList.splice(index, 1);
        setCandidateList(candidateList);
        setCandidateFilterList(candidateList)
    }



    const handleGetList = () => {
        alert('----------------')
        getCandidate(params?.batchId, true).then((data) => {

            setCandidateList(data)
            setCandidateFilterList(data)
        }).catch((error) => {
            // setFormLoader(false);

        });

        getAttendance(params?.batchId).then((data) => {
            console.log('getAttendance--------->', data)
        }).catch((error) => {
            // setFormLoader(false);

        });
    }

    return (
        <div>
            <NormalBreadcrumb label='Batches' />
            <div className="row mb-3">
                {/* <div className="col-md-12">
                    <Normaltabs data={tabData} onChange={handleTabChange} />

                </div> */}

            </div>

            <div className="row">

                <div className="col-md-12 col-sm-12 mb-5 ">
                    {/* <Normaltabs data={tabData} onChange={handleTabChange} /> */}
                    <CandidateList candidateList={candidateList} onGetEditData={handleEditCandidate} candidateDelete={handleCandidateDelete} />
                </div>

            </div>


        </div>
    );
}

