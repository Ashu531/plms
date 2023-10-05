const excludeSpecialCharactersRegex = /^[a-zA-Z0-9. ]*$/;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const amountRegex = /^\d+(\.\d{1,2})?$/;

const checkForNull = (str) => {
    if(str == null){
        throw 'cannot be null';
    }
}

export const basicValidation = (str) => {

    checkForNull(str);

    str = str.trim();

    if(str.length == 0)
        return 'cannot be empty';

    if(str.match(excludeSpecialCharactersRegex) == null)
        return 'invalid';

    return null;

}


export const emailValidation = (str) => {

    checkForNull(str);

    str = str.trim();

    if(str.length == 0)
        return 'cannot be empty';

    if(str.match(emailRegex) == null)
        return 'invalid';

    return null;

}

export const mobileValidation = (str) => {

    checkForNull(str);

    str = str.trim();

    if(str.length == 0)
        return 'cannot be empty';

    if(str.match(mobileRegex) == null)
        return 'invalid';

    return null;

}

export const amountValidation = (str) => {

    checkForNull(str);

    str = str.trim();

    if(str.length == 0)
        return 'cannot be empty';

    if(str.match(amountRegex) == null)
        return 'invalid';

    return null;

}

export const dropdownValidation = (str) => {
    
    checkForNull(str);

    str = str.trim();

    if(str < 0){
        return 'invalid'
    }

    return null;
}


