$(function () {
  $(".note").before("<p class='admonition-title note'>Note</p>");
  $(".seealso").before("<p class='admonition-title seealso'>See also</p>");
  $(".warning").before("<p class='admonition-title warning'>Warning</p>");
  $(".caution").before("<p class='admonition-title caution'>Caution</p>");
  $(".attention").before("<p class='admonition-title attention'>Attention</p>");
  $(".tip").before("<p class='admonition-title tip'>Tip</p>");
  $(".important").before("<p class='admonition-title important'>Important</p>");
  $(".hint").before("<p class='admonition-title hint'>Hint</p>");
  $(".error").before("<p class='admonition-title error'>Error</p>");
  $(".danger").before("<p class='admonition-title danger'>Danger</p>");
});

$(document).ready(function () {
  // Shift nav in mobile when clicking the menu.
  $(document).on("click", "[data-toggle='wy-nav-top']", function () {
    $("[data-toggle='wy-nav-shift']").toggleClass("shift");
    $("[data-toggle='rst-versions']").toggleClass("shift");
  });
  // Close menu when you click a link.
  $(document).on("click", ".wy-menu-vertical .current ul li a", function () {
    $("[data-toggle='wy-nav-shift']").removeClass("shift");
    $("[data-toggle='rst-versions']").toggleClass("shift");
  });
  $(document).on("click", "[data-toggle='rst-current-version']", function () {
    $("[data-toggle='rst-versions']").toggleClass("shift-up");
  });
  // Make tables responsive
  $("table.docutils:not(.field-list)").wrap(
    "<div class='wy-table-responsive'></div>"
  );
});

$(document).ready(function () {
  $("#text-table-of-contents ul").first().addClass("nav");
  // ScrollSpy also requires that we use
  // a Bootstrap nav component.
  $("body").scrollspy({target: "#text-table-of-contents"});

  // DON'T add sticky table headers (Fix issue #69?)
  // $('table').stickyTableHeaders();

  // set the height of tableOfContents
  var $postamble = $("#postamble");
  var $tableOfContents = $("#table-of-contents");
  $tableOfContents.css({paddingBottom: $postamble.outerHeight()});

  // add TOC button
  var toggleSidebar = $(
    '<div id="toggle-sidebar"><a href="#table-of-contents"><h2>Table of Contents</h2></a></div>'
  );
  $("#content").prepend(toggleSidebar);

  // add close button when sidebar showed in mobile screen
  var closeBtn = $('<a class="close-sidebar" href="#">Close</a>');
  var tocTitle = $("#table-of-contents").find("h2");
  tocTitle.append(closeBtn);

  // links to tags in the same page don't work on OneDrive
  // Force these to work by emulating the behaviour with javascript
  $('a[href^="#org"]').click(function (e) {
    // prevent default following of links
    e.preventDefault();

    // get top of element position
    var el = $(e.target.getAttribute("href"));
    var pos = el.offset().top;

    // scroll to element
    $("html, body").animate(
      {
        scrollTop: pos,
      },
      500
    );
  });

  // Set title on sidebar/table of contents
  $("#table-of-contents h2").text($(".title").text());

  // add toggle code buttons
  //$(".org-src-container .src").each(function (index) {
  //  var toggle_code_a = $("<a class='toggle-code-link'>").append("code");
  //  var element = $(this);
  //  toggle_code_a.click(function (e) {
  //    element.toggle();
  //  });
  //  element.before($("<p class='toggle-code-span'>").append(toggle_code_a));
  //  element.show();
  //});
  
  // Global toggle code buttons
  $(".org-src-container .src-R").hide()
  
  $("#postamble").append(
    $("<a class='.toggle-code-link'>toggle source view</a>").click(
      function() {
        $(".org-src-container .src-R").toggle()
      }));
  
  // Use fancybox for all images
  $("img").fancybox();
});

window.SphinxRtdTheme = (function (jquery) {
  var stickyNav = (function () {
    var navBar,
      win,
      stickyNavCssClass = "stickynav",
      applyStickNav = function () {
        if (navBar.height() <= win.height()) {
          navBar.addClass(stickyNavCssClass);
        } else {
          navBar.removeClass(stickyNavCssClass);
        }
      },
      enable = function () {
        applyStickNav();
        win.on("resize", applyStickNav);
      },
      init = function () {
        navBar = jquery("nav.wy-nav-side:first");
        win = jquery(window);
      };
    jquery(init);
    return {
      enable: enable,
    };
  })();
  return {
    StickyNav: stickyNav,
  };
})($);
