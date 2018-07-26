import {Tesseract} from "tesseract.ts";

class Adapter {
    static isLoggedIn() {
        return !!localStorage.getItem('token')
    }

    static logout() {
        localStorage.removeItem('token');
    }

    static postToAws(file) {
        let formData = new FormData()

        formData.append("name", file.name)
        formData.append("attachment", file)

        fetch("http://localhost:4000/uploads/", {
        method: 'POST',
        body: formData
        })
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
            history.push("/")
            }   
            else alert("Your username or password is wrong. Please try again.")
      })
    }

    static postFiles(file, currentUserId, textObject) {   
        console.log("Conversion finished!")
            let body = {
                name: file.name,
                user_id: currentUserId,
                extension: file.type,
                size: file.size,
                text: textObject.text,
                confidence: textObject.confidence
            }
            fetch(`http://localhost:4000/convertedfiles/`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    "Data-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            
    }
    static initiateTesseract(file){
        return Tesseract.recognize(file)
            .progress(message => console.log(message))
            .catch(err => console.error(err))
    }

    static getFiles(){
        return fetch(`http://localhost:4000/convertedfiles/`)
        .then(r=>r.json())
    }
}


export default Adapter;