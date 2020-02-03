export const ADD_IDEA = 'ADD_IDEA';
export const EDIT_IDEA = 'EDIT_IDEA';
export const REMOVE_IDEA = 'REMOVE_IDEA';

export const addIdea = (state, payload) => {
  const idea = {...payload};

  return {
    ideas: [...state.ideas.concat(idea)]
  }
}

export const editIdea = (state, payload) => {
  const ideaIndex = state.ideas.findIndex(idea => idea.id === payload.id);

  debugger;

  return {
    ...state,
    ...state.ideas[ideaIndex] = payload
  };
}

export const removeIdea = (state, payload) => {
  const ideaIndex = state.findIndex(idea => idea.id === payload);

  return {
    ...state.ideas.splice(ideaIndex)
  };
}