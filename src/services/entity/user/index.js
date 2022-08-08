import { STATUS } from '../../constants'

export const userObj = {
    password: "",
    first_name: "",
    last_name: "",
    emailid: "",
    mobile: "",
    user_type: null,
    status: STATUS.ACTIVE,
    createdBy: {
        userId: '',
        date: new Date().toISOString(),
        name:''
    },
    updatedBy: {
        userId: '',
        date: '',
        name:''
    }

}