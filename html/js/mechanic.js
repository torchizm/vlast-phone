Setupmechs = function(data) {
    $(".mechs-list").html("");

    if (data.length > 0) {
        $.each(data, function(i, mech){
            var element = '<div class="mech-list" id="mechid-'+i+'"> <div class="mech-list-firstletter">' + (mech.name).charAt(0).toUpperCase() + '</div> <div class="mech-list-fullname">' + mech.fran + mech.name + '</div> <div class="mech-list-call"><i class="fas fa-phone"></i></div> </div>'
            $(".mechs-list").append(element);
            $("#mechid-"+i).data('mechData', mech);
        });
    } else {
        var element = '<div class="mech-list"><div class="no-mechs">There are currently no mechanics available</div></div>'
        $(".mechs-list").append(element);
    }
}

$(document).on('click', '.mech-list-call', function(e){
    e.preventDefault();

    var mechData = $(this).parent().data('mechData');
    
    var cData = {
        number: mechData.phone,
        name: mechData.name
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
                            $(".mechs-app").css({"display":"none"});
                            NM.Phone.Animations.TopSlideDown('.phone-application-container', 400, 0);
                            NM.Phone.Functions.ToggleApp("phone-call", "block");
                        }, 450);
    
                        CallData.name = cData.name;
                        CallData.number = cData.number;
                    
                        NM.Phone.Data.currentApplication = "phone-call";
                    } else {
                        NM.Phone.Notifications.Add("fas fa-phone", "Telefon", "Zaten başkasıyla konuşuyorsun");
                    }
                } else {
                    NM.Phone.Notifications.Add("fas fa-phone", "Telefon", "Kişi zaten başkasıyla konuşuyor");
                }
            } else {
                NM.Phone.Notifications.Add("fas fa-phone", "Telefon", "Kişi mevcut değil");
            }
        } else {
            NM.Phone.Notifications.Add("fas fa-phone", "Telefon", "Kendinizi arayamassınız");
        }
    });
});