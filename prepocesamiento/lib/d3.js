d3.csv("/dato/cities.csv").then(function(data) {
    data.forEach(function(d) {
      d.population = +d.population;
      d["land area"] = +d["land area"];
    });
    console.log(data[0]);
  });
  