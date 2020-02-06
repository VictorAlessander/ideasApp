import moment from 'moment';

export const ADD_IDEA = 'ADD_IDEA';
export const EDIT_IDEA = 'EDIT_IDEA';
export const REMOVE_IDEA = 'REMOVE_IDEA';
export const FILTER_IDEA = 'FILTER_IDEA';
export const RETRIEVED_IDEAS = 'RETRIEVED_IDEAS';
export const fetchIdeas = () => ({ type: 'FETCH_IDEAS' });
export const createIdea = () => ({ type: 'CREATE_IDEA' });

export const addIdea = (state, payload) => {
  const idea = { ...payload };

  return {
    ...state,
    ideas: [...state.ideas.concat(idea)]
  }
};

export const editIdea = (state, payload) => {
  const ideaIndex = state.ideas.findIndex(idea => idea.id === payload.id);

  payload.conclusionDate = (payload.situation === "3" || payload.situation === "4") ? moment().format('MMMM Do YYYY, h:mm:ss a') : '';

  return {
    ...state,
    ...state.ideas[ideaIndex] = payload
  };
};

export const removeIdea = (state, payload) => {
  return {
    ...state,
    ideas: [...state.ideas.filter(idea => idea.id !== payload)]
  };
};

export const filterIdea = (state, payload) => {
  return {
    ...state,
    filteredIdea: [...state.ideas.filter(idea => idea.title.startsWith(payload))]
  };
};