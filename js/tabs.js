// Dropins
$(".dropins-container .tab").click(function () {
    selectDropin(this);
});
function selectDropin(el) {
    var $el = $(el),
        container = $el.closest(".dropins-container"),
        activeTab = container.find(".tab.active"),
        activeContent = container.find(".content.active"),
        relContent = container.find("#" + $el.data("content"));

    if ($el.hasClass("active") && container.hasClass("showing")) {
        $el.removeClass("active");
        container.removeClass("showing");
        relContent.removeClass("active");
    }
    else {
        activeContent.removeClass("active");
        activeTab.removeClass("active");

        relContent.addClass("active");
        $el.addClass("active");

        if (!container.hasClass("showing"))
            container.addClass("showing");
    }
}

var hotkeys = [
    { key: "1", shift: false, alt: true, description: "Fane 1", func: function () { selectDropin($(".tab[data-content='content1']")); } },
    { key: "2", shift: false, alt: true, description: "Fane 2", func: function () { selectDropin($(".tab[data-content='content2']")); } },
    { key: "3", shift: false, alt: true, description: "Fane 3", func: function () { selectDropin($(".tab[data-content='content3']")); } },
];

$(document).keydown(function (e) {
    var hotkey = hotkeys.filter(hk => hk.key == e.key.charAt(0).toUpperCase() + e.key.slice(1) && hk.shift == e.shiftKey && hk.alt == e.altKey)[0];

    if (hotkey) {
        e.preventDefault();
        hotkey.func();
    }
});

// Align
$(".align-button").click(function(e){
    var container = $(".dropins-container");
    container.toggleClass("right").toggleClass("left");
});