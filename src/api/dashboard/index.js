import { collection, addDoc, setDoc, updateDoc, query, doc, where, getDocs, deleteDoc, orderBy, startAt, endAt } from "firebase/firestore";
// import { getDatabase, ref,  orderByChild ,equalTo,get} from "firebase/database";
import { getAuth, deleteUser } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { isAuthenticated, jwtDecodeDetails } from '../../services/utilities';
import { STATUS } from '../../services/constants'
import { CURRENT_USER, INSTITUTE_BRANCH } from '../../services/constants'
import { isEmpty } from '../../services/helperFunctions'
import { Toast } from '../../services/toast';
import moment from "moment";


export const getSummaryCandidate = (body, isBatch = false) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {

                const querySnapshot = await getDocs(query(collection(getFirestore(), "candidate")));
                // const querySnapshot = await getDocs(query(collection(getFirestore(), "candidate")));

                let summaryCounts = {}, data = []
                let weekCount = 0, monthSummary = 0, lastThreeMonthSUmmary = 0;
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    const weekStart = moment().startOf('week');
                    const weekEnd = moment().endOf('week');
                    const startOfMonth = moment().startOf('month');
                    const endOfMonth = moment().endOf('month');
                    const lastThreeStartOfMonth = moment().subtract(2, 'months').startOf('month');
                    let isWeekSummary = doc.data().joinedCourses.filter(({ joinDate }) => moment(joinDate, 'YYYY-MM-DD').isBetween(weekStart, weekEnd));
                    let isMonthSummary = doc.data().joinedCourses.filter(({ joinDate }) => moment(joinDate, 'YYYY-MM-DD').isBetween(startOfMonth, endOfMonth));
                    let lastThreeMonthSummary = doc.data().joinedCourses.filter(({ joinDate }) => moment(joinDate, 'YYYY-MM-DD').isBetween(lastThreeStartOfMonth, endOfMonth));
                    if (!isEmpty(isWeekSummary)) {
                        weekCount++
                    };
                    if (!isEmpty(isMonthSummary)) {
                        monthSummary++
                    };
                    if (!isEmpty(lastThreeMonthSummary)) {
                        lastThreeMonthSUmmary++
                    }
                    data.push({ ...doc.data(), id: doc.id, });
                    summaryCounts = { weekCount, monthSummary, lastThreeMonthSUmmary, overAllSummary: querySnapshot?.size }
                });
                
                let branchList= INSTITUTE_BRANCH.map(({ value }) => {
                    let f= data.map(({ joinedCourses }) => joinedCourses?.find(({ instituteBranch }) => instituteBranch === value)).filter( Boolean );;

                    return {
                        data: data.map(({ joinedCourses }) => joinedCourses?.find(({ instituteBranch }) => instituteBranch === value)).filter( Boolean ),
                        branch: value
                    }
                });

                resolve({summaryCounts,branchCandidateList:branchList})
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}