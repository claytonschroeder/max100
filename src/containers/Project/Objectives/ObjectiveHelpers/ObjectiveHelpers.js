const uuidv1 = require('uuid/v1');

export const newNode = () => {
    const newId = uuidv1();
    return(
        {
            id: newId,
            hide: false,
            controls: {
                description: {
                    active: true,
                    label: 'Description',
                    elementType: 'textarea',
                    elementConfig: {
                        type: 'text',
                        placeholder: ''
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                performanceMeasure: {
                    active: true,
                    label: 'Performance Measure',
                    elementType: 'text',
                    elementConfig: {
                        type: 'text',
                        placeholder: ''
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                units: {
                    active: true,
                    label: 'Units',
                    elementType: 'text',
                    elementConfig: {
                        type: 'text',
                        placeholder: ''
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                direction: {
                    active: true,
                    label: 'Direction',
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
                    active: true,
                    label: 'MSIC Type',
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
                    active: true,
                    label: 'MSIC Value',
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 0.1, displayValue: '0.1'}
                        ]
                    },
                    value: 0.1,
                    validation: {},
                    valid: true
                },
                uncertainty: {
                    active: true,
                    label: 'Uncertainty',
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'none', displayValue: 'None'},
                            {value: 1, displayValue: '1 pt'},
                            {value: 2, displayValue: '2 pt'},
                            {value: 3, displayValue: '3 pt'}
                        ]
                    },
                    value: 'none',
                    validation: {},
                    valid: true
                },
                format: {
                    active: true,
                    label: 'Format',
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'text', displayValue: 'Text'},
                            {value: 'number', displayValue: 'Number'},
                            {value: 'currency', displayValue: 'Currency'},
                            {value: 'date', displayValue: 'Date'},
                            {value: 'percentage', displayValue: 'Percentage'}
                        ]
                    },
                    value: 'text',
                    validation: {},
                    valid: true
                },
                valueFuntion: {
                    active: true,
                    label: 'Value Function',
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'positive', displayValue: 'Positive Linear'},
                            {value: 'negative', displayValue: 'Negative Linear'},
                            {value: 'bell', displayValue: 'Bell'}
                        ]
                    },
                    value: 'positive',
                    validation: {},
                    valid: true
                },
                dataType: {
                    active: true,
                    label: 'Data Type',
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

export const intervals = () => {
    return {
        min: {
            active: true,
            label: 'Minimimum',
            elementType: 'number',
            elementConfig: {
                type: 'number',
                placeholder: ''
            },
            value: 0,
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        max: {
            active: true,
            label: 'Maximium',
            elementType: 'number',
            elementConfig: {
                type: 'number',
                placeholder: ''
            },
            value: 100,
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        interval: {
            active: true,
            label: 'Interval',
            elementType: 'number',
            elementConfig: {
                type: 'number',
                placeholder: ''
            },
            value: 10,
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    }
}


export const categories = () => {
    return {
        cat1name: {
            active: true,
            label: 'Category 1 Name',
            elementType: 'text',
            elementConfig: {
                type: 'text',
                placeholder: ''
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        cat1val: {
            active: true,
            label: 'Category 1 Value',
            elementType: 'number',
            elementConfig: {
                type: 'number',
                placeholder: ''
            },
            value: 0,
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        cat2name: {
            active: true,
            label: 'Category 2 Name',
            elementType: 'text',
            elementConfig: {
                type: 'text',
                placeholder: ''
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        cat2val: {
            active: true,
            label: 'Category 2 Value',
            elementType: 'number',
            elementConfig: {
                type: 'number',
                placeholder: ''
            },
            value: 0,
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        cat3name: {
            active: true,
            label: 'Category 3 Name',
            elementType: 'text',
            elementConfig: {
                type: 'text',
                placeholder: ''
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        cat3val: {
            active: true,
            label: 'Category 3 Value',
            elementType: 'number',
            elementConfig: {
                type: 'number',
                placeholder: ''
            },
            value: 0,
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    }
}