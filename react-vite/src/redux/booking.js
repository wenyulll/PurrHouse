import { csrfFetch } from "./csrf";

// action type 
export const LOAD_BOOKINGS = 'bookings/LOAD_BOOKINGS'
export const LOAD_CURRENT_BOOKINGS = 'bookings/LOAD_BOOKINGS'
export const CREATE_BOOKING = 'booking/CREATE_BOOKING'
// export const UPDATE_BOOKING = 'UPDATE_BOOKING'
export const DELETE_BOOKING = 'booking/UPDATE_BOOKING'

//action creators
// 1.get all bookings
export const loadBookingsAction = (bookings) => ({
    type: LOAD_BOOKINGS,
    bookings
})
