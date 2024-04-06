import { csrfFetch } from "./csrf";

// Action types
export const LOAD_BOOKINGS = 'bookings/LOAD_BOOKINGS';
export const LOAD_CURRENT_BOOKINGS = 'bookings/LOAD_CURRENT_BOOKINGS';
export const CREATE_BOOKING = 'booking/CREATE_BOOKING';
// Action creators
export const loadBookingsAction = (bookings) => ({
    type: LOAD_BOOKINGS,
    bookings
});

export const loadCurrentBookingsAction = (bookings) => ({
    type: LOAD_CURRENT_BOOKINGS,
    bookings
});

export const createBookingAction = (booking) => ({
    type: CREATE_BOOKING,
    booking
});

// Uncommented and prepared for potential future use
export const updateBookingAction = (booking) => ({
    type: UPDATE_BOOKING,
    booking
});

export const deleteBookingAction = (bookingId) => ({
    type: DELETE_BOOKING,
    bookingId
});

// Thunks
export const fetchBookingsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
    if (response.ok) {
        const bookings = await response.json();
        dispatch(loadBookingsAction(bookings));
        return bookings;
    }
};

// Initial state
const initialState = { allBookings: {}, userBookings: {} };

// Reducer
const bookingsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case LOAD_BOOKINGS:
            newState.allBookings = { ...state.allBookings, ...action.bookings };
            return newState;
        case LOAD_CURRENT_BOOKINGS:
            newState.userBookings = { ...state.userBookings, ...action.bookings };
            return newState;
        case CREATE_BOOKING:
            newState.allBookings[action.booking.id] = action.booking;
            if (action.booking.userId === newState.user.id) {
                newState.userBookings[action.booking.id] = action.booking;
            }
            return newState;
        case UPDATE_BOOKING:
            newState.allBookings[action.booking.id] = action.booking;
            if (action.booking.userId === newState.user.id) {
                newState.userBookings[action.booking.id] = action.booking;
            }
            return newState;
        case DELETE_BOOKING:
            delete newState.allBookings[action.bookingId];
            delete newState.userBookings[action.bookingId];
            return newState;
        default:
            return state;
    }
};

export default bookingsReducer;
