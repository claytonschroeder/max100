export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    }
};

export const findNode = (object, id) => {
    var result = null;
    if(object instanceof Array) {
        for(var i = 0; i < object.length; i++) {
            result = findNode(object[i]);
            if (result) {
                break;
            }   
        }
    }
    else
    {
        for(var prop in object) {
            console.log(prop + ': ' + object[prop]);
            if(prop === 'id') {
                if(object[prop] === id) {
                    return object;
                }
            }
            if(object[prop] instanceof Object || object[prop] instanceof Array) {
                result = findNode(object[prop]);
                if (result) {
                    break;
                }
            } 
        }
    }
    return result;
}