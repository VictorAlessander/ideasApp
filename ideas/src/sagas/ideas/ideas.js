import { put, takeEvery, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { BASE_URL, IDEAS_URL } from '../../constants/api';

function* fetchIdeas () {
    const response = yield call(fetchIdeasApi)
    yield put({ type: "RETRIEVED_IDEAS", data: response });
};

function fetchIdeasApi () {
    return axios.get(BASE_URL + IDEAS_URL).then(res => res.data);
}

export function* watchFetchIdeas () {
    yield takeEvery('FETCH_IDEAS', fetchIdeas);
};

// function* createIdea (payload) {
//     yield put({ type: "ADD_IDEA", payload: payload });
// }

// export function* watchCreateIdea () {
//     yield takeEvery('ADD_IDEA', createIdea);
// }