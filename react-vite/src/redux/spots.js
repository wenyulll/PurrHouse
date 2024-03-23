import { csrfFetch } from "./csrf";


// action type 
export const LOAD_SPOTS = 'spots/LOAD_SPOTS' //1. get all spots   
export const LOAD_SPOT = 'spots/LOAD_SPOT' //2. get one spot by spotId 
export const LOAD_CURRENT_SPOTS = 'spots/LOAD_CURRENT_SPOTS' //3. get current user spots
export const CREATE_SPOT = 'spot/CREATE_SPOT';//4. add a new spot
// const UPDATE_SPOT = 'spots/UPDATE_SPOT' //5. update spot
export const DELETE_SPOT = 'spots/DELETE_SPOT' //6. delete spot

//action creators
//1.get all spots
export const loadSpotsAction = (spots) => ({
    type: LOAD_SPOTS,
    spots
})
//2.get one spot by spotId
export const loadSpotAction = (spot) => ({
    type: LOAD_SPOT,
    spot
})
//3.get current user spots
export const loadCurrentSpotsAction = (spots) => ({
    type: LOAD_CURRENT_SPOTS,
    spots
})
//4. add a new spot
export const createSpotAction = (spot) => ({
    type: CREATE_SPOT,
    spot
})

//6. delete spot
export const deleteSpotAction = (spotId) => ({
    type: DELETE_SPOT,
    spotId
})

