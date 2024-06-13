//npm init
//npm i axios
//npm i body-parser
//npm i ejs
//npm i express
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));  //to serve static files like css in public folder
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    // console.log(response.data);

    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    error.message = "No activities that match your criteria:404 error";
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  // console.log(req.body);     op:{ type: 'recreational', participants: '1' }


  try {
    const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${req.body.type}&participants=${req.body.participants}`);
    const result = response.data;
    // console.log(response.data);    op:array of diff activities

    const rand = Math.floor(Math.random() * response.data.length);
    const randActiv = response.data[rand];
    // console.log(randActiv);

    res.render("index.ejs", { data: randActiv });
  } catch (error) {
    // Step 3: If you get a 404 error (resource not found) from the API request.
    // Pass an error to the index.ejs to tell the user:
    // "No activities that match your criteria."
    console.error("Failed to make request:", error.message);
    error.message = "No activities that match your criteria:404 error";
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
