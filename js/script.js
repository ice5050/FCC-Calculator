$(document).ready(function() {
  var calculator = new Calculator({
    display: function(value) { $(".screen p").text(value); }
  });

  $(".control").on("click", ".cal-btn", function(e) {
    var $target = $(e.currentTarget),
        type = $target.data("type"),
        value = $target.data("value");

    calculator.eventHandler(type, value);
  });
});
