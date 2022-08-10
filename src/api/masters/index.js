import { collection, addDoc, setDoc, updateDoc, query, doc, where, getDocs, deleteDoc, orderBy, startAt, endAt } from "firebase/firestore";
// import { getDatabase, ref,  orderByChild ,equalTo,get} from "firebase/database";
import { getAuth, deleteUser } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { isAuthenticated, jwtDecodeDetails } from '../../services/utilities';
import { STATUS } from '../../services/constants'
import { DB_NAME } from '../../services/constants'
import { Toast } from '../../services/toast';



export const createBatch = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {

                const docRef = await addDoc(collection(getFirestore(), DB_NAME?.BATCH), body);
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
};


export const getBatchList = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {

                const querySnapshot = await getDocs(query(collection(getFirestore(), DB_NAME?.BATCH), orderBy("order", "asc")));

                let data = []
                querySnapshot.forEach((doc) => {


                    data.push({ ...doc.data(), id: doc.id });
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


export const getBatchListWithCandidate = (body) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (isAuthenticated()) {

                const querySnapshot = await getDocs(query(collection(getFirestore(), DB_NAME?.BATCH), orderBy("order", "asc")));

                let data = []
                querySnapshot.forEach((doc) => {
                    data.push({ ...doc.data(), id: doc.id });
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


export const updateBatch = (body, id) => {

    return new Promise(async (resolve, reject) => {
        delete body.id;
        try {
            if (isAuthenticated()) {
                
                console.log(JSON.stringify(body))
                const docRef = await updateDoc(doc(getFirestore(), DB_NAME?.BATCH, id), body);
                resolve(docRef)
            } else {

            }

        } catch (e) {
            Toast({ type: 'danger', message: 'Internal Server Error', title: 'Error' })
            console.error("Error adding document: ", e);
            reject(e)

        }
    })
}
