// LAYER EVENTS & VARIABLES
// Add layer as usual
//carto.setDefaultAuth({ username: 'dleech', apiKey: 'b55e5adbfb2e0ba8b592fa378a32036c8a983b9c' });
//const source_trails = new carto.source.Dataset('ectrails');
const source_airports = new carto.source.SQL('SELECT * FROM airportsforcarto');
//const trailFilter = new carto.filter.Category('routecat', { in: ['Class I', 'Class II', 'Class III'] });
//source_trails.addFilter(trailFilter);




const style_airports = new carto.style.CartoCSS(`
#airports-layer {
  marker-width: 12;
  marker-fill: ramp([npias], (#855C75, #D9AF6B, #AF6458, #736F4C, #526A83, #625377, #68855C, #9C9C5E, #7C7C7C), ("NON-NPIAS  ", "General Aviation ", "Primary Non-Hub", "Reliever ", "Commercial Service ", "Primary Small", "Primary Medium", "Primary Large"), "=");
  marker-fill-opacity: 1;
  marker-file: ramp([npias], (url('https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/airport-18.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/airport-18.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/airport-18.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/airport-18.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/airport-18.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/airport-18.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/airport-18.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/airport-18.svg'), url('https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/airport-18.svg')), ("NON-NPIAS  ", "General Aviation ", "Primary Non-Hub", "Reliever ", "Commercial Service ", "Primary Small", "Primary Medium", "Primary Large"), "=");
  marker-allow-overlap: true;
  marker-line-width: 1;
  marker-line-color: #FFFFFF;
  marker-line-opacity: 1;
}
`);


const layer_airports = new carto.layer.Layer(source_airports, style_airports, {
    featureClickColumns: ['id','facilityname','npias','elevation','runwaylength','basedjets']
});


client.addLayer(layer_airports);
client.getLeafletLayer().addTo(map).bringToFront();


//const comp_id = [];
//const comp_rwlength = [];
//layer_airports.on('featureClicked', function (featureEvent) {
    //let airport_selected_id = featureEvent.data.id;
    //let airport_selected_rwlength = featureEvent.data.runwaylength;
    //console.log(airport_selected_id);
    //console.log(airport_selected_rwlength);
    //comp_id.push(airport_selected_id);
    //comp_rwlength.push(airport_selected_rwlength);
    //console.log(comp_id);
    //console.log(comp_rwlength);
//});



















// This is the initial legend, we are using NPIAS
const legend = $("#legend-content");
legend.empty();
var select = '';
const npias_categories = ["NON-NPIAS  ", "General Aviation ", "Primary Non-Hub", "Reliever ", "Commercial Service ", "Primary Small", "Primary Medium", "Primary Large"];
const npias_colors = ["#855C75", "#D9AF6B", "#AF6458", "#736F4C", "#526A83", "#625377", "#68855C", "#9C9C5E", "#7C7C7C"];
select += '<h3 href="#" ' + 'id='+'"all"><span style="background-color: white"></span><b style="font-size: 15px; color: #2D3C43"><u>NPIAS Catergory</u></b></h3>';
for (var i=0;i<npias_categories.length;i++){
    var npias_color = npias_colors[i];
    var npias_cat = npias_categories[i];
    //select += '<a href="#" id="'+cat.valueOf()+'"><span style="background-color:'+color+'"><b>'+cat.toString()+'</b></span></a>' + "<br>";
    select += '<li href="#" style="height: 20px;" id="'+npias_cat.valueOf()+'"><span class="square" style="background-color:'+npias_color+'; height: 4px"></span><b class="legend-content" style="color: #6c757d; font-size: 12px;">'+npias_cat.toString()+'</b></li>';
}
$('#legend').html(select);

// Change the legend as the symbolization is changed
function styleNPIAS() {
    style_airports.setContent(
        '#airports-layer {\n' +
        '            marker-width: 12;\n' +
        '            marker-fill: ramp([npias], (#855C75, #D9AF6B, #AF6458, #736F4C, #526A83, #625377, #68855C, #9C9C5E, #7C7C7C), ("NON-NPIAS  ", "General Aviation ", "Primary Non-Hub", "Reliever ", "Commercial Service ", "Primary Small", "Primary Medium", "Primary Large"), "=");\n' +
        '            marker-fill-opacity: 1;\n' +
        '            marker-file: url(\'https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/airport-18.svg\');\n' +
        '            marker-allow-overlap: true;\n' +
        '            marker-line-width: 1;\n' +
        '            marker-line-color: #FFFFFF;\n' +
        '            marker-line-opacity: 1;\n' +
        '          }'
    );
    var states = $('select#state-drop').val();
    console.log(states);
    legend.empty();
    var select = '';
    const npias_categories = ["NON-NPIAS  ", "General Aviation ", "Primary Non-Hub", "Reliever ", "Commercial Service ", "Primary Small", "Primary Medium", "Primary Large"];
    const npias_colors = ["#855C75", "#D9AF6B", "#AF6458", "#736F4C", "#526A83", "#625377", "#68855C", "#9C9C5E", "#7C7C7C"];
    select += '<h3 href="#" ' + 'id='+'"all"><span style="background-color: white"></span><b style="font-size: 15px; color: #2D3C43"><u>NPIAS Catergory</u></b></h3>';
    for (var i=0;i<npias_categories.length;i++){
        var npias_color = npias_colors[i];
        var npias_cat = npias_categories[i];
        //select += '<a href="#" id="'+cat.valueOf()+'"><span style="background-color:'+color+'"><b>'+cat.toString()+'</b></span></a>' + "<br>";
        select += '<li href="#" style="height: 20px;" id="'+npias_cat.valueOf()+'"><span class="square" style="background-color:'+npias_color+'; height: 4px"></span><b class="legend-content" style="color: #6c757d; font-size: 12px;">'+npias_cat.toString()+'</b></li>';
    }
    $('#legend').html(select)
}




function styleRegion() {
    style_airports.setContent(
        '#airports-layer {\n' +
        '            marker-width: 12;\n' +
        '            marker-fill: ramp([region], (#5F4690, #1D6996, #38A6A5, #0F8554, #73AF48, #EDAD08, #E17C05, #CC503E, #94346E), ("AGL", "ASW", "ASO", "ANM", "AEA", "ACE", "AWP", "AAL", "ANE"), "=");\n' +
        '            marker-fill-opacity: 1;\n' +
        '            marker-file: url(\'https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/airport-18.svg\');\n' +
        '            marker-allow-overlap: true;\n' +
        '            marker-line-width: 1;\n' +
        '            marker-line-color: #FFFFFF;\n' +
        '            marker-line-opacity: 1;\n' +
        '          }'
    );
    legend.empty();
    //const styles = event.styles;
    //const categories = style_airports.getCategories();
    const categories = ["Great Lakes (AGL)", " Southwest (ASW)", "Southern (ASO)", "Northwest Mountain (ANM)", "Eastern (AEA)", "Central (ACE)", "Western Pacific (AWP)", "Alaskan (AAL)", "New England (ANE)"];
    const colors = ["#5F4690", "#1D6996", "#38A6A5", "#0F8554", "#73AF48", "#EDAD08", "#E17C05", "#CC503E", "#94346E"];
    console.log(categories[1]);
    console.log(colors[1]);
    //var i;
    //for (i=0; i < categories.length; i++) {
    //    legend.append(`<li><div class="circle" style="background: #5F4690"></div>categories[i]</li>`)
    //}
    //for (category of categories){
     //   legend.append(`<li><div class="circle" style="background:${category.value}"></div> ${category.name}</li>`)
    //}
    //for (i=0; i < categories.length; i++) {
    //    var color = colors[i];
    //    var cat = categories[i];
    //   legend.append(`<li><div class="circle" style="background:#5F4690"></div> cat.toString()</li>`)
    //}


    var select = '';
    select += '<h3 href="#" ' + 'id='+'"all"><span style="background-color: white"></span><b style="font-size: 15px; color: #2D3C43"><u>Region</u></b></h3>';
    for (var i=0;i<categories.length;i++){
        var color = colors[i];
        var cat = categories[i];
        //select += '<a href="#" id="'+cat.valueOf()+'"><span style="background-color:'+color+'"><b>'+cat.toString()+'</b></span></a>' + "<br>";
        select += '<li href="#" style="height: 20px;" id="'+cat.valueOf()+'"><span class="square" style="background-color:'+color+'; height: 4px"></span><b class="legend-content" style="color: #6c757d; font-size: 12px;">'+cat.toString()+'</b></li>';
    }
    $('#legend').html(select)
}









function styleElevation() {
    style_airports.setContent(
        '#airports-layer {\n' +
        '            marker-width: 12;\n' +
        '            marker-fill: ramp([elevation], (#fbe6c5, #f5ba98, #ee8a82, #dc7176, #c8586c, #9c3f5d, #70284a), jenks);\n' +
        '            marker-fill-opacity: 1;\n' +
        '            marker-file: url(\'https://s3.amazonaws.com/com.cartodb.users-assets.production/maki-icons/airport-18.svg\');\n' +
        '            marker-allow-overlap: true;\n' +
        '            marker-line-width: 1;\n' +
        '            marker-line-color: #FFFFFF;\n' +
        '            marker-line-opacity: 1;\n' +
        '          }'
    );



    legend.empty();

    var select = '';
    select += '<h3 href="#" ' + 'id='+'"all"><span style="background-color: white"></span><b style="font-size: 15px; color: #2D3C43"><u>Elevation</u></b></h3>';
    //select += '<li href="#" style="height: 20px;" id="'+cat.valueOf()+'"><span class="square" style="opacity: 1 ; background: linear-gradient(90deg , #fbe6c5 , #f5ba98 , #ee8a82 , #dc7176 , #c8586c , #9c3f5d , #70284a)"></span><b class="legend-content" style="color: #6c757d; font-size: 12px;">'+cat.toString()+'</b></li>';
    select +=  '<div class="u-flex u-justifySpace u-bSpace"><p class="CDB-Text CDB-Size-small">-210 ft</p><p class="CDB-Text CDB-Size-small"> 9,900 ft</p></div>';
    select += '<div class="legend-choropleth " style="opacity: 1 ; background: linear-gradient(90deg , #fbe6c5 , #f5ba98 , #ee8a82 , #dc7176 , #c8586c , #9c3f5d , #70284a)">';

    $('#legend').html(select)

}




let sql_state = '';
let state_int = '';
function statechange(){
    var states = $('select#state-drop').val();
    //console.log(states.length);
    sql_state = '';
    state_int = '';
    if (states !== null){
        //console.log("states is real");
        if (states.length >= 1) {
            //console.log("yeeepp");
            for (var i = 0; i < states.length; i++) {
                if (i == 0) {
                    //console.log("first");
                    state_int = " AND ((state LIKE '" + states[i] + "')";
                    sql_state += state_int;
                }
                else {
                    //console.log(i);
                    //console.log(states[0]);
                    state_int = " OR (state LIKE '" + states[i] + "')";
                    sql_state += state_int;
                    //console.log(sql_state);
                }

            }
            sql_state += ')';
        }
    }
    else {
        //console.log("States is fake");
        sql_state = " AND (state LIKE 'none')";
    }

    console.log(sql_state);
    source_airports.setQuery('SELECT * FROM airportsforcarto WHERE elevation >= ' + slideelevationone + ' AND elevation <= ' + slideelevationtwo +
        ' AND basedjets >= ' + slidebasedjetsone + ' AND basedjets <= ' + slidebasedjetstwo + ' AND runwaylength >= ' + sliderwlengthone +
        ' AND runwaylength <= ' + sliderwlengthtwo + ' AND runwaywidth >= ' + sliderwwidthone + ' AND runwaywidth <= ' + sliderwwidthtwo +
        ' AND total_operations_from_5010 >= ' + slideopsone + ' AND total_operations_from_5010 <= ' + slideopstwo +
        ' AND enplanements_cy2019 >= ' + slideenplanementsone + ' AND enplanements_cy2019 <= ' + slideenplanementstwo + ' ' + sql_ownership +
        sql_atct + sql_ils + sql_als + sql_part139 + sql_state + sql_npias
    );
    //console.log(sql_state);
}

let sql_npias = '';
let npias_int = '';
function npiaschange(){
    var npias = $('select#npias-drop').val();
    sql_npias = '';
    npias_int = '';
    if (npias !== null){
        if (npias.length >= 1) {
            //console.log("yeeepp");
            for (var i = 0; i < npias.length; i++) {
                if (i == 0) {
                    npias_int = " AND ((NPIAS LIKE '" + npias[i] + "%')";
                    sql_npias += npias_int;
                }
                else {
                    npias_int = " OR (NPIAS LIKE '" + npias[i] + "%')";
                    sql_npias += npias_int;
                }
            }
            sql_npias += ')';
        }
    }
    else {
        sql_npias = " AND (NPIAS LIKE 'none')";
    }
    source_airports.setQuery('SELECT * FROM airportsforcarto WHERE elevation >= ' + slideelevationone + ' AND elevation <= ' + slideelevationtwo +
        ' AND basedjets >= ' + slidebasedjetsone + ' AND basedjets <= ' + slidebasedjetstwo + ' AND runwaylength >= ' + sliderwlengthone +
        ' AND runwaylength <= ' + sliderwlengthtwo + ' AND runwaywidth >= ' + sliderwwidthone + ' AND runwaywidth <= ' + sliderwwidthtwo +
        ' AND total_operations_from_5010 >= ' + slideopsone + ' AND total_operations_from_5010 <= ' + slideopstwo +
        ' AND enplanements_cy2019 >= ' + slideenplanementsone + ' AND enplanements_cy2019 <= ' + slideenplanementstwo + ' ' + sql_ownership +
        sql_atct + sql_ils + sql_als + sql_part139 + sql_state + sql_npias
    );
}








// Hover popup
const popup = L.popup({ closeButton: true });
layer_airports.on(carto.layer.events.FEATURE_OVER, featureEvent => {
    popup.setLatLng(featureEvent.latLng);
    if (!popup.isOpen()) {
        popup.setContent("<b>" + 'Airport ID: ' + "</b>" + featureEvent.data.id + "<br>" +
                            "<b>" + 'Facility Name: ' + "</b>" + featureEvent.data.facilityname + "<br>" +
                            "<b>" + 'NPIAS Category: ' + "</b>" + featureEvent.data.npias + "<br>" +
                            "<b>" + 'Elevation: ' + "</b>" + featureEvent.data.elevation + "' MSL" + "<br>" +
                            "<b>" + 'Runway Length: ' + "</b>" + featureEvent.data.runwaylength + " ft" + "<br>" +
                            "<b>" + 'Based Jets: ' + "</b>" + featureEvent.data.basedjets);
        popup.openOn(map);
    }
});
layer_airports.on(carto.layer.events.FEATURE_OUT, featureEvent => {
    popup.removeFrom(map);
});








var basedjets_tooltipSlider = document.getElementById('basedjets-slider');

noUiSlider.create(basedjets_tooltipSlider, {
    start: [0, 200],
    tooltips: true,
    connect: [false, true, false],
    //step: 10,
    format: wNumb({
        decimals: 0
    }),
    range: {
        'min': 0,
        'max': 200
    },

});

var slidebasedjets;
var slidebasedjetsone = 0;
var slidebasedjetstwo = 200;


basedjets_tooltipSlider.noUiSlider.on('change', function () {
    slidebasedjets = basedjets_tooltipSlider.noUiSlider.get();
    slidebasedjetsone = slidebasedjets[0];
    slidebasedjetstwo = slidebasedjets[1];
    console.log(slidebasedjetstwo);
    source_airports.setQuery('SELECT * FROM airportsforcarto WHERE elevation >= ' + slideelevationone + ' AND elevation <= ' + slideelevationtwo +
        ' AND basedjets >= ' + slidebasedjetsone + ' AND basedjets <= ' + slidebasedjetstwo + ' AND runwaylength >= ' + sliderwlengthone +
        ' AND runwaylength <= ' + sliderwlengthtwo + ' AND runwaywidth >= ' + sliderwwidthone + ' AND runwaywidth <= ' + sliderwwidthtwo +
        ' AND total_operations_from_5010 >= ' + slideopsone + ' AND total_operations_from_5010 <= ' + slideopstwo +
        ' AND enplanements_cy2019 >= ' + slideenplanementsone + ' AND enplanements_cy2019 <= ' + slideenplanementstwo + ' ' + sql_ownership +
        sql_atct + sql_ils + sql_als + sql_part139 + sql_state + sql_npias
    );
});




// Elevation Slider
var elev_tooltipSlider = document.getElementById('elevation-slider');

noUiSlider.create(elev_tooltipSlider, {
    start: [-210, 10000],
    //step: 1000,
    tooltips: true,
    connect: [false, true, false],
    format: wNumb({
        decimals: 0
    }),
    range: {
        'min': -210,
        'max': 10000
    },
});
var slideelevation;
var slideelevationone =-210;
var slideelevationtwo =10000;

elev_tooltipSlider.noUiSlider.on('change', function () {
    var slideelevation = elev_tooltipSlider.noUiSlider.get();
    console.log(slideelevation[0]);
    slideelevationone = slideelevation[0];
    slideelevationtwo = slideelevation[1];
    console.log(slideelevationone);
    console.log(slideelevationtwo);
    source_airports.setQuery('SELECT * FROM airportsforcarto WHERE elevation >= ' + slideelevationone + ' AND elevation <= ' + slideelevationtwo +
        ' AND basedjets >= ' + slidebasedjetsone + ' AND basedjets <= ' + slidebasedjetstwo + ' AND runwaylength >= ' + sliderwlengthone +
        ' AND runwaylength <= ' + sliderwlengthtwo + ' AND runwaywidth >= ' + sliderwwidthone + ' AND runwaywidth <= ' + sliderwwidthtwo +
        ' AND total_operations_from_5010 >= ' + slideopsone + ' AND total_operations_from_5010 <= ' + slideopstwo +
        ' AND enplanements_cy2019 >= ' + slideenplanementsone + ' AND enplanements_cy2019 <= ' + slideenplanementstwo + ' ' + sql_ownership +
        sql_atct + sql_ils + sql_als + sql_part139 + sql_state + sql_npias
    );
});





// Runway Length Slider
var rwlength_tooltipSlider = document.getElementById('rwlength-slider');

noUiSlider.create(rwlength_tooltipSlider, {
    start: [0, 16000],
    //step: 1000,
    tooltips: true,
    connect: [false, true, false],
    format: wNumb({
        decimals: 0
    }),
    range: {
        'min': 0,
        'max': 16000
    },
});
var sliderwlength;
var sliderwlengthone =0;
var sliderwlengthtwo =16000;

rwlength_tooltipSlider.noUiSlider.on('change', function () {
    var sliderwlength = rwlength_tooltipSlider.noUiSlider.get();
    sliderwlengthone = sliderwlength[0];
    sliderwlengthtwo = sliderwlength[1];
    source_airports.setQuery('SELECT * FROM airportsforcarto WHERE elevation >= ' + slideelevationone + ' AND elevation <= ' + slideelevationtwo +
        ' AND basedjets >= ' + slidebasedjetsone + ' AND basedjets <= ' + slidebasedjetstwo + ' AND runwaylength >= ' + sliderwlengthone +
        ' AND runwaylength <= ' + sliderwlengthtwo + ' AND runwaywidth >= ' + sliderwwidthone + ' AND runwaywidth <= ' + sliderwwidthtwo +
        ' AND total_operations_from_5010 >= ' + slideopsone + ' AND total_operations_from_5010 <= ' + slideopstwo +
        ' AND enplanements_cy2019 >= ' + slideenplanementsone + ' AND enplanements_cy2019 <= ' + slideenplanementstwo + ' ' + sql_ownership +
        sql_atct + sql_ils + sql_als + sql_part139 + sql_state + sql_npias
    );
});




// Runway Width Slider
var rwwidth_tooltipSlider = document.getElementById('rwwidth-slider');

noUiSlider.create(rwwidth_tooltipSlider, {
    start: [0, 5500],
    //step: 1000,
    tooltips: true,
    connect: [false, true, false],
    format: wNumb({
        decimals: 0
    }),
    range: {
        'min': 0,
        'max': 5500
    },
});
var sliderwwidth;
var sliderwwidthone =0;
var sliderwwidthtwo =5500;

rwwidth_tooltipSlider.noUiSlider.on('change', function () {
    var sliderwwidth = rwwidth_tooltipSlider.noUiSlider.get();
    sliderwwidthone = sliderwwidth[0];
    sliderwwidthtwo = sliderwwidth[1];
    source_airports.setQuery('SELECT * FROM airportsforcarto WHERE elevation >= ' + slideelevationone + ' AND elevation <= ' + slideelevationtwo +
        ' AND basedjets >= ' + slidebasedjetsone + ' AND basedjets <= ' + slidebasedjetstwo + ' AND runwaylength >= ' + sliderwlengthone +
        ' AND runwaylength <= ' + sliderwlengthtwo + ' AND runwaywidth >= ' + sliderwwidthone + ' AND runwaywidth <= ' + sliderwwidthtwo +
        ' AND total_operations_from_5010 >= ' + slideopsone + ' AND total_operations_from_5010 <= ' + slideopstwo +
        ' AND enplanements_cy2019 >= ' + slideenplanementsone + ' AND enplanements_cy2019 <= ' + slideenplanementstwo + ' ' + sql_ownership +
        sql_atct + sql_ils + sql_als + sql_part139 + sql_state + sql_npias
    );
});





// Enplanements Slider
var enplanements_tooltipSlider = document.getElementById('enplanements-slider');

noUiSlider.create(enplanements_tooltipSlider, {
    start: [0, 60000000],
    //step: 1000,
    tooltips: true,
    connect: [false, true, false],
    format: wNumb({
        decimals: 0
    }),
    range: {
        'min': 0,
        'max': 60000000
    },
});
var slideenplanements;
var slideenplanementsone =0;
var slideenplanementstwo =60000000;

enplanements_tooltipSlider.noUiSlider.on('change', function () {
    var slideenplanements = enplanements_tooltipSlider.noUiSlider.get();
    slideenplanementsone = slideenplanements[0];
    slideenplanementstwo = slideenplanements[1];
    source_airports.setQuery('SELECT * FROM airportsforcarto WHERE elevation >= ' + slideelevationone + ' AND elevation <= ' + slideelevationtwo +
        ' AND basedjets >= ' + slidebasedjetsone + ' AND basedjets <= ' + slidebasedjetstwo + ' AND runwaylength >= ' + sliderwlengthone +
        ' AND runwaylength <= ' + sliderwlengthtwo + ' AND runwaywidth >= ' + sliderwwidthone + ' AND runwaywidth <= ' + sliderwwidthtwo +
        ' AND total_operations_from_5010 >= ' + slideopsone + ' AND total_operations_from_5010 <= ' + slideopstwo +
        ' AND enplanements_cy2019 >= ' + slideenplanementsone + ' AND enplanements_cy2019 <= ' + slideenplanementstwo + ' ' + sql_ownership +
        sql_atct + sql_ils + sql_als + sql_part139 + sql_state + sql_npias
    );
});




// Operations Slider
var ops_tooltipSlider = document.getElementById('ops-slider');

noUiSlider.create(ops_tooltipSlider, {
    start: [0, 700000],
    //step: 1000,
    tooltips: true,
    connect: [false, true, false],
    format: wNumb({
        decimals: 0
    }),
    range: {
        'min': 0,
        'max': 700000
    },
});
var slideops;
var slideopsone =0;
var slideopstwo =700000;

ops_tooltipSlider.noUiSlider.on('change', function () {
    var slideops = ops_tooltipSlider.noUiSlider.get();
    slideopsone = slideops[0];
    slideopstwo = slideops[1];
    source_airports.setQuery('SELECT * FROM airportsforcarto WHERE elevation >= ' + slideelevationone + ' AND elevation <= ' + slideelevationtwo +
        ' AND basedjets >= ' + slidebasedjetsone + ' AND basedjets <= ' + slidebasedjetstwo + ' AND runwaylength >= ' + sliderwlengthone +
        ' AND runwaylength <= ' + sliderwlengthtwo + ' AND runwaywidth >= ' + sliderwwidthone + ' AND runwaywidth <= ' + sliderwwidthtwo +
        ' AND total_operations_from_5010 >= ' + slideopsone + ' AND total_operations_from_5010 <= ' + slideopstwo +
        ' AND enplanements_cy2019 >= ' + slideenplanementsone + ' AND enplanements_cy2019 <= ' + slideenplanementstwo + ' ' + sql_ownership +
        sql_atct + sql_ils + sql_als + sql_part139 + sql_state + sql_npias
    );
});









//Ownership Radio button value update
let sql_ownership = "";
function OwnerPU() {
    sql_ownership = " AND ownership LIKE 'PU'";

    source_airports.setQuery('SELECT * FROM airportsforcarto WHERE elevation >= ' + slideelevationone + ' AND elevation <= ' + slideelevationtwo +
        ' AND basedjets >= ' + slidebasedjetsone + ' AND basedjets <= ' + slidebasedjetstwo + ' AND runwaylength >= ' + sliderwlengthone +
        ' AND runwaylength <= ' + sliderwlengthtwo + ' AND runwaywidth >= ' + sliderwwidthone + ' AND runwaywidth <= ' + sliderwwidthtwo +
        ' AND total_operations_from_5010 >= ' + slideopsone + ' AND total_operations_from_5010 <= ' + slideopstwo +
        ' AND enplanements_cy2019 >= ' + slideenplanementsone + ' AND enplanements_cy2019 <= ' + slideenplanementstwo + ' ' + sql_ownership +
        sql_atct + sql_ils + sql_als + sql_part139 + sql_state + sql_npias
    );
}
function OwnerPR() {
    sql_ownership = " AND ownership LIKE 'PR'";

    source_airports.setQuery('SELECT * FROM airportsforcarto WHERE elevation >= ' + slideelevationone + ' AND elevation <= ' + slideelevationtwo +
        ' AND basedjets >= ' + slidebasedjetsone + ' AND basedjets <= ' + slidebasedjetstwo + ' AND runwaylength >= ' + sliderwlengthone +
        ' AND runwaylength <= ' + sliderwlengthtwo + ' AND runwaywidth >= ' + sliderwwidthone + ' AND runwaywidth <= ' + sliderwwidthtwo +
        ' AND total_operations_from_5010 >= ' + slideopsone + ' AND total_operations_from_5010 <= ' + slideopstwo +
        ' AND enplanements_cy2019 >= ' + slideenplanementsone + ' AND enplanements_cy2019 <= ' + slideenplanementstwo + ' ' + sql_ownership +
        sql_atct + sql_ils + sql_als + sql_part139 + sql_state + sql_npias
    );
}
function Ownerna() {
    sql_ownership = '';

    source_airports.setQuery('SELECT * FROM airportsforcarto WHERE elevation >= ' + slideelevationone + ' AND elevation <= ' + slideelevationtwo +
        ' AND basedjets >= ' + slidebasedjetsone + ' AND basedjets <= ' + slidebasedjetstwo + ' AND runwaylength >= ' + sliderwlengthone +
        ' AND runwaylength <= ' + sliderwlengthtwo + ' AND runwaywidth >= ' + sliderwwidthone + ' AND runwaywidth <= ' + sliderwwidthtwo +
        ' AND total_operations_from_5010 >= ' + slideopsone + ' AND total_operations_from_5010 <= ' + slideopstwo +
        ' AND enplanements_cy2019 >= ' + slideenplanementsone + ' AND enplanements_cy2019 <= ' + slideenplanementstwo + ' ' + sql_ownership +
        sql_atct + sql_ils + sql_als + sql_part139 + sql_state + sql_npias
    );
}






//ATCT Radio button value update
let sql_atct = "";
function ATCTon() {
    sql_atct = " AND atct LIKE 'true'";

    source_airports.setQuery('SELECT * FROM airportsforcarto WHERE elevation >= ' + slideelevationone + ' AND elevation <= ' + slideelevationtwo +
        ' AND basedjets >= ' + slidebasedjetsone + ' AND basedjets <= ' + slidebasedjetstwo + ' AND runwaylength >= ' + sliderwlengthone +
        ' AND runwaylength <= ' + sliderwlengthtwo + ' AND runwaywidth >= ' + sliderwwidthone + ' AND runwaywidth <= ' + sliderwwidthtwo +
        ' AND total_operations_from_5010 >= ' + slideopsone + ' AND total_operations_from_5010 <= ' + slideopstwo +
        ' AND enplanements_cy2019 >= ' + slideenplanementsone + ' AND enplanements_cy2019 <= ' + slideenplanementstwo + ' ' + sql_ownership +
        sql_atct + sql_ils + sql_als + sql_part139 + sql_state + sql_npias
    );
}
function ATCToff() {
    sql_atct = " AND atct LIKE 'false'";

    source_airports.setQuery('SELECT * FROM airportsforcarto WHERE elevation >= ' + slideelevationone + ' AND elevation <= ' + slideelevationtwo +
        ' AND basedjets >= ' + slidebasedjetsone + ' AND basedjets <= ' + slidebasedjetstwo + ' AND runwaylength >= ' + sliderwlengthone +
        ' AND runwaylength <= ' + sliderwlengthtwo + ' AND runwaywidth >= ' + sliderwwidthone + ' AND runwaywidth <= ' + sliderwwidthtwo +
        ' AND total_operations_from_5010 >= ' + slideopsone + ' AND total_operations_from_5010 <= ' + slideopstwo +
        ' AND enplanements_cy2019 >= ' + slideenplanementsone + ' AND enplanements_cy2019 <= ' + slideenplanementstwo + ' ' + sql_ownership +
        sql_atct + sql_ils + sql_als + sql_part139 + sql_state + sql_npias
    );
}
function ATCTna() {
    sql_atct = '';

    source_airports.setQuery('SELECT * FROM airportsforcarto WHERE elevation >= ' + slideelevationone + ' AND elevation <= ' + slideelevationtwo +
        ' AND basedjets >= ' + slidebasedjetsone + ' AND basedjets <= ' + slidebasedjetstwo + ' AND runwaylength >= ' + sliderwlengthone +
        ' AND runwaylength <= ' + sliderwlengthtwo + ' AND runwaywidth >= ' + sliderwwidthone + ' AND runwaywidth <= ' + sliderwwidthtwo +
        ' AND total_operations_from_5010 >= ' + slideopsone + ' AND total_operations_from_5010 <= ' + slideopstwo +
        ' AND enplanements_cy2019 >= ' + slideenplanementsone + ' AND enplanements_cy2019 <= ' + slideenplanementstwo + ' ' + sql_ownership +
        sql_atct + sql_ils + sql_als + sql_part139 + sql_state + sql_npias
    );
}





//ILS Radio button value update
let sql_ils = "";
function ILSon() {
    sql_ils = " AND full_ils LIKE 'true'";

    source_airports.setQuery('SELECT * FROM airportsforcarto WHERE elevation >= ' + slideelevationone + ' AND elevation <= ' + slideelevationtwo +
        ' AND basedjets >= ' + slidebasedjetsone + ' AND basedjets <= ' + slidebasedjetstwo + ' AND runwaylength >= ' + sliderwlengthone +
        ' AND runwaylength <= ' + sliderwlengthtwo + ' AND runwaywidth >= ' + sliderwwidthone + ' AND runwaywidth <= ' + sliderwwidthtwo +
        ' AND total_operations_from_5010 >= ' + slideopsone + ' AND total_operations_from_5010 <= ' + slideopstwo +
        ' AND enplanements_cy2019 >= ' + slideenplanementsone + ' AND enplanements_cy2019 <= ' + slideenplanementstwo + ' ' + sql_ownership +
        sql_atct + sql_ils + sql_als + sql_part139 + sql_state + sql_npias
    );
}
function ILSoff() {
    sql_ils = " AND full_ils LIKE 'false'";

    source_airports.setQuery('SELECT * FROM airportsforcarto WHERE elevation >= ' + slideelevationone + ' AND elevation <= ' + slideelevationtwo +
        ' AND basedjets >= ' + slidebasedjetsone + ' AND basedjets <= ' + slidebasedjetstwo + ' AND runwaylength >= ' + sliderwlengthone +
        ' AND runwaylength <= ' + sliderwlengthtwo + ' AND runwaywidth >= ' + sliderwwidthone + ' AND runwaywidth <= ' + sliderwwidthtwo +
        ' AND total_operations_from_5010 >= ' + slideopsone + ' AND total_operations_from_5010 <= ' + slideopstwo +
        ' AND enplanements_cy2019 >= ' + slideenplanementsone + ' AND enplanements_cy2019 <= ' + slideenplanementstwo + ' ' + sql_ownership +
        sql_atct + sql_ils + sql_als + sql_part139 + sql_state + sql_npias
    );
}
function ILSna() {
    sql_ils = '';

    source_airports.setQuery('SELECT * FROM airportsforcarto WHERE elevation >= ' + slideelevationone + ' AND elevation <= ' + slideelevationtwo +
        ' AND basedjets >= ' + slidebasedjetsone + ' AND basedjets <= ' + slidebasedjetstwo + ' AND runwaylength >= ' + sliderwlengthone +
        ' AND runwaylength <= ' + sliderwlengthtwo + ' AND runwaywidth >= ' + sliderwwidthone + ' AND runwaywidth <= ' + sliderwwidthtwo +
        ' AND total_operations_from_5010 >= ' + slideopsone + ' AND total_operations_from_5010 <= ' + slideopstwo +
        ' AND enplanements_cy2019 >= ' + slideenplanementsone + ' AND enplanements_cy2019 <= ' + slideenplanementstwo + ' ' + sql_ownership +
        sql_atct + sql_ils + sql_als + sql_part139 + sql_state + sql_npias
    );
}







//ILS Radio button value update
let sql_als = "";
function ALSon() {
    sql_als = " AND als NOT LIKE 'None'";

    source_airports.setQuery('SELECT * FROM airportsforcarto WHERE elevation >= ' + slideelevationone + ' AND elevation <= ' + slideelevationtwo +
        ' AND basedjets >= ' + slidebasedjetsone + ' AND basedjets <= ' + slidebasedjetstwo + ' AND runwaylength >= ' + sliderwlengthone +
        ' AND runwaylength <= ' + sliderwlengthtwo + ' AND runwaywidth >= ' + sliderwwidthone + ' AND runwaywidth <= ' + sliderwwidthtwo +
        ' AND total_operations_from_5010 >= ' + slideopsone + ' AND total_operations_from_5010 <= ' + slideopstwo +
        ' AND enplanements_cy2019 >= ' + slideenplanementsone + ' AND enplanements_cy2019 <= ' + slideenplanementstwo + ' ' + sql_ownership +
        sql_atct + sql_ils + sql_als + sql_part139 + sql_state + sql_npias
    );
}
function ALSoff() {
    sql_als = " AND als LIKE 'None'";

    source_airports.setQuery('SELECT * FROM airportsforcarto WHERE elevation >= ' + slideelevationone + ' AND elevation <= ' + slideelevationtwo +
        ' AND basedjets >= ' + slidebasedjetsone + ' AND basedjets <= ' + slidebasedjetstwo + ' AND runwaylength >= ' + sliderwlengthone +
        ' AND runwaylength <= ' + sliderwlengthtwo + ' AND runwaywidth >= ' + sliderwwidthone + ' AND runwaywidth <= ' + sliderwwidthtwo +
        ' AND total_operations_from_5010 >= ' + slideopsone + ' AND total_operations_from_5010 <= ' + slideopstwo +
        ' AND enplanements_cy2019 >= ' + slideenplanementsone + ' AND enplanements_cy2019 <= ' + slideenplanementstwo + ' ' + sql_ownership +
        sql_atct + sql_ils + sql_als + sql_part139 + sql_state + sql_npias
    );
}
function ALSna() {
    sql_als = '';

    source_airports.setQuery('SELECT * FROM airportsforcarto WHERE elevation >= ' + slideelevationone + ' AND elevation <= ' + slideelevationtwo +
        ' AND basedjets >= ' + slidebasedjetsone + ' AND basedjets <= ' + slidebasedjetstwo + ' AND runwaylength >= ' + sliderwlengthone +
        ' AND runwaylength <= ' + sliderwlengthtwo + ' AND runwaywidth >= ' + sliderwwidthone + ' AND runwaywidth <= ' + sliderwwidthtwo +
        ' AND total_operations_from_5010 >= ' + slideopsone + ' AND total_operations_from_5010 <= ' + slideopstwo +
        ' AND enplanements_cy2019 >= ' + slideenplanementsone + ' AND enplanements_cy2019 <= ' + slideenplanementstwo + ' ' + sql_ownership +
        sql_atct + sql_ils + sql_als + sql_part139 + sql_state + sql_npias
    );
}






//ILS Radio button value update
let sql_part139 = "";
function Part139on() {
    sql_part139 = " AND part139 LIKE 'true'";

    source_airports.setQuery('SELECT * FROM airportsforcarto WHERE elevation >= ' + slideelevationone + ' AND elevation <= ' + slideelevationtwo +
        ' AND basedjets >= ' + slidebasedjetsone + ' AND basedjets <= ' + slidebasedjetstwo + ' AND runwaylength >= ' + sliderwlengthone +
        ' AND runwaylength <= ' + sliderwlengthtwo + ' AND runwaywidth >= ' + sliderwwidthone + ' AND runwaywidth <= ' + sliderwwidthtwo +
        ' AND total_operations_from_5010 >= ' + slideopsone + ' AND total_operations_from_5010 <= ' + slideopstwo +
        ' AND enplanements_cy2019 >= ' + slideenplanementsone + ' AND enplanements_cy2019 <= ' + slideenplanementstwo + ' ' + sql_ownership +
        sql_atct + sql_ils + sql_als + sql_part139 + sql_state + sql_npias
    );
}
function Part139off() {
    sql_part139 = " AND part139 LIKE 'false'";

    source_airports.setQuery('SELECT * FROM airportsforcarto WHERE elevation >= ' + slideelevationone + ' AND elevation <= ' + slideelevationtwo +
        ' AND basedjets >= ' + slidebasedjetsone + ' AND basedjets <= ' + slidebasedjetstwo + ' AND runwaylength >= ' + sliderwlengthone +
        ' AND runwaylength <= ' + sliderwlengthtwo + ' AND runwaywidth >= ' + sliderwwidthone + ' AND runwaywidth <= ' + sliderwwidthtwo +
        ' AND total_operations_from_5010 >= ' + slideopsone + ' AND total_operations_from_5010 <= ' + slideopstwo +
        ' AND enplanements_cy2019 >= ' + slideenplanementsone + ' AND enplanements_cy2019 <= ' + slideenplanementstwo + ' ' + sql_ownership +
        sql_atct + sql_ils + sql_als + sql_part139 + sql_state + sql_npias
    );
}
function Part139na() {
    sql_part139 = '';

    source_airports.setQuery('SELECT * FROM airportsforcarto WHERE elevation >= ' + slideelevationone + ' AND elevation <= ' + slideelevationtwo +
        ' AND basedjets >= ' + slidebasedjetsone + ' AND basedjets <= ' + slidebasedjetstwo + ' AND runwaylength >= ' + sliderwlengthone +
        ' AND runwaylength <= ' + sliderwlengthtwo + ' AND runwaywidth >= ' + sliderwwidthone + ' AND runwaywidth <= ' + sliderwwidthtwo +
        ' AND total_operations_from_5010 >= ' + slideopsone + ' AND total_operations_from_5010 <= ' + slideopstwo +
        ' AND enplanements_cy2019 >= ' + slideenplanementsone + ' AND enplanements_cy2019 <= ' + slideenplanementstwo + ' ' + sql_ownership +
        sql_atct + sql_ils + sql_als + sql_part139 + sql_state + sql_npias
    );
}






$('#state-select').multiselect({
    onchange: function() {
        console.log($('#state-select').val());
    }
});









console.log(sql_ownership);
//const sql_statement = 'SELECT * FROM airportsforcarto WHERE elevation >= ' + slideelevationone + ' AND elevation <= ' + slideelevationtwo +
//    ' AND basedjets >= ' + slidebasedjetsone + ' AND basedjets <= ' + slidebasedjetstwo + ' ' + sql_ownership;
//console.log(sql_statement);

//source_airports.setQuery("SELECT * FROM airportsforcarto WHERE county LIKE 'HENRY'")