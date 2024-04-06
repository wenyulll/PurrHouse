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

//2.get current user bookings
export const loadCurrentBookingsAction = (bookings) => ({
    type: LOAD_CURRENT_BOOKINGS,
    bookings
})

//3.create a booking
export const createBookingAction = (booking) => ({
    type: CREATE_BOOKING,
    booking
})
