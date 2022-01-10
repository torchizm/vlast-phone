NM.Phone.Settings = {};
NM.Phone.Settings.Background = "ios-1";
NM.Phone.Settings.OpenedTab = null;
NM.Phone.Settings.Backgrounds = {
    'ios-1': {
        label: "iOS Tema 1"
    },
    'ios-2': {
        label: "iOS Tema 2"
    },
    'ios-3': {
        label: "iOS Tema 3"
    },
    'vlast': {
        label: "Vlast Tema"
    }
};

var PressedBackground = null;
var PressedBackgroundObject = null;
var OldBackground = null;
var IsChecked = null;

$(document).on('click', '.settings-app-tab', function(e){
    e.preventDefault();
    var PressedTab = $(this).data("settingstab");
    if (PressedTab == undefined) return;

    if (PressedTab == "numberrecognition") {
        var checkBoxes = $(".numberrec-box");
        NM.Phone.Data.AnonymousCall = !checkBoxes.prop("checked");
        checkBoxes.prop("checked", NM.Phone.Data.AnonymousCall);

        if (!NM.Phone.Data.AnonymousCall) {
            $("#numberrecognition > p").html('Off');
        } else {
            $("#numberrecognition > p").html('On');
        }
        $(`.settings-${PressedTab}-tab`).animate({"right": "0"}, 200)
        NM.Phone.Settings.OpenedTab = PressedTab;
    } else {
        $(`.settings-${PressedTab}-tab`).animate({"right": "0"}, 200)
        NM.Phone.Settings.OpenedTab = PressedTab;
    }
});

$(document).on('click', '#accept-background', function(e){
    e.preventDefault();
    var hasCustomBackground = NM.Phone.Functions.IsBackgroundCustom();

    if (hasCustomBackground === false) {
        // NM.Phone.Animations.TopSlideUp(".settings-"+NM.Phone.Settings.OpenedTab+"-tab", 200, -100);
        $(`.settings-${NM.Phone.Settings.OpenedTab}-tab`).animate({"right": "-100%"}, 200)
        $(".phone-background").css({"background-image":"url('/html/img/backgrounds/"+NM.Phone.Settings.Background+".png')"})
    } else {
        $(`.settings-${NM.Phone.Settings.OpenedTab}-tab`).animate({"right": "-100%"}, 200)
        // NM.Phone.Animations.TopSlideUp(".settings-"+NM.Phone.Settings.OpenedTab+"-tab", 200, -100);
        $(".phone-background").css({"background-image":"url('"+NM.Phone.Settings.Background+"')"});
    }
    
    NM.Phone.Notifications.Add("settings", "Ayarlar", "Arkaplan değiştirildi");
    $.post('http://qb-phone/SetBackground', JSON.stringify({
        background: NM.Phone.Settings.Background,
    }))
});

NM.Phone.Functions.LoadMetaData = function(MetaData, PlayerData) {
    if (MetaData.background === null || MetaData.background === undefined) {
        MetaData.background = "ios-1";
        
        $.post('http://qb-phone/SetBackground', JSON.stringify({
            background: NM.Phone.Settings.Background,
        }));
    } else if (!MetaData.background.startsWith('www.') && !MetaData.background.startsWith('http://') && !MetaData.background.startsWith('https://')) {
        if (NM.Phone.Settings.Backgrounds[MetaData.background] === undefined) {
            MetaData.background = "ios-1";
        }
        
        $.post('http://qb-phone/SetBackground', JSON.stringify({
            background: NM.Phone.Settings.Background,
        }));
    }

    NM.Phone.Settings.Background = MetaData.background;
    var hasCustomBackground = NM.Phone.Functions.IsBackgroundCustom();

    if (!hasCustomBackground) {
        $(".phone-background").css({"background-image":"url('/html/img/backgrounds/"+NM.Phone.Settings.Background+".png')"})
    } else {
        $(".phone-background").css({"background-image":"url('"+NM.Phone.Settings.Background+"')"});
    }

    $("#settings-player-name").text(`${PlayerData.firstname} ${PlayerData.lastname}`);

    if (MetaData.profilepicture == "default") {
        $("[data-settingstab='profilepicture']").find('.settings-tab-icon').html('<img src="./img/default.png">');
        $(".phone-settings-image-source").prop('src', './img/default.png');
    } else {
        $("[data-settingstab='profilepicture']").find('.settings-tab-icon').html('<img src="'+MetaData.profilepicture+'">');
        $(".phone-settings-image-source").prop('src', MetaData.profilepicture);
    }
}

$(document).on('click', '#cancel-settings-submenu', function(e){
    e.preventDefault();
    $(`.settings-${NM.Phone.Settings.OpenedTab}-tab`).animate({"right": "-100%"}, 200);
});

// $(document).on('click', '#cancel-background', function(e){
//     e.preventDefault();
//     NM.Phone.Animations.TopSlideUp(".settings-"+NM.Phone.Settings.OpenedTab+"-tab", 200, -100);
// });

NM.Phone.Functions.IsBackgroundCustom = function() {
    var retval = true;
    $.each(NM.Phone.Settings.Backgrounds, function(i, background){
        if (NM.Phone.Settings.Background == i) {
            retval = false;
        }
    });
    return retval
}

$(document).on('click', '.background-option', function(e){
    e.preventDefault();
    PressedBackground = $(this).data('background');
    PressedBackgroundObject = this;
    OldBackground = $(this).parent().find('.background-option-current');
    IsChecked = $(this).find('.background-option-current');
    
    if (IsChecked.length === 0) {
        if (PressedBackground == "custom-background") {
            $(".background-custom").show();
        } else if (PressedBackground == "custom-camera") {
            $.post("http://qb-phone/Close", JSON.stringify({}));
            $("body").css("display", "none");

            $.post("http://qb-phone/TakeImage", JSON.stringify({}), function(url) {
                $("body").css("display", "block");

                if (url != "") {
                    NM.Phone.Settings.Background = url;
                    $(OldBackground).fadeOut(50, function(){
                        $(OldBackground).remove();
                    });

                    $(".phone-background").css({"background-image":"url('"+NM.Phone.Settings.Background+"')"});

                    $.post('http://qb-phone/SetBackground', JSON.stringify({
                        background: NM.Phone.Settings.Background,
                    }));
                }
            });
        } else {
            NM.Phone.Settings.Background = PressedBackground;
            $(OldBackground).fadeOut(50, function(){
                $(OldBackground).remove();
            });
            // $(PressedBackgroundObject).append('<div class="background-option-current"><i class="fas fa-check-circle"></i></div>');
        }
    }
});

$(document).on('click', '.quick-background', function(e){
    e.preventDefault();

    NM.Phone.Settings.Background = $(this).data("background")
    $(OldBackground).fadeOut(50, function(){
        $(OldBackground).remove();
    });
    // $(PressedBackgroundObject).append('<div class="background-option-current"><i class="fas fa-check-circle"></i></div>');
    // NM.Phone.Animations.TopSlideUp(".background-custom", 200, -23);
    $(".phone-background").css({"background-image":"url('/html/img/backgrounds/"+NM.Phone.Settings.Background+".png')"})

    $.post('http://qb-phone/SetBackground', JSON.stringify({
        background: NM.Phone.Settings.Background,
    }))

    NM.Phone.Notifications.Add("settings", "Ayarlar", "Arkaplan değiştirildi");
    $(".background-custom").hide();
});

$(document).on('click', '#accept-custom-background', function(e){
    e.preventDefault();

    NM.Phone.Settings.Background = $(".custom-background-input").val();
    $(OldBackground).fadeOut(50, function(){
        $(OldBackground).remove();
    });
    // $(PressedBackgroundObject).append('<div class="background-option-current"><i class="fas fa-check-circle"></i></div>');
    // NM.Phone.Animations.TopSlideUp(".background-custom", 200, -23);
    $(".phone-background").css({"background-image":"url('"+NM.Phone.Settings.Background+"')"});
    $.post('http://qb-phone/SetBackground', JSON.stringify({
        background: NM.Phone.Settings.Background,
    }));

    NM.Phone.Notifications.Add("settings", "Ayarlar", "Arkaplan değiştirildi");
    $(".background-custom").hide();
});

$(document).on('click', '#cancel-custom-background', function(e){
    e.preventDefault();

    $(".background-custom").hide();
});

// Profile Picture

var PressedProfilePicture = null;
var PressedProfilePictureObject = null;
var OldProfilePicture = null;
var ProfilePictureIsChecked = null;

$(document).on('click', '#accept-profilepicture', function(e){
    e.preventDefault();
    var ProfilePicture = NM.Phone.Data.MetaData.profilepicture;
    if (ProfilePicture === "default") {
        NM.Phone.Notifications.Add("settings", "Ayarlar", "Varsayılan profil fotoğrafı ayarlandı")
        $("[data-settingstab='profilepicture']").find('.settings-tab-icon').html('<img src="./img/default.png">');
        $(`.settings-${NM.Phone.Settings.OpenedTab}-tab`).animate({"right": "-100%"}, 200);
    } else {
        NM.Phone.Notifications.Add("settings", "Ayarlar", "Profil fotoğrafı değiştirildi")
        $("[data-settingstab='profilepicture']").find('.settings-tab-icon').html('<img src="'+ProfilePicture+'">');
    }
    // $(`.settings-${NM.Phone.Settings.OpenedTab}-tab`).animate({"right": "-100%"}, 200);
    $.post('http://qb-phone/UpdateProfilePicture', JSON.stringify({
        profilepicture: ProfilePicture,
    }));
});

$(document).on('click', '#accept-custom-profilepicture', function(e){
    e.preventDefault();
    let url = $(".custom-profilepicture-input").val();
    NM.Phone.Data.MetaData.profilepicture = url;
    $(OldProfilePicture).fadeOut(50, function(){
        $(OldProfilePicture).remove();
    });
    // $(PressedProfilePictureObject).append('<div class="profilepicture-option-current"><i class="fas fa-check-circle"></i></div>');
    // NM.Phone.Animations.TopSlideUp(".profilepicture-custom", 200, -23);
    
    NM.Phone.Notifications.Add("settings", "Ayarlar", "Profil fotoğrafı değiştirildi");
    $(`.settings-${NM.Phone.Settings.OpenedTab}-tab`).animate({"right": "-100%"}, 200);
    // NM.Phone.Animations.TopSlideUp(".settings-"+NM.Phone.Settings.OpenedTab+"-tab", 200, -100);
    $("[data-settingstab='profilepicture']").find('.settings-tab-icon').html('<img src="'+url+'">');
    $(".phone-settings-image-source").prop('src', url);
    $.post('http://qb-phone/UpdateProfilePicture', JSON.stringify({
        profilepicture: url,
    }));
    
    $(".profilepicture-custom").hide();
});

$(document).on('click', '.profilepicture-option', function(e){
    e.preventDefault();
    PressedProfilePicture = $(this).data('profilepicture');
    PressedProfilePictureObject = this;
    OldProfilePicture = $(this).parent().find('.profilepicture-option-current');
    ProfilePictureIsChecked = $(this).find('.profilepicture-option-current');
    if (ProfilePictureIsChecked.length === 0) {
        if (PressedProfilePicture == "default") {
            NM.Phone.Data.MetaData.profilepicture = PressedProfilePicture
            $(OldProfilePicture).fadeOut(50, function(){
                $(OldProfilePicture).remove();
            });

            let url = "./img/default.png";
            NM.Phone.Notifications.Add("settings", "Ayarlar", "Profil fotoğrafı değiştirildi");
            // NM.Phone.Animations.TopSlideUp(".settings-"+NM.Phone.Settings.OpenedTab+"-tab", 200, -100);
            $("[data-settingstab='profilepicture']").find('.settings-tab-icon').html('<img src="'+url+'">');
            $(".phone-settings-image-source").prop('src', url);
            $.post('http://qb-phone/UpdateProfilePicture', JSON.stringify({
                profilepicture: url,
            }));
            // $(PressedProfilePictureObject).append('<div class="profilepicture-option-current"><i class="fas fa-check-circle"></i></div>');
        } else if (PressedProfilePicture == "custom-camera") {
            $.post("http://qb-phone/Close", JSON.stringify({}));
            $("body").css("display", "none");

            $.post("http://qb-phone/TakeImage", JSON.stringify({}), function(url) {
                $("body").css("display", "block");

                if (url != "") {
                    NM.Phone.Notifications.Add("settings", "Ayarlar", "Profil fotoğrafı değiştirildi");
                    // $(`.settings-${NM.Phone.Settings.OpenedTab}-tab`).animate({"right": "-100%"}, 200);
                    // NM.Phone.Animations.TopSlideUp(".settings-"+NM.Phone.Settings.OpenedTab+"-tab", 200, -100);
                    $("[data-settingstab='profilepicture']").find('.settings-tab-icon').html('<img src="'+url+'">');
                    $(".phone-settings-image-source").prop('src', url);
                    $.post('http://qb-phone/UpdateProfilePicture', JSON.stringify({
                        profilepicture: url,
                    }));
                }
            });
        } else {
            $(".profilepicture-custom").show();
            // NM.Phone.Animations.TopSlideDown(".profilepicture-custom", 200, 13);
        }
    }
});

$(document).on('click', '#cancel-profilepicture', function(e){
    e.preventDefault();
    $(`.settings-${NM.Phone.Settings.OpenedTab}-tab`).animate({"right": "-100%"}, 200);
    // NM.Phone.Animations.TopSlideUp(".settings-"+NM.Phone.Settings.OpenedTab+"-tab", 200, -100);
});

$(document).on('click', '#take-profile-photo', function(e){
    e.preventDefault();

    $.post("http://qb-phone/Close", JSON.stringify({}));
    $("body").css("display", "none");

    $.post("http://qb-phone/TakeImage", JSON.stringify({}), function(url) {
        $("body").css("display", "block");

        if (url != "") {
            NM.Phone.Notifications.Add("settings", "Ayarlar", "Profil fotoğrafı değiştirildi");
            // $(`.settings-${NM.Phone.Settings.OpenedTab}-tab`).animate({"right": "-100%"}, 200);
            // NM.Phone.Animations.TopSlideUp(".settings-"+NM.Phone.Settings.OpenedTab+"-tab", 200, -100);
            $("[data-settingstab='profilepicture']").find('.settings-tab-icon').html('<img src="'+url+'">');
            $.post('http://qb-phone/UpdateProfilePicture', JSON.stringify({
                profilepicture: url,
            }));
        }
    });
});

$(document).on('click', '#cancel-custom-profilepicture', function(e){
    e.preventDefault();
    // NM.Phone.Animations.TopSlideUp(".profilepicture-custom", 200, -23);
    $(".profilepicture-custom").hide();
});