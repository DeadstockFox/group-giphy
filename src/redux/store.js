import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

/**
 * redux reducer to contain all user input
 * @param {object} state  object
 * @param {object} action contains type and may contain payload
 * @returns new state object
 */

// Add generator functions here
function* fetchGif(action) {
    try {
        const searchTerm = action.payload;
        console.log(searchTerm);
        const giphyResponse = yield axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${searchTerm}&limit=1&offset=7&rating=g&lang=en&bundle=messaging_non_clips`);
        yield put({ type: 'SET_GIF', payload: giphyResponse.data })
    } catch (error) {
        console.log('getGifs error', error);
    }
}

/**
 * Function to delete favorites
 */
function* deleteFavorite(action) {
    const id = action.payload.id;
    try {
        yield call(axios.delete(`/api/favorites/${id}`))
        yield put({type: 'GET_CATEGORIES'});    
    } catch(error) {
        console.log( "Error in deleteFavorite generator:", error);
    }
}

/**
 * Function to add multiple categories
 */
function* addRelations(action) {
    const payload = action.payload;
    try {
        yield call(axios.post("/api/categories",payload));
        yield put({type: 'GET_CATEGORIES'});
    } catch(error) {
        console.log("Error in addRelations generator:", error);
    }
}

/**
 * Function to delete categories
 */
function* deleteCategory(action) {
    const id = action.payload.id;
    try {
        yield call(axios.delete(`/api/categories/${id}`));
        yield put({type: 'GET_CATEGORIES'});
    } catch(error) {
        console.log("Error in delete category redux:", error);
    }
}

function* getCategories() {
    try {
        const categoryResponse = yield axios.get('/api/categories');
        yield put({
            type: 'SET_CATEGORIES',
            payload: categoryResponse.data
        });
    } catch (error) {
        console.log('get categoreis error:', error);
      }}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Add saga actions here
const gif = (state = [], action) => {
    switch (action.type) {
        case 'SET_GIF':
            return action.payload;
        default:
            return state;
    }
}

// Adding rootSaga to listen for saga actions
function* rootSaga() {
    yield takeEvery('GET_CATEGORIES', getCategories);
    yield takeEvery('FETCH_GIF', fetchGif);
    yield takeEvery ("ADD_CATEGORIES", addRelations);
    yield takeEvery ("DELETE_FAVORITE", deleteFavorite);
    yield takeEvery ("DELETE_CATEGORY", deleteCategory);
};

const categories = (state = [], action) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return action.payload;
        default:
            return state;
    }
}

// Creating a store for all of the components to use
const storeInstance = createStore(
    combineReducers({
        categories,
        gif,
    }),
    // Adding sagaMiddleware to the store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into the sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;

