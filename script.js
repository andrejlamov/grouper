var vis = function() {
    d3.select("#name_input").style("display", "none");
    var nodes = [{name: "Alex"}, {name: "Alex"}];
    var sim = d3.forceSimulation(nodes)
            .force("charge", d3.forceManyBody())
            .force("x", d3.forceX(50))
            .force("y", d3.forceY(50))
            .on("tick", tick);
    function tick() {
        d3.selectAll(".dot")
            .attr("cx", function(d) { return d["x"]; })
            .attr("cy", function(d) { return d["y"]; });
     }
    var render = function () {
        var svg = d3.select("svg");
        var cx = get_svg("width") / 2;
        var cy = get_svg("height") / 2;
        // sim
        //     .force("center", d3.forceCenter(cx, cy));
        var circles = svg.selectAll(".dot")
                .data(nodes);

        var circles_enter = circles
                .enter()
                .append("circle")
                .attr("class", "dot")
                .attr("r", 20)
                .style("fill", "red")
                .call(d3.drag()
                      .on("start", dragstarted)
                      .on("drag", dragged)
                      .on("end", dragended));

        var circles_update = circles
                .merge(circles_enter);
   };

    function dragstarted(d) {
        if (!d3.event.active) sim.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) sim.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    window.addEventListener("resize", render);
    window.addEventListener("load", render);
    return {};
}();

function get_svg(style) {
    return parseInt(d3.select("svg").style(style));
}


QUnit.test( "hello test", function( assert ) {
    assert.ok(!isNaN(get_svg("width")));
});
