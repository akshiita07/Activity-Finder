# Activity-Finder

### Description
"I'm Bored! Activity Finder" is a web application designed to help users find fun and engaging activities when they are bored. By utilizing the Bored API, the application suggests random activities or filters activities based on user input, such as the type of activity and the number of participants. The app is built with Node.js, Express, and EJS for rendering views, and styled with CSS.

### Implementation Details

1. **Project Initialization**
   - **npm init**: Initializes a new Node.js project, creating a `package.json` file.
   - **npm i axios**: Installs Axios for making HTTP requests to the Bored API.
   - **npm i body-parser**: Installs Body-Parser for parsing incoming request bodies.
   - **npm i ejs**: Installs EJS (Embedded JavaScript) for server-side rendering of HTML templates.
   - **npm i express**: Installs Express, a web framework for building the server and handling routes.

2. **Server Setup**
   - **Express Application**: Creates an Express application and sets the port to 3000.
   - **Static Files**: Serves static files from the "public" directory to include CSS and other assets.
   - **Body-Parser**: Configures Body-Parser to handle URL-encoded data from POST requests.

3. **Routes**
   - **GET / Route**: Handles GET requests to the root URL.
     - **Axios Request**: Fetches a random activity from the Bored API.
     - **Error Handling**: If the API request fails, an error message is rendered.
     - **Rendering**: Renders the `index.ejs` template, passing the activity data or error message.
   - **POST / Route**: Handles POST requests to the root URL.
     - **Axios Request**: Fetches filtered activities based on user-selected type and participants from the Bored API.
     - **Random Selection**: Selects a random activity from the filtered results.
     - **Error Handling**: If no activities match the criteria, an error message is rendered.
     - **Rendering**: Renders the `index.ejs` template, passing the selected activity or error message.

4. **Frontend**
   - **HTML Structure**: Defines the layout of the webpage in `index.ejs`, including the form for user input and sections for displaying activities or error messages.
   - **CSS Styling**: Styles the application with a custom CSS file to enhance the user interface.

### File Structure
- **index.js**: Main server file where the Express app is configured, routes are defined, and the server is started.
- **public/**: Directory containing static files, including CSS.
  - **styles/main.css**: CSS file for styling the application.
- **views/**: Directory containing EJS templates.
  - **index.ejs**: EJS template for rendering the main page, displaying activities or error messages based on server response.

### Example Code Snippets
- **Server Setup and Routes**:
  ```javascript
  import express from "express";
  import bodyParser from "body-parser";
  import axios from "axios";

  const app = express();
  const port = 3000;

  app.use(express.static("public"));
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/", async (req, res) => {
    try {
      const response = await axios.get("https://bored-api.appbrewery.com/random");
      const result = response.data;
      res.render("index.ejs", { data: result });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      error.message = "No activities that match your criteria:404 error";
      res.render("index.ejs", { error: error.message });
    }
  });

  app.post("/", async (req, res) => {
    try {
      const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${req.body.type}&participants=${req.body.participants}`);
      const result = response.data;
      const rand = Math.floor(Math.random() * response.data.length);
      const randActiv = response.data[rand];
      res.render("index.ejs", { data: randActiv });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      error.message = "No activities that match your criteria:404 error";
      res.render("index.ejs", { error: error.message });
    }
  });

  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
  ```

- **EJS Template (`index.ejs`)**:
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/styles/main.css">
    <title>I'm Bored!</title>
  </head>
  <body>
    <div class="container">
      <h1>Let's find something for you to do ✌️</h1>
      <form action="/" id="form" class="form" method="POST">
        <select name="type" class="form-select">
          <option value="" data-display="Select">Random type</option>
          <option value="education">Education</option>
          <!-- Other options -->
        </select>
        <select name="participants" class="form-select">
          <option value="">Any number of people</option>
          <option value="1">1</option>
          <!-- Other options -->
        </select>
        <button type="submit" class="form-submit">Go</button>
      </form>
      <section id="cards" class="cards">
        <% if(locals.data){ %>
          <article class="card-item">
            <h2 class="card-activity"><%=data.activity%></h2>
            <div class="card-info">
              <span class="card-type">Type: <%=data.type%></span>
              <span class="card-participants">Participants: <%=data.participants%></span>
            </div>
          </article>
        <% }else{ %>
          <div id="tag-error" class="tag-error"><%= error %></div>
        <% } %>
      </section>
    </div>
  </body>
  </html>
  ```

### Conclusion
The "I'm Bored! Activity Finder" is a user-friendly application that leverages the Bored API to provide users with interesting activities to do. It demonstrates key web development concepts, including server-side rendering, handling HTTP requests, and error handling. The clean and simple design ensures a smooth user experience.
