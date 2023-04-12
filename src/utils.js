export const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        resolve(e.target.result)
    }
    reader.readAsDataURL(file)
})