$(document).ready(function() {
    // Mobile menu toggler
    $("#mobile-menu-toggler").on("click", function() {
        $(this).find("span").text(function(_, text) {
            return text === "menu" ? "close" : "menu";
        });

        $(".mobile-dropdown-menu:not(:first)").removeClass("show-menu");
        $(".mobile-menu-container").toggleClass("active");
    });

    // Mobile dropdown link click
    $(".mobile-dropdown-link").on("click", function() {
        const menuId = $(this).data("menuId");
        const dropdownMenu = $(`.mobile-menu-container #${menuId}`);
        dropdownMenu.addClass("show-menu");

        dropdownMenu.find(".back-button").on("click", function() {
            dropdownMenu.removeClass("show-menu");
        });
    });

    // Desktop dropdown link click
    let prevMenuId = null;
    $(".desktop-dropdown-link").on("click", function() {
        const menuId = $(this).data("menuId");
        const dropdownMenu = $(`.desktop-dropdown-container #${menuId}`);
        const dropdownLink = $(this);

        $(".desktop-dropdown-link").removeClass("active");
        $(this).addClass("active");

        if (menuId !== prevMenuId && prevMenuId) {
            $(`.desktop-dropdown-container #${prevMenuId}`).removeClass("show-menu").hide();
            $(`.desktop-menu-container [data-menu-id="${prevMenuId}"]`).removeClass("active");
        }

        prevMenuId = menuId;
        
        $(".desktop-dropdown-container").addClass("active");
        dropdownMenu.addClass("show-menu").slideDown(400);
        dropdownLink.addClass("active");

        const closeMenuButton = $(dropdownMenu).find(".menu-close-btn");

        closeMenuButton.on("click", function() {
            dropdownMenu.removeClass("show-menu").slideUp(400);
            setTimeout(() => {
                dropdownLink.removeClass("active");
                $(".desktop-dropdown-container").removeClass("active");
            }, 400);
        });
    });

    // Desktop dropdown tab click
    $(".desktop-dropdown-tab").on("click", function() {
        $(".desktop-dropdown-tab").removeClass("active");
        $(this).addClass("active");
        $(".desktop-dropdown-container .desktop-dropdown-section").removeClass("show-menu");
        const menuId = $(this).data("menuId");
        $(`.desktop-dropdown-container #${menuId}`).addClass("show-menu");
    });

    // Language menu link click
    $(".language-modal-opener").on("click", function() {
        $(".language-popup-modal").addClass("active");
        $("body").css("overflow-y", "hidden");
        const languageModalLink = $(this);
        languageModalLink.addClass("active");

        $(".language-modal-close-btn").on("click", function() {
            languageModalLink.removeClass("active");
            $("body").css("overflow-y", "auto");
            $(".language-popup-modal").removeClass("active");
        });
    })

    // Video wrapper click
    $(".video-wrapper").on("click", function() {
        $(this).addClass("show-video");
    });

    // Search input focus and blur
    $(".search-wrapper input").on("focus", function() {
        $(".search-bg-overlay").show();
        $(".hamburger-btn-wrapper").css("z-index", "25");
    }).on("blur", function() {
        $(".search-bg-overlay").hide();
        $(".hamburger-btn-wrapper").css("z-index", "50");
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

    // Toggle footer menu on click
    $("footer .footer-menu-toggler").on("click", function() {
        if($(window).innerWidth() > 768) return;
        const menuId = $(this).data("menu-id");
        $("footer").find(`#${menuId}`).slideToggle(200);
        $(this).toggleClass("active");
    });

    // Window resize
    $(window).resize(function() {
        if ($(window).innerWidth() >= 1024) { // Desktop view: Reset mobile menu state
            $(".mobile-menu-container").removeClass("active");
            $(".desktop-menu-container #mobile-menu-toggler span").text("menu");
        } else {  // Mobile view: Reset desktop dropdown menu state
            $(".desktop-dropdown-container").removeClass("active");
            $(".desktop-dropdown-link").removeClass("active");
            $(".desktop-dropdown-menu").removeClass("show-menu");
            $(".desktop-dropdown-menu").css("display", "none");
            $(".desktop-dropdown-section").removeClass("show-menu").first().addClass("show-menu");
        }

        // Reset footer menu when screen width is larger than 768px
        if($(window).innerWidth() > 768) {
            $("footer .footer-menu-toggler").removeClass("active");
            $("footer .footer-menu").css("display", "");
        }
    });
});