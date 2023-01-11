const express = require("express");
const router = express.Router();

var RpcClient = require('ufod-rpc');

router.get("/", (req, res) => res.json({ msg: "backend works" }));

router.post("/create_nft", (req, res) => {
    const { fromAddress, ecosystem, type, previousId, category, subcategory, name, url, data, user, pass, host, port } = req.body;

    var config = {
        protocol: 'http',
        user: user,
        pass: pass,
        host: host,
        port: port,
    };

    var rpc = new RpcClient(config);

    rpc.omni_sendissuancemanaged(fromAddress, ecosystem, type, previousId, category, subcategory, name, url, data, function(err, txid) {
        if (err) {
            res.json({ status: 400, msg: `${err.message}` });
        } else {
            console.log();
            res.json({ status: 200, msg: `${txid.result}` });
        }
    });
});

router.post("/create_token", (req, res) => {
    const { fromAddress, ecosystem, type, previousId, category, subcategory, name, url, data, amount, user, pass, host, port } = req.body;

    var config = {
        protocol: 'http',
        user: user,
        pass: pass,
        host: host,
        port: port,
    };

    var rpc = new RpcClient(config);

    rpc.omni_sendissuancefixed(fromAddress, ecosystem, type, previousId, category, subcategory, name, url, data, amount, function(err, txid) {
        if (err) {
            res.json({ status: 400, msg: `${err.message}` });
        } else {
            res.json({ status: 200, msg: `${txid.result}` });
        }
    });
});

router.post("/get_token", (req, res) => {
    const { user, pass, host, port, txid } = req.body;

    var config = {
        protocol: 'http',
        user: user,
        pass: pass,
        host: host,
        port: port,
    };

    var rpc = new RpcClient(config);

    rpc.omni_gettransaction(txid, function(err, txid) {
        if (err) {
            res.json({ status: 400, msg: `${err.message}` });
        } else {
            res.json({
                status: 200,
                msg: `${txid.result.valid}`,
                name: `${txid.result.propertyname}`,
                url: `${txid.result.url}`,
                amount: `${txid.result.amount}`
            });
        }
    });
});

module.exports = router;