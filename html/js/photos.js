$('#save-image-to-photos').click(function() {
    var url = $('.phone-image-source').prop('src');
    $.post('http://qb-phone/SaveImage', JSON.stringify({url: url}))
    NM.Phone.Notifications.Add("photos", "Fotoğraflar", "Fotoğraf kaydedildi")
});

function SetupPhotos(photos) {
    console.log(photos)
    if (photos !== undefined) {
        $('.photos-content').empty();

        photos.forEach(photo => {
            var date = new Date(photo.Date);
            var photoChild = $('<div/>', {
                class: "photos-image-item",
                html: `
                    <span>${date.getFullYear()}</span>
                    <img src="${photo.Url}">
                    </img>`
            }).data("data", photo.Data);

            console.log("photo added", photoChild)
            photoChild.appendTo(".photos-content");
        });
    }
}