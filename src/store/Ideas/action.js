import moment from 'moment';

export const ADD_IDEA = 'ADD_IDEA';
export const EDIT_IDEA = 'EDIT_IDEA';
export const REMOVE_IDEA = 'REMOVE_IDEA';

export const addIdea = (state, payload) => {
  const idea = { ...payload };
  idea.id = Math.floor(Math.random() * 1000);
  idea.conclusionDate = (idea.situation === "3" || idea.situation === "4") ? moment().format('MMMM Do YYYY, h:mm:ss a') : '';

  idea.identificationDate = moment().format('MMMM Do YYYY, h:mm:ss a');

  return {
    ideas: [...state.ideas.concat(idea)]
  }
}

export const editIdea = (state, payload) => {
  const ideaIndex = state.ideas.findIndex(idea => idea.id === payload.id);

  payload.conclusionDate = (payload.situation === "3" || payload.situation === "4") ? moment().format('MMMM Do YYYY, h:mm:ss a') : '';

  return {
    ...state,
    ...state.ideas[ideaIndex] = payload
  };
}

export const removeIdea = (state, payload) => {
  return {
    ...state,
    ideas: [...state.ideas.filter(idea => idea.id !== payload)]
  };
}