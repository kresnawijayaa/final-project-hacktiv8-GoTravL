import axios from "axios"
BASE_URL
async function askAi(message) {
    try {
        const { data } = await axios.post(BASE_URL + "/openai/ask", {
            chat: message
        })
        return data.message
    } catch (error) {
        console.log(error)
    }
}

export default askAi