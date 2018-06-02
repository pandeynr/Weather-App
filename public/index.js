var options = {
    //setting options as an object for later use
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    //creating our success function
    // remember the difference between a ` and '
    var crd = pos.coords;
  
    //$("#location").after(`Latitude : ${crd.latitude} </br>`);
    // $("#location").after(`Longitude: ${crd.longitude} </br>`);
    var geolocation = [crd.longitude, crd.latitude];
  
    // MAKE SURE YOU PUT HTTPS AND NOT JUST HTTP! >:(
    var url = "https://api.apixu.com/v1/current.json?key="; //This variable just holds our weather API URL
    var key = "2b2e48d95dc7415b917162649183101"; //parameter key for url
    var q = geolocation[1] + "," + geolocation[0]; //parameter q for url
    var _url = url + key + "&q=" + q;
    //$("#location").after(_url);
  
    $.getJSON(_url, function(data) {
      $("#location").append(
        data.location.name +
          ", " +
          data.location.region +
          "</br>" +
          data.location.country
      );
  
      $("#time").html(data.location.localtime);
      $("#weather").html(data.current.temp_f + " degrees Fahrenheit");
      $("#current").append(data.current.condition.text);
      $("#picture").attr("src", data.current.condition.icon);
    }).fail(function() {
      $("#location").prepend("FAILURE...");
    });
  }
  
  function error(err) {
    //our error function
    console.warn(`ERROR(${err.code}): ${err.message}`);
    return "NAN";
  }
  
  //running our geolocater!
  var geolocate = navigator.geolocation.getCurrentPosition(
    success,
    error,
    options
  );
  
  var weatherImg = [];
  
  function conversion() {
    var deg = $("#weather").html();
    deg = deg.split("");
    deg = deg.slice(0, 4);
    deg = deg.join("");
    deg = parseFloat(deg);
    if ($("#convert").html() == "To Celsius") {
      var deg_c = Math.floor(((deg - 32) / (1.8))*10)/10;
      $("#weather").html(deg_c);
      $("#weather").append(' degrees Celsius');
      $("#convert").html("To Fahrenheit");
    } else {
      var deg_f = Math.floor((deg * (1.8) + 32)*10);
          deg_f/=10;
      $("#weather").html(deg_f);
      $('#weather').append(' degrees Fahrenheit');
      $("#convert").html("To Celsius");
    }
  }
  
  $("#convert").hover(function() {
    "#convert".css("background-color", "red");
  });
  
  $(document).ready(function() {
    $("#convert").click(conversion);
  });
  

  