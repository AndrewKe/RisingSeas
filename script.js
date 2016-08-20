var lat;
var long;
var elevation;
var sea = 0;

function updateElevation() {
  console.log(elevation);
  console.log(sea);
  $("#current_alt").text("Elevation: " + Math.round(elevation-sea) + "ft.")

  if ((elevation-sea) > 0) {
    $("#safe").show()
    $("#fail").hide()
  }else {
    $("#safe").hide()
    $("#fail").show()
  }
}

$("#safe").hide()
$("#fail").hide()

navigator.geolocation.getCurrentPosition(function(location) {
  lat = location.coords.latitude
  long = location.coords.longitude

  $("#lat").text("Lat: " + lat)
  $("#long").text("Long: " + long)

  $("#map").attr("src", `https://www.google.com/maps/embed/v1/view?key=AIzaSyAuUqtxrPtu61EqJ14YwvPZCqX2f3tT8A8&center=${lat},${long}&zoom=10&maptype=roadmap`)

  var url = `http://ned.usgs.gov/epqs/pqs.php?x=${long}&y=${lat}&units=Feet&output=json`
  console.log(url);

  $.get(url, function(data, status){
    elevation = data.USGS_Elevation_Point_Query_Service.Elevation_Query.Elevation
    updateElevation();
  }, "json");

})


$("#yearSlider").on("change mousemove", function() {
  $("#year").html("Sea Level Rise: " + $(this).val() + " ft.")
  sea = $(this).val()
  updateElevation()
})
