import Adapter from "./components/Adapter"

const defaultState = {
  loginUsername: "",
  loginPassword: "",
  registerUsername: "",
  registerPassword: "",
  first_name: "",
  last_name: "",
  files: [],
  currentUserId: "",
}

function reducer(state=defaultState, action){
  switch(action.type){
    case "PERSIST_USER":
      return {...state, currentUserId: action.currentUserId}
    case "FILE_UPLOAD":
      Adapter.postFiles(action.files, state.currentUserId)
      return { ...state, files: [...state.files, ...action.files]}
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