const uuidv1 = require('uuid/v1');

export const newNode = () => {
    const newId = uuidv1();
    return(
        {
            id: newId,
            title: '',
            smarter: {
                min: 0,
                max: 0
            },
            swing: {
                min: 0,
                max: 0,
                score: 0
            },
            max100: {
                score: 0
            }
        }
    ) 
}