$.extend($.datepicker, {
    travelRanges: function (options) {
        
        var settings = {
            target: '.travel-dates',
            maxDateToBook: '30',
            dafaultDate: new Date(),
            populateFirst: true,
            firstDay: 1
        };

        $.extend(settings, options);

        $('.datepicker--end, .datepicker--start').datepicker({
            minDate: '0',
            onSelect: function (selectedDate) {
                // console.log('hi')
                var self = this;
                if ($(self).hasClass('datepicker--start')) {
                    var newMaxDate = $(this).datepicker('getDate');
                    newMaxDate.setDate($(this).datepicker('getDate').getDate() + settings.maxDateToBook);
                    $('.datepicker--end').datepicker("change", {
                       "minDate": $(this).datepicker('getDate'),
                       "maxDate": newMaxDate
                   });
                    // console.log($(settings.target).datepicker('getDate'))
                }

                $('.datepicker--end, .datepicker--start').slideUp(200);



                if($(self).hasClass('datepicker--end')) {
                    $(self).closest('form').find('.date-picker--to').val($.datepicker.formatDate('D dd M y', $(self).datepicker('getDate')))
                } else {
                    $(self).closest('form').find('.date-picker--from').val($.datepicker.formatDate('D dd M y', $(self).datepicker('getDate')))
                }

                // console.log($.datepicker.formatDate('D dd M y', $('.datepicker--end').datepicker('getDate')));
            }
        });

        

        // if ('.datepicker--start') {
            $('.datepicker--start').datepicker('setDate', settings.dafaultDate);
        // }
    }
});

$(document).ready(function(){

    $(document).on('focus', '.date-picker__input', function(){
        if($(this).hasClass("date-picker--from")) {
            $(this).closest('form').find('.datepicker--end').slideUp(300);
            $(this).closest('form').find('.datepicker--start').slideDown(300);
        } else {
            $(this).closest('form').find('.datepicker--end').slideDown(300);
            $(this).closest('form').find('.datepicker--start').slideUp(300);
        }
    })

    $.datepicker.travelRanges({target:".datepicker--start"});
    $.datepicker.travelRanges({target:".datepicker--end", populateFirst:false});
});