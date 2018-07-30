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

export function clearData(){
  return  {
    type: "CLEAR_DATA",
  }
}

export function getUploadedFile(json){
  return {
    type: "GET_UPLOAD_AUDIO",
    payload: {
      json,
    }
  }
}

export function onDrop(files, currentUserId){
  return (dispatch) => {
    for (let i=0; i < files.length; i++){
      let data = ""
      Adapter.postToAws(files[i], currentUserId)
      .then(json => 
        data = json
      )
      .then( json => Adapter.googleVision(json, currentUserId))
      .then(json => Adapter.postFiles(json, currentUserId, files[i]))
      .then( () => Adapter.getFiles()
        .then( json => dispatch(getUploadedFile(json)))
      )
    }
  }
}

export function persistUser(userId){
  return {
    type: "PERSIST_USER",
    currentUserId: userId
  }
}
