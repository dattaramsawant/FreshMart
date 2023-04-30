var _ = require('lodash')

const required = ({ value, message }) => {
    value = value.trim()
    return _.isEmpty(value) && message;
}

const minLength = ({ value, length, message }) => {
    value = value.trim()
    return _.size(value) < length ? message || `Minimum ${length} charactor is required.` : ''
}

const maxLength = ({ value, length, message }) => {
    value = value.trim()
    return _.size(value) > length ? message || `Maximum ${length} charactor is required.` : ''
}

const email = ({ value, message }) => {
    value = value.trim()
    return !(/(.+)@(.+){2,}\.(.+){2,}/.test(value)) ? message || 'Please enter valid Email ID.' : ''
}

const exactLength = ({ value, length, message }) => {
    value = value.trim()
    return value.length !== length && message || `Only ${length} character is allowed.`
}

const spaceNumberSpecialCharNotAllowed = ({value, messgae}) => {
    return /[^a-zA-Z]/.test(value) ? messgae || "Space, Number and Special Character is not allowed." : ''
}

const password = ({ value, message}) => {
    return !(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/.test(value)) ? message || "Atleast one uppercase, one lowercase, one number and one special character is required." : ''
}

export {
    required,
    minLength,
    maxLength,
    email,
    spaceNumberSpecialCharNotAllowed,
    exactLength,
    password
}