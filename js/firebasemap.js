var map;
var markers=[];

// Initialize Firebase();
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var config = {
    apiKey: "AIzaSyDhwagzflGKi8shiEsCYCaSjd94mfh8U-s",
    authDomain: "airport-viewer-f0a63.firebaseapp.com",
    databaseURL: "https://airport-viewer-f0a63-default-rtdb.firebaseio.com",
    projectId: "airport-viewer-f0a63",
    storageBucket: "airport-viewer-f0a63.appspot.com",
    messagingSenderId: "26508673482",
    appId: "1:26508673482:web:6f57c4703ecdf4ea3b0f33",
    measurementId: "G-G5HLX5K129"
};



firebase.initializeApp(config);









const auth = firebase.auth();










// create map
function initMap() {
    var myLatLng = { lat: 39.8, lng: -98.5 };

    map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 4.6,
        center: myLatLng
    });
}

//Test connection to the Firestore
var db = firebase.firestore();
db.enablePersistence();

//run once at refresh to display the markers
var checkedValue = $('.messageCheckbox:checked').val();

db.collection("VAairports")
    .get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            var latitude = doc.data().Latitude;
            var longitude = doc.data().Longitude;
            var name = doc.data().ID;
            var elevation = doc.data().Elevation;
            var rwlength = doc.data().RunwayLength;
            var rwwidth = doc.data().RunwayWidth;
            var basedjets = doc.data().BasedJets;
            var atct = doc.data().ATCT;
            var ils = doc.data().Full_ILS;
            var part139 = doc.data().Part139;
            var ownership = doc.data().Ownership;
            var als = doc.data().ALS;

            // custom icon based on availability
            //var Customicons = {
            //    low: {
            //        icon: 'img/low.png'
            //    },
            //    high: {
             //       icon: 'img/high.png'
             //   },
            //    none: {
            //        icon: 'img/none.png'
            //    }
            //};
            // reading specific data from Firebase database
            //var water = doc.data().water;
            //var dairy = doc.data().dairy;
            //var cleaning = doc.data().cleaning;
            //var paper = doc.data().paper;
            //var meat = doc.data().meat;
            //var bread = doc.data().bread;
            //var produce = doc.data().produce;

            //var address = doc.data().Address;



            // display availability based on the product type that is checked
            //if (checkedValue == "water") {
            //    var producttype = water;
            //}
            //if (checkedValue == "bread_grain") {
            //    var producttype = bread;
            //}
            //if (checkedValue == "dairy_products") {
            //    var producttype = dairy;
            //}
            //if (checkedValue == "meat_seafood") {
            //    var producttype = meat;
            //}
            //if (checkedValue == "paper_products") {
            //    var producttype = paper;
            //}
            //if (checkedValue == "produce") {
            //    var producttype = produce;
            //}
            //if (checkedValue == "cleaning_products") {
            //    var producttype = cleaning;
            //}


            //var icon = Customicons[producttype] || {};

            // create the marker info window text
            var contentString = "<p>" + "<b>" + "Airport ID: " + "</b>" + name + "<b>" + "Elevation: " + "</b>" + elevation;
            // marker infowindow
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            // Add the markers to the map
            var marker = new google.maps.Marker({
                position: {
                    lat: latitude,
                    lng: longitude
                },
                //icon: icon.icon,
                map: map,
                title: name
            });
            markers.push(marker);
            console.log(markers);
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            })


        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });


function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
    console.log(markers);
}

var elev_tooltipSlider = document.getElementById('elevation-slider');

noUiSlider.create(elev_tooltipSlider, {
    start: [0, 5000],
    //step: 1000,
    tooltips: true,
    connect: [false, true, false],
    range: {
        'min': 0,
        'max': 5000
    },
    //pips: {
        //mode: 'steps',
        //mode: 'values',
        //values: [1000, 2000, 3000, 4000, 5000],
       // density: 1,
        //stepped: false

    //}
});
var slideelevation;
var slideelevationone =0;
var slideelevationtwo =5000;
//console.log("elev1 "+slideelevationone);

elev_tooltipSlider.noUiSlider.on('change', function () {
    var slideelevation = elev_tooltipSlider.noUiSlider.get();
    console.log(slideelevation[0]);
    slideelevationone = slideelevation[0];
    slideelevationtwo = slideelevation[1];
    console.log(slideelevationone);
    console.log(slideelevationtwo);
    //source_trails.setQuery('SELECT * FROM ectrails WHERE difficulty >= ' + trailValues[0] + ' AND difficulty <= ' + trailValues[1]);
    // remove all the existing markers
    refreshmap();
    console.log("Refresh");

});



var basedjets_tooltipSlider = document.getElementById('basedjets-slider');

noUiSlider.create(basedjets_tooltipSlider, {
    start: [0, 50],
    //step: 1000,
    tooltips: true,
    connect: [false, true, false],
    range: {
        'min': 0,
        'max': 50
    },
});
var slidebasedjets;
var slidebasedjetsone = 0;
var slidebasedjetstwo = 50;

basedjets_tooltipSlider.noUiSlider.on('change', function () {
    var slidebasedjets = basedjets_tooltipSlider.noUiSlider.get();
    console.log(slidebasedjets[0]);
    slidebasedjetsone = slidebasedjets[0];
    slidebasedjetstwo = slidebasedjets[1];
    console.log(slidebasedjetsone);
    console.log(slidebasedjetstwo);
    // remove all the existing markers
    refreshmap();
    console.log("Refresh");
});






var rwlength_tooltipSlider = document.getElementById('rwlength-slider');

noUiSlider.create(rwlength_tooltipSlider, {
    start: [0, 15000],
    //step: 1000,
    tooltips: true,
    connect: [false, true, false],
    range: {
        'min': 0,
        'max': 15000
    },
});
var sliderwlength;
var sliderwlengthone = 0;
var sliderwlengthtwo = 15000;

rwlength_tooltipSlider.noUiSlider.on('change', function () {
    var sliderwlength = rwlength_tooltipSlider.noUiSlider.get();
    console.log(sliderwlength[0]);
    sliderwlengthone = sliderwlength[0];
    sliderwlengthtwo = sliderwlength[1];
    // remove all the existing markers
    refreshmap();
    console.log("Refresh");
});








var rwwidth_tooltipSlider = document.getElementById('rwwidth-slider');

noUiSlider.create(rwwidth_tooltipSlider, {
    start: [0, 300],
    //step: 1000,
    tooltips: true,
    connect: [false, true, false],
    range: {
        'min': 0,
        'max': 300
    },
});
var sliderwwidth;
var sliderwwidthone = 0;
var sliderwwidthtwo = 300;

rwwidth_tooltipSlider.noUiSlider.on('change', function () {
    var sliderwwidth = rwwidth_tooltipSlider.noUiSlider.get();
    console.log(sliderwwidth[0]);
    sliderwwidthone = sliderwwidth[0];
    sliderwwidthtwo = sliderwwidth[1];
    // remove all the existing markers
    refreshmap();
    console.log("Refresh");
});





//Ownership Radio button value update
var Ownerbutton = 'na';
function OwnerPU() {
    Ownerbutton = document.getElementById('OwnerPU').value;
    refreshmap();
}
function OwnerPR() {
    Ownerbutton = document.getElementById('OwnerPR').value;
    refreshmap();
}
function Ownerna() {
    Ownerbutton = document.getElementById('Ownerna').value;
    refreshmap();
}




//ATCT Radio button value update
var ATCTbutton = 'na';
function ATCTon() {
    ATCTbutton = document.getElementById('ATCTon').value;
    refreshmap();
}
function ATCToff() {
    ATCTbutton = document.getElementById('ATCToff').value;
    refreshmap();
}
function ATCTna() {
    ATCTbutton = document.getElementById('ATCTna').value;
    refreshmap();
}


//ILS Radio button value update
var ILSbutton = 'na';
function ILSon() {
    ILSbutton = document.getElementById('ILSon').value;
    refreshmap();
}
function ILSoff() {
    ILSbutton = document.getElementById('ILSoff').value;
    refreshmap();
}
function ILSna() {
    ILSbutton = document.getElementById('ILSna').value;
    refreshmap();
}



//ALS Radio button value update
var ALSbutton = 'na';
function ALSon() {
    ALSbutton = document.getElementById('ALSon').value;
    refreshmap();
}
function ALSoff() {
    ALSbutton = document.getElementById('ALSoff').value;
    refreshmap();
}
function ALSna() {
    ALSbutton = document.getElementById('ALSna').value;
    refreshmap();
}



//Part139 Radio button value update
var Part139button = 'na';
function Part139on() {
    Part139button = document.getElementById('Part139on').value;
    refreshmap();
}
function Part139off() {
    Part139button = document.getElementById('Part139off').value;
    refreshmap();
}
function Part139na() {
    Part139button = document.getElementById('Part139na').value;
    refreshmap();
}













function refreshmap() {
    setMapOnAll(null);
    markers=[];
    // runs through each store in the database and adds a marker
    db.collection("VAairports")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data());
                var latitude = doc.data().Latitude;
                var longitude = doc.data().Longitude;
                var name = doc.data().ID;
                var elevation = doc.data().Elevation;
                var rwlength = doc.data().RunwayLength;
                var rwwidth = doc.data().RunwayWidth;
                var atct = doc.data().ATCT;
                var basedjets = doc.data().BasedJets;
                var ils = doc.data().Full_ILS;
                var part139 = doc.data().Part139;
                var ownership = doc.data().Ownership;
                var als = doc.data().ALS;
                console.log(name);
                console.log(basedjets);
                //console.log(slideelevation[0]);


                // create the marker info window text
                var contentString = "<p>" + "<b>" + "Airport ID: " + "</b>" + name + "<b>" + "Elevation: " + "</b>" + elevation + "<b>" + "Based Jets: " + "</b>" + basedjets;

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                console.log("elev1 "+slideelevationone);
                console.log("elev1");



                // Only adds markers if they fall within the slider ranges and within the other filter criteria
                if ((elevation>slideelevationone && elevation<slideelevationtwo) && (basedjets>=slidebasedjetsone && basedjets<=slidebasedjetstwo) && (rwlength>sliderwlengthone && rwlength<sliderwlengthtwo)
                && (rwwidth>sliderwwidthone && rwwidth<sliderwwidthtwo) && (atct===ATCTbutton || ATCTbutton==='na') && (ils===ILSbutton || ILSbutton==='na') && (part139===Part139button || Part139button==='na')
                && (ownership===Ownerbutton || Ownerbutton==='na') && (als===ALSbutton || ALSbutton==='na')) {
                    var marker = new google.maps.Marker({
                        position: {
                            lat: latitude,
                            lng: longitude
                        },
                        //icon: icon.icon,
                        map: map,
                        title: name
                    });
                    markers.push(marker);
                    marker.addListener('click', function () {
                        infowindow.open(map, marker);
                    })
                }

            });
            console.log(markers);
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}
















// Run each time a box is checked or a drop down list is changed
// This updates the markers that are displayed
function changecheck() {
    var checkedValue = $('.messageCheckbox:checked').val();

    // remove all the existing markers
    setMapOnAll(null);
    markers=[];
    console.log(markers);

    // runs through each store in the database and adds a marker
    db.collection("VAairports")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                var latitude = doc.data().Lat;
                var longitude = doc.data().Lon;
                var name = doc.data().name;

                var Customicons = {
                    low: {
                        icon: 'img/low.png'
                    },
                    high: {
                        icon: 'img/high.png'
                    },
                    none: {
                        icon: 'img/none.png'
                    }
                };
                var water = doc.data().water;
                var dairy = doc.data().dairy;
                var cleaning = doc.data().cleaning;
                var paper = doc.data().paper;
                var meat = doc.data().meat;
                var bread = doc.data().bread;
                var produce = doc.data().produce;

                var address = doc.data().Address;
                var type = doc.data().type;

                //checkedValue = "bread_grain";
                console.log(checkedValue);
                console.log(bread);

                if (checkedValue == "water") {
                    var producttype = water;
                }
                if (checkedValue == "bread_grain") {
                    var producttype = bread;
                }
                if (checkedValue == "dairy_products") {
                    var producttype = dairy;
                }
                if (checkedValue == "meat_seafood") {
                    var producttype = meat;
                }
                if (checkedValue == "paper_products") {
                    var producttype = paper;
                }
                if (checkedValue == "produce") {
                    var producttype = produce;
                }
                if (checkedValue == "cleaning_products") {
                    var producttype = cleaning;
                }
                console.log(producttype);

                var icon = Customicons[producttype] || {};

                var contentString = "<p>" + "<b>" + "Store Name: " + "</b>" + name + "<br />" +
                    "<b>" + "Address: " + "</b>" + address + "<br />" +
                    "<b>" + "Dairy: " + "</b>" + dairy + "<br />" +
                    "<b>" + "Bread & Grains: " + "</b>" + bread + "<br />" +
                    "<b>" + "Fresh Produce: " + "</b>" + produce + "<br />" +
                    "<b>" + "Meat & Seafood: " + "</b>" + meat + "<br />" +
                    "<b>" + "Bottled Water: " + "</b>" + water + "<br />" +
                    "<b>" + "Paper Products: " + "</b>" + paper + "<br />" +
                    "<b>" + "Cleaning Products: " + "</b>" + cleaning + "<br />" +
                    "</p>";

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                // What store is selected from the dropdown list
                var storenameselection = document.getElementById("store_label_one");
                var storenameselectionresult = storenameselection.options[storenameselection.selectedIndex].value;
                console.log(storenameselectionresult);
                // What store type is selected
                var storetypeselection = document.getElementById("store_type_one");
                var storetypeselectionresult = storetypeselection.options[storetypeselection.selectedIndex].value;
                console.log(storetypeselectionresult);


                // Only adds markers if the user has selected all stores or a specific store
                if ((storenameselectionresult=="All" || storenameselectionresult==name) && (storetypeselectionresult=="All" || storetypeselectionresult==type)) {
                    var marker = new google.maps.Marker({
                        position: {
                            lat: latitude,
                            lng: longitude
                        },
                        icon: icon.icon,
                        map: map,
                        title: name
                    });
                    markers.push(marker);
                    marker.addListener('click', function () {
                        infowindow.open(map, marker);
                    })
                }

            });
            console.log(markers);
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}
// updates the firebase database based on the report that is filled out
function updateFirebase(){

    // get the availability of each product from the report
    var ele = document.getElementsByName("water");
        for (var i = 0, length = ele.length; i < length; i++) {
        if (ele[i].checked) {
            var newwaterlevel=ele[i].value;
            console.log(newwaterlevel);
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    var ele1 = document.getElementsByName("dairy_products");
    for (var i = 0, length = ele1.length; i < length; i++) {
        if (ele1[i].checked) {
            var newdairy=ele1[i].value;
            console.log(newdairy);
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    var ele2 = document.getElementsByName("bread_grain");
    for (var i = 0, length = ele2.length; i < length; i++) {
        if (ele2[i].checked) {
            var newbread=ele2[i].value;
            console.log(newbread);
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    var ele3 = document.getElementsByName("produce");
    for (var i = 0, length = ele3.length; i < length; i++) {
        if (ele3[i].checked) {
            var newproduce=ele3[i].value;
            console.log(newproduce);
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    var ele4 = document.getElementsByName("meat_seafood");
    for (var i = 0, length = ele4.length; i < length; i++) {
        if (ele4[i].checked) {
            var newmeat=ele4[i].value;
            console.log(newmeat);
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    var ele5 = document.getElementsByName("paper_products");
    for (var i = 0, length = ele5.length; i < length; i++) {
        if (ele5[i].checked) {
            var newpaper=ele5[i].value;
            console.log(newpaper);
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }

    var ele6 = document.getElementsByName("cleaning_products");
    for (var i = 0, length = ele6.length; i < length; i++) {
        if (ele6[i].checked) {
            var newcleaning=ele6[i].value;
            console.log(newcleaning);
            // only one radio can be logically checked, don't check the rest
            break;
        }
    }
    // Get the name of the store to be updated
    var storename = document.getElementById("store_label");
    var storenameresult = storename.options[storename.selectedIndex].value;



    //alert(ATCTbutton);
//function updateATCT() {
//    if (document.getElementById('ATCTon').checked) {
//        ATCTbutton = document.getElementById('ATCTon').value;
    //       //alert(ATCTbutton);
    //   }
    //   else if (document.getElementById('ATCToff').checked) {
    //       ATCTbutton = document.getElementById('ATCToff').value;
    //       //alert(ATCTbutton);
    //   }
    //   else if (document.getElementById('ATCTna').checked) {
    //       ATCTbutton = document.getElementById('ATCTna').value;
    //       //alert(ATCTbutton);
    //   }
    //   alert(ATCTbutton);
    //   refreshmap();
//}
    // Update the Firebase database with the info from the report
    db.collection('stores').doc(storenameresult).update({
        water: newwaterlevel,
        dairy: newdairy,
        bread: newbread,
        produce: newproduce,
        meat: newmeat,
        paper: newpaper,
        cleaning: newcleaning
    })

    // Wait one second then reload the map with updated info
    setTimeout(location.reload.bind(location), 1000);
    return false;

}


