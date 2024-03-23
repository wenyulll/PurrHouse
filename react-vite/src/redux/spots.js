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

export const fetchSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const spots = await response.json();

        dispatch(loadSpotsAction(spots.Spots));
    };
};

//thunk 2.get one spot by spotId
export const fetchSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const spot = await response.json();

        dispatch(loadSpotAction(spot));
    };
};

export const fetchCurrentSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current');

    if (response.ok) {
        const spots = await response.json();

        dispatch(loadCurrentSpotsAction(spots.Spots));
    };
}

//thunk 4. add a new spot
export const createSpotThunk = (createSpot) => async (dispatch) => {

    try {
        const {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            previewImage,
            otherImages
        } = createSpot;

        const createImage = {
            url: previewImage,
            preview: true
        };

        const imagesArr = []
        otherImages.forEach(image => {
            if (image.url.length) imagesArr.push(image.url)
        })

        const response = await csrfFetch('/api/spots', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                address,
                city,
                state,
                country,
                lat,
                lng,
                name,
                description,
                price
            })
        });

        if (response.ok) {

            const spot = await response.json();

            const imageResponse = await csrfFetch(`/api/spots/${spot.id}/images`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(createImage)
            })

            for (let i = 0; i < imagesArr.length; i++) {
                let imageUrl = imagesArr[i]
                await csrfFetch(`/api/spots/${spot.id}/images`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url: imageUrl, preview: false })
                })
            }
            if (imageResponse.ok) {
                dispatch(createSpotAction(spot))
                return spot
            }
        }

    } catch (e) {
        const errors = await e.json();
        return errors
    };
};