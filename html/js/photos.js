var Photos = [];

var Months = {
    "long": ["Ocak", "Şubat", "Mart", "Nisan",
             "Mayıs", "Haziran", "Temmuz", "Ağustos",
             "Eylül", "Ekim", "Kasım", "Aralık"],
    "short": ["Oca", "Şub", "Mar", "Nis",
              "May", "Haz", "Tem", "Ağu",
              "Eyl", "Eki", "Kas", "Ara"]
}

$('#save-image-to-photos').click(function() {
    var url = $('.phone-image-source').prop('src');
    var location = $('.phone-image-souce').attr('data-location');
    var data = {
        "albums": [NM.Phone.Data.Applications[NM.Phone.Data.currentApplication].tooltipText],
        "location": location
    }
    $.post('http://qb-phone/SaveImage', JSON.stringify({url: url, data: data}))
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
    var kind = $('.photos-content').attr("data-showing");

    var titleDates = [];
    
    Photos.forEach(photo => {
        var titleDate;
        var dateObj = new Date(photo.Date);
        
        switch (kind) {
            case "day":
                titleDate = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDay()}`;
                break;
            case "year":
                titleDate = `${dateObj.getFullYear()}-${dateObj.getMonth()}`;
                break;
            case "month":
                titleDate = dateObj.getFullYear();
                break;
            default:
                titleDate = undefined;
        }

        photoChild = GetPhotoObject(photo, kind, titleDates.includes(titleDate) ? "none" : "block");
        $(photoChild).appendTo('.photos-content');

        if (titleDate !== undefined && !titleDates.includes(titleDate)) {
            titleDates.push(titleDate);
        }
    });
}

function GetPhotoObject(photo, kind, includeDate) {
    var date = new Date(photo.Date);
    switch (kind) {
        case "year":
            var photoChild = $('<div/>', {
                class: 'photos-image-item',
                html: `
                    <span style="display: ${includeDate}">${date.getFullYear()}</span>
                    <img src='${photo.Url}'></img>`
            }).data('data', photo.Data);
            return photoChild;
        case "month":
            var photoChild = $('<div/>', {
                class: 'photos-image-item',
                html: `
                    <span style="display: ${includeDate}" class="photo-img-title">${Months["long"][date.getMonth()]} ${date.getFullYear()} <i class="fas fa-chevron-right"></i></span>
                    <img src='${photo.Url}'></img>
                    <div class="photo-img-details">
                        <span style="display: ${photo.Data.location == undefined ? "none" : "block"}" class="photo-img-details-text">${photo.Data.location}</span>
                        <span class="photo-img-details-date">${Months["short"][date.getMonth()]} ${date.getDay()}</span>
                    </div>`
            }).data('data', photo.Data);
            return photoChild;
        case "day":
            var photoChild = $('<div/>', {
                class: 'photos-image-item',
                html: `
                    <span style="display: ${includeDate}">${Months["short"][date.getMonth()]} ${date.getDay()}</span>
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