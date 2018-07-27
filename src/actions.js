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

export function successfulUpload(bool, file, textObject){
  return {
    type: "SUCCESSFUL_UPLOAD",
    loading: bool,
    file: file,
    textObject, textObject
  }
}

export function initiateLoading(bool, currentFileNumber, totalFiles, message){
  return {
    type: "INITIATE_LOADING",
    loading: bool,
    fileNumber: currentFileNumber,
    totalFiles: totalFiles,
    loadingMessage: message.status,
    loadingProgress: message.progress,
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

export function conversion(loadingMessage){
  return {
    type: "FILE_CONVERSION",
    loadingMessage:loadingMessage
  }
}