import React from 'react';
import { DeleteAccountContext } from '../../context/DeleteAccountContext';
import { DeleteSuccess } from './component/DeleteSuccess';

import "./index.css";

import MainLayout from '../../layout/MainLayout';
import Button from '../../components/Button';

const DeleteAccount = () =>{
    const { password, errors, deleteSuccess, onPasswordChange, onHandleSubmit }=DeleteAccountContext();

    const modal=()=>{
        return (
            <div className="modal fade" id="deleteAccountModal" tabIndex="-1" role="dialog" aria-labelledby="deleteAccountModalTitle" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered d-flex justify-content-center" role="document">
                <form onSubmit={onHandleSubmit}>
                    <div className="modal-content">
                        <div className="modal-body">
                                <div>
                                    <label style={{fontSize:24}}>Password:</label>
                                    <div className="d-flex justify-content-center">
                                        <input type="password" name="password" onChange={onPasswordChange} value={password}/>
                                    </div>
                                    <div className="pl-2">
                                        {<div>{errors.passwordNotMatch}</div>}
                                    </div>
                                </div>
                        </div>
                        <div id="modal-delete-button-container" className="modal-footer d-flex justify-content-center">
                            <Button type="submit" className="btn" styles={{color:'white',fontSize:20, width:200, backgroundColor:'lightgreen',borderColor:"lightgreen"}} dataDismiss={deleteSuccess?"modal":''}>Delete</Button>
                        </div>
                    </div>
                </form>
              </div>
            </div>
    );
    };
    return (
        <MainLayout>
            <div className="container pt-5">
                <div className="d-flex justify-content-center">
                    <div id="delete-account-container">
                        <h1 id="delete-account-title">Delete Account</h1>
                        <div id="delete-button-container" className="pt-5 d-flex justify-content-center">
                            <Button className="btn" styles={{color:'white',fontSize:20, width:200, backgroundColor:'lightgreen',borderColor:"lightgreen"}} dataToggle="modal" dataTarget="#deleteAccountModal">Delete</Button>
                        </div>
                        {modal()}
                    </div>
                </div>
            </div>
            {deleteSuccess && <DeleteSuccess></DeleteSuccess>}
        </MainLayout>
    );
};

export default DeleteAccount;