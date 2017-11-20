const uuidv1 = require('uuid/v1');

export const newNode = () => {
    const newId = uuidv1();
    return(
        {
            id: newId,
            controls: {
                performanceMeasure: {
                    elementType: 'textarea',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'How you define performance'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'cost', displayValue: 'Cost'},
                            {value: 'savings', displayValue: 'Savings'},
                            {value: 'length', displayValue: 'Length'},
                            {value: 'distance', displayValue: 'Distance'},
                            {value: 'color', displayValue: 'Color'},
                            {value: 'quantity', displayValue: 'Quantity'},
                            {value: 'weight', displayValue: 'Weight'}
                        ]
                    },
                    value: 'cost',
                    validation: {},
                    valid: true
                },
                direction: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'higher is better', displayValue: 'Higher is Better'},
                            {value: 'lower is better', displayValue: 'Lower is Better'}
                        ]
                    },
                    value: 'higher is better',
                    validation: {},
                    valid: true
                },
                msic: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'relative', displayValue: 'Relative'},
                            {value: 'absolute', displayValue: 'Absolute'}
                        ]
                    },
                    value: 'relative',
                    validation: {},
                    valid: true
                },
                type: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'continuous', displayValue: 'Continuous'},
                            {value: 'categorical', displayValue: 'Categorical'},
                            {value: 'interval', displayValue: 'Interval'}
                        ]
                    },
                    value: 'continuous',
                    validation: {},
                    valid: true
                },
            }
        }
    )
    
}