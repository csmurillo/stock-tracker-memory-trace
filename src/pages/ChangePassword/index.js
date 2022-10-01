import { ChangePasswordContext } from '../../context/ChangePasswordContext';
import validateChangePassword from '../../validators/ChangePasswordValidator';
import SuccessScreen from '../../components/SuccessScreen';

import './index.css';
import MainLayout from '../../layout/MainLayout';
import Button from '../../components/Button';
import {AiOutlineCheckCircle,AiOutlineMinusCircle,AiOutlineCloseCircle} from 'react-icons/ai';
import {BsToggleOn,BsToggleOff} from 'react-icons/bs';

const ChangePassword = () =>{
    const { password, retypedPassword, toggleValues, passwordsMatch, errors, formSubmitted, onToggleClick, onValuesChange, onHandleSubmit }=ChangePasswordContext(validateChangePassword);
    
    // togglers
    const toggleOn=()=>{
        return (toggleValues&&<BsToggleOn className="toggle" name="toggle" onClick={onToggleClick}/>);

    };
    const toggleOff=()=>{
        return (!toggleValues&&<BsToggleOff className="toggle" name="toggle" onClick={onToggleClick}/>);
    };
    
    // errors
    const passwordError=()=>{
        return (errors.password && <div className="error">{errors.password}</div>);
    };
    const retypedPasswordError=()=>{
        return (errors.retypedPassword && <div className="error">{errors.retypedPassword}</div>);
    };
    const noMatchError=()=>{
        return (errors.nomatch && <div className="error">{errors.nomatch}</div>);
    };

    // input check indicators
    const checkPasswordCircle=()=>{
        return (!errors.password&&(passwordsMatch&&<AiOutlineCheckCircle className="input-signal check-signal"></AiOutlineCheckCircle>));
    };
    const minusPasswordCircle=()=>{
        return ((errors.password||Object.keys(errors).length===0)&&(!passwordsMatch&&<AiOutlineMinusCircle className="input-signal minus-signal"></AiOutlineMinusCircle>));
    };
    const closePasswordCircle=()=>{
        return ((errors.password || errors.nomatch) && <AiOutlineCloseCircle className="input-signal close-signal"></AiOutlineCloseCircle>);
    }
    const checkRetypedPasswordCircle=()=>{
        return (!errors.retypedPassword&&(passwordsMatch&&<AiOutlineCheckCircle className="input-signal check-signal"></AiOutlineCheckCircle>));
    };
    const minusRetypedPasswordCircle=()=>{
        return ((errors.retypedPassword||Object.keys(errors).length===0)&&(!passwordsMatch&&<AiOutlineMinusCircle className="input-signal minus-signal"></AiOutlineMinusCircle>));
    };
    const closeRetypedPasswordCircle=()=>{
        return ((errors.retypedPassword || errors.nomatch) && <AiOutlineCloseCircle className="input-signal close-signal"></AiOutlineCloseCircle>);
    }
    return (
        <MainLayout>
            <div className="container pt-4">
                <div className="d-flex justify-content-center">
                    <div style={{width:500}}>
                        <h1>Change Password</h1>
                        <div>
                            <form onSubmit={onHandleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <div id="password-input-container">
                                            <input type={toggleValues?'text':'password'} className="form-control" name="password"
                                            id="password" placeholder="Password"
                                            value={password} onChange={onValuesChange}
                                        />
                                        {/* password input check indicators check,minus,close */}
                                        {checkPasswordCircle()}
                                        {minusPasswordCircle()}
                                        {closePasswordCircle()}
                                    </div>
                                    <div id="password-error">
                                        {passwordError()}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="retyped-password">Retype Password</label>
                                    <div id="retyped-password-input-container">
                                        <input type={toggleValues?'text':'password'} className="form-control" name="retypedPassword"
                                            id="retyped-password" placeholder="Retype Password"
                                            value={retypedPassword} onChange={onValuesChange}
                                        />
                                        {/* retyped password input check indicators check,minus,close */}
                                        {checkRetypedPasswordCircle()}
                                        {minusRetypedPasswordCircle()}
                                        {closeRetypedPasswordCircle()}
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="pt-1" id="retyped-error">
                                            {retypedPasswordError()}
                                        </div>
                                        <div id="toggle-container">
                                            <label htmlFor="toggle" className="pr-1">Show Passwords:</label>
                                            {toggleOn()}
                                            {toggleOff()}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center pt-4">
                                        {noMatchError()}
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Button type="submit" className="btn" styles={{color:'white',fontSize:20, width:200, backgroundColor:'lightgreen',borderColor:"lightgreen"}}>Change Password</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {formSubmitted && <SuccessScreen/>}
        </MainLayout>
    );
};

export default ChangePassword;