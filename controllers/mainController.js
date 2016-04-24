/**
 * Method: GET
 * URI: /
 * */

var db = require('./../dbconnector');
var metarApi = require('./../service/metarApi');

exports.home = function(req, res, next) {

    if(req.body.inputVal1) {
        db.getInfo(req.body.inputVal1,function (err1, res1) {
            if(!err1) {
                db.getInfo(req.body.inputVal2, function (err2, res2) {
                    if(!err2){
                        var res3 = metarApi(res1[0].icao, 0, res1[0].ils, res1[0].cource,
                            res2[0].icao, 10, res2[0].ils, res2[0].cource);
                        console.log(res3);

                        db.updateTop({prob:res3.sourceProb, delay:res3.sourceTime, icao:res1[0].icao});
                        db.updateTop({prob:res3.destProb, delay:res3.destTime, icao:res2[0].icao});

                        var resultPercent = res3.destProb + res3.sourceProb;
                        resultPercent = (resultPercent > 99) ? 99 : resultPercent;

                        var resultDelay = res3.sourceTime + res3.destTime;
                        var resM = resultDelay % 60;
                        var resH = (resultDelay - resM)/60;

                        var resD = resH + 'h ' + resM + ' m';

                        res.send({flight_percent:Math.round(resultPercent) + '%',flight_time:resD});

                    }
                })
            }
        });
    }
    else {
        res.render('index');
    }
    
};