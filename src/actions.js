import Adapter from './components/Adapter'
import {Tesseract} from "tesseract.ts";

export function logInChange(event){
    return  {
      type: "LOG_IN_CHANGE",
      event: event
    }
}

export function registerChange(event){
  return  {
    type: "REGISTER_CHANGE",
    event: event
  }
}

export function onDrop(files, currentUserId){
  return (dispatch) => {
    for (let i=0; i < files.length; i++){
      let textObject
      Adapter.postToAws(files[i], currentUserId)
    }
  }
}

export function persistUser(userId){
  return {
    type: "PERSIST_USER",
    currentUserId: userId
  }
}
