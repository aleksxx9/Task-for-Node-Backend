const router = require("express").Router();
const Action = require("./mongooseSchema");

router.post("/", async (req, res) => {
    const action = new Action({ action: req.body.action, date: new Date() });
    try {
        await action.save();
        res.status(200).send(action);
    }
    catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;
