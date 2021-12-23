var Photos = [];

var Months = ["Ocak", "Şubat", "Mart", "Nisan",
              "Mayıs", "Haziran", "Temmuz", "Ağustos",
              "Eylül", "Ekim", "Kasım", "Aralık"];

$('#save-image-to-photos').click(function() {
    var url = $('.phone-image-source').prop('src');
    $.post('http://qb-phone/SaveImage', JSON.stringify({url: url}))
    NM.Phone.Notifications.Add('photos', 'Fotoğraflar', 'Fotoğraf kaydedildi')
});

$('.photos-range p').click(function() {
    if ($(this).hasClass('photos-range-selected')) {
        return;
    }

    $('.photos-range-selected').removeClass('photos-range-selected');
    $(this).addClass('photos-range-selected');
    $('.photos-content').attr('data-showing', $(this).attr('data-layout'));
    SetupPhotos(Photos);
});

function SetupPhotos(_) {
    if (_ !== undefined) {
        Photos = _;
    }

    $('.photos-content').empty();

    Photos.forEach(photo => {
        var kind = $('.photos-content').attr("data-showing");
        photoChild = GetPhotoObject(photo, kind);
        $(photoChild).appendTo('.photos-content');
    });
}

function GetPhotoObject(photo, kind) {
    var date = new Date(photo.Date);
    switch (kind) {
        case "year":
            var photoChild = $('<div/>', {
                class: 'photos-image-item',
                html: `
                    <span>${date.getFullYear()}</span>
                    <img src='${photo.Url}'></img>`
            }).data('data', photo.Data);
            return photoChild;
        case "month":
            var photoChild = $('<div/>', {
                class: 'photos-image-item',
                html: `
                    <span>${Months[date.getMonth()]}</span>
                    <img src='${photo.Url}'></img>`
            }).data('data', photo.Data);
            return photoChild;
        case "day":
            var photoChild = $('<div/>', {
                class: 'photos-image-item',
                html: `
                    <span>${date.getDay()}</span>
                    <img src='${photo.Url}'></img>`
                }).data('data', photo.Data);
            return photoChild;
        case "all":
            var photoChild = $('<div/>', {
                class: 'photos-image-item',
                html: `
                    <img src='${photo.Url}'></img>`
                }).data('data', photo.Data);
            return photoChild;
        default:
            return "";
    }
}