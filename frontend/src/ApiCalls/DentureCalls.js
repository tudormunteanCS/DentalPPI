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
        return data;
    }
    catch(err){
        console.log("ApiCall Upload:",err);
    }
}