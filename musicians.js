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

function get_draw_func(data, id) {
  return function () {
      var svg = $("main_svg");
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
// "var data" is the json file
  var data_totals = data.output.artists[artist_id].metrics[11].endpoints[musicians[artist_id].endpoint].data.global.values.totals;

  var data_array = [];

  for (var k in data_totals) {
    data_array.push({date: k, fb_likes: data_totals[k]});
  }

  var margin = 5,
      width = 1100,
      height = 400;

  d3.select("#main_svg")
    //.append("svg")
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

