const excludeSpecialCharactersRegex = /^[a-zA-Z0-9äöüÄÖÜ ]*$/;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const amountRegex = /^\d+(\.\d{1,2})?$/;


export const basicValidation = (str) => {

    str = str.trim();

    if(str.length == 0)
        return 'cannot be empty';

    if(str.match(excludeSpecialCharactersRegex) == null)
        return 'invalid';

    return null;

}


export const emailValidation = (str) => {

    str = str.trim();

    if(str.length == 0)
        return 'cannot be empty';

    if(str.match(emailRegex) == '')
        return 'invalid';

    return null;

}

export const mobileValidation = (str) => {

    str = str.trim();

    if(str.length == 0)
        return 'cannot be empty';

    if(str.match(mobileRegex) == '')
        return 'invalid';

    return null;

}

export const amountValidation = (str) => {

    str = str.trim();

    if(str.length == 0)
        return 'cannot be empty';

    if(str.match(amountRegex) == '')
        return 'invalid';

    return null;

}


