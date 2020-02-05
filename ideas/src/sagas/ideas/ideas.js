import { put, takeEvery } from 'redux-saga';


function* fetchIdeas() {
    yield put({ type: "FETCH_IDEAS" });
};

export function* watchFetchIdeas() {
    yield takeEvery('FETCH_IDEAS', fetchIdeas);
};