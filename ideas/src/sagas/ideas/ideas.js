import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import { BASE_URL, IDEAS_URL } from '../../constants/api';
import moment from 'moment';

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

function createIdeaApi(payload) {
    return axios.post(BASE_URL + IDEAS_URL, payload).then(res => res.data);
}

function* createIdea (payload) {
    const response = yield call(createIdeaApi, payload.idea);
    yield put({ type: "ADD_IDEA", payload: payload.idea });
}

export function* watchCreateIdea () {
    yield takeEvery('CREATE_IDEA', createIdea);
}   