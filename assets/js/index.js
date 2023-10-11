// Only index page JavaScript code

$(document).ready(function() {
    // Video wrapper click
    $(".video-wrapper").on("click", function() {
        $(this).addClass("show-video");
    });

    // Features tabs click
    $(".features-section .tab-button").on("click", function() {
        $(".features-section .tab-button.active").removeClass("active");
        $(this).addClass("active");

        const tabId = $(this).data("tab-id");
        if($(window).outerWidth() >= 1024) {
            $(".features-section .desktop-tab-wrapper .tab-content.active").removeClass("active");
            $(`.features-section .desktop-tab-wrapper #${tabId}`).addClass("active");
        } else {
            $(".features-section .mobile-tab-wrapper .tab-content").removeClass("active");
            $(this).parent().find(".tab-content").addClass("active");
        }
    });
});