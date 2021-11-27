export default function useValidators() {

  const isEmpty = (fieldName, fieldValue) => {
      return !fieldValue ? "l'information " + fieldName + " est requis" : "";
  }

  const minLength = (fieldName, fieldValue, min) => {
      return fieldValue.length < min ? `The ${fieldName} field must be atleast ${min} characters long` : "";
  }

  const isEmail = (fieldName, fieldValue) => {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return !re.test(fieldValue) ? "L'adresse " + fieldName + " n'est pas valide" : "";
  }

  const isNum = (fieldName, fieldValue) => {
    let isNum = /^\d+$/.test(fieldValue);
    return !isNum ? "The " + fieldName + " field only have numbers" : "";
  }
  
  return { isEmpty, minLength, isEmail, isNum }
}