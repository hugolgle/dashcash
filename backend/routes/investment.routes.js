const express = require("express");
const { getInvestments, getInvestment, setInvestments, editInvestment, deleteInvestment } = require("../controllers/investment.controller");
const router = express.Router();

router.get("/", getInvestments);

router.get("/:id", getInvestment);

router.post("/", setInvestments);

router.put("/:id", editInvestment);

router.delete("/:id", deleteInvestment);



module.exports = router