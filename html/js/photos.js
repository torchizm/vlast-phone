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
        var includeDate;
        var dateObj = new Date(photo.Date);
        
        switch (kind) {
            case "all":
                photoChild = $('<div/>', {
                    class: 'photos-image-item',
                    html: `
                        <img src='${photo.Url}'></img>`
                }).data('data', photo.Data);

                $(photoChild).appendTo('.photos-content');
                break;

            case "day":
                titleDate = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDay()}`;
                includeDate = titleDates.includes(titleDate) ? "none" : "block";
                var photoChild = $('<div/>', {
                    class: 'photos-image-item',
                    html: `
                        <span style="display: ${includeDate}">${Months["short"][dateObj.getMonth()]} ${dateObj.getDay()}</span>
                        <img src='${photo.Url}'></img>`
                    }).data('data', photo.Data);

                $(photoChild).appendTo('.photos-content');
                break;
                
            case "year":
                titleDate = `${dateObj.getFullYear()}-${dateObj.getMonth()}`;

                if (!titleDates.includes(titleDate)) {
                    var photoChild = $('<div/>', {
                        class: 'photos-image-item',
                        html: `
                            <span>${dateObj.getFullYear()}</span>
                            <img src='${photo.Url}'></img>`
                    }).data('data', photo.Data);

                    $(photoChild).appendTo('.photos-content');
                }
                break;

            case "month":
                titleDate = dateObj.getFullYear();
                includeDate = titleDates.includes(titleDate) ? "none" : "block";
                
                var photoChild = $('<div/>', {
                    class: 'photos-image-item',
                    html: `
                        <span style="display: ${includeDate}" class="photo-img-title">${Months["long"][dateObj.getMonth()]} ${dateObj.getFullYear()} <i class="fas fa-chevron-right"></i></span>
                        <img src='${photo.Url}'></img>
                        <div class="${includeDate == "block" ? "photo-img-details-date-included" : "photo-img-details"}">
                            <span style="display: ${photo.Data.location == undefined ? "none" : "block"}" class="photo-img-details-text">${photo.Data.location}</span>
                            <span class="photo-img-details-date">${Months["short"][dateObj.getMonth()]} ${dateObj.getDay()}</span>
                        </div>`
                }).data('data', photo.Data);
                $(photoChild).appendTo('.photos-content');

                break;
            default:
                break;
        }
        
        if (!titleDates.includes(titleDate)) {
            titleDates.push(titleDate);
        }
    });
}