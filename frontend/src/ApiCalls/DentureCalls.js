export async function uploadFile(file) {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);

    try{
        const response = await fetch('http://localhost:5000/upload', {
            method: 'Post',
            body: formData,
        });
        
        if (response.status === 404) {
            return{"error": "error"};

        }
        const data = await response.json();
        console.log(data)
        return data;
    }
    catch(err){
        console.log("ApiCall Upload:",err);
    }
}

export async function getHistory(){
    try{
        const response = await fetch('http://localhost:5000/history',{
            method: 'Get'
        })

        if (response.status === 404) {
            return{"error": "error"};
        }
        const data = await response.json()
        console.log(data)
        return data
    }
    catch(err){
        console.log("ApiCall get history error: " + err)
    }
}


