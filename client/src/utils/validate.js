const validate = {};

validate.isEmpty = function (...fields){
    let emptyFields = fields.filter(field => field === undefined)

    return emptyFields.length > 0 ? true : false
}

validate.validatePassword = function (password) {
    const regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
    const match = regex.test(password);
    
    return match;
}

export default validate;