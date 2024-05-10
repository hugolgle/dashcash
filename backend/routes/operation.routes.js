const express = import("express");
const { getOperations, setOperations, editOperation, deleteOperation } = require("../controllers/operation.controller.js");
const router = require("express").Router();

router.get("/", getOperations);

router.post("/", setOperations);

router.put("/:id", editOperation);

router.delete("/:id", deleteOperation);



module.exports = router