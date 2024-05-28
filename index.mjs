import express, { json } from 'express';
import { connect } from 'ngrok';
const app = express();
const PORT = process.env.PORT || 8080;

app.use(json()); // Parse JSON bodies

app.use("/webhook", (req, res, next) => {

    const body = req.body; // Get the request body from Dialogflow CX

  // Log the incoming request to the console
    console.log('Incoming Webhook Request:', body);

    const params = req.body.sessionInfo.parameters;
  
    const { guestname, numberofguests, roomtype } = params;
  
    console.log("guest name: ", guestname);
    console.log("Number of guests: ", numberofguests);
    console.log("Type of room: ", params.roomtype);
  
    // const body = {
    //   detectIntentResponseId: '4dd48764-d86c-4d2c-a319-26447fa40e95',
    //   intentInfo: {
    //     lastMatchedIntent: 'projects/chatbotdemo-mykk/locations/us-central1/agents/0ceea8d4-84ab-407a-af7f-d01cd135841d/intents/c6585558-9cd8-458a-91a6-09081c27a309',
    //     displayName: 'confirmation.yes',
    //     confidence: 1
    //   },
    //   pageInfo: {
    //     currentPage: 'projects/chatbotdemo-mykk/locations/us-central1/agents/0ceea8d4-84ab-407a-af7f-d01cd135841d/flows/00000000-0000-0000-0000-000000000000/pages/a059d196-a603-41ba-bc0c-f4cd67602fb8',
    //     formInfo: {},
    //     displayName: 'Booking Confirmation Page'
    //   },
    //   sessionInfo: {
    //     session: 'projects/chatbotdemo-mykk/locations/us-central1/agents/0ceea8d4-84ab-407a-af7f-d01cd135841d/sessions/ec1130-477-ead-eb0-cf69558fb',
    //     parameters: { guestname: [Object], numberofguests: 2, roomtype: 'business' }
    //   },
    //   fulfillmentInfo: { tag: 'abc' },
    //   text: 'yes',
    //   languageCode: 'en'
    // }
  
  
    res.send({
      "fulfillmentResponse": {
        "messages": [
          {
            "responseType": "RESPONSE_TYPE_UNSPECIFIED",
            "text": {
              "text": [
                `Dear ${guestname.original}, your booking of ${roomtype} room for ${numberofguests} person is confirmed. `
              ],
              "allowPlaybackInterruption": false
            }
          },
          {
            "responseType": "RESPONSE_TYPE_UNSPECIFIED",
            "text": {
              "text": ["We wish you good stay."],
              "allowPlaybackInterruption": false
            }
          }
        ],
        "mergeBehavior": "MERGE_BEHAVIOR_UNSPECIFIED"
      }
    })
  })

// Start the Express server
app.listen(PORT, async () => {
    console.log(`Webhook server is running on port ${PORT}`);
  
    // Create a ngrok tunnel to expose the local server to the internet
    const ngrokUrl = await ngrok.connect(PORT);
    console.log(`Ngrok tunnel is active: ${ngrokUrl}`);
  
    // Print the ngrok URL for easy access
    // console.log('Webhook endpoint (Ngrok):', `${ngrokUrl}/webhook`);
  });