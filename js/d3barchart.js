
// JS that controls the bar chart comparison.


comp = [{id: "Empty", rwlength: 0, basedjets: 0, elevation: 0}];
var comp_count = 0;
var comp_type = "RWlength";


function getMaxVal(data){
    const max = comp.reduce((max, b) => Math.max(max, b.data), comp[0].data);
    return max;
    console.log(max);
    console.log("Working");
}
//getMaxRWLengthVal();
//const max = comp.reduce((max, b) => Math.max(max, b.value), clickrwlength[0].value);
const max = 0;





// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// X axis
var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(comp.map(function(d) { return d.group; }))
    .padding(0.2);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "myXaxis")
    .call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
    .domain([0, max])
    .range([ height, 0]);
svg.append("g")
    .attr("class", "myYaxis")
    .call(d3.axisLeft(y));


// A function that create / update the plot for a given variable:
function updateRWlength() {

    comp_type = "RWlength";

    d3.select("svg").remove();

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    const max = comp.reduce((max, b) => Math.max(max, b.rwlength), comp[0].rwlength);
    console.log(max);

    // X axis
    var x = d3.scaleBand()
        .range([0, width])
        .domain(comp.map(function (d) {
            return d.id;
        }))
        .padding(0.2);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "myXaxis")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, max])
        .range([height, 0]);
    svg.append("g")
        .attr("class", "myYaxis")
        .call(d3.axisLeft(y));

    var u = svg.selectAll(".bar")
        .data(comp);

    u
        .enter()
        .append("rect")
        .attr("class", "bar")
        .merge(u)
        .transition()
        .duration(1000)
        .attr("x", function (d) {
            return x(d.id);
        })
        .attr("y", function (d) {
            return y(d.rwlength);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
            return height - y(d.rwlength);
        })
        .attr("fill", "#69b3a2");



    svg.selectAll("text.bar")
        .data(comp)
        .enter().append("text")
        .transition()
        .duration(1000)
        .attr("class", "bartext")
        .attr("text-anchor", "middle")
        .attr("x", function (d) {
            return x(d.id) + ((x.bandwidth())/2);
        })
        .attr("y", function (d) {
            return y(d.rwlength) - 7;
        })
        .text(function (d) {
            return d.rwlength;
        });

}




function updateElevation() {

    comp_type = "Elevation";


    d3.select("svg").remove();

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    const max = comp.reduce((max, b) => Math.max(max, b.elevation), comp[0].elevation);
    console.log(max);

    // X axis
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(comp.map(function(d) { return d.id; }))
        .padding(0.2);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "myXaxis")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, max])
        .range([ height, 0]);
    svg.append("g")
        .attr("class", "myYaxis")
        .call(d3.axisLeft(y));

    var u = svg.selectAll(".bar")
        .data(comp);

    u
        .enter()
        .append("rect")
        .attr("class", "bar")
        .merge(u)
        .transition()
        .duration(1000)
        .attr("x", function(d) { return x(d.id); })
        .attr("y", function(d) { return y(d.elevation); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.elevation); })
        .attr("fill", "#69b3a2")

    svg.selectAll("text.bar")
        .data(comp)
        .enter().append("text")
        .transition()
        .duration(1000)
        .attr("class", "bartext")
        .attr("text-anchor", "middle")
        .attr("x", function (d) {
            return x(d.id) + ((x.bandwidth())/2);
        })
        .attr("y", function (d) {
            return y(d.elevation) - 7;
        })
        .text(function (d) {
            return d.elevation;
        });

}




function updateBasedJets() {

    comp_type = "BasedJets";


    d3.select("svg").remove();

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    const max = comp.reduce((max, b) => Math.max(max, b.basedjets), comp[0].basedjets);
    console.log(max);

    // X axis
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(comp.map(function(d) { return d.id; }))
        .padding(0.2);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "myXaxis")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, max])
        .range([ height, 0]);
    svg.append("g")
        .attr("class", "myYaxis")
        .call(d3.axisLeft(y));

    var u = svg.selectAll(".bar")
        .data(comp);

    u
        .enter()
        .append("rect")
        .attr("class", "bar")
        .merge(u)
        .transition()
        .duration(1000)
        .attr("x", function(d) { return x(d.id); })
        .attr("y", function(d) { return y(d.basedjets); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.basedjets); })
        .attr("fill", "#69b3a2")

    svg.selectAll("text.bar")
        .data(comp)
        .enter().append("text")
        .transition()
        .duration(1000)
        .attr("class", "bartext")
        .attr("text-anchor", "middle")
        .attr("x", function (d) {
            return x(d.id) + ((x.bandwidth())/2);
        })
        .attr("y", function (d) {
            return y(d.basedjets) - 7;
        })
        .text(function (d) {
            return d.basedjets;
        });

}


function updateEmpty() {

    d3.select("svg").remove();

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    const max = comp.reduce((max, b) => Math.max(max, b.basedjets), comp[0].basedjets);
    console.log(max);

    // X axis
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(comp.map(function(d) { return d.id; }))
        .padding(0.2);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "myXaxis")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, max])
        .range([ height, 0]);
    svg.append("g")
        .attr("class", "myYaxis")
        .call(d3.axisLeft(y));

    var u = svg.selectAll("rect")
        .data(comp);

    u
        .enter()
        .append("rect")
        .merge(u)
        .attr("x", function(d) { return x(d.id); })
        .attr("y", function(d) { return y(d.basedjets); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.basedjets); })
        .attr("fill", "#69b3a2")
}







layer_airports.on('featureClicked', function (featureEvent) {
    if (comp_count === 0){
        comp = [];
    }
    comp_count = 1;
    let airport_selected_id = featureEvent.data.id;
    let airport_selected_rwlength = featureEvent.data.runwaylength;
    let airport_selected_basedjets = featureEvent.data.basedjets;
    let airport_selected_elevation = featureEvent.data.elevation;

    comp.push({ id: airport_selected_id, rwlength: airport_selected_rwlength, basedjets: airport_selected_basedjets, elevation: airport_selected_elevation});

    if (comp_type === "RWlength") {
        updateRWlength();
    }
    else if (comp_type === "BasedJets"){
        updateBasedJets();
    }
    else if (comp_type === "Elevation"){
        updateElevation();
    }


    //console.log(airport_selected_id);
    //console.log(airport_selected_rwlength);
    //comp_id.push(airport_selected_id);
    //comp_rwlength.push(airport_selected_rwlength);
    console.log(comp);
    //console.log(comp_rwlength);
});

function clearbars() {
    comp = [{id: "Empty", rwlength: 0, basedjets: 0}];
    console.log(comp);
    comp_count = 0;
    if (comp_type === "RWlength") {
        updateRWlength();
    }
    else if (comp_type === "BasedJets"){
        updateBasedJets();
    }
    else if (comp_type === "Elevation"){
        updateElevation();
    }
}

updateEmpty();


