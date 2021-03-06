/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
function loadActors() {
  "use strict";
  $(".demo-list-action").empty();
  $.get("http://localhost:3000/actors", function(data) {
    $.each(data, function(index, actor) {
      var isStarred;
      if (actor.starred === true) {
        isStarred = "star";
      } else {
        isStarred = "star_border";
      }
      $(".demo-list-action").append(
        "<div class=\"mdl-list__item\"> <span class=\"mdl-list__item-primary-content\"> <i class=\"material-icons mdl-list__item-avatar\">person</i> <span>" + actor.name + "</span> </span> <a class=\"mdl-list__item-secondary-action\" href=\"#\" onclick=\"starToggle(this)\" id=\"star" + actor.id + "\"><i class=\"material-icons\">" + isStarred + "</i></a> </div>"
      );
    });
  });
}

function starToggle(starInfo) {
  "use strict";
  var id = starInfo.id.slice(-1);
  var actorData;
  $.get("http://localhost:3000/actors/" + id, function(data) {
    if (data.starred === true) {
      data.starred = false;
    } else {
      data.starred = true;
    }
    actorData = JSON.stringify(data);
    $.ajax({
      url: "http://localhost:3000/actors/" + id,
      type: "PUT",
      contentType: "application/json",
      data: actorData,
      success: function() {
        loadActors();
      }
    });
  });

}



$(document).ready(function() {
  "use strict";

  loadActors();

  $("#add-button").click(function() {
    $.post("http://localhost:3000/actors", {
      "name": $("#new-actor").val(),
      "starred": "false"
    }, function() {
      loadActors();
    });
  });




});