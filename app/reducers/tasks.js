function postTasks(state = [], action) {
  switch(action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        {
          task: action.task,
          author: action.author
        }
      ]
    default:
      return state;
  }
}

function tasks(state = [], action) {
  if(typeof(action.postId) !== 'undefined') {
    return {
      ...state,
      [action.postId]: postTasks(state[action.postId], action)
    }
  }
  return state;
}

export default tasks;
