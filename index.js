var request = require("request");
var { google } = require("googleapis");
var key = require("./bajandopelis-328dadff6944.json");
const paths = require("./movies.json")

const jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ["https://www.googleapis.com/auth/indexing"],
    null
);


jwtClient.authorize(function (err, tokens) {
    if (err) {
        console.log(err);
        return;
    }

    paths.map((path) => {
        let options = {
            url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
            method: "POST",
            // Your options, which must include the Content-Type and auth headers
            headers: {
                "Content-Type": "application/json"
            },
            auth: { "bearer": tokens.access_token },
            // Define contents here. The structure of the content is described in the next step.
            json: {
                "url": `https://bajandopelis.vercel.app/movie/${path.path}`,
                "type": "URL_UPDATED"
            }
        };
        request(options, function (error, response, body) {
            // Handle the response
            console.log(body);
        });
    })


    // let options = {
    //     url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
    //     method: "POST",
    //     // Your options, which must include the Content-Type and auth headers
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     auth: { "bearer": tokens.access_token },
    //     // Define contents here. The structure of the content is described in the next step.
    //     json: {
    //         "url": "https://bajandopelis.vercel.app/movie/7-dias-contigo",
    //         "type": "URL_UPDATED"
    //     }
    // };
    // request(options, function (error, response, body) {
    //     // Handle the response
    //     console.log(body);
    // });
});