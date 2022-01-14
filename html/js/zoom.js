var IsPhoneRotated = false;
var current = {x: 0, y: 0, zoom: 1};

$(".phone-image-source").click(function() {
    Rotate();
});

$(document).on('click', `.whatsapp-openedchat-message-image,
                         .zoomable-image`, function(e){
    let url = $(this).prop("src");
    var data = undefined;

    if ($(this).hasClass("zoomable-image")) {
        data = $(this).data("id");
        $("#save-image-to-photos").removeClass("blue-text");
        $("#save-image-to-photos").addClass("red-text");
        $("#save-image-to-photos").text("Sil");
    }

    OpenImage(url, data);
});

$(`.phone-settings-image-source,
   .phone-contact-details-user-image,
   .phone-edit-contact-image-source,
   .phone-add-contact-image-source,
   .new-advert-image,
   .advert-image,
   .new-tweet-image,
   .whatsapp-openedchat-picture`).click(function() {
    let url;
    if ($(this).prop("src") == undefined) {
        url = $(this).css("background-image");
        url = url.replace("url(\"", "");
        url = url.replace("\")", "");
    } else {
        url = $(this).prop("src")
    }

    OpenImage(url);
});

function OpenImage(url, data) {
    $(".phone-image-container").animate({
        "right": "0vh"
    }, 300);
    
    let image = $(".phone-image-source");
    $(image).prop("src", url);

    if (data !== undefined){
        $(image).data("id", data);
    } else {
        $(image).data("id", 0)
    }

    if (image.width() > image.height()){
        $(image).css("top", "24vh");
    } else if (image.width() <= image.height()){
        $(image).css("top", "12vh");
    }

    NM.Phone.Functions.HeaderTextColor(Config.HeaderColors["image-zoom"]["top"], Config.HeaderColors["image-zoom"]["bottom"], 300);
}

function Rotate(val = undefined) {
    if (val == undefined) {
        IsPhoneRotated = !IsPhoneRotated;
    } else {
        IsPhoneRotated = val;
    }

    if (IsPhoneRotated) {
        $(".image-rotate-cover").css("display", "block");
        $(".container").addClass("phone-rotated");
        $(".phone-header").addClass("phone-header-rotated");
        $(".phone-image-source").addClass("phone-image-source-rotated");
        $(".phone-image-source").css("transform", "rotate(90deg) scale(2)");
        $("#phone-image-container-header").addClass('app-header-rotated');    
    } else {
        $(".image-rotate-cover").css("display", "none");
        $(".container").removeClass("phone-rotated");
        $(".phone-header").removeClass("phone-header-rotated");
        $(".phone-image-source").addClass("phone-image-source-rotated");
        $(".phone-image-source").css("transform", "unset");
        $("#phone-image-container-header").removeClass('app-header-rotated');
    }
}

$(".phone-image-source").click(function(e) {
    if (!IsPhoneRotated) return;

    // var coef = e.shiftKey || e.ctrlKey ? 0.5 : 2,
    var coef = current.zoom == 1 ? 2 : 1,
        oz = current.zoom,
        nz = current.zoom * coef,
        ox = 20,
        oy = 20,
        mx = e.clientX - ox,
        my = e.clientY - oy,
        ix = (mx - current.x) / oz,
        iy = (my - current.y) / oz,
        nx = ix * nz,
        ny = iy * nz,
        cx = mx - nx,
        cy = my - ny
    ;
    current.zoom = nz;
    current.x = cx;
    current.y = cy;
    // $(".phone-image-source").css("transform", `rotate(90deg) translate3D(${cx}px, ${cy}px, 0) scale(${nz})`);
    $(".phone-image-source").css("transform", `rotate(90deg) scale(${nz})`);
    // $(".phone-image-source-container").css("transform", `translate3D(${cx}px, ${cy}px, 0) scale(${nz})`);
    // current.zoom = current.zoom == 1 ? 2 : 1;
    // $(".phone-image-source").css("transform", `scale(${current.zoom})`);
    // con.style.transform
    //     = 'translate3D('+cx+'px, '+cy+'px,0) '
    //     + 'scale('+nz+')'
    ;
});

$("#cancel-image-container").click(function() {
    $(".phone-image-container").animate({
        'right': '-30vh'
    }, 300)

    if ($("#save-image-to-photos").hasClass("red-text")) {
        setTimeout(() => {
            $("#save-image-to-photos").removeClass("red-text");
            $("#save-image-to-photos").addClass("blue-text");
            $("#save-image-to-photos").text("Kaydet");
        }, 300);
    }
    
    NM.Phone.Functions.HeaderTextColor(NM.Phone.Data.currentApplication == null ? "white" : Config.HeaderColors[NM.Phone.Data.currentApplication]["top"], NM.Phone.Data.currentApplication == null ? "white" : Config.HeaderColors[NM.Phone.Data.currentApplication]["bottom"], 300);
});