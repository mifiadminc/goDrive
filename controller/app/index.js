const express = require('express');
const router = express.Router({ mergeParams: true });
const userService = require('./../../service/userService');
const { RouterConfig } = require('./../../SystemConfig');

router.use("/auth", require("./auth.js"));

router.use("/u/*", checkAuth);

router.use("/u/folder", require("./folder"));
router.use("/u/file", require("./file"));

module.exports = router



// ============== middleware ================== //

function checkAuth(req,res,next){
    let status = { status: false };
    let extendSession = {
        isSet:(req.method == 'POST' && req.baseUrl == '/app/u/file'),
    };
    if(extendSession.isSet){
        extendSession.res = res;
    }
    if (userService.isLoggedIn(req, req.headers.xauthtoken, status, extendSession)) {
        if (status.status) {
            next();
        }
        else {
            // for file download : check token param
            if (req.method == 'GET' && req.baseUrl == '/app/u/file/download') {
                // no requirement for xauthtoken check...JWT token is enough
                next();
                return;
            }

            req.on('data', (data) => {
                req.socket.destroy();
            });
            res.status(401).send({ status: 'failed', error: "Unauthorized", code: '401' });
        }
    }
    else {
        req.on('data', (data) => {
            req.socket.destroy();
        });
        res.status(403).send({
            uri: RouterConfig.force_login_redirect_uris,
            error: "You are not logged in!",
            code: "403",
            data: null
        });
        return;
    }
}