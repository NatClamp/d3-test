const w = 400;
const h = 100;
const padding = 2;

const circleRadii = [40, 20, 10];
const barchartDataset = [15, 10, 15, 20, 25, 30, 40];
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
  .select('#circles')
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

const simpleBarchartSVG = d3
  .select('#simple_barplot')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

simpleBarchartSVG
  .selectAll('rect')
  .data(barchartDataset)
  .enter()
  .append('rect')
  .attr('x', (d, i) => i * (w / barchartDataset.length))
  .attr('y', d => h - d * 2)
  .attr('width', w / barchartDataset.length - padding)
  .attr('height', d => d * 2)
  .style('fill', d => `rgb(${d * 10}, 0, 0)`);

simpleBarchartSVG
  .selectAll('text')
  .data(barchartDataset)
  .enter()
  .append('text')
  .text(d => d)
  .attr('x', (d, i) => i * (w / barchartDataset.length) + 20)
  .attr('y', d => h - d - 25)
  .style('font-family', 'sans-serif');

// line chart

const lineH = 400;
const lineW = 500;

const lineFunc = d3
  .line()
  .x(d => d.month * 2)
  .y(d => lineH - d.sales)
  .curve(d3.curveLinear);

const svgContainer = d3
  .select('#simple_linegraph')
  .append('svg')
  .attr('width', lineW)
  .attr('height', lineH);

const viz = svgContainer
  .append('path')
  .attr('d', lineFunc(monthlySales))
  .attr('stroke', 'purple')
  .attr('stroke-width', 2)
  .attr('fill', 'none');

const labels = svgContainer
  .selectAll('text')
  .data(monthlySales)
  .enter()
  .append('text')
  .text(d => d.sales)
  .attr('x', d => d.month * 2)
  .attr('y', d => lineH - d.sales)
  .attr('font-size', '12px')
  .attr('font-family', 'sans-serif')
  .attr('text-anchor', 'start')
  .attr('dy', '.35em')
  .attr('dx', '.35em');

// More complicated barplot!

var margin = { top: 30, right: 30, bottom: 70, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

var svg = d3
  .select('#lessSimple_barplot')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Parse the Data
d3.csv(
  'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv',
).then(data => {
  // X axis
  const x = d3
    .scaleBand()
    .range([0, width])
    .domain(data.map(d => d.Country))
    .padding(0.2);
  svg
    .append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll('text')
    .attr('transform', 'translate(-10,0)rotate(-45)')
    .style('text-anchor', 'end');

  // Add Y axis
  const y = d3
    .scaleLinear()
    .domain([0, 13000])
    .range([height, 0]);
  svg.append('g').call(d3.axisLeft(y));

  // Bars
  svg
    .selectAll('mybar')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', d => x(d.Country))
    .attr('y', d => y(d.Value))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d.Value))
    .attr('fill', '#ccc');
});

// lollipop - ordered

const margin1 = {
  top: 10,
  right: 30,
  bottom: 40,
  left: 100,
};
width1 = 460 - margin1.left - margin1.right;
height1 = 450 - margin1.top - margin1.bottom;

const lollipopSVG = d3
  .select('#lessSimple_lollipop')
  .append('svg')
  .attr('width', width1 + margin1.left + margin1.right)
  .attr('height', height1 + margin1.top + margin1.bottom)
  .append('g')
  .attr('transform', `translate(${margin1.left}, ${margin1.top})`);

d3.csv(
  'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv',
).then(data => {
  data.sort((b, a) => a.Value - b.Value);

  const x1 = d3
    .scaleLinear()
    .domain([0, 13000])
    .range([0, width1]);
  lollipopSVG
    .append('g')
    .attr('transform', `translate(0, ${height1})`)
    .call(d3.axisBottom(x1))
    .selectAll('text')
    .attr('transform', `translate(-10,0)rotate(-45)`)
    .style('text-anchor', 'end');

  const y1 = d3
    .scaleBand()
    .range([0, height1])
    .domain(data.map(d => d.Country))
    .padding(1);
  lollipopSVG.append('g').call(d3.axisLeft(y1));

  // Lines
  lollipopSVG
    .selectAll('myline')
    .data(data)
    .enter()
    .append('line')
    .attr('x1', d => x1(d.Value))
    .attr('x2', x1(0))
    .attr('y1', d => y1(d.Country))
    .attr('y2', d => y1(d.Country))
    .attr('stroke', 'grey');

  // Circles
  lollipopSVG
    .selectAll('mycircle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => x1(d.Value))
    .attr('cy', d => y1(d.Country))
    .attr('r', '7')
    .style('fill', '#69b3a2')
    .attr('stroke', 'black');
});
