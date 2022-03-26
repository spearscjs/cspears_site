const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const db = require('./db');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: true
  }));

router.use(bodyParser.json());

// ROOT DIRECTORY (ONLY WAY TO POST)
router.get('/', function (req, res) { res.sendFile(__dirname + '/api.html') })

router.post('/', async (req, res, next) => {
    //console.log(req.body.data);
    try { 
        let result = await db.add(req.ip, req.body.metricName, req.body.data, req.body.vitalScore);
        console.log(req.ip);
        res.json(result);
    }
    catch(e) {
        //console.log(e);
        res.sendStatus(500);
    }
});


router.get('/vizData', async (req, res, next) => {
    try { 
        // all cookies on or off
        let cookieOn = await db.countCookiesOn();
        let cookieOff = await db.countCookiesOff();
        cookieOn = cookieOn[0]["count"];
        cookieOff = cookieOff[0]["count"];

        // cookies by time
        let cookiesOn5_12 = 0;
        let cookiesOn1_8 = 0;
        let cookiesOn9_4 = 0;
        let cookieByTime;
        let cookiesOnByTime = []
        let cookiesOffByTime = []
        let cookiesOnByScale = [0, 0, 0]
        let cookiesOffByScale = [0, 0, 0]
        let numUsers = []
        for(i = 0; i < 24; i++) {
            cookieByTime = await db.countCookiesEnabledByTime(i, true);
            cookiesOnByTime[i] = cookieByTime[0]["count"];
            numUsers[i] = cookieByTime[0]["count"];
            cookieByTime = await db.countCookiesEnabledByTime(i, false);
            cookiesOffByTime[i] = cookieByTime[0]["count"];
            numUsers[i] += cookieByTime[0]["count"];

            if(i < 8) {
                cookiesOnByScale[0] += cookiesOnByTime[i];
                cookiesOffByScale[0] += cookiesOffByTime[i];
            }
            else if (i < 16) {
                cookiesOnByScale[1] += cookiesOnByTime[i];
                cookiesOffByScale[1] += cookiesOffByTime[i];
            }
            else {
                cookiesOnByScale[2] += cookiesOnByTime[i];
                cookiesOffByScale[2] += cookiesOffByTime[i];
            }
        }
        
        
        let result = {
            "cookieOn" : cookieOn,
            "cookieOff" : cookieOff,
            "cookiesOnByTime" : cookiesOnByTime,
            "cookiesOffByTime" : cookiesOffByTime,
            "cookiesOnByScale" : cookiesOnByScale,
            "cookiesOffByScale" : cookiesOffByScale,
            "totalUsersByTime" : numUsers
        }

        //console.log(result);
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


// browsers: metricName = "initialBrowserData" **********************************************************
router.get('/browsers', async (req, res, next) => {
    try { 
        let rawData = {
            "data" : []
        };
        
        let result = await db.all("initialBrowserData");
        result.forEach(element => {
            //console.log(element["data"]);
            let data = element["data"];
            let id = '{"id": ' + element["id"] + ",";
            data = (id + data.substring(1,data.length));
            
            rawData["data"].push(JSON.parse(data));
        });

        //console.log(rawData["data"]);
        res.json(rawData["data"]);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/browsers/:id', async (req, res, next) => {
    try { 
        let result = await db.one("initialBrowserData", req.params.id);
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/browsers/:id', async (req, res, next) => {
    try { 
        let result = await db.del("initialBrowserData", req.params.id);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


router.put('/browsers/:id', async (req, res, next) => {
    try { 
        let result = await db.put("initialBrowserData", req.params.id, req.body);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});



// navigationTiming : metricName = "navigationTiming" **********************************************************
router.get('/navigationTiming', async (req, res, next) => {
    try { 
        let result = await db.all("navigationTiming");
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/navigationTiming/:id', async (req, res, next) => {
    try { 
        let result = await db.one("navigationTiming", req.params.id);
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/navigationTiming/:id', async (req, res, next) => {
    try { 
        let result = await db.del("navigationTiming", req.params.id);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


router.put('/navigationTiming/:id', async (req, res, next) => {
    try { 
        let result = await db.put("navigationTiming", req.params.id, req.body);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


// networkInformation : metricName = "networkInformation" **********************************************************
router.get('/networkInformation', async (req, res, next) => {
    try { 
        let result = await db.all("networkInformation");
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/networkInformation/:id', async (req, res, next) => {
    try { 
        let result = await db.one("networkInformation", req.params.id);
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/networkInformation/:id', async (req, res, next) => {
    try { 
        let result = await db.del("networkInformation", req.params.id);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


router.put('/networkInformation/:id', async (req, res, next) => {
    try { 
        let result = await db.put("networkInformation", req.params.id, req.body);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


// storageEstimate : metricName = "storageEstimate" **********************************************************
router.get('/storageEstimate', async (req, res, next) => {
    try { 
        let result = await db.all("storageEstimate");
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/storageEstimate/:id', async (req, res, next) => {
    try { 
        let result = await db.one("storageEstimate", req.params.id);
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/storageEstimate/:id', async (req, res, next) => {
    try { 
        let result = await db.del("storageEstimate", req.params.id);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


router.put('/storageEstimate/:id', async (req, res, next) => {
    try { 
        let result = await db.put("storageEstimate", req.params.id, req.body);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});



// fp : metricName = "fp" **********************************************************
router.get('/fp', async (req, res, next) => {
    try { 
        let result = await db.all("fp");
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/fp/:id', async (req, res, next) => {
    try { 
        let result = await db.one("fp", req.params.id);
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/fp/:id', async (req, res, next) => {
    try { 
        let result = await db.del("fp", req.params.id);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


router.put('/fp/:id', async (req, res, next) => {
    try { 
        let result = await db.put("fp", req.params.id, req.body);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});



// fcp : metricName = "fcp" **********************************************************
router.get('/fcp', async (req, res, next) => {
    try { 
        let result = await db.all("fcp");
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/fcp/:id', async (req, res, next) => {
    try { 
        let result = await db.one("fcp", req.params.id);
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/fcp/:id', async (req, res, next) => {
    try { 
        let result = await db.del("fcp", req.params.id);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


router.put('/fcp/:id', async (req, res, next) => {
    try { 
        let result = await db.put("fcp", req.params.id, req.body);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


// fid : metricName = "fid" **********************************************************
router.get('/fid', async (req, res, next) => {
    try { 
        let result = await db.all("fid");
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/fid/:id', async (req, res, next) => {
    try { 
        let result = await db.one("fid", req.params.id);
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/fid/:id', async (req, res, next) => {
    try { 
        let result = await db.del("fid", req.params.id);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


router.put('/fid/:id', async (req, res, next) => {
    try { 
        let result = await db.put("fid", req.params.id, req.body);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


// lcp : metricName = "lcp" **********************************************************
router.get('/lcp', async (req, res, next) => {
    try { 
        let result = await db.all("lcp");
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/lcp/:id', async (req, res, next) => {
    try { 
        let result = await db.one("lcp", req.params.id);
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/lcp/:id', async (req, res, next) => {
    try { 
        let result = await db.del("lcp", req.params.id);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


router.put('/lcp/:id', async (req, res, next) => {
    try { 
        let result = await db.put("lcp", req.params.id, req.body);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


// lcpFinal : metricName = "lcpFinal" **********************************************************
router.get('/lcpFinal', async (req, res, next) => {
    try { 
        let result = await db.all("lcpFinal");
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/lcpFinal/:id', async (req, res, next) => {
    try { 
        let result = await db.one("lcpFinal", req.params.id);
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/lcpFinal/:id', async (req, res, next) => {
    try { 
        let result = await db.del("lcpFinal", req.params.id);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


router.put('/lcpFinal/:id', async (req, res, next) => {
    try { 
        let result = await db.put("lcpFinal", req.params.id, req.body);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});





// cls : metricName = "cls" **********************************************************
router.get('/cls', async (req, res, next) => {
    try { 
        let result = await db.all("cls");
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/cls/:id', async (req, res, next) => {
    try { 
        let result = await db.one("cls", req.params.id);
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/cls/:id', async (req, res, next) => {
    try { 
        let result = await db.del("cls", req.params.id);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


router.put('/cls/:id', async (req, res, next) => {
    try { 
        let result = await db.put("cls", req.params.id, req.body);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


// clsFinal : metricName = "clsFinal" **********************************************************
router.get('/clsFinal', async (req, res, next) => {
    try { 
        let result = await db.all("clsFinal");
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/clsFinal/:id', async (req, res, next) => {
    try { 
        let result = await db.one("clsFinal", req.params.id);
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/clsFinal/:id', async (req, res, next) => {
    try { 
        let result = await db.del("clsFinal", req.params.id);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


router.put('/clsFinal/:id', async (req, res, next) => {
    try { 
        let result = await db.put("clsFinal", req.params.id, req.body);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});





// tbt : metricName = "tbt" **********************************************************
router.get('/tbt', async (req, res, next) => {
    try { 
        let result = await db.all("tbt");
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/tbt/:id', async (req, res, next) => {
    try { 
        let result = await db.one("tbt", req.params.id);
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/tbt/:id', async (req, res, next) => {
    try { 
        let result = await db.del("tbt", req.params.id);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


router.put('/tbt/:id', async (req, res, next) => {
    try { 
        let result = await db.put("tbt", req.params.id, req.body);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});




// errors : metricName = "errors" **********************************************************
router.get('/errors', async (req, res, next) => {
    try { 
        let result = await db.all("errors");
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/errors/:id', async (req, res, next) => {
    try { 
        let result = await db.one("errors", req.params.id);
        res.json(result);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/errors/:id', async (req, res, next) => {
    try { 
        let result = await db.del("errors", req.params.id);
        res.sendStatus(200);
    }
    catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});


module.exports = router;