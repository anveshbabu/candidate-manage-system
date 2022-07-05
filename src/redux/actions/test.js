import { testApi } from "../../services/apiVariables";
import { api } from "../../services/api"
import { Toast } from "../../services/toast";
export const testGet = (body) => {

    return new Promise((resolve, reject) => {

        api({ ...testApi.get }).then((data) => {
            Toast({ type: 'success', message: 'You have been sucessfully logged into iTrain', title: 'Success!' })
            resolve(data)
        }).catch((error) => {
            Toast({ type: 'danger', message: 'message', title: 'Error' })
            reject(error)


        })




    })
}