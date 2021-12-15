$(document).on('click', '.phone-bottom-slector-close-button, .gray-background', function(e) {
    e.preventDefault();

    $('.gray-background').fadeOut(200);
    $('.phone-bottom-selector').animate({'bottom': '-100%'}, 200, function() {
        $('.phone-bottom-selector').css("display", "none");
    });
});

function OpenSelector(title, items, cb) {
    console.log("selam kanka");
    var itemsElement = ".phone-bottom-selector-items";
    $(itemsElement).empty();

    $('<div/>', {
        class: "phone-bottom-selector-title",
        html: title
    }).appendTo(itemsElement);

    items.forEach(item => {
        console.log("item", item)
        var itemElement = $('<div/>', {
            class: "phone-bottom-selector-item",
            html: item
        }).attr("data-value", item);

        $(itemElement).click(function() {
            cb(item);

            $('.gray-background').fadeOut(200);
            $('.phone-bottom-selector').animate({'bottom': '-100%'}, 200, function() {
                $('.phone-bottom-selector').css("display", "none");
            });
        }); 

        $(itemElement).appendTo(itemsElement);
    });

    $('.gray-background').fadeIn(200);
    $('.phone-bottom-selector').css("display", "block");
    $('.phone-bottom-selector').animate({'bottom': '0%'}, 200);
}