SetupArrests = function(data) {
    $(".arrests2-list").html("");

    if (data.length > 0) {
        $.each(data, function(i, arrests){
            var element = '<div class="arrests-list" id="arrestsid-'+i+'"> <div class="arrests-list-firstletter">'+ '</div> <div class="arrests-list-fullname">' + arrests.name + " " + arrests.lastname + '</div> <div class="arrests-list-call"></div> </div>'
            $(".arrests2-list").append(element);
            $("#arrestsid-"+i).data('arrestsData', arrests);
        });
    } else {
        var element = '<div class="arrests-list"><div class="no-arrests">Aranan kimse yok.</div></div>'
        $(".arrests2-list").append(element);
    }
}