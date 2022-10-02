import { useState,useEffect } from "react";
import { getToken, isAuthenticated } from '../../authentication/authApi';
import { getSmsAlerts, updateSmsAlerts } from "../../adapters/userApi";

const SmsAlertContext = ()=>{
    const [toggleSmsAlerts,setToggleSmsAlerts]=useState();
    const [errors,setErrors]=useState({});

    const [submittingForm,setSubmittingForm]=useState(false);
    const [formSubmitted,setFormSubmitted]=useState(false);

    // localstorage values
    const authInfo = isAuthenticated();
    const token = getToken();

    const onToggleChange=()=>{
        setToggleSmsAlerts(!toggleSmsAlerts);
    };

    const onHandleSubmit=(e)=>{
        e.preventDefault();
        setSubmittingForm(true);
    };

    // on init component get user sms alerts preference from server
    useEffect(()=>{
        getSmsAlerts(authInfo._id,token).then((res)=>{
            const {smsAlerts}=res;
            setToggleSmsAlerts(smsAlerts)
        });
    },[]);

    useEffect(()=>{
        if(submittingForm){
            submitForm();
        }
    },[submittingForm]);

    // update user preference for smsalerts
    const submitForm=()=>{
        const smsAlerts={
            smsAlerts:toggleSmsAlerts
        };
        updateSmsAlerts(authInfo._id,token,smsAlerts).then((res)=>{
            if(res.error){
                setErrors(res.error);
            }
            else{
                setFormSubmitted(true);
            }
        });
    };

    return { toggleSmsAlerts,errors, formSubmitted, onToggleChange, onHandleSubmit};
};

export {SmsAlertContext};
