

import { useEffect, useState,useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { NormalInput, Normalselect,NormalButton } from '../../../common';
import { USER_TYPE } from '../../../../services/constants';
import { createAuthentication } from '../../../../api/auth';
import { userObj } from '../../../../services/entity/user';


export const UsersFrom = ({toggle}) => {
    const simpleValidator = useRef(new SimpleReactValidator({ className: "error-message", }));
    const [, forceUpdate] = useState();
    const [isFormLoader, setIsFormLoader] = useState(false)
    const [userFormObj, setUserFormOb] = useState({...userObj})
    useEffect(()=>{
        // createUser()
    },[])
    
const handleInputChange=(event)=>{
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setUserFormOb({
        ...userFormObj,
        [name]:value
    })


}


const handleFormSubmit = () => {
    const formValid = simpleValidator.current.allValid();

    if (formValid) {

        try{
            setIsFormLoader(true)

            createAuthentication(userFormObj).then((data) => {
                console.log('data----------->',data)
                setIsFormLoader(false)
              
                handleCloseModal();
            }).catch((error) => {
                setIsFormLoader(false)
            });

        }catch(e){
            setIsFormLoader(false)
        }
       
    } else {
        simpleValidator.current.showMessages();
        forceUpdate(1);
    }
}

const handleCloseModal=()=>{
    toggle();
    setUserFormOb({...userObj})
}

    return (
        <div className='row'>
            <div className='col-md-6 mt-3'>
                <NormalInput label='First Name' value={userFormObj?.first_name} name='first_name' onChange={handleInputChange} 
                errorMessage={simpleValidator.current.message("First Name", userFormObj?.first_name, "required")} 
                />
            </div>
            <div className='col-md-6 mt-3'>
                <NormalInput label='Last Name' value={userFormObj?.last_name} name='last_name' onChange={handleInputChange}
                   errorMessage={simpleValidator.current.message("Last Name", userFormObj?.last_name, "required")} 
                />
            </div>
            <div className='col-md-6'>
                <NormalInput label='Email' value={userFormObj?.emailid} name='emailid' onChange={handleInputChange}
                  errorMessage={simpleValidator.current.message("Email", userFormObj?.emailid, "required|email")} 
                />
            </div>
            <div className='col-md-6'>
                <NormalInput label='Phone' value={userFormObj?.mobile} name='mobile' onChange={handleInputChange}
                  errorMessage={simpleValidator.current.message("Phone", userFormObj?.mobile, "required|phone")} 
                />
            </div>
            <div className='col-md-6'>
                <Normalselect label='User Type' options={USER_TYPE}   value={userFormObj?.user_type} name='user_type' onChange={handleInputChange}
                 errorMessage={simpleValidator.current.message("User Type", userFormObj?.user_type, "required")} 
                />
            </div>
          
            <div className='col-md-6'>
                <NormalInput type='password' label='Password' value={userFormObj?.password} name='password' onChange={handleInputChange}
                  errorMessage={simpleValidator.current.message("Password", userFormObj?.password, "required")} 
                />
            </div>
            <div className='col-md-12'>
                <NormalButton label='Cancel' onClick={handleCloseModal} disabled={isFormLoader} color="error" className='me-2'/>
                <NormalButton label='Save' isLoader={isFormLoader} onClick={handleFormSubmit}/>
            </div>
        </div>
    );




}
