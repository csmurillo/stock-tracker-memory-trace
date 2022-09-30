import React,{useState} from 'react';
import { Redirect } from "react-router-dom";
import { signup } from './authApi';
import Button from '../components/Button';
import MainLayout from '../layout/MainLayout';

const Signup = () =>{
    // state: form values
    const [values,setValues] = useState({
        firstName:'',
        lastName:'',
        email:'',
        phone:'',
        password:''
    });
    const {firstName,lastName,email,phone,password}=values;
    // state: errors
    const [errors,setErrors] = useState({
        firstNameError:'',
        lastNameError:'',
        emailError:'',
        phoneError:'',
        passwordError:'',
        error:''
    });
    const {firstNameError,lastNameError,emailError,phoneError,passwordError,error}=errors;
    // state: redirect
    const [redirect,setRedirect] = useState(false);

    // helper functions
    const handleSubmit = event => {
        event.preventDefault();
        setValues({...values});

        // signup
        signup({firstName,lastName,email,phone,password}).then(res=>{
            if(res.error){
                if(typeof res.error==='string'){
                    setErrors({...errors,['error']:res.error});
                }
                else{
                    let prevErrorType;
                    res.error.forEach(error=>{
                        if(error.field!==prevErrorType){
                            setErrors(errors=>{
                                return {...errors,[error.field+'Error']:error.error}
                            });
                        }
                        prevErrorType=error.field;
                    });
                }
            }
            else{
                setValues({firstName:'',lastName:'',email:'',phone:'',password:''});
                setRedirect(true);
            }
            
        });
    };

    const handleChange = event =>{
        setErrors({firstNameError:'',lastNameError:'',emailError:'',passwordError:'',error:''});
        const {name,value}=event.target;
        setValues({...values,[name]:value});
    };

    const signupForm = ()=>(
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input id="firstName" name="firstName" type="text" className="form-control"
                    value={values.firstName}
                    onChange={handleChange}/>
                <div className="text-danger">{firstNameError}</div>
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input id="lastName" name="lastName" type="text" className="form-control"
                    value={values.lastName}
                    onChange={handleChange}/>
                <div className="text-danger">{lastNameError}</div>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" className="form-control"
                    value={values.email}
                    onChange={handleChange}/>
                 <div className="text-danger">{emailError}</div>
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="text" className="form-control"
                    value={values.phone}
                    onChange={handleChange}/>
                 <div className="text-danger">{phoneError}</div>
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

    const signupRedirect = ()=>{
        if(redirect){
            return <Redirect to='/'/>
        }
    };

    return (
        <MainLayout>
            <div className="container pt-5">
                <div className="d-flex justify-content-center">
                    <div style={{width:500}}>
                        <h1>Signup</h1>
                        {signupForm()}
                    </div>
                </div>
                {signupRedirect()}
            </div>
        </MainLayout>
    );
};
export default Signup;