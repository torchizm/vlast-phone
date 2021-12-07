Setuptows = function(data) {
    $(".tows-list").html("");

    if (data.length > 0) {
        $.each(data, function(i, tow){
            var element = '<div class="tow-list" id="towid-'+i+'"> <div class="tow-list-firstletter">' + (tow.name).charAt(0).toUpperCase() + '</div> <div class="tow-list-fullname">' + tow.fran + tow.name + '</div> <div class="tow-list-call"><i class="fas fa-phone"></i></div> </div>'
            $(".tows-list").append(element);
            $("#towid-"+i).data('towData', tow);
        });
    } else {
        var element = '<div class="tow-list"><div class="no-tows">There are no tow workers available</div></div>'
        $(".tows-list").append(element);
    }
}

$(document).on('click', '.tow-list-call', function(e){
    e.preventDefault();

    var towData = $(this).parent().data('towData');
    
    var cData = {
        number: towData.phone,
        name: towData.name
    }

    $.post('http://qb-phone/CallContact', JSON.stringify({
        ContactData: cData,
        Anonymous: NM.Phone.Data.AnonymousCall,
    }), function(status){
        if (cData.number !== NM.Phone.Data.PlayerData.charinfo.phone) {
            if (status.IsOnline) {
                if (status.CanCall) {
                    if (!status.InCall) {
                        if (NM.Phone.Data.AnonymousCall) {
                            NM.Phone.Notifications.Add("fas fa-phone", "Telefon", "Anonim arama başlattınız");
                        }
                        $(".phone-call-outgoing").css({"display":"block"});
                        $(".phone-call-incoming").css({"display":"none"});
                        $(".phone-call-ongoing").css({"display":"none"});
                        $(".phone-call-outgoing-caller").html(cData.name);
                        NM.Phone.Functions.HeaderTextColor("white", 400);
                        NM.Phone.Animations.TopSlideUp('.phone-application-container', 400, -160);
                        setTimeout(function(){
                            $(".tows-app").css({"display":"none"});
                            NM.Phone.Animations.TopSlideDown('.phone-application-container', 400, 0);
                            NM.Phone.Functions.ToggleApp("phone-call", "block");
                        }, 450);
    
                        CallData.name = cData.name;
                        CallData.number = cData.number;
                    
                        NM.Phone.Data.currentApplication = "phone-call";
                    } else {
                        NM.Phone.Notifications.Add("fas fa-phone", "Telefon", "Şuanda zaten başkasıyla konuşuyorsun");
                    }
                } else {
                    NM.Phone.Notifications.Add("fas fa-phone", "Telefon", "Kişi zaten başkasıyla konuşuyor");
                }
            } else {
                NM.Phone.Notifications.Add("fas fa-phone", "Telefon", "Kişi mevcut değil");
            }
        } else {
            NM.Phone.Notifications.Add("fas fa-phone", "Telefon", "Kendini arayamassın");
        }
    });
});