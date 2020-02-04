import { ADD_IDEA, EDIT_IDEA, REMOVE_IDEA, FILTER_IDEA, addIdea, editIdea, removeIdea, filterIdea } from './action';

const initialState = {
  ideas: [],
  filterIdea: []
}

const ideas = (state = initialState, action) => {
  switch(action.type) {
    case ADD_IDEA:
      return addIdea(state, action.payload);
    case EDIT_IDEA:
      return editIdea(state, action.payload);
    case REMOVE_IDEA:
      return removeIdea(state, action.payload);
    case FILTER_IDEA:
      return filterIdea(state, action.payload);
    default:
      return state;
  }
}

export default ideas;