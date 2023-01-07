const express = require("express");
const router = express.Router();

var RpcClient = require('ufod-rpc');

router.get("/test", (req, res) => res.json({ msg: "backend works" }));

router.post("/create_token", (req, res) => {
    const { fromAddress, ecosystem, type, previousId, category, subcategory, name, url, data } = req.body;

    var config = {
        protocol: 'http',
        user: 'ufomoon',
        pass: 'ufomoon',
        host: '127.0.0.1',
        port: '8444',
    };

    var rpc = new RpcClient(config);

    rpc.omni_sendissuancemanaged(fromAddress, ecosystem, type, previousId, category, subcategory, name, url, data, function(err, txid) {
        if (err) {
            res.json({ status: 400, err: `${err}` });
        } else {
            console.log();
            res.json({ status: 200, msg: `${txid.result}` });
        }
    });
});

module.exports = router;