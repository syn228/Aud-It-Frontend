class Adapter {
    static isLoggedIn() {
        return !!localStorage.getItem('token')
    }

    static logout() {
        localStorage.removeItem('token');
    }
    static postSession(username, password, persistUser) {
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
            }   
            else alert("Your username or password is wrong. Please try again.")
      })
    }

    static postFiles(files, currentUserId) {
        for (let i=0; i < files.length; i++){
            let body = {
                name: files[i].name,
                user_id: currentUserId,
                extension: files[i].type,
                size: files[i].size
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
    }
}

export default Adapter;