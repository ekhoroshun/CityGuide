const initialState = {
    something: true
};

export default function(state = initialState, action) {

    switch(action.type) {

        case 'SOME_ACTION':

            return Object.assign({}, state, {
                something: false
            });


        break;

        default:
            return state;
    }

}