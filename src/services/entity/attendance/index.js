
import moment from "moment";
import {ATTENDANCE} from '../../constants'

export const attendanceFormObject = {
    atd:ATTENDANCE?.ABSENT,
    candId: '',
    batchId: '',
    atdDate:moment().format('DD/MM/YYYY'),
    atdTime: '',
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