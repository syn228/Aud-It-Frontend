class Adapter {
    static isLoggedIn() {
        return !!localStorage.getItem('token')
    }
    
    static logout() {
        localStorage.removeItem('token');
    }

    static postFiles(files, currentUser) {
        for (let i=0; i < files.length; i++){
            let body = {
                name: files[i].name,
                user_id: currentUser.id,
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