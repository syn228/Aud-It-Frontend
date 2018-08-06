const defaultState = {
  loginUsername: "",
  loginPassword: "",
  registerUsername: "",
  registerPassword: "",
  first_name: "",
  last_name: "",
  files: [],
  currentUserId: "",
  currentUserName: "",
  loading: false,
  latestUpload: [],
}

function reducer(state=defaultState, action){
  switch(action.type){
    case "CLEAR_DATA":
      return {...state, latestUpload: []}
    case "GET_UPLOAD_AUDIO":
      return {...state, latestUpload: 
        [...state.latestUpload, action.payload.json[action.payload.json.length-1]]
    }
    case "FILE_CONVERSION":
      return {...state, loadingMessage: action.loadingMessage}
    case "PERSIST_USER":
      return {...state, currentUserId: action.payload.currentUserId, currentUserName: action.payload.currentUserName}
    case "LOG_IN_CHANGE":
    if (action.event.target.id === "username"){
      return { ...state, loginUsername: action.event.target.value}
    }
    else {
      return { ...state, loginPassword: action.event.target.value}
    }
    case "REGISTER_CHANGE":
        switch (action.event.target.id){
          case "username":
            return { ...state, registerUsername: action.event.target.value}
          break;
          case "password":
            return { ...state, registerPassword: action.event.target.value}
          break;
          case "first_name":
            return { ...state, first_name: action.event.target.value}
          break;
          case "last_name":
            return { ...state, last_name: action.event.target.value}
          break;
        }
    
  default:
    return state
  }
}

export default reducer