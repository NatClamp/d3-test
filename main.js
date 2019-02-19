// const d3 = require('d3');
// const doc = d3.select(window.document);

// const h = 350;
// const w = 400;

// monthlySales = [
//   { month: 10, sales: 100 },
//   { month: 20, sales: 130 },
//   { month: 30, sales: 250 },
//   { month: 40, sales: 300 },
//   { month: 50, sales: 265 },
//   { month: 60, sales: 225 },
//   { month: 70, sales: 180 },
//   { month: 80, sales: 120 },
//   { month: 90, sales: 145 },
//   { month: 100, sales: 130 },
// ];

// const lineFun = d3.svg
//   .line()
//   .x(d => d.month)
//   .y(d => h - d.sales)
//   .interpolate('linear');

// const svg = d3
//   .select('body')
//   .append('svg')
//   .attr({
//     width: w,
//     height: h,
//   });

// const viz = svg.append('path').attr({
//   d: lineFun(monthlySales),
//   stroke: 'purple',
//   'stroke-width': 2,
//   fill: 'none',
// });

// const w = 300;
// const h = 100;
// const padding = 2;
// const dataset = [5, 10, 15, 20, 25];

// const svg = d3
//   .select('body')
//   .append('svg')
//   .attr('width', w)
//   .attr('height', h);

// svg
//   .selectAll('rect')
//   .data(dataset)
//   .enter()
//   .append('rect')
//   .attr('x', function(d, i) {
//     return i * (w / dataset.length);
//   })
//   .attr('y', function(d) {
//     return h - d * 4;
//   })
//   .attr('width', w / dataset.lengh - padding)
//   .attr('height', function(d) {
//     return d * 4;
//   });

const circleRadii = [40, 20, 10];

const svgSelection = d3
  .select('body')
  .append('svg')
  .attr('width', 600)
  .attr('height', 100);

const circleSelection = svgSelection
  .selectAll('circle')
  .data(circleRadii)
  .enter()
  .append('circle');

const circleAttributes = circleSelection
  .attr('cx', 50)
  .attr('cy', 50)
  .attr('r', d => d)
  .style('fill', d => {
    let returnColor;
    if (d === 40) returnColor = 'green';
    else if (d === 20) returnColor = 'purple';
    else returnColor = 'red';
    return returnColor;
  });
