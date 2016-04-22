$(document).ready(function () {
    $('tr td').css({
        height: $('table').width() / 4 + 'px'
    });
    $('.airportFrom_input').each(function () {
        var elem = $(this);
        elem.data('oldVal', elem.val());
        elem.bind("propertychange change click keyup input paste", function (event) {
            if (elem.val()) {
                $('.flightNumber_input').val('——')
                    .prop('disabled', true);
            }
            else {
                if ($('.airportTo_input').val()) {
                }
                else {
                    $('.flightNumber_input').prop('disabled', false)
                        .val('')
                }
            }
            $('.calculate_block').slideUp()
            $('.btn')
                .css({
                    borderRadius: '0 0 50% 50%'
                })
        });
    });
    $('.airportTo_input').each(function () {
        var elem = $(this);
        elem.data('oldVal', elem.val());
        elem.bind("propertychange change click keyup input paste", function (event) {
            if (elem.val()) {
                $('.flightNumber_input').val('——')
                    .prop('disabled', true);
            }
            else {
                if ($('.airportFrom_input').val()) {
                }
                else {
                    $('.flightNumber_input').prop('disabled', false)
                        .val('')
                }
            }
            $('.calculate_block').slideUp()
            $('.btn')
                .css({
                    borderRadius: '0 0 50% 50%'
                })
        });
    });

    $('.flightNumber_input').each(function () {
        var elem = $(this);
        elem.data('oldVal', elem.val());
        elem.bind("propertychange change click keyup input paste", function (event) {
            if (elem.val()) {
                $('.airportTo_input').prop('disabled', true)
                    .val('——')
                $('.airportFrom_input').prop('disabled', true)
                    .val('——')
            }
            else {
                $('.airportTo_input').prop('disabled', false);
                $('.airportFrom_input').prop('disabled', false);
            }
            $('.calculate_block').slideUp()
            $('.btn')
                .css({
                    borderRadius: '0 0 50% 50%'
                })
        });
    });

    $('.calculate_button').click('on', function () {
        $('.calculate_block').slideDown();

        $('.btn')
            .css({
                borderRadius: '50% 50% 0 0'
            })

    });

    if ($('body').width() > 900) {
        setInterval(function () {
            gradient();
        }, 3000);
        var length = 8;
        var start = 0;
        var color = ['#fb9861', '#ffe56c', '#b8f576', '#96fcb1', '#8bfcf5', '#7ab5fd', '#808fff', '#c388fe', '#ff748e', '#ff6565']

        function gradient() {
            if (start > length) {
                start = 0;
            }
            $('.gradientBorder').animate({
                borderColor: color[start]
            }, 3000);

            $('.gradient').animate({
                backgroundColor: color[start]
            }, 3000);
            start++;
        }
    }



    if(geoPosition.init()){  // Geolocation Initialisation
        geoPosition.getCurrentPosition(success_callback,error_callback,{enableHighAccuracy:true});
    }else{
        // You cannot use Geolocation in this device
    }
    geoPositionSimulator.init();

    // p : geolocation object
    function success_callback(p){
$('.x').html(p.coords.latitude)
        $('.y').html(p.coords.longitude)
    }

    function error_callback(p){
        // p.message : error message
    }

});
