//app ui
var ul = document.getElementById("wallpapers");
ul.onclick = function (event) {
  let lis = ul.getElementsByTagName("IMG");
  for (let i = 0; i <= lis.length - 1; i++) {
    lis[i].style.outline = "";
  }

  var img = event.target;
  //console.log(img.tagName);
  if (img.tagName != "IMG") {
    if (img.parentElement.tagName == "DIV" && !hasClass(img, "desc")) return;

    img = img.parentElement.querySelector("img");
    if (img == null) return;
  }

  //update customise controls
  img.style.outline = "2.5px solid #a425a0";
  $("#ui-app-customise-controls-rain").css("display", "none");
  $("#ui-app-customise-controls-test").css("display", "none");
  $("#ui-app-customise-controls-snow").css("display", "none");
  switch (img.parentElement.id) {
    case "rain":
      setScene("rain");
      $("#ui-app-customise-controls-rain").css("display", "inline");
      break;
    case "clouds":
      setScene("clouds");
      $("#ui-app-customise-controls-test").css("display", "inline");
      break;
    case "snow":
      setScene("snow");
      $("#ui-app-customise-controls-snow").css("display", "inline");
      break;
  }
};

//app ui (scrolling)
$(window).scroll(function () {
  var requiredOffset = 100;

  // Between 0 and 1 (inclusive)
  var percentage = Math.min(1, $(window).scrollTop() / requiredOffset);

  // Starts at requiredOffset and goes down to 0
  var marginTop = requiredOffset * (1 - percentage);

  // Opacity of frame
  var alpha = 1 - percentage;

  $(".heading").css("opacity", alpha);
  $(".ui-app").css("margin-top", marginTop);
  $("#ui-app-library").css("filter", `brightness(${1 - (1 - alpha) / 4})`);
  $("#ui-app-customize-heading").css("opacity", 1 - alpha);
  $("#ui-app-customise").css("opacity", 1 - alpha);
  setProperty("u_brightness", 0.75 + (1 - alpha) / 8);

  if (alpha == 0) {
    $("#ui-app-library").css("pointer-events", "none");
    $("#ui-app-customise").css("pointer-events", "auto");
  } else {
    $("#ui-app-library").css("pointer-events", "auto");
    $("#ui-app-customise").css("pointer-events", "none");
  }
});

//pause threejs
//ref: https://stackoverflow.com/questions/21561480/trigger-event-when-user-scroll-to-specific-element-with-jquery
var element_position = $("#page-gallery").offset().top;
var screen_height = $(window).height();
var activation_offset = 0.5; //determines how far up the the page the element needs to be before triggering the function
var activation_point = element_position - screen_height * activation_offset;
var max_scroll_height = $("body").height() - screen_height - 5; //-5 for a little bit of buffer

//does something when user scrolls to it OR
//does it when user has reached the bottom of the page and hasn't triggered the function yet
$(window).on("scroll", function () {
  var y_scroll_pos = window.pageYOffset;

  var element_in_view = y_scroll_pos > activation_point;
  var has_reached_bottom_of_page = max_scroll_height <= y_scroll_pos && !element_in_view;

  if (element_in_view || has_reached_bottom_of_page) {
    setPause(true);
  } else {
    setPause(false);
  }
});

//helpers
function hasClass(element, className) {
  return (" " + element.className + " ").indexOf(" " + className + " ") > -1;
}

function scrollToElement(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
}
