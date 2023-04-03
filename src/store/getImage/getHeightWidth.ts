
export const getHeightWidth = async (url:string) => {
    return new Promise((resolve, request) => {
        const img = new Image()
        img.src = url
        img.onload = () => {
            const { height, width } = img
            resolve({ height, width })
        }
    })
}
