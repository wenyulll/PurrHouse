import { csrfFetch } from "./csrf";

/***** REVIEW ACTIONS *****/

export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
export const CREATE_REVIEW = 'review/CREATE_REVIEW';
export const DELETE_REVIEW = 'review/DELETE_REVIEW';


export const loadReviewsAction = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
})

export const createReviewAction = (review) => ({
    type: CREATE_REVIEW,
    review
});

export const deleteReviewAction = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
})

export const fetchReviewsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadReviewsAction(reviews.Reviews));
    };
};

