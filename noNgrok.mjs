import express, { json } from 'express';
const app = express();
const PORT = process.env.PORT || 8080;

app.use(json()); // Parse JSON bodies

app.use("/webhook", (req, res, next) => {

    const body = req.body; // Get the request body from Dialogflow CX

  // Log the incoming request to the console
    console.log('Incoming Webhook Request:', body);

    const params = req.body.sessionInfo.parameters;
  
    const { guestname, numberofguests, roomtypes } = params;
  /*
    console.log("guest name: ", guestname);
    console.log("Number of guests: ", numberofguests);
    console.log("Type of room: ", params.roomtypes);
  */
    res.send({
      "fulfillmentResponse": {
        "messages": [
          {
            "responseType": "RESPONSE_TYPE_UNSPECIFIED",
            "text": {
              "text": [
                `Dear ${guestname.original}, your booking of ${roomtypes} room for ${numberofguests} person is confirmed. `
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
app.listen(PORT, () => {
  console.log(`Webhook server is running on port ${PORT}`);
});
