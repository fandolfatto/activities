function isValidId(value) {
    return Number.isInteger(Number(value)) && Number(value) > 0;
}

function checkDuration(value) {
    if (value > 0 && value <= 144)
        return true;
    else return false;
}

function checkDataNotEmpty(value) {
    if (value === null || value === undefined || value === ""){
        return false;
    } else {
         return true;
    }
}

//other syntax for the declaration of a function
const checkData = (obj) => {
    if (!(checkDataNotEmpty(obj.name) && checkDataNotEmpty(obj.activity_date) && checkDataNotEmpty(obj.duration)))  {
        throw new Error("Données incomplètes");
    }
    if (!checkDuration(obj.duration)) {
        throw new Error("La durée doit être comprise entre 0 et 144");
    }
}

export {isValidId, checkDuration, checkDataNotEmpty, checkData};