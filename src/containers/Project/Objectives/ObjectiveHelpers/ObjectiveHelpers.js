const uuidv1 = require('uuid/v1');

export const newNode = (key, level) => {
    const newId = uuidv1();
    let keyObj;
    if(key === 'max100'){
        keyObj = {score: ''}
    }

    if(key === 'smarter'){
        keyObj = {min: '', max: ''}
    }

    if(key === 'swing'){
        keyObj = {min: '', max: '', score: ''}
    }
    return(
        {
            id: newId,
            title: '',
            children: level === 'top' ? [] : null,
            pm: '',
            direction: '',
            [key]: keyObj
        }
    ) 
}