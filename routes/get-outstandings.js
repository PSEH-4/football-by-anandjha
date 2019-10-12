const express = require("express");
const router = express.Router();

const rpn = require('request-promise-native');
const envProps = require('../env');


router.get("/", (req, res) => {
  outstandingsAPI(req, res);
});

function outstandingsAPI(req, res) {

  var params = req.query || {};
  var queryString = Object.keys(params).map(function (key) {
    return key + '=' + params[key]
  }).join('&');

  const url = envProps.apiBaseURL+ "?" + queryString;
 //const url = envProps.apiBaseURL+"?get_standings&league_id=148&APIkey=9bb66184e0c8145384fd2cc0f7b914ada57b4e8fd2e4d6d586adcc27c257a978";
 
 var options = {
    uri: url,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    json: true
  };

  rpn.get(options).then((result) => {
    res.json(result);
  }).catch(err => {
    console.error('@@@@@>>>>>>>>>>>>>> Error >>>>>>>>>>>>>@@@@@', err);
    res.status(err.errorCode).send(err.errorMessage);
  });

}

module.exports = router;