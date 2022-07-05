import { collection, addDoc, setDoc, updateDoc, query, doc, where, getDocs, deleteDoc, orderBy, startAt, endAt } from "firebase/firestore";
// import { getDatabase, ref,  orderByChild ,equalTo,get} from "firebase/database";
import { getAuth, deleteUser } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { isAuthenticated, jwtDecodeDetails } from '../../services/utilities';
import { STATUS } from '../../services/constants'
import { CURRENT_USER } from '../../services/constants'
import { Toast } from '../../services/toast';


export const createCandidate = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                let { email } = jwtDecodeDetails()
                body['createdBy'] = email
                body['createdEmail'] = email
                const docRef = await addDoc(collection(getFirestore(), "candidate"), body);
                resolve(docRef)
                Toast({ type: 'success', message: 'candidate saved successfully', title: 'success' })
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}

export const updateCandidate = (body, id) => {
    delete body.id
    delete body.statusCount
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                let { email } = jwtDecodeDetails()
                body['createdBy'] = email
                body['createdEmail'] = email
                const docRef = await updateDoc(doc(getFirestore(), "candidate", id), body);
                resolve(docRef)
                Toast({ type: 'success', message: 'candidate saved successfully', title: 'success' })
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}

export const createCandidateByCandidate = (body) => {
    return new Promise(async (resolve, reject) => {
        try {


            const docRef = await addDoc(collection(getFirestore(), "candidate"), body);
            resolve(docRef)
            Toast({ type: 'success', message: 'candidate saved successfully', title: 'success' })


        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}

export const getCandidate = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                
                const querySnapshot = await getDocs(query(collection(getFirestore(), "candidate"), where("status", "array-contains", body)));

                let data = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    let avilStatus = doc.data().joinedCourses.filter(({ status }) => status == body)
                    data.push({ ...doc.data(), id: doc.id, statusCount: avilStatus.length });
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

export const deleteCandidate = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {
                let deleteCandidate = await deleteDoc(doc(getFirestore(), "candidate", id));
                Toast({ type: 'success', message: 'candidate deleted successfully', title: 'success' })
                resolve(deleteCandidate)
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}


export const searchCandidate = (phone) => {
    console.log('value------------>', phone)
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {


                const querySnapshot = await getDocs(query(collection(getFirestore(), "candidate"), orderBy("phone"), where("phone", "<=", phone), endAt([phone + '\uf8ff'])));
                let data = []
                const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                console.log("last", lastVisible, querySnapshot);
                // console.log("found by name",querySnapshot);
                // querySnapshot.forEach((doc) => {
                //     // doc.data() is never undefined for query doc snapshots
                //     console.log('{ ...doc.data(), id: doc.id }------------->',{ ...doc.data(), id: doc.id })
                //     data.push({ ...doc.data(), id: doc.id });
                // });

                // resolve(deleteCandidate)
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            reject(e)
            console.error("Error adding document: ", e);
        }
    })
}