const express = require("express");
const app = express();
// var bodyParser = require('body-parser');
app.use(express.json());
const mongoose = require("mongoose");
const port = 5000;

mongoose
  .connect("mongodb://localhost:27017/demodb")
  .then(() => {
    console.log("Connection Successful...");
  })
  .catch(() => {
    console.log("Connection is not stablished , TRY again..");
  });

// Creating mongoose schema

const demodataschema = new mongoose.Schema({
  _score: Number,
  category: String,
  id: Number,
  title: String,
  timestamp: Date,
});

// A mongoose schema defines the structure of the document, default values
// , validators , etc..whereas a Mongoose model provides an interface to the
// database for creating ,querying ,updating and deleting records

// or collection creation
const Data = new mongoose.model("Data", demodataschema);

// //create document or insert a document

const createDocument = async () => {
  try {
    const second_data = new Data({
      _score: 3,
      category: "publications",
      id: 7,
      title:
        "Pissarro Paintings and Works on Paper at the Art Institute of Chicago",
      timestamp: "2022-10-03T16:40:03-05:00",
    });
    const third_data = new Data({
      _score: 10,
      category: "publications",
      id: 12,
      title: "The Modern Series at the Art Institute of Chicago",
      timestamp: "2022-10-03T16:40:03-05:00",
    });
    const fourth_data = new Data({
      _score: 2,
      category: "publications",
      id: 406,
      title: "Whistler and Roussel: Linked Visions",
      timestamp: "2022-10-03T16:40:03-05:00",
    });
    const fifth_data = new Data({
      _score: 5,
      category: "publications",
      id: 226,
      title: "James Ensor: The Temptation of Saint Anthony",
      timestamp: "2022-10-03T16:40:03-05:00",
    });

    const result = await Data.insertMany([third_data, fourth_data, fifth_data]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// createDocument();

// getting all data from db
class Controller {
  createNewDocument = async (body) => {
    console.log("body" + body);
    const result = Data.insertMany([body]);
    return new Promise((resolve, reject) => {
      if (result) {
        resolve(result);
      } else {
        reject("Data is not inserted");
      }
    });
  };
  getDocument = async () => {
    const result = Data.find();
    // return result;
    // console.log(result);
    return new Promise((resolve, _) => resolve(result));
  };

  // getting all the data from db using an ID
  getDocumentUsingId = async (specific_id) => {
    return new Promise((resolve, reject) => {
      const result = Data.find({ id: specific_id });
      if (result) {
        resolve(result);
      } else {
        reject(`Data with id no ${specific_id} is not found`);
      }
    });
  };

  getDocumentUsingScore = async (_score) => {
    return new Promise((resolve, reject) => {
      const result = Data.find({ _score });
      if (result) {
        resolve(result);
      } else {
        reject(`Data with id no ${specific_id} is not found`);
      }
    });
  };

  // updating the document using a specific id

  updateDocumentUsingId = async (specific_id, body) => {
    return new Promise((resolve, reject) => {
      const result = Data.updateOne({ id: specific_id }, { $set: body });
      if (result) {
        resolve(result);
      } else {
        reject(`Data with id no ${specific_id} is not found`);
      }
    });
  };

  deleteDocumentUsingId = async (specific_id) => {
    return new Promise((resolve, reject) => {
      const result = Data.deleteOne({ id: specific_id });
      if (result) {
        resolve(result);
      } else {
        reject(`Data with id no ${specific_id} is not found`);
      }
    });
  };
}

// getDocument();
// getDocumentUsingId(406);
// updateDocumentUsingId(406,{title:"Whistler and Roussel: Linked Visions"});
// deleteDocumentUsingId(999);

app.get("/", (req, res) => {
  res.send(`listening to port no. ${port}`);
});

app.get("/data", async (req, res) => {
  const result = await new Controller().getDocument();
  res.send(result);
});

app.get("/data/id/:id", async (req, res) => {
  const id = req.params.id;
  const result = await new Controller().getDocumentUsingId(id);
  res.send(result);
});

app.get("/data/score/:_score", async (req, res) => {
  const _score = req.params._score;
  const result = await new Controller().getDocumentUsingScore(_score);
  res.send(result);
});

app.post("/data", async (req, res) => {
  const body = req.body;
  const result = await new Controller().createNewDocument(body);
  res.send(result);
});

app.patch("/data/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const result = await new Controller().updateDocumentUsingId(id, body);
  res.send(result);
});

app.delete("/data/:id", async (req, res) => {
  const id = req.params.id;
  const result = await new Controller().deleteDocumentUsingId(id);
  res.send(result);
});

app.listen(port, () => {
  console.log(`listening to port no. ${port}`);
});
