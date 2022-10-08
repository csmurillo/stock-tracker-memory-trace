import React,{useState} from 'react';
import { Redirect } from "react-router-dom";
import { signin, saveAuth } from '../authApi';
import Button from '../../components/Button';
import MainLayout from '../../layout/MainLayout';

const Signin = () =>{
    // state: formvalues
    const [values,setValues] = useState({
        email:'',
        password:''
    });
    const {email,password}=values;
    // state: errors
    const [errors,setErrors] = useState({
        emailError:'',
        passwordError:'',
        error:''
    });
    const { emailError,passwordError,error }=errors;
    // state: redirect
    const [redirect,setRedirect] = useState(false);

    // helper functions
    const handleSubmit = event => {
        event.preventDefault();
        setValues({...values});
        // signup
        signin({email,password}).then(res=>{
            if(res.error){
                if(typeof res.error==='string'){
                    setErrors({...errors,['error']:res.error});
                }
                else{
                    let prevErrorType;
                    res.error.forEach(error=>{
                        if(error.field!=prevErrorType){
                            setErrors(errors=>{
                                return {...errors,[error.field+'Error']:error.error}
                            });
                        }
                        prevErrorType=error.field;
                    });
                }
            }
            else{
                saveAuth(res,()=>{
                    setValues({firstName:'',lastName:'',email:'',password:''});
                    setRedirect(true);
                });
            }
            
        });
    };

    const handleChange = event =>{
        setErrors({firstNameError:'',lastNameError:'',emailError:'',passwordError:'',error:''});
        const {name,value}=event.target;
        setValues({...values,[name]:value});
    };

    const signinForm = ()=>(
        <form onSubmit={handleSubmit} noValidate="noValidate">
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" className="form-control"
                    value={values.email}
                    onChange={handleChange}/>
                 <div className="text-danger">{emailError}</div>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" className="form-control"
                    value={values.password}
                    onChange={handleChange}/>
                <div className="text-danger">{passwordError}</div>
            </div>
            
            <div className="d-flex justify-content-center">
                <div>
                    <div style={{display:'block', textAlign:'center'}}> 
                        {error}
                    </div>
                    <div>
                        <Button type="submit" className="btn" styles={{color:'white',fontSize:20, width:200, backgroundColor:'lightgreen',borderColor:"lightgreen"}}>Signin</Button>
                    </div>
                </div>
            </div>
        </form>
    );

    const signinRedirect = ()=>{
        if(redirect){
            return <Redirect to='/watchlist'/>
        }
    };

    return (
        <MainLayout>
            <div className="container pt-5">
                <div className="d-flex justify-content-center">
                    <div style={{width:500}}>
                        <h1>Login</h1>
                        {signinForm()}
                    </div>
                </div>
                {signinRedirect()}
            </div>
        </MainLayout>
    );
};
export default Signin;