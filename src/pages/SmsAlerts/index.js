import { SmsAlertContext } from '../../context/SmsAlertContext';
import { SmsAlertsSuccess } from './components/SmsAlertsSuccess';

import './index.css';
import {BsToggleOn,BsToggleOff} from 'react-icons/bs';

import MainLayout from '../../layout/MainLayout';
import Button from '../../components/Button';

const SmsAlerts = () =>{
    const { toggleSmsAlerts, errors, formSubmitted, onToggleChange, onHandleSubmit }=SmsAlertContext();

    const smsAlertsForm=()=>{
        return (
            <form onSubmit={onHandleSubmit}>
                <div className="form-group">
                    {toggleSmsAlerts&&<BsToggleOn id="toggleOn" className="toggle" name="toggle" onClick={onToggleChange}/>}
                    {toggleSmsAlerts&&<div className="pl-4">On</div>}
                    {!toggleSmsAlerts&&<BsToggleOff id="toggleOff" className="toggle" name="toggle" onClick={onToggleChange}/>}
                    {!toggleSmsAlerts&&<div className="pl-4">Off</div>}
                    <input id="toggleSmsAlerts" name="toggleSmsAlerts" type="checkbox" className="form-control"
                    value={toggleSmsAlerts}/>
                </div>
                <div className="d-flex justify-content-center">
                    <div>
                        <div>
                            <Button type="submit" className="btn" styles={{color:'white',fontSize:20, width:200, backgroundColor:'lightgreen',borderColor:"lightgreen"}}>Update</Button>
                        </div>
                    </div>
                </div>
            </form>
        );
    };
    return (
        <MainLayout>
            <div className="container pt-5">
                <div className="d-flex justify-content-center">
                    <div style={{width:500}}>
                        <h1>Sms Alerts</h1>
                        {smsAlertsForm()}
                    </div>
                </div>
            </div>
            {formSubmitted&&<SmsAlertsSuccess></SmsAlertsSuccess>}
        </MainLayout>
    );
};
export default SmsAlerts;