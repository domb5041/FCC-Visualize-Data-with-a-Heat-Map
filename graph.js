const getDataset = () => {
    fetch(
        'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'
    )
        .then(response => response.json())
        .then(data => drawGraph(data));
};

getDataset();

const drawGraph = data => {
    console.log(data);
    const w = 700;
    const h = 500;
    const p = 50;

    const yearObject = d => new Date(d.year, 0, 1);
    const monthObject = d => new Date(1970, d.month - 1, 1);

    // const color = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3
        .select('#chart')
        .append('svg')
        .attr('id', 'svg-area')
        .attr('width', w)
        .attr('height', h);

    const xScale = d3
        .scaleBand()
        .domain(data.monthlyVariance.map(d => d.year))
        .range([p, w - p]);

    const yScale = d3
        .scaleBand()
        .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        .range([p, h - p]);

    const yAxis = d3
        .axisLeft(yScale)
        .tickFormat(month => d3.timeFormat('%b')(new Date(1970, month, 1)));

    const xAxis = d3
        .axisBottom(xScale)
        .tickValues(xScale.domain().filter(year => year % 20 === 0))
        .tickFormat(year => d3.timeFormat('%Y')(new Date(year, 0, 1)));

    svg.append('g')
        .attr('transform', `translate(${p}, 0)`)
        .attr('id', 'y-axis')
        .call(yAxis);

    svg.append('g')
        .attr('transform', `translate(0, ${h - p})`)
        .attr('id', 'x-axis')
        .call(xAxis);

    svg.selectAll('rect')
        .data(data.monthlyVariance)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.year))
        .attr('y', d => yScale(d.month - 1))
        .attr('width', xScale.bandwidth())
        .attr('height', yScale.bandwidth());
    // .attr('class', 'dot')
    // .attr('data-xvalue', d => yearObject(d))
    // .attr('data-yvalue', d => timeObject(d))
    // .style('fill', d => color(d.Doping.length > 0))
    //     .on('mouseover', d => {
    //         svg.append('text')
    //             .text(d.Name)
    //             .attr('id', 'tooltip')
    //             .attr('x', xScale(yearObject(d)) + 10)
    //             .attr('y', yScale(timeObject(d)) + 5)
    //             .attr('data-year', yearObject(d));
    //     })
    //     .on('mouseout', () => {
    //         d3.selectAll('#tooltip').remove();
    //     });

    // svg.append('g')
    //     .attr('id', 'legend')
    //     .selectAll('#legend')
    //     .data(color.domain())
    //     .enter()
    //     .append('text')
    //     .attr('x', w - 20)
    //     .attr('y', (d, i) => i * 25 + 25)
    //     .style('text-anchor', 'end')
    //     .style('fill', color)
    //     .text(d =>
    //         d ? 'Riders with doping allegations' : 'No doping allegations'
    //     );
};
