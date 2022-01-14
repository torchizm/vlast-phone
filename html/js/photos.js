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
    if ($(this).hasClass("blue-text")) {
        var url = $('.phone-image-source').prop('src');
        var location = $('.phone-image-souce').attr('data-location');
        var defaultAlbum = "Kamera";
        if (NM.Phone.Data.Applications[NM.Phone.Data.currentApplication] !== undefined) {
            defaultAlbum = NM.Phone.Data.Applications[NM.Phone.Data.currentApplication].tooltipText
        }
        var data = {
            "albums": [defaultAlbum],
            "location": location
        };
        $.post('http://qb-phone/SaveImage', JSON.stringify({url: url, data: data}), function(_) {
            NM.Phone.Notifications.Add('photos', 'Fotoğraflar', 'Fotoğraf Kaydedildi');
            SetupPhotos(_);
        });
    } else if ($(this).hasClass("red-text")) {
        var id = $('.phone-image-source').attr('data-id');
        $.post('http://qb-phone/DeleteImage', JSON.stringify({id: id}), function(_) {
            NM.Phone.Notifications.Add('photos', 'Fotoğraflar', 'Fotoğraf Silindi')
            $(".phone-image-container").animate({
                'right': '-30vh'
            }, 300);
            NM.Phone.Functions.HeaderTextColor(NM.Phone.Data.currentApplication == null ? "white" : Config.HeaderColors[NM.Phone.Data.currentApplication]["top"], NM.Phone.Data.currentApplication == null ? "white" : Config.HeaderColors[NM.Phone.Data.currentApplication]["bottom"], 300);
            SetupPhotos(_);
        });
    }
});

$('.photos-footer-button').click(function() {
    var current = $('.photos-footer-button-selected').attr('data-page');
    var target = $(this).attr('data-page');

    if (current === target || target == null) {
        return;
    }

    $('.photos-footer-button-selected').removeClass('photos-footer-button-selected');
    $(this).addClass('photos-footer-button-selected');

    $('.photos-app-page-active').removeClass('photos-app-page-active');

    if (target !== "foryou") {
        var slicks = ['.photos-foryou-memories', '.photos-foryou-featured-photos'];

        slicks.forEach(slick => {
            $(slick).slick('slickPause');
        });
    }

    switch (target) {
        case "albums":
            SetupAlbums();
            break;
        case "foryou":
            Array.from(Array(5)).forEach((x, i) => {
                $('.photos-foryou-memories, .photos-foryou-featured-photos').slick('slickRemove', i - 1);
            });

            var shuffel = Photos.sort(() => Math.random() - Math.random()).slice(0, 5);

            shuffel.forEach(photo => {
                $('.photos-foryou-memories').slick('slickAdd', `
                    <div class="photos-image-item">
                        <img class="zoomable-image" src="${photo.url}" alt="" data-id="${photo.id}">
                    </div>
                `);
            });

            shuffel = Photos.sort(() => Math.random() - Math.random()).slice(0, 5);
            shuffel.forEach(photo => {
                $('.photos-foryou-featured-photos').slick('slickAdd', `
                    <div class="photos-image-item">
                        <img class="zoomable-image" src="${photo.url}" alt="" data-id="${photo.id}">
                    </div>
                `);
            });

            $('.photos-foryou-memories, .photos-foryou-featured-photos').slick('slickPlay');
            break;
        default:
            break;
    }

    $(`.photos-app-page[data-page="${target}"]`).addClass('photos-app-page-active');
});

$('.photos-range p').click(function() {
    if ($(this).hasClass('photos-range-selected')) {
        return;
    }

    $('.photos-range-selected').removeClass('photos-range-selected');
    $(this).addClass('photos-range-selected');
    $('.photos-app-page[data-page="photos"]  .photos-content').attr('data-showing', $(this).attr('data-layout'));
    SetupPhotos(Photos);
});

function SetupPhotos(_) {
    if (_ !== undefined) {
        Photos = _;

        Photos.forEach(photo => {
            try {
                photo.data = JSON.parse(photo.data);
            } catch {}
        });
    }

    $('.photos-app-page[data-page="photos"]  .photos-content').empty();
    var kind = $('.photos-app-page[data-page="photos"]  .photos-content').attr("data-showing");

    var titleDates = [];
    
    Photos.forEach(photo => {
        var titleDate;
        var includeDate;
        var dateObj = new Date(photo.created_at);
        
        switch (kind) {
            case "all":
                photoChild = $('<div/>', {
                    class: 'photos-image-item',
                    html: `
                        <img class="zoomable-image" src='${photo.url}'></img>`
                }).data('data', photo.data);
                
                $(photoChild).find('.zoomable-image').attr('data-id', photo.id);
                $(photoChild).appendTo('.photos-app-page[data-page="photos"] .photos-content');

                break;

            case "day":
                titleDate = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDay()}`;
                includeDate = titleDates.includes(titleDate) ? "none" : "block";
                var photoChild = $('<div/>', {
                    class: 'photos-image-item',
                    html: `
                        <span style="display: ${includeDate}">${Months["short"][dateObj.getMonth()]} ${dateObj.getDay()}</span>
                        <img class="zoomable-image" src='${photo.url}'></img>`
                }).data('data', photo.data);

                $(photoChild).find('.zoomable-image').attr('data-id', photo.id);
                $(photoChild).appendTo('.photos-app-page[data-page="photos"]  .photos-content');
                break;
                
            case "year":
                titleDate = dateObj.getFullYear();
                
                if (!titleDates.includes(titleDate)) {
                    var photoChild = $('<div/>', {
                        class: 'photos-image-item',
                        html: `
                        <span>${dateObj.getFullYear()}</span>
                        <img src='${photo.url}'></img>`
                    }).data('data', photo.data);
                    
                    var imgElement = $(photoChild).find('img').attr('data-id', photo.id);
                    
                    $(imgElement).click(function() {
                        var title = dateObj.getFullYear();
                        var filteredPhotos = Photos.filter(x => new Date(x.created_at).getFullYear() == dateObj.getFullYear());
                        OpenAlbum(title, filteredPhotos);
                    });
                    
                    $(photoChild).appendTo('.photos-app-page[data-page="photos"]  .photos-content');
                }
                break;
                
            case "month":
                titleDate = `${dateObj.getFullYear()}-${dateObj.getMonth()}`;
                includeDate = titleDates.includes(titleDate) ? "none" : "block";
                
                var photoChild = $('<div/>', {
                    class: 'photos-image-item',
                    html: `
                        <span style="display: ${includeDate}" class="photo-img-title">${Months["long"][dateObj.getMonth()]} ${dateObj.getFullYear()} <i class="fas fa-chevron-right"></i></span>
                        <img src='${photo.url}'></img>
                        <div class="${includeDate == "block" ? "photo-img-details-date-included" : "photo-img-details"}">
                            <span style="display: ${photo.data.location == undefined ? "none" : "block"}" class="photo-img-details-text">${photo.data.location}</span>
                            <span class="photo-img-details-date">${Months["short"][dateObj.getMonth()]} ${dateObj.getDay()}</span>
                        </div>`
                }).data('data', photo.data);
                
                var imgElement = $(photoChild).find('img').attr('data-id', photo.id);

                $(imgElement).click(function() {
                    var title = `${Months["long"][dateObj.getMonth()]} ${dateObj.getFullYear()}`;
                    var filteredPhotos = Photos.filter(x => {
                        var date = new Date(x.created_at);
                        return date.getFullYear() == dateObj.getFullYear() && date.getMonth() == dateObj.getMonth();
                    });
                    OpenAlbum(title, filteredPhotos);
                });

                $(photoChild).appendTo('.photos-app-page[data-page="photos"]  .photos-content');
                break;

            default:
                break;
        }
        
        if (!titleDates.includes(titleDate)) {
            titleDates.push(titleDate);
        }
    });
}

function SetupAlbums() {
    var albums = {};

    Photos.forEach(photo => {
        if (photo.data.albums.length === 0) {
            return;
        }

        photo.data.albums.forEach(album => {
            if (albums[album] === undefined) {
                albums[album] = 1;
            } else {
                albums[album] += 1;
            }
        });
    });

    for (album in albums) {
        var albumPhotos = Photos.filter(photo =>photo.data.albums.includes(album));
        var albumPhoto = albumPhotos[0].url;

        var photoChild = $('<div/>', {
            class: 'photos-image-item',
            html: `
                <img src='${albumPhoto}'></img>
                <span>${album}</span>
                <span>${albums[album]}</span>`
        });

        $(photoChild).prop('data-album', album);
        $(photoChild).appendTo('.photos-album-content');

        $(photoChild).click(function() {
            var album = $(this).prop('data-album');
            var albumPhotos = Photos.filter(photo => photo.data.albums.includes(album));
            OpenAlbum(album, albumPhotos);
        });
    }
}

function OpenAlbum(title, images) {
    $('.photos-album-content-inside').empty();
    $('#album-name').text(title);

    images.forEach(photo => {
        littleImage = $('<div/>', {
            class: 'photos-image-item',
            html: `
            <img class="zoomable-image" src='${photo.url}'></img>`
        }).data('data', photo.data);
        
        $(littleImage).find('.zoomable-image').attr('data-id', photo.id);
        $(littleImage).appendTo('.photos-album-content-inside');
    });
    
    NM.Phone.Animations.SlideLeft('.photos-album-content-container', 250, 0);
}

$('#cancel-album-container').click(function() {
    NM.Phone.Animations.SlideRight('.photos-album-content-container', 250, -100);
});

$('.photos-search-bar .fa-times-circle').click(function() {
    $('#photos-search-bar-input').val('');
    $('.photos-app-page[data-page="search"] .photos-content').empty();
});

$('#photos-search-bar-input').keyup(function(e) {
    $('.photos-app-page[data-page="search"] .photos-content').empty();

    if ($(this).val().length < 3) {
        return;
    }

    var match = $(this).val().toLowerCase();
    var options =  {weekday: 'long', year: 'numeric', 'month': 'long', day: 'numeric'};

    Photos.filter(x => x.url.toLowerCase().includes(match) ||
                  x.data.albums.toLocaleString().toLowerCase().includes(match) ||
                  x.data.location.toLowerCase().includes(match) ||
                  new Date(x.created_at).toLocaleDateString('tr-TR', options).toLowerCase().includes(match)).forEach(photo => {
        photoChild = $('<div/>', {
            class: 'photos-image-item',
            html: `
                <img class="zoomable-image" src='${photo.url}'></img>`
        }).data('data', photo.data);
        
        $(photoChild).find('.zoomable-image').attr('data-id', photo.id);
        $(photoChild).appendTo('.photos-app-page[data-page="search"] .photos-content');
    });
});

$('.photos-foryou-memories, .photos-foryou-featured-photos').slick({
    autoplay: false,
    pauseOnHover: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    arrows: false,
    centerMode: true,
    variableWidth: true
});