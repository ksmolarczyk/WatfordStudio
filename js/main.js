// // BANERS CAROUSEL
//
// var slideIndex = 0;
// carousel();
//
// function carousel() {
//     var i;
//     var x = document.getElementsByClassName("mySlides");
//     for (i = 0; i < x.length; i++) {
//         x[i].style.display = "none";
//     }
//     slideIndex++;
//     if (slideIndex > x.length) {slideIndex = 1}
//     x[slideIndex-1].style.display = "block";
//     setTimeout(carousel, 2000); // Change image every 2 seconds
// }


// WALIDACJA FORMULARZY

$(function() {
    var $inputs = $('form input[required], form textarea[required], select[required]');

    var displayFieldError = function($elem) {
        var $fieldRow = $elem.closest('.form-row');
        var $fieldError = $fieldRow.find('.field-error');
        if (!$fieldError.length) {
            var errorText = $elem.attr('data-error');
            var $divError = $('<div class="field-error">' + errorText + '</div>');
            $fieldRow.append($divError);
        }
    };

    var hideFieldError = function($elem) {
        var $fieldRow = $elem.closest('.form-row');
        var $fieldError = $fieldRow.find('.field-error');
        if ($fieldError.length) {
            $fieldError.remove();
        }
    };

    $inputs.on('input keyup', function() {
        var $elem = $(this);
        if (!$elem.get(0).checkValidity()) {
            $elem.addClass('error');
        } else {
            $elem.removeClass('error');
            hideFieldError($elem);
        }
    });

    $inputs.filter(':checkbox').on('click', function() {
        var $elem = $(this);
        var $row = $(this).closest('.form-row');
        if ($elem.is(':checked')) {
            $elem.removeClass('error');
            hideFieldError($elem);
        } else {
            $elem.addClass('error');
        }
    });

    var checkFieldsErrors = function($elements) {
        //ustawiamy zmienną na true. Następnie robimy pętlę po wszystkich polach
        //jeżeli któreś z pól jest błędne, przełączamy zmienną na false.
        var fieldsAreValid = true;
        $elements.each(function(i, elem) {
            var $elem = $(elem);
            if (elem.checkValidity()) {
                hideFieldError($elem);
                $elem.removeClass('error');
            } else {
                displayFieldError($elem);
                $elem.addClass('error');
                fieldsAreValid = false;
            }
        });
        return fieldsAreValid;
    };

    $('.form').on('submit', function(e) {
        e.preventDefault();

        var $form = $(this);

        //jeżeli wszystkie pola są poprawne...
        if (checkFieldsErrors($inputs)) {
            var dataToSend = $form.serializeArray();
            dataToSend = dataToSend.concat(
                $form.find('input:checkbox:not(:checked)').map(function() {
                    return {"name": this.name, "value": this.value}
                }).get()
            );

            $.ajax({
                url : $form.attr('action'),
                method: $form.attr('method'),
                dataType : 'json',
                data : dataToSend,
                success: function(ret) {

                },
                error : function(error) {

                },
                complete: function() {
                }
            });
        }
    })
})

