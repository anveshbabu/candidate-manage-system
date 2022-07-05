import moment from "moment"
export const joinedCoursesObj = {
    course: '',
    status: '',
    joinDate: moment().format('YYYY-MM-DD'),
    classTime: moment().format('HH:MM'),
    settlementStatus: 'No',
    classType: '',
    fees: null,
    pendingFees: null,
    trainer:'Anvesh babu',
    instituteBranch:"",
}

export const candidateFormObj = {
    name: "",
    email: '',
    phone: null,
    joinedCourses: [
        {...joinedCoursesObj}
    ],
    createdBy: ""
}

