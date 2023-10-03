const duck = require("duckduckgo-images-api")

const duckSearch = async (query) => {
    try {
        const image = await duck.image_search({ query, moderate: true })
        return image[1].image
    } catch (error) {
        console.log(error)
    }
}
export default duckSearch