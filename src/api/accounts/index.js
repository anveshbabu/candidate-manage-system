import { collection, addDoc, setDoc, updateDoc, query, doc, where, getDoc, deleteDoc, getDocs, orderBy, startAt, endAt } from "firebase/firestore";
// import { getDatabase, ref,  orderByChild ,equalTo,get} from "firebase/database";
import { getAuth, deleteUser } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { isAuthenticated, jwtDecodeDetails } from '../../services/utilities';
import { STATUS } from '../../services/constants'
import { CURRENT_USER, DB_NAME } from '../../services/constants';
import { Toast } from '../../services/toast';
import moment from "moment";


export const createExpence = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                let { user_id, userObj: { first_name, last_name } } = jwtDecodeDetails();
                body['createdBy']['name'] = first_name + " " + last_name;
                body['createdBy']['userId'] = user_id;
                body['createdBy']['date'] = new Date().toISOString();
                const docRef = await addDoc(collection(getFirestore(), DB_NAME?.ACCOUNT), body);
                resolve(docRef)
                Toast({ type: 'success', message: 'Payments saved successfully', title: 'success' })
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}


export const upDateExpence = (body,id) => {
    delete body.id;
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                let { user_id, userObj: { first_name, last_name } } = jwtDecodeDetails();
                body.updatedBy.name = first_name + " " + last_name;
                body.updatedBy.date = new Date().toISOString();
                body.updatedBy.userId = user_id;
                const docRef = await updateDoc(doc(getFirestore(),  DB_NAME?.ACCOUNT, id), body);
                resolve(docRef)
                Toast({ type: 'success', message: 'Payments Update successfully', title: 'success' })
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
};



export const getAllAccounts = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                const querySnapshot = await getDocs(query(collection(getFirestore(), DB_NAME?.ACCOUNT) , orderBy("month", "asc")));
                let data = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    data.push({ ...doc.data(), id: doc.id })
                });
                resolve(data)
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
};



export const getBillingWiseCandidate = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {

                const querySnapshot = await getDocs(query(collection(getFirestore(), "candidate"), where("billMonths", "array-contains", body)));
                // const querySnapshot = await getDocs(query(collection(getFirestore(), "candidate")));

                let data = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    let avilStatus = doc.data().joinedCourses.find(({ billMonth }) => billMonth == body);
                    console.log(avilStatus,doc.data().name)

                    data.push({
                        ...doc.data(), id: doc.id, course: avilStatus?.course,
                        instituteBranch: avilStatus?.instituteBranch,
                        billMonth: avilStatus?.billMonth,
                        courseStartDate: avilStatus?.courseStartDate, branchIncharge: avilStatus?.branchIncharge,
                        trainer:avilStatus?.trainer
                    });
                });
                resolve(data)
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}