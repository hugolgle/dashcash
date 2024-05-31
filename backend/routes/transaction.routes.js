const express = require("express");
const { getTransactions, getTransaction, setTransactions, editTransaction, deleteTransaction, addRefund } = require("../controllers/transaction.controller");
const router = express.Router();

router.get("/", getTransactions);

router.get("/:id", getTransaction);

router.post("/", setTransactions);

router.post("/:id/refund", addRefund);

router.put("/:id", editTransaction);

router.delete("/:id", deleteTransaction);



module.exports = router