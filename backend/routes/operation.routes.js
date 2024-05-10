const express = require("express");
const { getOperations, setOperations, editOperation, deleteOperation } = require("../controllers/operation.controller");
const router = express.Router();

router.get("/", getOperations);

router.post("/", setOperations);

router.put("/:id", editOperation);

router.delete("/:id", deleteOperation);



module.exports = router