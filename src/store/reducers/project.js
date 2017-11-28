import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    name: '',
    max100: [
        {
            id: '8cb56250-cf20-11e7-a292-ef2ce8490bd8',
            trap: true,
            grandkids: false,
            title: 'Human Health Concern',
            max100: {
                score: ''
            },
            expanded: false,
            children: [
                {
                    id: '90e26a30-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Carcinogenicity',
                    direction: 'higher',
                    trapped: true,
                    max100: {
                        score: ''
                    }
                },
                {
                    id: '95588900-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Neurotoxicity (oral)',
                    direction: 'higher',
                    trapped: true,
                    max100: {
                        score: ''
                    }
                },
                {
                    id: '95588910-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Reproductive/Developmental Toxicity (oral)',
                    direction: 'higher',
                    trapped: true,
                    max100: {
                        score: ''
                    }
                },
                {
                    id: '9558232117-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Respiratory Allergen/Asthmogen',
                    direction: 'lower',
                    trapped: true,
                    max100: {
                        score: ''
                    }
                }
            ]
        },
        {
            id: '8e0a6b00-cf20-11e7-a292-ef2ce8490bd8',
            trap: true,
            grandkids: false,
            title: 'Ecological Concern',
            max100: {
                score: ''
            },
            expanded: false,
            children: [
                {
                    id: '99f91330-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'PBTaq combos',
                    direction: 'lower',
                    trapped: true,
                    max100: {
                        score: ''
                    }
                },
                {
                    id: '9d4f4310-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'VOCs (emissions during application)',
                    direction: 'lower',
                    trapped: true,
                    max100: {
                        score: ''
                    }
                }
            ]
        },
        {
            id: '8e3153f0-cf20-11e7-a292-ef2ce8490bd8',
            trap: true,
            grandkids: false,
            title: 'Technical Performance',
            max100: {
                score: ''
            },
            expanded: false,
            children: [
                {
                    id: 'a86f9ec0-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Longevity (time between needed applications)',
                    direction: 'higher',
                    trapped: true,
                    max100: {
                        score: ''
                    }
                },
                {
                    id: 'aa8f4a70-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Efficacy (performance in anti-fouling test)',
                    direction: 'higher',
                    trapped: true,
                    max100: {
                        score: ''
                    }
                }
            ]
        },
        {
            id: '8e527080-cf20-11e7-a292-ef2ce8490bd8',
            trap: true,
            grandkids: false,
            title: 'Cost',
            max100: {
                score: ''
            },
            expanded: false,
            children: [
                {
                    id: 'b17e5880-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Cumulative 5 year cost',
                    direction: 'lower',
                    trapped: true,
                    max100: {
                        score: ''
                    }
                }
            ]
        }
    ],
    swing: [
        {
            id: '8cb56250-cf20-11e7-a292-ef2ce8490bd8',
            trap: true,
            grandkids: false,
            title: 'Human Health Concern',
            swing: {
                min: '25',
                max: '100',
                score: ''
            },
            expanded: false,
            children: [
                {
                    id: '90e26a30-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Carcinogenicity',
                    direction: 'higher',
                    trapped: true,
                    swing: {
                        min: '10',
                        max: '50',
                        score: ''
                    },
                },
                {
                    id: '95588900-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Neurotoxicity',
                    direction: 'higher',
                    trapped: true,
                    swing: {
                        min: '10',
                        max: '15',
                        score: ''
                    },
                },
                {
                    id: '95588910-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Reproductive/Developmental Toxicity (oral)',
                    direction: 'higher',
                    trapped: true,
                    swing: {
                        min: '10',
                        max: '20',
                        score: ''
                    },
                },
                {
                    id: '93338910-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Respiratory Allergen/Asthmogen',
                    direction: 'lower',
                    trapped: true,
                    swing: {
                        min: '10',
                        max: '20',
                        score: ''
                    },
                }
            ]
        },
        {
            id: '8e0a6b00-cf20-11e7-a292-ef2ce8490bd8',
            trap: true,
            grandkids: false,
            title: 'Ecological Concern',
            swing: {
                min: '10',
                max: '60',
                score: ''
            },
            expanded: false,
            children: [
                {
                    id: '99f91330-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'PBTaq',
                    direction: 'lower',
                    trapped: true,
                    swing: {
                        min: '20',
                        max: '100',
                        score: ''
                    },
                },
                {
                    id: '9d4f4310-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'VOCs (emissions during application)',
                    direction: 'lower',
                    trapped: true,
                    swing: {
                        min: '5',
                        max: '20',
                        score: ''
                    },
                }
            ]
        },
        {
            id: '8e3153f0-cf20-11e7-a292-ef2ce8490bd8',
            trap: true,
            grandkids: false,
            title: 'Technical Performance',
            swing: {
                min: '5',
                max: '15',
                score: ''
            },
            expanded: false,
            children: [
                {
                    id: 'a86f9ec0-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Longevity (time between needed applications)',
                    direction: 'higher',
                    trapped: true,
                    swing: {
                        min: '10',
                        max: '50',
                        score: ''
                    },
                },
                {
                    id: 'aa8f4a70-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Efficacy (performance in anti-fouling test)',
                    direction: 'higher',
                    trapped: true,
                    swing: {
                        min: '10',
                        max: '20',
                        score: ''
                    },
                }
            ]
        },
        {
            id: '8e527080-cf20-11e7-a292-ef2ce8490bd8',
            trap: true,
            grandkids: false,
            title: 'Cost',
            swing: {
                min: '5',
                max: '10',
                score: ''
            },
            expanded: false,
            children: [
                {
                    id: 'b17e5880-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Cumulative 5 Year Cost (labor and materials)',
                    direction: 'lower',
                    trapped: true,
                    swing: {
                        min: '10',
                        max: '20',
                        score: ''
                    },
                }
            ]
        }
    ],
    smarter: [
        {
            id: '8cb56250-cf20-11e7-a292-ef2ce8490bd8',
            trap: true,
            grandkids: false,
            title: 'Human Health Concern',
            smarter: {
                min: '10',
                max: '25'
            },
            expanded: false,
            children: [
                {
                    id: '90e26a30-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Carcinogenicity',
                    direction: 'higher',
                    trapped: true,
                    smarter: {
                        min: '15',
                        max: '20'
                    },
                },
                {
                    id: '95588900-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Neurotoxicity (oral)',
                    direction: 'higher',
                    trapped: true,
                    smarter: {
                        min: '25',
                        max: '60'
                    },
                },
                {
                    id: '95588910-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Reproductive/Developmental Toxicity (oral)',
                    direction: 'higher',
                    trapped: true,
                    smarter: {
                        min: '41',
                        max: '67'
                    },
                },
                {
                    id: '95588910-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Respiratory Allergen/Asthmogen',
                    direction: 'lower',
                    trapped: true,
                    smarter: {
                        min: '50',
                        max: '5'
                    },
                }
            ]
        },
        {
            id: '8e0a6b00-cf20-11e7-a292-ef2ce8490bd8',
            trap: true,
            grandkids: false,
            title: 'Ecological Concern',
            smarter: {
                min: '32',
                max: '23'
            },
            expanded: false,
            children: [
                {
                    id: '99f91330-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'PBTaq',
                    direction: 'lower',
                    trapped: true,
                    smarter: {
                        min: '40',
                        max: '4'
                    },
                },
                {
                    id: '9d4f4310-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'VOCs (emissions during application)',
                    direction: 'lower',
                    trapped: true,
                    smarter: {
                        min: '50',
                        max: '5'
                    },
                }
            ]
        },
        {
            id: '8e3153f0-cf20-11e7-a292-ef2ce8490bd8',
            trap: true,
            grandkids: false,
            title: 'Technical Performance',
            smarter: {
                min: '5',
                max: '50'
            },
            expanded: false,
            children: [
                {
                    id: 'a86f9ec0-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Longevity (time between needed applications)',
                    direction: 'higher',
                    trapped: true,
                    smarter: {
                        min: '10',
                        max: '40'
                    },
                },
                {
                    id: 'aa8f4a70-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Efficacy (performance in anti-fouling test)',
                    direction: 'higher',
                    trapped: true,
                    smarter: {
                        min: '22',
                        max: '33'
                    },
                }
            ]
        },
        {
            id: '8e527080-cf20-11e7-a292-ef2ce8490bd8',
            trap: true,
            grandkids: false,
            title: 'Cost',
            smarter: {
                min: '43',
                max: '23'
            },
            expanded: false,
            children: [
                {
                    id: 'b17e5880-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Cumulative 5 Year Cost (labour and materials)',
                    direction: 'lower',
                    trapped: true,
                    smarter: {
                        min: '12',
                        max: '32'
                    },
                }
            ]
        }
    ]
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.UPDATE_TREE:
            // const mergedObj = {...action.treeData, ...action.editNode}
            return updateObject(state, action);
        case actionTypes.UPDATE_NAME:
            return updateObject(state, action);
        default: return state
    }
};

export default reducer;