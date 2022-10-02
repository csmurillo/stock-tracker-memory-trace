import { useState,useEffect } from "react";
import { getToken, isAuthenticated } from '../../authentication/authApi';
import { getUserInformation,updateProfile } from "../../adapters/userApi";

const EditProfileContext = (validator)=>{
    const [values,setValues]=useState({
        firstName:'',
        lastName:'',
        email:'',
        phone:''
    });
    const [errors,setErrors]=useState({});

    const [submittingForm,setSubmittingForm]=useState(false);
    const [updatedProfileInformation,setUpdatedProfileInformation]=useState(false);

    // localstorage values
    const authInfo = isAuthenticated();
    const token = getToken();
    const {firstName,lastName,email,phone}=values;

    const onValuesChange = (e)=>{
        const {name,value}=e.target;
        setValues({
            ...values,
            [name]:value
        });
    };

    const onHandleSubmit=(e)=>{
        e.preventDefault();
        setErrors(validator(values));
        setSubmittingForm(true);
    };

    // component mount get user information from server
    useEffect(()=>{
        getUserInformation(authInfo._id,token).then((res)=>{
            const {firstName,lastName,email,phone}=res;
            setValues({
                ...values,
                ['firstName']:firstName,
                ['lastName']:lastName,
                ['email']:email,
                ['phone']:phone
            });
        });
    },[]);

    // clear error when user commence retyping
    useEffect(()=>{
        setErrors({});
    },[values]);

    // submit form when no errors and form has been submitted
    useEffect(()=>{
        if(submittingForm && Object.keys(errors).length===0){
            submitForm();
        }
        setSubmittingForm(false);
    },[submittingForm]);

    const submitForm = ()=>{
        const values={
            firstName:firstName,
            lastName:lastName,
            email:email,
            phone:phone
        };
        updateProfile(authInfo._id,token,values).then((res)=>{
            const{error}=res;
            if(error){
                setErrors(error);
            }
            else{
                setUpdatedProfileInformation(true);
            }
        });
    };
    return {firstName,lastName,email,phone,errors,updatedProfileInformation,onValuesChange,onHandleSubmit};
};

export {EditProfileContext};