const router = require("express").Router();
const Action = require('./mongooseSchema');

router.get("/", async (req, res) => {
    try {
        //Getting last 10 moves by date
        const actions = await Action.find().sort('-date').limit(10).exec();
        const data = [];

        //Getting only actions as we don't need id's and date
        actions.forEach(action => {
            data.push(action.action)
        })

        //sending response and reversing actions back so newest would be displayed last
        res.status(200).send(data.reverse());
    }
    catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;