import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';
import { BASE_URL, IDEAS_URL } from '../../constants/api';

function* fetchIdeas () {
    const response = yield call(fetchIdeasApi)
    yield put({ type: "RETRIEVED_IDEAS", data: response });
};

function fetchIdeasApi () {
    return axios.get(BASE_URL + IDEAS_URL).then(res => res.data);
};

export function* watchFetchIdeas () {
    yield takeEvery('FETCH_IDEAS', fetchIdeas);
};

function createIdeaApi (payload) {
    return axios.post(BASE_URL + IDEAS_URL, payload).then(res => res.data);
};

function* createIdea (payload) {
    const response = yield call(createIdeaApi, payload.idea);
    yield put({ type: "ADD_IDEA", payload: response });
};

export function* watchCreateIdea () {
    yield takeEvery('CREATE_IDEA', createIdea);
};

function deleteIdeaApi (payload) {
    return axios.delete(`${BASE_URL}${IDEAS_URL}/${payload}`).then(res => res.status === 204);
};

function* deleteIdea (payload) {
    yield call(deleteIdeaApi, payload.id);
    yield put({ type: "REMOVE_IDEA", payload: payload.id });
};

export function* watchDeleteIdea () {
    yield takeEvery('DELETE_IDEA', deleteIdea);
};

function modifyIdeaApi (payload) {
    return axios.put(`${BASE_URL}${IDEAS_URL}/${payload.id}`, payload).then(res => res.data);
};

function* modifyIdea (payload) {
    const response = yield call(modifyIdeaApi, payload.idea);
    yield put({ type: "EDIT_IDEA", payload: response });
};

export function* watchModifyIdea () {
    yield takeEvery("MODIFY_IDEA", modifyIdea);
};