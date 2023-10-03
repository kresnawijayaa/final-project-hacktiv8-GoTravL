const OpenAI = require("openai");

const openai = new OpenAI({
  // apiKey: process.env.OPENAI_APIKEY,
  apiKey: "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",
});

async function chatBot(query) {
  const params = (OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant specialized in providing travel-related information.",
      },

      { role: "user", content: query },
    ],
    model: "gpt-3.5-turbo-16k",
  });
  const completion = (OpenAI.Chat.ChatCompletion =
    await openai.chat.completions.create(params));
  let content = completion.choices[0].message.content;
  return content;
}
async function searchDestination(destination, durationInDay) {
  const params = (OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [
      {
        role: "system",
        content: `Create a list of holiday destinations in ${destination} for ${
          durationInDay + 1
        } days with Minimal two destination per day :
        [{
        \"Day\": \"Number day with type integer \", 
        \"Destination\": \"One Destination name\", 
        }]

        Do not put array or , on Destination.`,
      },
    ],
    //     messages: [
    //       {
    //         role: "user",
    //         content: `Create a list of holiday destinations in ${destination} for ${durationInDay} days.`,
    //       },
    //       {
    //         role: "system",
    //         content:
    //           "please show many destination like coffe shop, restaurant, mall, hotel, and night club",
    //       },
    //       {
    //         role: "assistant",
    //         content:
    //           "Create destination 3 per day if the total duration lower than 5",
    //       },
    //       {
    //         role: "assistant",
    //         content: "Provide only the days and the names of the places.",
    //       },
    //       {
    //         role: "system",
    //         content: `Only provide a response in the form of JSON as follows [{ Day: 1, Destination: "place name" }]`,
    //       },
    //       {
    //         role: "system",
    //         content: "Only provide valid JSON and comply with the command",
    //       },
    //       {
    //         role: "system",
    //         content: `Only provide a response in the form of JSON like this
    //         [
    //   { Day: "NUMBER DAY", Destination: "TEXT" },
    // ]`,
    //       },
    //     ],
    model: "gpt-3.5-turbo-16k",
    temperature: 0.7,
  });
  const completion = (OpenAI.Chat.ChatCompletion =
    await openai.chat.completions.create(params));
  let content = completion.choices[0].message.content;
  content = content.trim();
  const parse = JSON.parse(content);
  console.log(parse)
  return parse;
}
// searchDestination("balikpapan", 2);
// chatBot("send me tiktok video about travel");

module.exports = { searchDestination, chatBot };
