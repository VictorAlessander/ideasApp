import {
    watchFetchIdeas,
    watchCreateIdea,
    watchDeleteIdea,
    watchModifyIdea
} from './ideas/ideas';
import { all } from 'redux-saga/effects';


export default function* rootSaga() {
    yield all([
        watchFetchIdeas(),
        watchCreateIdea(),
        watchDeleteIdea(),
        watchModifyIdea()
    ]);
};