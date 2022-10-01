export default function validateChangePassword(values){
    let errors={};

    // password validation
    if(values.password.length==0){
        errors.password="Password required";
    }
    else if(values.password.length<8){
        errors.password="Password must contain at least 8 characters";
    }
    else if(!/\d/.test(values.password)){
        errors.password="Password must contain a number";
    }
    // retyped password validation
    if(values.retypedPassword.length==0){
        errors.retypedPassword="Retyped Password required";
    }
    else if(values.retypedPassword.length<8){
        errors.retypedPassword="Retyped Password must contain at least 8 characters";
    }
    else if(!/\d/.test(values.retypedPassword)){
        errors.retypedPassword="Retyped Password must contain a number";
    }
    if(values.password!==values.retypedPassword){
        errors.nomatch="Passwords did not match";
    }

    return errors;
}
