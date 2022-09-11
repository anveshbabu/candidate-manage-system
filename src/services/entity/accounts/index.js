import moment from "moment"

export const accountsFormObj = {
    month: moment().format('YYYY-MM'),
    tIncome: 0,
    rAmo: 0,
    salaryList: [],
    createdBy: {
        userId: '',
        date: new Date().toISOString(),
        name: ''
    },
    updatedBy: {
        userId: '',
        date: new Date().toISOString(),
        name: ''
    }
}

