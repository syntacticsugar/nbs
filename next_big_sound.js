function draw(data) {
// "var data" is the json file
var data_totals = data.output.artists[143].metrics[11].endpoints["379979_TaylorSwift"].data.global.values.totals;

var data_array = [];
for (var k in data_totals) {
  data_array.push({date: k, fb_likes: data_totals[k]});
}

var margin = 50,
    width = 900,
    height = 700;

d3.select("body")
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
    .attr("r", 5);
}
