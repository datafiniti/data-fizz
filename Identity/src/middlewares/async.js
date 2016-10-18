export default function({ dispatch }) {
  return next => action => {
    if (!action.payload || !action.payload.then) {
      // if the action does not have a payload
      // or the payload does not have a .then helper property (is not a promise)
      // don't care about this action; return next
      return next(action);
    }
    action.payload
      .then(response => {
        // create new action with previously existing action type
        // and action payload of response
        // run new action starting at the top of the middleware stack
        const newAction = { ...action, payload: response };
        dispatch(newAction);
      });
  }
}
