import express from "express";

import fs from "fs";

import uniqid from "uniqid";


import { getFileBuffer,writeFileBuffer} from "../lib/fs-tools.js";

// const __filename = fileURLToPath(import.meta.url);

// const __dirname = dirname(__filename);

// const authorsFilePath = path.join(__dirname, "newBlog.json");

const router = express.Router();

// get all authors
router.get("/", async (req, res, next) => {
  try {
    // const fileBuffer = fs.readFileSync(authorsFilePath);
    // const fileAsString = fileAsBuffer.toString();
    // const fileAsJSON = JSON.parse(fileAsString);
const blogs = await getFileBuffer()
    res.status(200).send(blogs);
  } catch (error) {
    next(error);
  }
});

// create  author
router.post("/", async (req, res, next) => {
  try {
    const { name, surname, email, dateOfBirth } = req.body;

    const author = {
      id: uniqid(),
      name,
      surname,
      email,
      dateOfBirth,
      avatar: `https://ui-avatars.com/api/?name=${name}+${surname}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const fileAsBuffer = fs.readFileSync(authorsFilePath);

    const fileAsString = fileAsBuffer.toString();

    const fileAsJSONArray = JSON.parse(fileAsString);

    fileAsJSONArray.push(author);

    fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsJSONArray));

    res.send(author);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// get single authors
router.get("/:id", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(authorsFilePath);

    const fileAsString = fileAsBuffer.toString();

    const fileAsJSONArray = JSON.parse(fileAsString);

    const author = fileAsJSONArray.find(
      (author) => author.id === req.params.id
    );
    if (!author) {
      res
        .status(404)
        .send({ message: `Author with ${req.params.id} is not found!` });
    }
    res.send(author);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// delete  author
router.delete("/:id", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(authorsFilePath);

    const fileAsString = fileAsBuffer.toString();

    let fileAsJSONArray = JSON.parse(fileAsString);

    const author = fileAsJSONArray.find(
      (author) => author.id === req.params.id
    );
    if (!author) {
      res
        .status(404)
        .send({ message: `Author with ${req.params.id} is not found!` });
    }
    fileAsJSONArray = fileAsJSONArray.filter(
      (author) => author.id !== req.params.id
    );
    fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsJSONArray));
    res.status(204).send();
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

//  update author
router.put("/:id", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(authorsFilePath);

    const fileAsString = fileAsBuffer.toString();

    let fileAsJSONArray = JSON.parse(fileAsString);

    const authorIndex = fileAsJSONArray.findIndex(
      (author) => author.id === req.params.id
    );
    if (!authorIndex == -1) {
      res
        .status(404)
        .send({ message: `Author with ${req.params.id} is not found!` });
    }
    const previousAuthorData = fileAsJSONArray[authorIndex];
    const changedAuthor = {
      ...previousAuthorData,
      ...req.body,
      updatedAt: new Date(),
      id: req.params.id,
    };
    fileAsJSONArray[authorIndex] = changedAuthor;

    fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsJSONArray));
    res.send(changedAuthor);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

export default router;
