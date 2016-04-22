/**
 * Created by robben1 on 4/21/16.
 */

var countProbability = function (jsMetar
                                 // , baseDelay
) {
    var delayInMins = 0
        // + baseDelay;
    ;
    var probabilityOfDelay = 0;
    if (baseDelay > 30) probabilityOfDelay += 50;

    // TODO: wind course. Compare to route course?

    // TODO: wind speed
    // MPS
    if (jsMetar.wind.speed > 7) {
        probabilityOfDelay += 20;
        delayInMins += 25;
    }

    // TODO: wind ghost

    // TODO: visibility
    if (jsMetar.visibility < 800) {
        probabilityOfDelay += 20;
        delayInMins += 25;
    }

    // TODO: clouds

    // TODO: administrative factor (as such like airport closed, etc)


    return {probability: probabilityOfDelay, delay: delayInMins};
};

module.exports = countProbability;