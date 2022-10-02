import { useState, useEffect } from 'react';
import { getToken, isAuthenticated, deleteAccount } from '../../authentication/authApi';

const DeleteAccountContext = ()=>{
    const [password,setPassword]=useState('');
    const [errors,setErrors]=useState({});
    const [deleteSuccess,setDeleteSuccess]=useState(false);

    // localstorage values
    const authInfo = isAuthenticated();
    const token = getToken();

    const onPasswordChange=(e)=>{
        const {value}=e.target;
        setPassword(value);
    };
    const onHandleSubmit=(e)=>{
        e.preventDefault();
        deleteAccountSend();
    };
    const deleteAccountSend=()=>{
        deleteAccount(authInfo._id,token,{password:password}).then((res)=>{
            const {error}=res;
            if(error){
                setErrors({passwordNotMatch:error.passwordNoMatch});
            }
            else{
                let body=document.body;
                let lstChild=body.lastChild;
                body.removeChild(lstChild);
                setDeleteSuccess(true);
            }
            
        });
    };
    useEffect(()=>{
        setErrors({});
    },[password]);
    return {password,errors,deleteSuccess,onPasswordChange,onHandleSubmit};

};

export {DeleteAccountContext};