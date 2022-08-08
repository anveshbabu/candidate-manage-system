

import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";


import { NormalBreadcrumb, NormalButton, NormalModal } from '../../../components/common';
import { UsersCard, UsersFrom } from '../../../components/pages';

import { getAllUser } from '../../../api/user'
// import './models.scss'

export const Users = () => {
  const params = useParams();
  const [isFormLoader, setIsFormLoader] = useState(false)
  const [usersList, setUsersList] = useState([])
  const [isAdduserModal, setIsAdduserModal] = useState(false);



  useEffect(() => {
    handleUserList()
  }, []);


  const handleUserList = () => {
    try {
      setIsFormLoader(true)

      getAllUser().then((data) => {
        console.log('--------->',data)
        setIsFormLoader(false);
        if (data?.length > 0) {
          setUsersList(data);
        }


      }).catch((error) => {
        setIsFormLoader(false)
      });

    } catch (e) {
      setIsFormLoader(false)
    }
  }



  const handleAddUser = () => {
    setIsAdduserModal(true)
  }

  const handleUserModuleClose = () => {
    setIsAdduserModal(false)

  }

  return (
    <div className='modal-page'>

      <NormalBreadcrumb className="mb-0" label={'Users'} rightSideBtn={true} buttonLabel="Add new" onBtnClick={handleAddUser} />

      <div className='row mt-5'>
        {usersList?.map((data) =>
          <div className='col-md-3'>
            <UsersCard data={data}/>

          </div>

        )}

      </div>


      <NormalModal toggle={handleUserModuleClose} title='Add user' className='modal-dialog-right modal-xl' isShow={isAdduserModal}>
        <UsersFrom toggle={handleUserModuleClose} />
      </NormalModal>

    </div>
  );




}
