// dataReducer.js
import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, LOGIN_SUCCESS, UNIVERSAL_ERROR, PROFILE_SUCCESS, GET_LIST_ITINERARY_SUCCESS, GET_ACTIVITIES_SUCCESS, ADD_POST_ITINERARY_SUCCESS, GET_PUBLIC_POST_SUCCESS, SUCCESS_FETCH_ADDED_POST, SET_LOADING, SUCCESS_ADD_POST_BY_BOT, ADD_LOCATION_SUCCESS, USER_ID_SUCCESS } from '../actionType';

const initialState = {
    loading: false,
    data: [],
    profile: {},
    error: null,
    access_token: "",
    itineraryList: [],
    activitiesDetails: [],
    addedTripId: "",
    publicPost: [],
    userId: 0,
    dataAddedPost: {}
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_ID_SUCCESS:
            return {
                ...state,
                userId: action.payload
            }
        case SUCCESS_ADD_POST_BY_BOT:
            return {
                ...state,
                loading: false,
            }
        case SUCCESS_FETCH_ADDED_POST:
            return {
                ...state,
                dataAddedPost: action.payload
            }
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case GET_PUBLIC_POST_SUCCESS:
            return {
                ...state,
                publicPost: action.payload,
                loading: false,
            }

        case GET_ACTIVITIES_SUCCESS:
            return {
                ...state,
                activitiesDetails: action.payload,
                loading: false,

            }
        case PROFILE_SUCCESS:
            return { ...state, profile: action.payload }
        case UNIVERSAL_ERROR:
            console.log("found error bang", action.payload)
            throw { ...state, error: action.payload }
        case LOGIN_SUCCESS:
            return {
                ...state,
                access_token: action.payload.access_token,
                userId: action.payload.userId,
            }
        case FETCH_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: null,
            };
        case FETCH_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                data: [],
                error: action.payload,
            };
        case GET_LIST_ITINERARY_SUCCESS:
            return {
                ...state,
                itineraryList: action.payload,
                loading: false,

            }
        case ADD_POST_ITINERARY_SUCCESS:
            return {
                ...state,
                addedTripId: action.payload,
                loading: false,

            }

        default:
            return state;
    }
};

export default dataReducer
