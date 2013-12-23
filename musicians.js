var musicians = {
  143: {
    name: "Taylor Swift",
    endpoint: "379979_TaylorSwift"
  },
  5774: {
    name: "Britney Spears",
    endpoint: "382295_britneyspears"
  },
  659: {
    name: "Lady Gaga",
    endpoint: "380098_ladygaga"
  },
  4599: {
    name: "Miley Cyrus",
    endpoint: "382159_MileyCyrus"
  },
  303701: {
    name: "Lana Del Rey",
    endpoint: "1065033_lanadelrey"
  },
  2727: {
    name: "Marina and the Diamonds",
    endpoint: "381332_marinaandthediamonds"
  },
};

// helper to return the callback
function get_draw_func(data, id) {
  return function () {
      var svg = $("#main_svg");
      svg.empty();
      draw(data, id);
  }
}

function setup(magic_data) {
  // draw lana del rey by default
  draw(magic_data,303701);

  for (var m in musicians) {
    console.log(m);
    $("#artist_" + m.toString()).click(get_draw_func(magic_data, m));
  }
}

function draw(data,artist_id) {
  var data_totals = data.output.artists[artist_id].metrics[11].endpoints[musicians[artist_id].endpoint].data.global.values.totals;

  var data_array = [];

  for (var k in data_totals) {
    data_array.push({
      date: d3.time.day.offset(new Date(1970,0,0), parseInt(k)),
      fb_likes: data_totals[k]});
  }

  var margin = 70,
      width = 960,
      height = 500;

  d3.select("#main_svg")
    //.append("svg")
      .attr("width", width)
      .attr("height", height)
    .selectAll("circle")
    .data(data_array)
    .enter()
    .append("circle");

  var x_extent = d3.extent(data_array, function(d){return d.date});

  var x_scale = d3.time.scale()
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

  // starts to draw axes
  var x_axis = d3.svg.axis().scale(x_scale);
  d3.select("svg")
    .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (height-margin) + ")")
    .call(x_axis);

  var y_axis = d3.svg.axis().scale(y_scale).orient("left");
  d3.select("svg")
    .append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + margin + ", 0 )")
    .call(y_axis);
  // end of drawing axes
  // axes labels
  d3.select(".x.axis")
    .append("text")
      .text("Number of Facebook Likes Plotted by Date")
      .attr("x", (width / 2) - margin)
      .attr("y", margin / 1.5);
}

