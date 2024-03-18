function logInputs() {
    const startX = Math.max(0, parseInt(document.getElementById("startX").value));
    const startY = Math.max(0, parseInt(document.getElementById("startY").value));
    const goalX = Math.max(0, parseInt(document.getElementById("goalX").value));
    const goalY = Math.max(0, parseInt(document.getElementById("goalY").value));
    const numRectangles = Math.max(0, parseInt(document.getElementById("numRectangles").value));
    const minSize = Math.max(0, parseInt(document.getElementById("minSize").value));
    const maxSize = Math.max(0, parseInt(document.getElementById("maxSize").value));

    handleInputs(startX, startY, goalX, goalY, numRectangles, minSize, maxSize);
}

function resetInputs() {
    d3.select("#map svg").remove();

    const inputs = document.querySelectorAll('.properties input[type="number"]');

    inputs.forEach(input => {
        input.value = input.getAttribute('placeholder');
    })
}

function exampleInputs() {
    document.getElementById("startX").value = 10;
    document.getElementById("startY").value = 30;
    document.getElementById("goalX").value = 455;
    document.getElementById("goalY").value = 380;
    document.getElementById("numRectangles").value = 30;
    document.getElementById("minSize").value = 30;
    document.getElementById("maxSize").value = 80;

    handleInputs(10, 30, 455, 380, 30, 30, 80);
}

function handleInputs(startX, startY, goalX, goalY, numRectangles, minSize, maxSize) {
    let starting_point = [startX, startY];
    let goal_point = [goalX, goalY];
    let num_rectangles = Number(numRectangles);
    let min_size = Number(minSize);
    let max_size = Number(maxSize);
    const x_range = [0, 500];
    const y_range = [0, 500];

    OBSTACLES = generate_non_overlapping_rectangles(num_rectangles, min_size, max_size, x_range, y_range);

    d3.select("#map svg").remove();

    plot_rectangles(starting_point, goal_point, OBSTACLES);
}

function plot_rectangles(starting_point, goal_point, obstacles) { 
    const svg = d3.select("#map")
        .append("svg")
        .attr("width", 500)
        .attr("height", 500);
    
    svg.selectAll("rect")
        .data(obstacles) 
        .enter()
        .append("rect")
        .attr("x", d => d.left_bottom_corner[0])
        .attr("y", d => 500 - d.left_bottom_corner[1] - d.height)
        .attr("width", d => d.width)
        .attr("height", d => d.height)
        .attr("fill", "blue");

    svg.append("circle")
        .attr("cx", starting_point[0])
        .attr("cy", 500 - starting_point[1])
        .attr("r", 7)
        .style("fill", "red");

    svg.append("circle")
        .attr("cx", goal_point[0])
        .attr("cy", 500 - goal_point[1])
        .attr("r", 7)
        .style("fill", "green");
}
