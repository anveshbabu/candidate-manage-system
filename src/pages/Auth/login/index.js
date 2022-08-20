import React from "react";
import "./login.scss";
import {
  NormalInput,
  NormalButton,
  // NormalCheckbox
} from "../../../components/common";
import SimpleReactValidator from 'simple-react-validator';
import {Toast} from '../../../services/toast'
// import { userSignin } from "../../../redux/actions/login";
import { history } from "../../../helpers";
import { EXIST_LOCAL_STORAGE } from "../../../services/constants";
import { userSignin,createAuthentication } from '../../../api'

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    this.state = {
      loginForm: {
        username: "",
        password: "",
      },
      isFormLoder: false,
    };
    // createAuthentication()
  }





  
  //handle input change function call start
  handleInputChange = e => {
    let { value, name } = e.target;
    this.setState({
      loginForm: {
        ...this.state.loginForm,
        [name]: value
      }
    })
  };


  //login submit API call function  start
  handleSubmit = () => {
    let {loginForm}=this.state;
    // testGet().then((data) => { 
      
    //   history.push('/dashboard')
    
    
    // }).catch((error) => {

    // })

    if (this.validator.allValid()) {
      this.setState({isFormLoder:true})
      // setTimeout(()=>    { 
      //   Toast({ type: 'success', message: 'You have been sucessfully logged into iTrain', title: 'Success!' })
      //   history.push('/dashboard')
      //   this.setState({isFormLoder:true})
      // }, 3000);

      userSignin(loginForm).then((data) => {
        this.setState({ isFormLoder: false });
        console.log('data------------->',data)
        if (!!data) {
          // if (isKeepMe) {
          //   keepMeObj.username = loginForm.username;
          //   keepMeObj.password = loginForm.password;
          //   this.setState({ keepMeObj });
          //   localStorage.setItem(EXIST_LOCAL_STORAGE.IS_KEEP_ME, 1);
          //   localStorage.setItem(EXIST_LOCAL_STORAGE.KEEP_ME_OBJ, JSON.stringify(keepMeObj));
          // } else {
          //   localStorage.setItem(EXIST_LOCAL_STORAGE.IS_KEEP_ME, 0);
          //   localStorage.setItem(EXIST_LOCAL_STORAGE.KEEP_ME_OBJ, JSON.stringify(keepMeObj));
          // }
          history.push('/dashboard')
        }
      }).catch((error) => {
        if(error==='auth/wrong-password'){
          this.setState({ isFormLoder: false });

        }else{

        }
        console.error(error);
        this.setState({ isFormLoder: false ,isResErr:error});
      });
 
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }

  }



  render() {
    let { loginForm, isFormLoder, isResErr, isKeepMe } = this.state;
    return (
      <div className="row login justify-content-md-center login-page">
        <div className="col-md-9 col-xs-9">
          <div className="row">
            <div className="col-md-12 title">
              <h4>Sign in to access iTrain</h4>
              <h4>Super Admin Portal</h4>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <NormalInput label='User name'
                onChange={this.handleInputChange}
                value={loginForm.username}
                name='username'
                errorMessage={this.validator.message('User name', loginForm.username, 'required|email')} />
              <NormalInput label='password'
                onChange={this.handleInputChange}
                value={loginForm.password}
                name='password'
                type="password"
                errorMessage={this.validator.message('User name', loginForm.password, 'required')}
              />

            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="d-grid gap-2">
                <NormalButton isLoader={isFormLoder} label='Sign in' className=' btn-primary shadow' onClick={this.handleSubmit} />
              </div>

            </div>
            <div className="col-md-12 text-center mt-2">
              <a className='link-primary'>Forgot your password?</a >

            </div>
          </div>

        </div>
      </div>
    );
  }
}
