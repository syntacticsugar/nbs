// "var data" is the json file
function draw(data) {
var data_totals = data.output.artists[303701].metrics[11].endpoints["1065033_lanadelrey"].data.global.values.totals;

var data_array = [];
for (var k in data_totals) {
  data_array.push({date: k, fb_likes: data_totals[k]});
}

var margin = 5,
    width = 1100,
    height = 400;

d3.select("#main_svg")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .selectAll("circle")
  .data(data_array)
  .enter()
  .append("circle");

var x_extent = d3.extent(data_array, function(d){return d.date});

var x_scale = d3.scale.linear()
                      .range([margin,width-margin])
                      .domain(x_extent);

var y_extent = d3.extent(data_array, function(d){return d.fb_likes});
var y_scale = d3.scale.linear()
                      .range([height-margin, margin])
                      .domain(y_extent);

d3.selectAll('circle')
    .attr("cx", function(d){return x_scale(d.date)})
    .attr("cy", function(d){return y_scale(d.fb_likes)});

d3.selectAll("circle") 
    .attr("r", 1);
}
