const express = require("express");
const {
    getSubscriptions,
    getSubscription,
    setSubscriptions,
    editSubscription,
    deleteSubscription
} = require("../controllers/subscription.controller");
const router = express.Router();

router.get("/", getSubscriptions);
router.get("/:id", getSubscription);
router.post("/", setSubscriptions);
router.put("/:id", editSubscription);
router.delete("/:id", deleteSubscription);

module.exports = router;
