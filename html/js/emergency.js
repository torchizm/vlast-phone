Setupemergencys = function(data) {
    $(".emergencys-list").html("");

    if (data.length > 0) {
        $.each(data, function(i, emergency){
            var element = '<div class="emergency-list" id="emergencyid-'+i+'"> <div class="emergency-list-firstletter">' + (emergency.name).charAt(0).toUpperCase() + '</div> <div class="emergency-list-fullname">' + emergency.name + '</div> <div class="emergency-list-call"><i class="fas fa-phone"></i></div> </div>'
            $(".emergencys-list").append(element);
            $("#emergencyid-"+i).data('emergencyData', emergency);
        });
    } else {
        var element = '<div class="emergency-list"><div class="no-emergencys">There are no services available.</div></div>'
        $(".emergencys-list").append(element);
    }
}

$(document).on('click', '.emergency-list-call', function(e){
    e.preventDefault();

    var emergencyData = $(this).parent().data('emergencyData');
    
    var cData = {
        number: emergencyData.phone,
        name: emergencyData.name
    }

    $.post('http://qb-phone/CallContact', JSON.stringify({
        ContactData: cData,
        Anonymous: NM.Phone.Data.AnonymousCall,
    }), function(status){
        if (cData.number !== NM.Phone.Data.PlayerData.charinfo.phone) {
            if (status.CanCall) {
                if (!status.InCall) {
                    if (NM.Phone.Data.AnonymousCall) {
                        NM.Phone.Notifications.Add("fas fa-phone", "Phone", "You have started an anonymous call!");
                    }
                    $(".phone-call-outgoing").css({"display":"block"});
                    $(".phone-call-incoming").css({"display":"none"});
                    $(".phone-call-ongoing").css({"display":"none"});
                    $(".phone-call-outgoing-caller").html(cData.name);
                    NM.Phone.Functions.HeaderTextColor("white", 400);
                    NM.Phone.Animations.TopSlideUp('.phone-application-container', 400, -160);
                    setTimeout(function(){
                        $(".emergencys-app").css({"display":"none"});
                        NM.Phone.Animations.TopSlideDown('.phone-application-container', 400, 0);
                        NM.Phone.Functions.ToggleApp("phone-call", "block");
                    }, 450);

                    CallData.name = cData.name;
                    CallData.number = cData.number;
                
                    NM.Phone.Data.currentApplication = "phone-call";
                } else {
                    NM.Phone.Notifications.Add("fas fa-phone", "Phone", "You are already busy!");
                }
            } else {
                NM.Phone.Notifications.Add("fas fa-phone", "Phone", "This person is on the phone!");
            }
        } else {
            NM.Phone.Notifications.Add("fas fa-phone", "Phone", "You cannot call your own number!");
        }
    });
});