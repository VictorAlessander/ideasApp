import {
    watchFetchIdeas
} from './ideas/ideas';
import { all } from 'redux-saga';


export default function* rootSaga() {
    yield all([
        watchFetchIdeas()
    ]);
};