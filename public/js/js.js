$(document).ready(function () {
    $('tr td').css({
        height: $('table').width() / 4 + 'px'
    });
    $('.airportFrom_input').each(function () {
        var elem = $(this);
        elem.data('oldVal', elem.val());
        elem.bind("propertychange change click keyup input paste", function (event) {
            if (elem.val()) {
                $('.flightNumber_input').val('-')
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
        });
    });
    $('.airportTo_input').each(function () {
        var elem = $(this);
        elem.data('oldVal', elem.val());
        elem.bind("propertychange change click keyup input paste", function (event) {
            if (elem.val()) {
                $('.flightNumber_input').val('-')
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
        });
    });

    $('.flightNumber_input').each(function () {
        var elem = $(this);
        elem.data('oldVal', elem.val());
        elem.bind("propertychange change click keyup input paste", function (event) {
            if (elem.val()) {
                $('.airportTo_input').prop('disabled', true);
                $('.airportFrom_input').prop('disabled', true);
            }
            else {
                $('.airportTo_input').prop('disabled', false);
                $('.airportFrom_input').prop('disabled', false);
            }
        });
    });

    $('.calculate_button').click('on', function () {
        $('.calculate_block').slideDown();

        $('.btn')
        // .css({
        //    marginTop:'2%'
        //})
            .css({
            borderRadius:'50% 50% 0 0'
        })

    });

    if ($('body').width() > 900) {
        setInterval(function () {
            gradient();
        }, 3000);
        var length = 8;
        var start = 0;
        var color = ['#fb9861','#ffe56c','#b8f576','#96fcb1','#8bfcf5','#7ab5fd','#808fff','#c388fe','#ff748e','#ff6565']
        function gradient() {
            if (start > length) {
                start = 0;
            }
            $('::-webkit-input-placeholder').animate({
                backgroundColor: color[start]
            }, 3000);

            $('.gradient').animate({
                backgroundColor: color[start]
            }, 3000);
            start++;
        }
    }

});
