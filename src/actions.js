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

export function onDrop(files){
  return  {
    type: "FILE_UPLOAD",
    files: files
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