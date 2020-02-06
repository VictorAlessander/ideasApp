import {
    watchFetchIdeas,
    // watchCreateIdea
} from './ideas/ideas';
import { all } from 'redux-saga/effects';


export default function* rootSaga() {
    yield all([
        watchFetchIdeas(),
        // watchCreateIdea()
    ]);
};