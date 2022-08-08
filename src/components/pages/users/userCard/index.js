

import { useEffect, useState } from 'react'
// import {LazyLoadImage} from '../../../common'
import {letterAvatar} from '../../../../services/helperFunctions'
import './userCard.scss'

export const UsersCard = ({data:{first_name,last_name,emailid='-',mobile='-',is_active=null}}) => {




    return (
        <div className="card user-card">
            <div className="card-body">
                <div className="d-flex align-items-start">
                {/* <LetterAvatars name={`${firstname} ${lastname}`} sx={{ width: 100, height: 100 }}/> */}
                <img src={letterAvatar(first_name, 100)} alt={first_name} className="me-3 user-image" />
                    <div className="media-body">
                        {/* <h5 className="mt-0">Media heading</h5> */}
                        <table className="table table-borderless user-detail-table">

                            <tbody>
                                <tr>

                                    <td>Name</td>
                                    <td className="d-inline-block text-truncate" title={`${first_name} ${last_name}`}>{first_name} {last_name}</td>
                                </tr>
                                <tr>

                                    <td>Email</td>
                                    <td className="d-inline-block text-truncate" title={emailid}>{emailid?emailid:"-"}</td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td className="d-inline-block text-truncate" itle={mobile}>{mobile?mobile:"-"}</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td className={is_active === 1?'text-success':"text-danger"}>{is_active === 1?"Active":"De-active"}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );




}
