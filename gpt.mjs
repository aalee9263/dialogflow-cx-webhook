// import express from 'express';
import express, { json } from 'express';

const app = express();
const port = process.env.PORT || 3002;

app.use(json());

app.post('/webhook', (req, res) => {
    const parameters = req.body.sessionInfo.parameters;

    // Extract parameters
    // const guestname = parameters.guestName;
    // const numberfguests = parameters.numberOfGuests;
    // const roomtypes = parameters.roomTypes;
    // or can you write as below code 

    const { guestname, numberofguests, roomtypes } = parameters;

    console.log("guest name: ", parameters.guestname);
    console.log("Number of guests: ", parameters.numberofguests);
    console.log("Type of room: ", parameters.roomtypes);

    // Process data and create a response
    const fulfillmentText = `Hello ${guestname}, you have booked a ${roomtypes} room for ${numberofguests} guests.`;

    const response = {
        fulfillment_response: {
            messages: [
                {
                    text: {
                        text: [fulfillmentText]
                    }
                }
            ]
        }
    };

    res.json(response);
});

app.listen(port, () => {
    console.log(`Webhook server is running on port ${port}`);
});
