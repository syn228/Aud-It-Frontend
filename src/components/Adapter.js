const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY

class Adapter {
    static isLoggedIn() {
        return !!localStorage.getItem('token')
    }

    static logout() {
        localStorage.removeItem('token');
    }

    static textDetectionRequest(imageURL) {
        let body = {
            "requests":[
              {
                "features":[
                    {
                    "type": "TEXT_DETECTION",
                    "maxResults": 1
                    }
                ],
                "image":{
                  "source":{"imageUri": imageURL}
                }
              }
            ]
          }
      
        return {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            },
            // mode: "cors",
            body: JSON.stringify(body)
        }
    }

    static googleVision(data, currentUserId) {
        const URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`

        let config = this.textDetectionRequest(data.path)

        return fetch(URL, config)
        .then(r => r.json(r))
    }

    static postFiles(json, currentUserId, data) {
        let convertedText
        if (json.responses[0].fullTextAnnotation !== undefined){
         convertedText = json.responses[0].fullTextAnnotation.text
        }
        else {
            convertedText = ""
        }
        let body = {
            name: data.name,
            size: data.size,
            user_id: currentUserId,
            text: convertedText,
        }
        return fetch('http://localhost:4000/convertedfiles/', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "Data-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }

    static postToAws(file, currentUserId) {
        let formData = new FormData()

        formData.append("name", file.name)
        formData.append("attachment", file)

        return fetch("http://localhost:4000/uploads/", {
        method: 'POST',
        body: formData
        })
        .then(r => r.json())
    }

    static postSession(username, password, persistUser, history) {
        const body = {
            username,
            password,
        }
        fetch(`http://localhost:4000/sessions/`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(json => {
            if (json.username) {
            localStorage.setItem('token', json.token);
            persistUser(json.id)
            history.push("/home")
            }   
            else alert("Your username or password is wrong. Please try again.")
      })
    }

    static getFiles(){
        return fetch(`http://localhost:4000/convertedfiles/`)
        .then(r=>r.json())
    }
}


export default Adapter;