
import { useEffect, useState, useRef } from 'react';

import { NormalButton, NormalInput, Normalselect } from '../../../common';
import { candidateFormObj, joinedCoursesObj } from '../../../../services/entity'
import { CANDIDATE_COURSE_STATUS, COURSE_LIST, CLASS_TYPE, YES_NO, INSTITUTE_BRANCH, COURSE_TRAINER } from '../../../../services/constants'
import SimpleReactValidator from 'simple-react-validator';
import { createCandidate, updateCandidate } from '../../../../api/candidate'
import { isEmpty } from '../../../../services/helperFunctions'
import './candidateFrom.scss'

export const CandidateFrom = ({ sucessSaved = '', onClose = '', candidateEditObj }) => {
    const simpleValidator = useRef(new SimpleReactValidator({ className: "error-message", }));
    const [, forceUpdate] = useState();
    const [candidateObj, SetCandidateObj] = useState({ ...candidateFormObj });
    const [isFormLoader, setFormLoader] = useState(false);



    //handle input change function call start
    const handleInputChange = e => {
        let { value, name } = e.target;
        SetCandidateObj({
            ...candidateObj,
            [name]: value
        })

    };

    const handleInputJoinedCoursesChange = (e, i) => {
        let { value, name } = e.target;
        candidateObj.joinedCourses[i][name] = value
        SetCandidateObj({
            ...candidateObj
        })

    };


    useEffect(() => {
        if (!isEmpty(candidateEditObj)) {
            SetCandidateObj(candidateEditObj)
        }
    }, [candidateEditObj]);



    const handleCreateClasss = () => {
        const formValid = simpleValidator.current.allValid();
        if (formValid) {
            simpleValidator.current.hideMessages();
            setFormLoader(true)
            let reqBody = Object.assign({}, candidateObj)
            reqBody.status = reqBody?.joinedCourses?.map(({ status }) => status);

            let apiCall = candidateObj.hasOwnProperty("id") ? updateCandidate(reqBody, candidateObj.id) : createCandidate(reqBody)
            apiCall.then((data) => {
                setFormLoader(false);

                sucessSaved();
                SetCandidateObj({ ...candidateFormObj });

            }).catch((error) => {
                setFormLoader(false);

            });
        } else {
            simpleValidator.current.showMessages();
            forceUpdate(1);
        }
    }


    const handleTOCloseModal = () => {
        SetCandidateObj({ ...candidateFormObj });
        onClose()
    }

    const handleJoinCourses = () => {


        candidateObj.joinedCourses?.push({ ...joinedCoursesObj })
        SetCandidateObj({ ...candidateObj });
    }
    const handleJoinCoursesDelete = (i) => {
        candidateObj.joinedCourses?.splice(i, 1);
        SetCandidateObj({ ...candidateObj });

    }

    return (

        <div className="row mt-2">
            <div className='col-md-12 col-sm-12'>
                <NormalInput label='Name'
                    onChange={handleInputChange}
                    value={candidateObj.name}
                    name='name'
                    errorMessage={simpleValidator.current.message('Name', candidateObj.name, 'required')} />
            </div>
            <div className='col-md-12 col-sm-12'>
                <NormalInput label='Email'
                    onChange={handleInputChange}
                    value={candidateObj.email}
                    name='email'
                    errorMessage={simpleValidator.current.message('Email', candidateObj.email, 'required|email')} />
            </div>
            <div className='col-md-12 col-sm-12'>
                <NormalInput label='Phone'
                    onChange={handleInputChange}
                    value={candidateObj.phone}
                    name='phone'
                    errorMessage={simpleValidator.current.message('Phone', candidateObj.phone, 'required|phone')} />
            </div>

            <div className='col-md-12 col-sm-12 '>
                {candidateObj?.joinedCourses?.map((joinedCourses, i) =>
                    <div className='card mb-4' key={i}>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-6 col-sm-12'>
                                    <Normalselect label='Course'
                                        onChange={(e) => handleInputJoinedCoursesChange(e, i)}
                                        value={joinedCourses.course}
                                        options={COURSE_LIST}
                                        name='course'
                                        errorMessage={simpleValidator.current.message('Course', joinedCourses.course, 'required')} />
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <NormalInput label='Join Date'
                                        onChange={(e) => handleInputJoinedCoursesChange(e, i)}
                                        value={joinedCourses.joinDate}
                                        type="date"
                                        name='joinDate'
                                        errorMessage={simpleValidator.current.message('Phone', joinedCourses.joinDate, 'required')} />
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <Normalselect label='Status'
                                        onChange={(e) => handleInputJoinedCoursesChange(e, i)}
                                        value={joinedCourses.status}
                                        options={CANDIDATE_COURSE_STATUS}
                                        name='status'
                                        errorMessage={simpleValidator.current.message('Status', joinedCourses.status, 'required')} />
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <Normalselect label='Trainer'
                                        onChange={(e) => handleInputJoinedCoursesChange(e, i)}
                                        value={joinedCourses.trainer}
                                        options={COURSE_TRAINER}
                                        name='trainer'
                                        errorMessage={simpleValidator.current.message('Trainer', joinedCourses.trainer, 'required')} />
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <NormalInput label='Class Time'
                                        onChange={(e) => handleInputJoinedCoursesChange(e, i)}
                                        value={joinedCourses.classTime}
                                        type="time"
                                        name='classTime'
                                        errorMessage={simpleValidator.current.message('Class Time', joinedCourses.classTime, 'required')} />
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <Normalselect label='Class Type'
                                        onChange={(e) => handleInputJoinedCoursesChange(e, i)}
                                        value={joinedCourses.classType}
                                        options={CLASS_TYPE}
                                        name='classType'
                                        errorMessage={simpleValidator.current.message('Class Type', joinedCourses.classType, 'required')} />
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <Normalselect label='Institute Branch'
                                        onChange={(e) => handleInputJoinedCoursesChange(e, i)}
                                        value={joinedCourses.InstituteBranch}
                                        options={INSTITUTE_BRANCH}
                                        name='InstituteBranch'
                                        errorMessage={simpleValidator.current.message('Institute Branch', joinedCourses.InstituteBranch, 'required')} />
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <NormalInput label='Fees'
                                        onChange={(e) => handleInputJoinedCoursesChange(e, i)}
                                        value={joinedCourses.fees}
                                        name='fees'
                                        errorMessage={simpleValidator.current.message('Fees', joinedCourses.fees, 'required|numeric')} />
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <NormalInput label='Pending Fees'
                                        onChange={(e) => handleInputJoinedCoursesChange(e, i)}
                                        value={joinedCourses.pendingFees}
                                        name='pendingFees'
                                        errorMessage={simpleValidator.current.message('Pending Fees', joinedCourses.pendingFees, 'required|numeric')} />
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <Normalselect label='Settlement Status'
                                        onChange={(e) => handleInputJoinedCoursesChange(e, i)}
                                        value={joinedCourses.settlementStatus}
                                        name='settlementStatus'
                                        options={YES_NO}
                                        errorMessage={simpleValidator.current.message('Settlement Status', joinedCourses.settlementStatus, 'required')} />
                                </div>
                                <div className='col-md-12 col-sm-12 text-end'>
                                    {candidateObj?.joinedCourses.length === i + 1 && <a class="link-success add-delete-text me-2" onClick={handleJoinCourses}>Add New</a>}

                                    {candidateObj?.joinedCourses.length > 1 && <a onClick={() => handleJoinCoursesDelete(i)} class="link-danger add-delete-text">Delete</a>}

                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>







            <div className='col-md-12 col-sm-12'>
                <NormalButton disabled={isFormLoader} color='error' onClick={handleTOCloseModal} className='me-2' label='Cancel' />
                <NormalButton isLoader={isFormLoader} label={candidateObj.hasOwnProperty("id") ? "Update" : 'Save'} onClick={handleCreateClasss} />

            </div>
        </div>
    )




} 