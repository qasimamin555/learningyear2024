import {
    SET_ALL_CONTACTS,
    SET_BOOKING_REQUEST_DATA,
    SET_CARE_TAKERS,
    SET_CHILDRENS,
    SET_RE_CALLING_STATUS,
    SET_SERVICES,
    SET_USER_INFO,
} from "../const/index";

export const reducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case SET_USER_INFO:
            return {...state, userData: payload};

        case SET_CARE_TAKERS:
            return {...state, careTakers: payload}

        case SET_CHILDRENS:
            return {...state, childrenData: payload}

        case SET_SERVICES:
            return {...state, services: payload}

        case SET_BOOKING_REQUEST_DATA:
            return {...state, bookingRequestsData: payload}

        case SET_RE_CALLING_STATUS:
            return {...state, reCallStatus: payload}

        default:
            return state;
    }
};
