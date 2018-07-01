import axios from 'axios';
import store from './../reducers';

export function loginUser(request) {

    return axios.post("some-url", {
        some_field: request.username,
    }).then(response => {

        return {
            type: 'SOME_ACTION',
            payload: response
        }

    }).catch(err => {

        console.log(err);

    });

}