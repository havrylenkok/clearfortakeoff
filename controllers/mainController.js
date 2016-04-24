/**
 * Method: GET
 * URI: /
 * */

var db = require('./../dbconnector');
var metarApi = require('./../service/metarApi');
var parseFlight = require('./../service/parseFlight');

exports.home = function(req, res, next) {

    if(req.body.inputVal1) {
        db.getInfo(req.body.inputVal1,function (err1, res1) {
            if(!err1) {
                db.getInfo(req.body.inputVal2, function (err2, res2) {
                    if(!err2){
                        var res3 = metarApi(res1[0].icao, 0, res1[0].ils, res1[0].cource,
                            res2[0].icao, 10, res2[0].ils, res2[0].cource);
                        console.log(res3);

                        var fInfo = parseFlight(req.body.inputVal2, req.body.inputVal1, new Date().toJSON().slice(0,10));
                        
                       // console.log("fInfo " + fInfo[0].flight_no);
                        
                        db.updateTop({prob:res3.sourceProb, delay:res3.sourceTime, icao:res1[0].icao});
                        db.updateTop({prob:res3.destProb, delay:res3.destTime, icao:res2[0].icao});

                        var resultPercent = res3.destProb + res3.sourceProb;
                        resultPercent = (resultPercent > 99) ? 99 : resultPercent;

                        var resultDelay = res3.sourceTime + res3.destTime;
                        var resM = resultDelay % 60;
                        var resH = (resultDelay - resM)/60;

                        var resD = resH + 'h ' + resM + ' m';

                        console.log(fInfo[0].dep_time);

                        res.send({flight_percent:Math.round(resultPercent) + '%',flight_time:resD,
                                airport_name_first_airport:req.body.inputVal2,
                                airport_name_third_airport: req.body.inputVal1,
                                airport_name_second_airport:fInfo[0].flight_no,
                                departure_time:fInfo[0].dep_time,
                                dep_date:fInfo[0].dep_date,
                                arr_time:fInfo[0].arr_time,
                                arr_date:fInfo[0].arr_date,
                                city_from:fInfo[0].city_from,
                                city_to:fInfo[0].city_to
                        });

                    }
                })
            }
        });
    }
    else {
        if(req.body.latitude){
            db.getNearestAirport({userLat:req.body.latitude, userLng:req.body.longitude}, function (err, rows) {
                if(!err) {
                    res.send({
                        rowsIata: rows[0].iata
                    });
                    console.log(rows[0].iata);
                }
                else{
                    console.log('');
                }
            })
        }
        else{
            res.render('index');
        }
    }
    
};