Setuptaxi = function(data) {
    $(".taxis-list").html("");

    if (data.length > 0) {
        $.each(data, function(i, taxi){
            var element = '<div class="taxi-list" id="taxiid-'+i+'"> <div class="taxi-list-firstletter">' + (taxi.name).charAt(0).toUpperCase() + '</div> <div class="taxi-list-fullname">' + taxi.fran + taxi.name + '</div> <div class="taxi-list-call"><i class="fas fa-phone"></i></div> </div>'
            $(".taxis-list").append(element);
            $("#taxiid-"+i).data('taxiData', taxi);
        });
    } else {
        var element = '<div class="taxi-list"><div class="no-taxis">There are currently no taxis available</div></div>'
        $(".taxis-list").append(element);
    }
}

$(document).on('click', '.taxi-list-call', function(e){
    e.preventDefault();

    var taxiData = $(this).parent().data('taxiData');
    
    var cData = {
        number: taxiData.phone,
        name: taxiData.name
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
                            $(".taxis-app").css({"display":"none"});
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