const w = 300;
const h = 100;
const padding = 2;

const circleRadii = [40, 20, 10];
const barchartDataset = [15, 10, 15, 20, 25, 30, 50];
const monthlySales = [
  { month: 10, sales: 100 },
  { month: 20, sales: 130 },
  { month: 30, sales: 250 },
  { month: 40, sales: 300 },
  { month: 50, sales: 265 },
  { month: 60, sales: 225 },
  { month: 70, sales: 180 },
  { month: 80, sales: 120 },
  { month: 90, sales: 145 },
  { month: 100, sales: 130 },
];

// SVG circles coloured by their radii

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

// Barchart - simple

const svg = d3
  .select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

svg
  .selectAll('rect')
  .data(barchartDataset)
  .enter()
  .append('rect')
  .attr('x', (d, i) => i * (w / barchartDataset.length))
  .attr('y', d => h - d * 2)
  .attr('width', w / barchartDataset.length - padding)
  .attr('height', d => d * 2)
  .style('fill', d => `rgb(${d * 10}, 0, 0)`);

// line chart

const lineFun = d3.svg
  .line()
  .x(d => d.month)
  .y(d => h - d.sales)
  .interpolate('linear');

const lineSVG = d3
  .select('body')
  .append('svg')
  .attr({
    width: w,
    height: h,
  });

const viz = lineSVG.append('path').attr({
  d: lineFun(monthlySales),
  stroke: 'purple',
  'stroke-width': 2,
  fill: 'none',
});
