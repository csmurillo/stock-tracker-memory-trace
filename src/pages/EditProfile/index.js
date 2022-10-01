import { EditProfileContext } from '../../context/EditProfileContext';
import validateEditProfile from '../../validators/EditProfileValidator';
import { UpdateProfileSuccess } from './component/UpdateProfileSuccess';

import './index.css';
import MainLayout from '../../layout/MainLayout';
import Button from '../../components/Button';

const EditProfile = () =>{
    const { firstName,lastName,email,phone,errors,updatedProfileInformation,onValuesChange,onHandleSubmit }=EditProfileContext(validateEditProfile);

    const editProfileForm=()=>{
        return (
            <form onSubmit={onHandleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input id="firstName" name="firstName" type="text" className="form-control"
                    value={firstName} onChange={onValuesChange}/>
                    <div className="errors">
                        {errors.firstName&&<div>{errors.firstName}</div>}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input id="lastName" name="lastName" type="text" className="form-control"
                    value={lastName} onChange={onValuesChange}/>
                    <div className="errors">
                        {errors.lastName&&<div>{errors.lastName}</div>}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input id="email" name="email" type="email" className="form-control"
                    value={email} onChange={onValuesChange}/>
                    <div className="errors">
                        {errors.email&&<div>{errors.email}</div>}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input id="phone" name="phone" type="text" className="form-control"
                    value={phone} onChange={onValuesChange}/>
                    <div className="errors">
                        {errors.phone&&<div>{errors.phone}</div>}
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div id="serverError">
                            {errors.serverError&&<div>{errors.serverError}</div>}
                    </div>
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
                        <h1>Edit Profile</h1>
                        {editProfileForm()}
                    </div>
                </div>
            </div>
            {updatedProfileInformation && <UpdateProfileSuccess></UpdateProfileSuccess>}
        </MainLayout>
    );
};
export default EditProfile;