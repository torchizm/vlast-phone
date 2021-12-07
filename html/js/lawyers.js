SetupLawyers = function(data) {
    $(".lawyers-list").html("");

    if (data.length > 0) {
        $.each(data, function(i, lawyer){
            var element = '<div class="lawyer-list" id="lawyerid-'+i+'"> <div class="lawyer-list-firstletter">' + (lawyer.name).charAt(0).toUpperCase() + '</div> <div class="lawyer-list-fullname">' + lawyer.name + '</div> <div class="lawyer-list-call"><i class="fas fa-phone"></i></div> </div>'
            $(".lawyers-list").append(element);
            $("#lawyerid-"+i).data('LawyerData', lawyer);
        });
    } else {
        var element = '<div class="lawyer-list"><div class="no-lawyers">There are no lawyers available.</div></div>'
        $(".lawyers-list").append(element);
    }
}

$(document).on('click', '.lawyer-list-call', function(e){
    e.preventDefault();

    var LawyerData = $(this).parent().data('LawyerData');
    
    var cData = {
        number: LawyerData.phone,
        name: LawyerData.name
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
                            NM.Phone.Notifications.Add("fas fa-phone", "Phone", "لقد بدأت الإتصال كمجهول");
                        }
                        $(".phone-call-outgoing").css({"display":"block"});
                        $(".phone-call-incoming").css({"display":"none"});
                        $(".phone-call-ongoing").css({"display":"none"});
                        $(".phone-call-outgoing-caller").html(cData.name);
                        NM.Phone.Functions.HeaderTextColor("white", 400);
                        NM.Phone.Animations.TopSlideUp('.phone-application-container', 400, -160);
                        setTimeout(function(){
                            $(".lawyers-app").css({"display":"none"});
                            NM.Phone.Animations.TopSlideDown('.phone-application-container', 400, 0);
                            NM.Phone.Functions.ToggleApp("phone-call", "block");
                        }, 450);
    
                        CallData.name = cData.name;
                        CallData.number = cData.number;
                    
                        NM.Phone.Data.currentApplication = "phone-call";
                    } else {
                        NM.Phone.Notifications.Add("fas fa-phone", "Phone", "انت بالفعل مشغول");
                    }
                } else {
                    NM.Phone.Notifications.Add("fas fa-phone", "Phone", "الشخص يتحدث");
                }
            } else {
                NM.Phone.Notifications.Add("fas fa-phone", "Phone", "هذا الشخص غير متوفر");
            }
        } else {
            NM.Phone.Notifications.Add("fas fa-phone", "Phone", "لايمكنك الإتصال على نفسك");
        }
    });
});