export default function validateEditProfile(values){
    let errors={};
    // firstName validation
    if(values.firstName.length==0){
        errors.firstName="First Name required";
    }
    //  lastName validation
    if(values.lastName.length==0){
        errors.lastName="Last Name required";
    }
    //  email validation
    if(values.email.length==0){
        errors.email="Email required";
    }
    else if(!/\w@[a-z]+.com/.test(values.email)){
        errors.email="Please check email";
    }

    return errors;
}