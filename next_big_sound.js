// "var data" is the json file
var margin = 50,
    width = 900,
    height = 700;

d3.select("body")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle");

var x_extent = d3.extent(data, function(d){return d.collision_with_injury});

var x_scale = d3.scale.linear()
                      .range([margin,width-margin])
                      .domain(x_extent);

var y_extent = d3.extent(data, function(d){return d.dist_between_fail});
var y_scale = d3.scale.linear()
                      .range([height-margin, margin])
                      .domain(y_extent);

d3.selectAll('circle')
    .attr("cx", function(d){return x_scale(d.collision_with_injury)})
    .attr("cy", function(d){return y_scale(d.collision_with_injury)});

d3.selectAll("circle") 
    .attr("r", 5);



//output.artists.143.metrics.11.endpoints.379979_TaylorSwift.data.global.values.totals
