const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const { CATEGORIES_MAP, TokenizeString } = require("./constants");
const firebase = require("firebase");
const { FirebaseConfig } = require("./firebaseConfig");

let app = firebase.default.initializeApp(FirebaseConfig);

let firestore = app.firestore();

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

// Load client secrets from a local file.
fs.readFile("credentials.json", (err, content) => {
  if (err) return console.log("Error loading client secret file:", err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), main);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, javascript_origins } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    javascript_origins[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err)
        return console.error(
          "Error while trying to retrieve access token",
          err
        );
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}
function readProductsListSheet(auth) {
  const sheets = google.sheets({ version: "v4", auth });
  var duplicateCount = 0;
  try {
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: "1CHSOgfPTZnmwBmBsTcDguDTpkBAbxnsogfSlf6CF-44",
        range: "products-9!A1:AE5929",
      },
      (err, res) => {
        if (err) return console.log("The API returned an error: " + err);
        const rows = res.data.values;
        if (rows.length) {
          console.log(rows.length);
          let spreadsheetData = {},
            notAddedValues = [];
          rows.forEach((row) => {
            let category = row[30];
            let deptNameObj = CATEGORIES_MAP[category];
            if (deptNameObj) {
              let upc = row[0];
              let itemName = row[1];

              let image = row[29];
              let category = row[30];

              //values to add
              let categoryId = category;
              let cost = row[3];
              let deptName = deptNameObj.name;
              let description = itemName;
              let imageUrl = image
                ? "http://substantivedebate.xyz/app_pics/" + image
                : null;
              let [imageFolder, imageFileName] = image.split("/");
              let thumbnailUrl = imageUrl
                ? "http://substantivedebate.xyz/app_pics/" +
                  imageFolder +
                  "/thumbnails/" +
                  "tn_" +
                  imageFileName
                : null;
              let itemId = itemName.split(" ").join("_").toLowerCase();
              itemId = itemId.split("/").join("_");
              itemId = itemId.split("\\").join("_");
              itemId = itemId.split("'").join("_");
              let quantity = 10;
              let timestamp = new Date();
              let tokens = TokenizeString(itemName);
              let barCodes = [upc];
              if (spreadsheetData[itemId]) {
                duplicateCount++;
                spreadsheetData[itemId].bar_codes.push(upc);
              } else {
                spreadsheetData[itemId] = {
                  category_id: categoryId,
                  cost: cost,
                  dept_name: deptName,
                  description: description,
                  image_url_hq: imageUrl,
                  item_id: itemId,
                  quantity: quantity,
                  timestamp: timestamp,
                  tokens: tokens,
                  bar_codes: barCodes,
                  image_url: thumbnailUrl,
                };
              }
            } else {
              console.log(row);
              notAddedValues.push(row);
            }
          });
          console.log(duplicateCount);
          addToNotAddedList(auth, notAddedValues);
          addToAddedList(auth, spreadsheetData);
        } else {
          console.log("No data found.");
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
}
async function main(auth) {
  //const auth = await authorize();
  //readProductsListSheet(auth);
  updateDataToFirebase(auth);
}
async function addCategories(auth) {
  for (let key in CATEGORIES_MAP) {
    await firestore.collection("categories").doc(key).update({
      thumb_url: CATEGORIES_MAP[key]["thumb_url"],
    });
    //await firestore.collection("inventory").doc(key).set({});
    console.log("hhs");
  }
}
async function updateDataToFirebase(auth) {
  const sheets = google.sheets({ version: "v4", auth });
  await addCategories(auth);
  //console.log("done");
  return;
  try {
    sheets.spreadsheets.values.get(
      {
        spreadsheetId: "1CHSOgfPTZnmwBmBsTcDguDTpkBAbxnsogfSlf6CF-44",
        range: "final_products!A2:AE5929",
      },
      (err, res) => {
        if (err) return console.log("The API returned an error: " + err);
        const rows = res.data.values;
        if (rows.length) {
          rows.map((row, index) => {
            let category_id = row[0],
              cost = row[1],
              dept_name = row[2],
              description = row[3],
              image_url_hq = row[4],
              item_id = row[5],
              quantity = row[6],
              timestamp = new Date(),
              tokens = JSON.parse(row[8]),
              bar_codes = JSON.parse(row[9]),
              image_url = row[10];
            firestore
              .collection("inventory")
              .doc(category_id)
              .collection("items")
              .doc(item_id)
              .update({
                image_url: image_url ? image_url : null,
                image_url_hq: image_url_hq ? image_url_hq : null,
              })
              .then((res) => {
                console.log("item id " + item_id + " success");
              })
              .catch((error) => {
                console.log("error");
                console.log(error);
                console.log("item id " + item_id + " error");
              });
            // firestore
            //   .collection("inventory")
            //   .doc(category_id)
            //   .collection("items")
            //   .doc(item_id)
            //   .set({
            //     category_id,
            //     dept_name,
            //     description,
            //     image_url,
            //     item_id,
            //     quantity,
            //     timestamp,
            //     tokens,
            //     bar_codes,
            //   })
            //   .then((res) => {
            //     console.log("item id " + item_id + " success");
            //   })
            //   .catch((error) => {
            //     console.log("error");
            //     console.log(error);
            //     console.log("item id " + item_id + " error");
            //   });
          });
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
}
function addToNotAddedList(auth, row) {
  const sheets = google.sheets({ version: "v4", auth });

  let values = row;
  sheets.spreadsheets.values.append(
    {
      spreadsheetId: "1CHSOgfPTZnmwBmBsTcDguDTpkBAbxnsogfSlf6CF-44",
      range: "not_added_list!A1:AE5929",
      resource: { values: values },
      valueInputOption: "USER_ENTERED",
    },
    (err, res) => {
      console.log("---------------Not added list---------------------------");
      if (err) {
        console.log("error");
        console.log(err);
      } else {
        console.log("success");
        //console.log(res);
      }
      console.log("---------------Not added list---------------------------");
    }
  );
}

function addToAddedList(auth, spreadsheetData) {
  const sheets = google.sheets({ version: "v4", auth });

  let values = Object.values(spreadsheetData).map((data) => {
    let {
      category_id,
      cost,
      dept_name,
      description,
      image_url_hq,
      item_id,
      quantity,
      timestamp,
      tokens,
      bar_codes,
      image_url,
    } = data;
    return [
      category_id,
      cost,
      dept_name,
      description,
      image_url_hq,
      item_id,
      quantity,
      timestamp,
      JSON.stringify(tokens),
      JSON.stringify(bar_codes),
      image_url,
    ];
  });
  //console.log(values);
  sheets.spreadsheets.values.append(
    {
      spreadsheetId: "1CHSOgfPTZnmwBmBsTcDguDTpkBAbxnsogfSlf6CF-44",
      range: "final_products!A1:AE5929",
      resource: { values: values },
      valueInputOption: "USER_ENTERED",
    },
    (err, res) => {
      console.log(
        "---------------Final products list---------------------------"
      );
      if (err) {
        console.log("error");
        //console.log(err);
      } else {
        console.log("success");
        //console.log(res);
      }
      console.log(
        "---------------Final products list---------------------------"
      );
    }
  );
}
