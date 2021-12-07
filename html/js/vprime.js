SetupPrime = function(data) {
    $(".vprime2-list").html("");
    $(".vprime2-list").css({"left": "30vh"});
    $(".vprime-header").css({"display": "none"});
    $(".vprime-header").css({"left": "30vh"});
    AnimationPrime();
    setTimeout(function(){
        $(".vprime-header").animate({left:0+"vh"}, 300).css({"display": "block"});
        if (data.length > 0) {
            $.each(data, function(i, vprime){
                var element = '<div class="vprime-list" id="primeid-'+i+'"> <div class="vprime-list-firstletter">' + '<img src="img/apps/' + vprime.item + '.png"' + 'width="70vh" height="70vh" style="border-radius:50%">' + '</div> <div class="vprime-list-fullname">' + vprime.label + '</div> <div class="vprime-list-call"><i class="fas fa-shopping-cart"></i></div> </div>'
                vprime.id = i;
                $(".vprime2-list").animate({left:0+"vh"}, 300).append(element);
                $("#primeid-"+i).data('primeData', vprime);
            });
        }
    }, 2000)
}

AnimationPrime = function() {
    $(".vprime-logo").css({"left": "0vh"});
    $(".vprime-app-loading").css({
        "display":"block",
        "left":"0vh",
    });
    setTimeout(function(){
        CurrentTab = "accounts";
        setTimeout(function(){
            $(".vprime-app-loaded").css({"display":"block"}).animate({"padding-left":"0"}, 300);
            $(".vprime-app-accounts").animate({left:0+"vh"}, 300);
            $(".vprime-app-loading").animate({
                left: -30+"vh"
            },300, function(){
                $(".vprime-app-loading").css({"display":"none"});
            });
        }, 1500)
    }, 500)
}

$(document).on('click', '.vprime-list-call', function(e){
    e.preventDefault();
        var primeData = $(this).parent().data('primeData');
        $.post('http://qb-phone/PrimeOrder', JSON.stringify({
            item: primeData.item,
            label: primeData.label
        }), function(status){
            if (status) {
                NM.Phone.Notifications.Add("vlastprime", 'V Prime', 'Depo işaretlendi.');
            } else {
                NM.Phone.Notifications.Add("vlastprime", 'V Prime', 'Alabileceğin bir iş yok.');
            }
        });
});
