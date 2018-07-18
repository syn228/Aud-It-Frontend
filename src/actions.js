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

export function persistUser(userObj){
  return {
    type: "PERSIST_USER",
    currentUser: userObj
  }
}