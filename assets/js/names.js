var w = 700;
var h = 300 * 70;

var svg = d3.select(".names")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

    console.log("svg made");

d3.csv("../assets/data/sacklerNames.csv", function(data){
    console.log(data);

    var tooltip = d3.select(".names")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "black")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("color", "white")
        .attr("width", 200);


    var showTooltip = function(d, i) {
        tooltip
        .transition()
        .duration(200)
        .style("opacity", 1)
    }

    var moveTooltip = function(d) {
        tooltip
        .html(d.birth + " - " + d.passing + "<br>" + d.home + "<br>" + d.message)
        .style("left", (d3.mouse(this)[0]) + "px")
        .style("top", (d3.mouse(this)[1]) + "px")
        .style("font-size", "10px")
    }

    var hideTooltip = function(d) {
        tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
    }


    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr('height',50)
        .attr('width',110)
        .attr("fill", function(d, i) {
            if ((i + 1) % 5 == 3) {
                return "purple";
            } else {
                return "white";
            }
        })
        .attr("x", function(d, i) {
            return (i % 5) * 140;
        })
        .attr("y", function(d, i) {
            return Math.floor(i/5) * 70;
        })
        .on("mouseover", showTooltip )
        .on("mousemove", moveTooltip )
        .on("mouseleave", hideTooltip );

        console.log("rect made");
            
    var name = svg.selectAll("text")
        .data(data)
        .enter();

    name.append("text")
        .text(function(d) {
            return d.first;
        })
        .attr("fill", function(d,i) {
            if ((i + 1) % 5 == 3) {
                return "white";
            } else {
                return "black";
            }
        })
        .attr("x", function(d, i) {
            return (i % 5) * 140 + 55;
        })
        .attr("y", function(d, i) {
            return Math.floor(i/5) * 70 + 22;
        })
        .attr("font-size", 10)
        .attr("font-weight", 500)
        .style("text-anchor", "middle")
        .on("mouseover", showTooltip )
        .on("mousemove", moveTooltip )
        .on("mouseleave", hideTooltip );

    name.append("text")
        .text(function(d) {
            return d.last;
        })
        .attr("fill", function(d,i) {
            if ((i + 1) % 5 == 3) {
                return "white";
            } else {
                return "black";
            }
        })
        .attr("x", function(d, i) {
            return (i % 5) * 140 + 55;
        })
        .attr("y", function(d, i) {
            return Math.floor(i/5) * 70 + 33;
        })
        .attr("font-size", 10)
        .attr("font-weight", 500)
        .style("text-anchor", "middle")
        .on("mouseover", showTooltip )
        .on("mousemove", moveTooltip )
        .on("mouseleave", hideTooltip );
});