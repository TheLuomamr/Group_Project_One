var map, searchManager;

// zip code to be grabbed from <html>
// example zip here

var zip = 44236;


function GetMap() {
    map = new Microsoft.Maps.Map('#myMap', {
        credentials: "Auv1Og25-4VdEUdvHA2_Vaef_u1C3RW9f0o28hOZDVXIzP0W3yIpbuBqMkmDqT-Z"
    });

    //Make a request to geocode the zip.
    geocodeQuery(zip);
}

function geocodeQuery(query) {
    //If search manager is not defined, load the search module.
    if (!searchManager) {
        //Create an instance of the search manager and call the geocodeQuery function again.
        Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
            searchManager = new Microsoft.Maps.Search.SearchManager(map);
            geocodeQuery(query);
        });
    } else {
        var searchRequest = {
            where: query,
            callback: function (r) {
                //Add the first result to the map and zoom into it.
                if (r && r.results && r.results.length > 0) {
                    var pin = new Microsoft.Maps.Pushpin(r.results[0].location);
                    map.entities.push(pin);

                    map.setView({ bounds: r.results[0].bestView });
                }
            },
            errorCallback: function (e) {
                //If there is an error, alert the user about it.
                alert("No results found.");
            }
        };

        //Make the geocode request.
        searchManager.geocode(searchRequest);
        console.log(searchRequest);
    }
}

// edamam api for looking up food
// food-lookup API

var food = "burrito";
var app_id = "9234fec9";
var app_key = "1f15e7565e2265645897bc8370a1122b";
var queryURL = 'https://api.edamam.com/api/food-database/parser?ingr=' + food + '&app_id='+ app_id + '&app_key=' + app_key + '';
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        console.log(response);
    });

// zomato menu lookup API

var res_id = "16507624";
var user_key = "5a7e60e0cd1390fa635ea4117a269d9a";
var queryURL = "https://developers.zomato.com/api/v2.1/dailymenu?res_id=" + res_id + "";
$.ajax({
    url: queryURL,
    method: "GET",
    beforeSend: function(xhr){xhr.setRequestHeader('user-key', '5a7e60e0cd1390fa635ea4117a269d9a');},
    }).then(function(response) {
        console.log(response);
    });



    $("#submit-button").on("click", function() {
        zip = $("#zip-input").val();
        geocodeQuery(zip);
        console.log(zip);
    });

    $(document).ready(function(){  //new jQuery-Plug-ins down here
        $("#list").resizable();
        console.log( $("#list").resizable());
        $("#list").resizable({

            // selector for handle that starts dragging
            handleSelector: null,
          
            // resize the width
            resizeWidth: true,
          
            // resize the height
            resizeHeight: true,    
          
            // the side that the width resizing is relative to
            resizeWidthFrom: 'right',
          
            // the side that the height resizing is relative to
            resizeHeightFrom: 'bottom',     
          
            // disable touch-action on $handle
            // prevents browser level actions like forward back gestures
            touchActionNone: true,
          
            // instance id
            instanceId: null
          
          });
          $("#list").resizable({

            // hook into start drag operation (event passed)
            onDragStart: null,
          
            // hook into stop drag operation (event passed)
            onDragEnd: null,
          
            // hook into each drag operation (event passed)
            onDrag: null,
          
          });
                    
                

  

    });