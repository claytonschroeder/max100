import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    max100: [
        {
            id: '8cb56250-cf20-11e7-a292-ef2ce8490bd8',
            trap: true,
            grandkids: false,
            title: 'Objective 1',
            max100: {
                score: ''
            },
            expanded: true,
            children: [
                {
                    id: '90e26a30-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 1.1',
                    trapped: true,
                    max100: {
                        score: ''
                    }
                },
                {
                    id: '95588900-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 1.2',
                    trapped: true,
                    max100: {
                        score: ''
                    }
                },
                {
                    id: '95588910-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 1.3',
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
            title: 'Objective 2',
            max100: {
                score: ''
            },
            expanded: true,
            children: [
                {
                    id: '99f91330-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 2.1',
                    trapped: true,
                    max100: {
                        score: ''
                    }
                },
                {
                    id: '9d4f4310-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 2.2',
                    trapped: true,
                    max100: {
                        score: ''
                    }
                },
                {
                    id: 'a05afc70-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 2.3',
                    trapped: true,
                    max100: {
                        score: ''
                    }
                },
                {
                    id: 'a31b2de0-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 2.4',
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
            title: 'Objective 3',
            max100: {
                score: ''
            },
            expanded: true,
            children: [
                {
                    id: 'a86f9ec0-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 3.1',
                    trapped: true,
                    max100: {
                        score: ''
                    }
                },
                {
                    id: 'aa8f4a70-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 3.2',
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
            title: 'Objective 4',
            max100: {
                score: ''
            },
            expanded: true,
            children: [
                {
                    id: 'b17e5880-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 4.1',
                    trapped: true,
                    max100: {
                        score: ''
                    }
                },
                {
                    id: 'b4961fd0-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 4.2',
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
            title: 'Objective 1',
            swing: {
                min: 25,
                max: 100,
                score: ''
            },
            expanded: true,
            children: [
                {
                    id: '90e26a30-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 1.1',
                    trapped: true,
                    swing: {
                        min: 10,
                        max: 50,
                        score: ''
                    },
                },
                {
                    id: '95588900-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 1.2',
                    trapped: true,
                    swing: {
                        min: 10,
                        max: 15,
                        score: ''
                    },
                },
                {
                    id: '95588910-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 1.3',
                    trapped: true,
                    swing: {
                        min: 10,
                        max: 20,
                        score: ''
                    },
                }
            ]
        },
        {
            id: '8e0a6b00-cf20-11e7-a292-ef2ce8490bd8',
            trap: true,
            grandkids: false,
            title: 'Objective 2',
            swing: {
                min: 10,
                max: 60,
                score: ''
            },
            expanded: true,
            children: [
                {
                    id: '99f91330-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 2.1',
                    trapped: true,
                    swing: {
                        min: 20,
                        max: 100,
                        score: ''
                    },
                },
                {
                    id: '9d4f4310-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 2.2',
                    trapped: true,
                    swing: {
                        min: 5,
                        max: 20,
                        score: ''
                    },
                },
                {
                    id: 'a05afc70-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 2.3',
                    trapped: true,
                    swing: {
                        min: 5,
                        max: 50,
                        score: ''
                    },
                },
                {
                    id: 'a31b2de0-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 2.4',
                    trapped: true,
                    swing: {
                        min: 10,
                        max: 30,
                        score: ''
                    },
                }
            ]
        },
        {
            id: '8e3153f0-cf20-11e7-a292-ef2ce8490bd8',
            trap: true,
            grandkids: false,
            title: 'Objective 3',
            swing: {
                min: 5,
                max: 15,
                score: ''
            },
            expanded: true,
            children: [
                {
                    id: 'a86f9ec0-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 3.1',
                    trapped: true,
                    swing: {
                        min: 10,
                        max: 50,
                        score: ''
                    },
                },
                {
                    id: 'aa8f4a70-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 3.2',
                    trapped: true,
                    swing: {
                        min: 10,
                        max: 20,
                        score: ''
                    },
                }
            ]
        },
        {
            id: '8e527080-cf20-11e7-a292-ef2ce8490bd8',
            trap: true,
            grandkids: false,
            title: 'Objective 4',
            swing: {
                min: 5,
                max: 10,
                score: ''
            },
            expanded: true,
            children: [
                {
                    id: 'b17e5880-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 4.1',
                    trapped: true,
                    swing: {
                        min: 10,
                        max: 20,
                        score: ''
                    },
                },
                {
                    id: 'b4961fd0-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 4.2',
                    trapped: true,
                    swing: {
                        min: 5,
                        max: 50,
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
            title: 'Objective 1',
            smarter: {
                min: '',
                max: ''
            },
            expanded: true,
            children: [
                {
                    id: '90e26a30-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 1.1',
                    trapped: true,
                    smarter: {
                        min: '',
                        max: ''
                    },
                },
                {
                    id: '95588900-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 1.2',
                    trapped: true,
                    smarter: {
                        min: '',
                        max: ''
                    },
                },
                {
                    id: '95588910-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 1.3',
                    trapped: true,
                    smarter: {
                        min: '',
                        max: ''
                    },
                }
            ]
        },
        {
            id: '8e0a6b00-cf20-11e7-a292-ef2ce8490bd8',
            trap: true,
            grandkids: false,
            title: 'Objective 2',
            smarter: {
                min: '',
                max: ''
            },
            expanded: true,
            children: [
                {
                    id: '99f91330-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 2.1',
                    trapped: true,
                    smarter: {
                        min: '',
                        max: ''
                    },
                },
                {
                    id: '9d4f4310-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 2.2',
                    trapped: true,
                    smarter: {
                        min: '',
                        max: ''
                    },
                },
                {
                    id: 'a05afc70-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 2.3',
                    trapped: true,
                    smarter: {
                        min: '',
                        max: ''
                    },
                },
                {
                    id: 'a31b2de0-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 2.4',
                    trapped: true,
                    smarter: {
                        min: '',
                        max: ''
                    },
                }
            ]
        },
        {
            id: '8e3153f0-cf20-11e7-a292-ef2ce8490bd8',
            trap: true,
            grandkids: false,
            title: 'Objective 3',
            smarter: {
                min: '',
                max: ''
            },
            expanded: true,
            children: [
                {
                    id: 'a86f9ec0-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 3.1',
                    trapped: true,
                    smarter: {
                        min: '',
                        max: ''
                    },
                },
                {
                    id: 'aa8f4a70-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 3.2',
                    trapped: true,
                    smarter: {
                        min: '',
                        max: ''
                    },
                }
            ]
        },
        {
            id: '8e527080-cf20-11e7-a292-ef2ce8490bd8',
            trap: true,
            grandkids: false,
            title: 'Objective 4',
            smarter: {
                min: '',
                max: ''
            },
            expanded: true,
            children: [
                {
                    id: 'b17e5880-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 4.1',
                    trapped: true,
                    smarter: {
                        min: '',
                        max: ''
                    },
                },
                {
                    id: 'b4961fd0-cf20-11e7-a292-ef2ce8490bd8',
                    title: 'Objective 4.2',
                    trapped: true,
                    smarter: {
                        min: '',
                        max: ''
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
        default: return state
    }
};

export default reducer;