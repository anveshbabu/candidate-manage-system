import { collection, addDoc, setDoc, updateDoc, query, doc, where, getDoc, deleteDoc, getDocs, orderBy, startAt, endAt } from "firebase/firestore";
// import { getDatabase, ref,  orderByChild ,equalTo,get} from "firebase/database";
import { getAuth, deleteUser } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { isAuthenticated, jwtDecodeDetails } from '../../services/utilities';
import { STATUS } from '../../services/constants'
import { CURRENT_USER, DB_NAME } from '../../services/constants';
import { Toast } from '../../services/toast';
import moment from "moment";



export const updateAtendance = (body) => {
    // console.log('-------------', body)
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                let sucessCount = 0;
                let avilabelCounr = 0;
                body?.map(async (attendanceObj, i) => {
                    sucessCount++
                    const isAvilable = await getDocs(query(collection(getFirestore(), DB_NAME.ATTENDANCE), where("atdDate", "==", attendanceObj?.atdDate), where("candId", "==", attendanceObj?.candId)));

                    if (isAvilable?.size == 0) {
                        const docRef = await addDoc(collection(getFirestore(), DB_NAME.ATTENDANCE), attendanceObj);

                    } else {

                        isAvilable.forEach(async (cand) => {
                            avilabelCounr++
                            let { user_id, userObj: { first_name, last_name } } = jwtDecodeDetails();
                            attendanceObj['createdBy']['name'] = first_name + " " + last_name;
                            attendanceObj['createdBy']['userId'] = user_id;
                            const docRef = await updateDoc(doc(getFirestore(), DB_NAME.ATTENDANCE, cand?.id), attendanceObj);
                                               });

                
                    }
                    if (sucessCount === i + 1) {
                        resolve('sucess');
                        Toast({ type: 'success', message: 'Attendance updated successfully', title: 'success' })
                    }
                    // console.log('isAvilable-------------->', isAvilable)
                })



                // const docRef = await addDoc(collection(getFirestore(), "candidate"), body);
                // resolve(docRef)
                // Toast({ type: 'success', message: 'candidate saved successfully', title: 'success' })
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}




export const getAttendance = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {

                const querySnapshot = await getDocs(query(collection(getFirestore(), DB_NAME.ATTENDANCE), where("atdDate", "==", moment().format('DD/MM/YYYY'))));

                let data = []
                querySnapshot.forEach((doc) => {

                    data.push({ ...doc.data(), id: doc.id });
                });
                // console.log('querySnapshot----------->', querySnapshot.size)
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


export const getCandidateAttendance = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {

                const querySnapshot = await getDocs(query(collection(getFirestore(), DB_NAME.ATTENDANCE), where("candId", "==",body)));

                let data = []
                querySnapshot.forEach((doc) => {

                    data.push({ ...doc.data(), id: doc.id });
                });
                // console.log('querySnapshot----------->', querySnapshot.size)
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