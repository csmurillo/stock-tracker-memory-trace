import { useState, useEffect } from 'react';
import { getToken, isAuthenticated } from '../../authentication/authApi';
import { updatePassword } from '../../adapters/userApi';

const ChangePasswordContext = (validator)=>{

    const [values,setValues] = useState({password:'',retypedPassword:''});
    const [toggleValues,setToggleValues] = useState(false);
    const [errors,setErrors] = useState({});

    const [passwordsMatch,setPasswordsMatch] = useState(false);
    const [submittingForm,setSubmittingForm] = useState(false);
    const [formSubmitted,setFormSubmitted] = useState(false);

    const {password,retypedPassword}=values;

    // localstorage values
    const authInfo = isAuthenticated();
    const token = getToken();

    const onToggleClick = ()=>{
        setToggleValues(!toggleValues);
    };

    const onValuesChange = (e)=>{
        const {name,value}=e.target;
        setValues({
            ...values,
            [name]:value
        });
    };

    const onHandleSubmit = (e)=>{
        e.preventDefault();
        if(submittingForm||formSubmitted){
            return;
        }
        setErrors(validator(values));
        setSubmittingForm(true);
    };

    useEffect(()=>{
        if(password!=''&&retypedPassword!=''&&password===retypedPassword){
            setPasswordsMatch(true);
        }else{
            setPasswordsMatch(false);
            setErrors({});
        }
    },[values]);

    useEffect(()=>{
        if(submittingForm && Object.keys(errors).length===0){
            // submit form only when no errors and user password and retype password match
            submitForm();
        }
        setSubmittingForm(false);
    },[errors]);

    // submit form
    const submitForm=()=>{
        const values={
            password:password,
            retypedPassword:retypedPassword
        };
        updatePassword(authInfo._id,token,values).then((res)=>{
            if(res.error){
                setErrors(res.error);
            }
            else{
                setFormSubmitted(true);
            }
        });
    };

    return {password,retypedPassword,toggleValues,passwordsMatch,errors,formSubmitted,onToggleClick,onValuesChange,onHandleSubmit};

};

export {ChangePasswordContext};