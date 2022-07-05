import { model} from "../../services/apiVariables";
import { api } from "../../services/api"
import { Toast } from "../../services/toast";



export const getModelList = (body) => {

    return new Promise((resolve, reject) => {

        api({ ...model.get }).then((data) => {
            // Toast({ type: 'success', message: 'You have been sucessfully logged into iTrain', title: 'Success!' })
            resolve(data)
        }).catch(({erroe:{message=''}}) => {
            Toast({ type: 'danger', message: message, title: 'Error' })
            reject(message)


        })




    })
}