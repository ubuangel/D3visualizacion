function _1(md){return(
md`# Time series chart example`
)}

function _2(md){return(
md`Example of D3 time series chart with basic support for multiple series, legend, tooltip and brush.`
)}

function _3(html){return(
html`
<div id="charts-container">
  <div class="charts-row" style="display: flex; flex-wrap: wrap;">
    <div id="chart-1">
    </div>
    <div id="chart-2" style="padding-left: 15px;">
    </div>
  </div>
  <div class="charts-row" style="display: flex; flex-wrap: wrap;">
    <div id="chart-3">
    </div>
    <div id="chart-4" style="padding-left: 15px;">
    </div>
  </div>
</div>
`
)}

function _reset(html){return(
html`<input type="button" value="Reset">`
)}

function _5(md){return(
md`Use the control panel below to experiment with the component options. There is no input validation / automation for dependent options. As some options do not play well together the resulting chart may sometimes seem confusing (especially with "Negative Y" enabled). The resulting chart definition (data omitted) is presented in JSON format.`
)}

function _6(chartDefinition,panel,d3,data,TimeSeriesChart)
{
  const definition = chartDefinition(panel);
  d3.select("#chart-definition").text(JSON.stringify(definition, null, 2));
  definition.data = data;
  definition.width = 840;
  const c = new TimeSeriesChart(definition);
  return c.svg;
}


function _random(html){return(
Object.defineProperty(html`<button style="font-size: 11px">Random`, "value", {"value": undefined})
)}

function _panel(Inputs,inputs,html){return(
Inputs.form(inputs, {template: v => html`
  <div class="cp-row">
  	<div class="cp-col">
  	  <div class="cp-row">
    		<div class="cp-group">
    			<div class="cp-title">
    				General
    			</div>
          <div>
          ${v.title}
          ${v.format}
          ${v.yMin}
          ${v.yMinValue}
          ${v.yMax}
          ${v.yMaxValue}
          ${v.legendValues}
    		  </div>
    		</div>
    		<div class="cp-group">
    			<div class="cp-title">
    				Series1
    			</div>
          <div>
          ${v.s1Metric}
          ${v.s1Label}
          ${v.s1Line}
          ${v.s1LineColor}
          ${v.s1LineAlpha}
          ${v.s1Fill}
          ${v.s1FillColor}
          ${v.s1FillAlpha}
          ${v.s1Options}
    		  </div>
    		</div>
    	</div>
    	<div class="cp-row">
    		<div class="cp-group">
    			<div class="cp-title">
    				Series2
    			</div>
          <div>
          ${v.s2Metric}
          ${v.s2Label}
          ${v.s2Line}
          ${v.s2LineColor}
          ${v.s2LineAlpha}
          ${v.s2Fill}
          ${v.s2FillColor}
          ${v.s2FillAlpha}
          ${v.s2Options}
    		  </div>
    		</div>
    		<div class="cp-group">
    			<div class="cp-title">
    				Series3
    			</div>
          <div>
          ${v.s3Metric}
          ${v.s3Label}
          ${v.s3Line}
          ${v.s3LineColor}
          ${v.s3LineAlpha}
          ${v.s3Fill}
          ${v.s3FillColor}
          ${v.s3FillAlpha}
          ${v.s3Options}
    	    </div>
    	  </div>
    	</div>
    </div>
  	<div class="cp-col">  		
      <div class="cp-title">
        Chart definition
      </div>
      <div id="chart-definition" style="font-family: monospace; font-size: 11px; white-space: pre-wrap; width: 220px;">
      </div>  	  
    </div>
  </div>
`})
)}

function _9(md){return(
md`**How to use this example in a WEB page ?**

1. Install and import D3.
2. Copy-paste the TimeSeriesChart class below including the copyright notice into your application.
3. Create a placeholder for your chart.
4. Create a new instance of TimeSeriesChart, passing the chart options (JS object) as argument.
5. Call the \`appendTo()\` instance method, passing your placeholder CSS selector as argument.

\`\`\`html
<div id="chart-placeholder"></div>
<script>
  // Initialize your data here. E.g.
  // const data = [{date: ..., cpu: ..., memory: ...}, {date: ..., cpu: ..., memory: ...}, ...];
  // Refer to the Appendix to view the data used in this notebook.
  const options = {
    title: "My chart",
    data: data,
    series: [
      {
        label: "CPU",
        metric: "cpu",
        lineColor: "#77bb41ff",
        fillColor: "#77bb4132"
      }
    ]
  };
  const c = new TimeSeriesChart(options);
  c.appendTo("#chart-placeholder");
</script>
\`\`\`

Most of the supported options are covered by the control panel above.
You can refer to the resulting chart definition on the right to get an idea on how to customize your chart.

**How to use a custom formatter for the y axis, the legend and the tooltip ?**

Create a function that takes the formatting context (either "axis" for the y axis ticks or "value" for the legend and the tooltip) as argument and returns a value formatting function.
Use the \`format\` option to pass your function to the constructor.

\`\`\`javascript
function formatterPercentage(context) {
  if (context === "axis") {
    return d => d + "%";
  } else {
    return d => d.toFixed(2) + "%";
  }
}

const options = {
  title: "My chart",
  data: data,
  format: formatterPercentage,
  ...
};
\`\`\`

**How to activate / handle brush events ?**

Create a function that takes the caller (instance) and the selected time range (start / end) as arguments and perform the desired actions.
Use the \`selectionHandler\` option to pass your function to the constructor.

\`\`\`javascript
function selectionHandler(caller, start, end) {
  console.log(start, end);
}

const options = {
  title: "My chart",
  data: data,
  selectionHandler: selectionHandler,
  ...
};
\`\`\`

A simple use-case would be to retrieve data for the new time range and redraw the chart (or to reload the entire page passing the new time range as query string parameters).

**How to update the chart data ?**

Call the \`refreshData()\` instance method, passing the new data array as argument. The chart should auto update (various transitions will be applied to smooth the process).
This method has not been exhaustively tested and although it gives a basic idea of what can be done it's probably not the idiomatic way to deal with updates / use D3's Transitions module.

\`\`\`javascript
function selectionHandler(caller, start, end) {
  // Fetch / prepare your data here. E.g.
  // const newData = ...;
  caller.refreshData(newData);
}

const options = {
  title: "My chart",
  data: data,
  selectionHandler: selectionHandler,
  ...
};
\`\`\``
)}

function _10(md){return(
md`**The chart implementation**

Some random thoughts :

* Text elements (legend, tooltip, ...) are fairly static and therefore subject to overflow / overlap.
* The x axis formatting is basic / opinionated and will only work with specific time ranges.
* Some options (legendValues, format, ...) would probably make more sense at the series level rather than at the chart level.
* The use of inline styling and a single class to embed everything may be debatable but it is just an example and the main focus is ease of use.
* ...`
)}

function _TimeSeriesChart(d3){return(
class TimeSeriesChart {

  constructor({
    data,
    width = 500,
    height = 196,
    title,
    yMin,
    yMax,
    format = ".4~s",
    legendValues = [],
    rightFooter,
    selectionHandler,
    series = []
  } = {}) {

    this._data = data;
    this._width = width;
    this._height = height;
    this._title = title;
    this._yMin = yMin;
    this._yMax = yMax;
    this._format = format;
    this._legendValues = legendValues;
    this._rightFooter = rightFooter;
    this._selectionHandler = selectionHandler;
    this._series = series;

  }

  get svg() {
    if (this._svg === undefined) {
      this._render();
    }
    return this._svg.node();
  }

  get data() {
    return this._data;
  }

  set data(data) {
    this.refreshData(data);
  }

  appendTo(selector) {
    d3.select(selector).append(() => this.svg);
  }

  refreshData(data) {

    this._data = data;

    if (this._svg === undefined) {
      return;
    }

    const transitionDuration = 400;

    const [yDomain, legendEntries] = this._prepare(data);

    this._xScale.domain(d3.extent(data, d => d.date));
    this._yScale.domain(yDomain).nice();

    this._svg.select(".x-axis")
        .transition()
        .duration(transitionDuration)
        .ease(d3.easeExp)
        .call(this._xAxis(this._xScale));

    this._svg.select(".y-axis")
        .transition()
        .duration(transitionDuration)
        .ease(d3.easeExp)
        .call(this._yAxis(this._yScale));

    const pathFn = this._pathFn;

    this._svg.selectAll(".path").each(function() {

      d3.select(this)
          .transition()
          .duration(transitionDuration/2)
          .ease(d3.easeLinear)
          .attr("opacity", 0.0)
          .on("end", function () {
            d3.select(this)
                .attr("d", pathFn[this.dataset.fn](data))
                .transition()
                .duration(transitionDuration/2)
                .ease(d3.easeExp)
                .attr("opacity", 1.0);
          });

    });

    this._svg.selectAll(".legend-text")
        .data(legendEntries)
        .text(d => d.text);

  }

  _render() {

    // Environment, formatters, helpers
    const margin = { top: 24, right: 0, bottom: 18, left: 50 };
    const legendFontSize = 11;
    const formatAsDate = d3.timeFormat("%-m/%-d");
    const formatAsTime = d3.timeFormat("%-Hh%M");
    const formatAsDateTime = d3.timeFormat("%Y-%m-%d %H:%M:%S");
    const xTickFormatter = d => d.getHours() === 0 && d.getMinutes() === 0 ? formatAsDate(d) : formatAsTime(d);
    const yTickFormatter = typeof this._format === "function" ? this._format("axis") : d3.format(this._format);
    const yValueFormatter = typeof this._format === "function" ? this._format("value") : d3.format(this._format);

    const boundaries = {
      left: margin.left,
      right: this._width - margin.right,
      top: margin.top,
      bottom: this._height - margin.bottom
    };

    const axisStyler = g => {
        g.selectAll("line")
            .attr("stroke", "lightgrey")
            .attr("stroke-opacity", .7)
            .attr("shape-rendering", "geometricPrecision");
        if (g.node().classList.contains("y-axis")) {
          g.select(".domain").attr("opacity", 0.0);
        }
        else {
          g.select(".domain").attr("stroke", "grey");
        }
    };

    // Calculate y axis domain and prepare legendentries if needed
    const [yDomain, legendEntries] = this._prepare(this._data);

    const footerRows = (legendEntries.length === 0 && this._rightFooter !== undefined)
      ? 1
      : legendEntries.length;

    // Start building the svg
    const svg = d3.create("svg")
        .attr("width", this._width)
        .attr("height", this._height + footerRows * (legendFontSize + 3));

    const xScale = d3.scaleTime()
        .domain(d3.extent(this._data, d => d.date))
        .range([boundaries.left, boundaries.right]);

    const xAxis = scale => {
      return g => g
          .attr("class", "x-axis")
          .attr("transform", `translate(0, ${boundaries.bottom})`)
          .call(d3.axisBottom(scale)
                .ticks(8)
                .tickPadding(8)
                .tickSizeInner(boundaries.top - boundaries.bottom)
                .tickSizeOuter(0)
                .tickFormat(xTickFormatter))
          .call(axisStyler);
    };

    const yScale = d3.scaleLinear()
        .domain(yDomain)
        .range([boundaries.bottom, boundaries.top])
        .nice();

    const yAxis = scale => {
      return g => g
        .attr("class", "y-axis")
        .attr("transform", `translate(${boundaries.left}, 0)`)
        .call(d3.axisLeft(scale)
            .ticks(5)
            .tickPadding(8)
            .tickSizeInner(boundaries.left - boundaries.right)
            .tickSizeOuter(0)
            .tickFormat(yTickFormatter))
        .call(axisStyler);
    };

    svg.append("g").call(yAxis(yScale));
    svg.append("g").call(xAxis(xScale));

    // A unique identifier is required for the clip-path element (no success finding
    // an alternative with <basic-shape> and <geometry-box> under Chrome).
    // -> Basic helper to prevent things to break if multiple components
    // are generated on the same page. In observable, consider using DOM.uid() instead.
    if (!window.hasOwnProperty("TimeSeriesChartCounter")) {
      window.TimeSeriesChartCounter = 0;
    }
    const clipId = `timeserieschart-clip-${++window.TimeSeriesChartCounter}`;

    svg.append("defs")
      .append("clipPath")
        .attr("id", clipId)
      .append("rect")
        .attr("x", boundaries.left)
        .attr("y", boundaries.top - 1)
        .attr("width", boundaries.right - boundaries.left)
        .attr("height", boundaries.bottom - boundaries.top + 2);

    let pathCnt = 0;
    const pathFn = {};
    const tooltipMetrics = [];

    for (const [i, s] of this._series.entries()) {

      const yPrepared = (s.hasOwnProperty("negativeY") && s.negativeY)
        ? d => yScale(-d[s.metric])
        : d => yScale(d[s.metric]);

      if (s.hasOwnProperty("lineColor")) {

        pathCnt++;

        const line = d3.line()
            .defined(d => d[s.metric] !== null)
            .x(d => xScale(d.date))
            .y(yPrepared);

        svg.append("path")
            .datum(this._data)
            .attr("data-fn", `path-${pathCnt}`)
            .attr("class", "path")
            .attr("clip-path", `url(#${clipId})`)
            .attr("stroke", s.lineColor)
            .attr("fill", "none")
            .attr("stroke-width", 1.0)
            .attr("opacity", 1.0)
            .attr("d", line)
            .style("-webkit-clip-path", `url(#${clipId})`);

        pathFn[`path-${pathCnt}`] = line;

      }

      if (s.hasOwnProperty("fillColor")) {

        let baseline;
        let defined;

        pathCnt++;

        if (s.hasOwnProperty("fillToMetric") && s.fillToMetric) {
          baseline = (s.hasOwnProperty("negativeY") && s.negativeY)
            ? d => yScale(-d[s.fillToMetric])
            : d => yScale(d[s.fillToMetric]);
          defined = d => d[s.metric] !== null && d[s.metric] >= d[s.fillToMetric];
        }
        else if (s.hasOwnProperty("fillToZero") && s.fillToZero) {
          baseline = d => yScale(0);
          defined = d => d[s.metric] !== null && d[s.metric] >= 0;
        }
        else {
          baseline = (s.hasOwnProperty("negativeY") && s.negativeY)
            ? d => yScale(yScale.domain()[1])
            : d => yScale(yScale.domain()[0]);
          defined = d => d[s.metric] !== null;
        }

        const [y0, y1] = (s.hasOwnProperty("negativeY") && s.negativeY)
          ? [yPrepared, baseline]
          : [baseline, yPrepared];

        const area = d3.area()
            .defined(defined)
            .x(d => xScale(d.date))
            .y0(y0)
            .y1(y1);

        svg.append("path")
            .datum(this._data)
            .attr("data-fn", `path-${pathCnt}`)
            .attr("class", "path")
            .attr("clip-path", `url(#${clipId})`)
            .attr("stroke", "none")
            .attr("fill", s.fillColor)
            .attr("opacity", 1.0)
            .attr("d", area)
            .style("-webkit-clip-path", `url(#${clipId})`);
        
        pathFn[`path-${pathCnt}`] = area;

      }

      if (s.hasOwnProperty("tooltip") && s.tooltip) {
        tooltipMetrics.push({metric: s.metric, label: s.label});
      }

    }

    if (this._selectionHandler !== undefined || tooltipMetrics.length > 0) {

      const context = d3.create("svg:g");
      let brush;

      if (this._selectionHandler !== undefined) {
      
        brush = d3.brushX()
            .extent([[boundaries.left, boundaries.top], [boundaries.right, boundaries.bottom]])
            .on("start end", ({target, type, selection}) => {
              svg.selectAll(".interactive").style("display", "none");
              if (type === "end" && selection !== null) {
                this._selectionHandler(this, ...selection.map(xScale.invert));
                svg.select(".brush").call(target.move, null);
              }
            });

        context.attr("class", "brush");
        context.call(brush);
        svg.attr("cursor", "crosshair");

      }
      else {

        context.append("rect")
            .attr("x", boundaries.left)
            .attr("y", boundaries.top)
            .attr("width", boundaries.right - boundaries.left)
            .attr("height", boundaries.bottom - boundaries.top)
            .attr("fill", "none")
            .attr("pointer-events", "all");

      }

      if (tooltipMetrics.length > 0) {

        const tooltipHeight = 20 + tooltipMetrics.length * (legendFontSize + 3);

        const tooltip = d3.create("svg:g")
            .attr("class", "interactive")
            .attr("font-family", "monospace")
            .attr("font-size", legendFontSize + "px")
            .attr("font-weight", "normal")
            .attr("fill", "black")
            .attr("stroke", "none")
            .attr("opacity", .8)
            .style("display", "none");

        tooltip.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 140)
            .attr("height", tooltipHeight)
            .attr("fill", "white")
            .attr("stroke", "black")
            .attr("stroke-opacity", .5)
            .attr("shape-rendering", "crispEdges");

        tooltip.append("text")
            .attr("class", "tooltip-x-value")
            .attr("x", 70)
            .attr("y", 12)
            .attr("text-anchor", "middle");

        let offset = 25;

        for (const v of tooltipMetrics) {

          tooltip.append("text")
              .attr("x", 10)
              .attr("y", offset)
              .attr("text-anchor", "start")
              .text(v.label);

          tooltip.append("text")
              .attr("class", "tooltip-y-value")
              .attr("x", 130)
              .attr("y", offset)
              .attr("text-anchor", "end");

          offset += legendFontSize + 3;

        }

        const focus = svg.append("line")
            .attr("class", "interactive")
            .attr("x1", 0)
            .attr("x2", 0)
            .attr("y1", boundaries.top)
            .attr("y2", boundaries.bottom)
            .attr("stroke", "red")
            .attr("opacity", .5)
            .style("display", "none");

        const bisect = d3.bisector(d => d.date).left;
        const flipCoordinates = [boundaries.right - 155, boundaries.bottom - tooltipHeight - 10];

        const mouseMoved = ({offsetX: x, offsetY: y}) => {
    
          if (x < boundaries.left || x > boundaries.right || y < boundaries.top || y > boundaries.bottom) {
            return;
          }
    
          if (focus.style("display") !== "block") {
            focus.style("display", "block");
          }

          if (tooltip.style("display") !== "block") {
            tooltip.style("display", "block");
          }

          const date = xScale.invert(x);
          const index = bisect(this._data, date, 1);
          const row = date - this._data[index - 1].date > this._data[index].date - date
            ? this._data[index]
            : this._data[index - 1];
          const focusX = xScale(row.date);
          const tooltipX = focusX < flipCoordinates[0] ? focusX + 15 : focusX - 155;
          const tooltipY = y < flipCoordinates[1] ? y + 10 : y - tooltipHeight - 10;

          focus.attr("transform", `translate(${focusX}, 0)`);
          tooltip.attr("transform", `translate(${tooltipX}, ${tooltipY})`);
          tooltip.select(".tooltip-x-value").text(formatAsDateTime(row.date));
          tooltip.selectAll(".tooltip-y-value")
            .data(tooltipMetrics)
            .text(d => row[d.metric] !== null ? yValueFormatter(row[d.metric]) : "n/a");

        };

        if (brush !== undefined) {
          brush.on("brush", ({sourceEvent}) => {
            if (sourceEvent !== undefined && sourceEvent.type === "mousemove") {
              mouseMoved(sourceEvent);
            }
          });
        }

        context
          .on("touchend mouseleave", () => {
            svg.selectAll(".interactive").style("display", "none");
          })
          .on("touchmove mousemove", mouseMoved);

        svg.append(d => context.node());
        svg.append(d => tooltip.node());

      }
      else {
        svg.append(d => context.node());
      }

    }

    if (footerRows > 0) {

      const footer = svg.append("g")
          .attr("transform", `translate(0, ${this._height})`)
          .attr("font-family", "monospace")
          .attr("font-size", legendFontSize + "px")
          .attr("font-weight", "normal");

      let offset = (legendFontSize + 3) / 2;

      if (this._rightFooter !== undefined) {

        footer.append("text")
            .attr("x", boundaries.right - 5)
            .attr("y", offset)
            .attr("text-anchor", "end")
            .attr("dominant-baseline", "middle")
            .style("white-space", "pre")
            .text(this._rightFooter);

      }

      for (const v of legendEntries) {

        footer.append("rect")
            .attr("width", 12)
            .attr("height", 4)
            .attr("x", margin.left / 2 + 4)
            .attr("y", offset - 2)
            .attr("rx", 2)
            .attr("ry", 2)
            .attr("fill", v.color);

        footer.append("text")
            .attr("class", "legend-text")
            .attr("x", margin.left / 2 + 20)
            .attr("y", offset)
            .attr("dominant-baseline", "middle")
            .style("white-space", "pre")
            .text(v.text);

        offset += legendFontSize + 3;

      }

    }

    if (this._title !== undefined) {
      svg.append("text")
          .attr("x", this._width / 2)
          .attr("y", margin.top / 2)
          .attr("font-family", "sans-serif")
          .attr("font-size", "12px")
          .attr("font-weight", "bold")
          .attr("text-anchor", "middle")
          .text(this._title);
    }

    this._xScale = xScale;
    this._yScale = yScale;
    this._xAxis = xAxis;
    this._yAxis = yAxis;
    this._pathFn = pathFn;
    this._svg = svg;

  }

  _prepare(data) {

    const yDomain = [
      this._yMin !== undefined ? this._yMin : Infinity,
      this._yMax !== undefined ? this._yMax : -Infinity
    ];

    const yValueFormatter = typeof this._format === "function" ? this._format("value") : d3.format(this._format);
    const formatter = v => v !== null && v !== undefined ? yValueFormatter(v).padEnd(9, " ") : "n/a      ";

    const legendValues = [...new Set(this._legendValues.filter(v => ["Min", "Max", "Avg", "Last"].includes(v)))];

    const legendEntries = [];

    for (const s of this._series) {

      const aggs = {};

      if (s.hasOwnProperty("legend") && s.legend) {

        if (legendValues.includes("Min")) {
          aggs.min = d3.min(data, d => d[s.metric]);
        }

        if (legendValues.includes("Max")) {
          aggs.max = d3.max(data, d => d[s.metric]);
        }

        if (legendValues.includes("Avg")) {
          aggs.avg = d3.mean(data, d => d[s.metric]);
        }

        if (legendValues.includes("Last")) {
          aggs.last = data[data.length - 1][s.metric];
        }

       legendEntries.push({
          color: s.lineColor ?? s.fillColor ?? "white",
          text: s.label.padEnd(15, " ") + legendValues.map(v => `${v}: ${formatter(aggs[v.toLowerCase()])}`).join("")
        });

      }

      // Calculate the y scale domain if needed.
      // Will use existing values when possible.
      if (this._yMin === undefined) {
        if (s.hasOwnProperty("negativeY") && s.negativeY) {
          yDomain[0] = aggs.hasOwnProperty("max")
            ? Math.min(yDomain[0], -aggs.max)
            : Math.min(yDomain[0], -d3.max(data, d => d[s.metric]));
        }
        else {
          yDomain[0] = aggs.hasOwnProperty("min")
            ? Math.min(yDomain[0], aggs.min)
            : Math.min(yDomain[0], d3.min(data, d => d[s.metric]));
        }
      }

      if (this._yMax === undefined) {
        if (s.hasOwnProperty("negativeY") && s.negativeY) {
          yDomain[1] = aggs.hasOwnProperty("min")
            ? Math.max(yDomain[1], -aggs.min)
            : Math.max(yDomain[1], -d3.min(data, d => d[s.metric]));
        }
        else {
          yDomain[1] = aggs.hasOwnProperty("max")
            ? Math.max(yDomain[1], aggs.max)
            : Math.max(yDomain[1], d3.max(data, d => d[s.metric]));
        }
      }

    }

    if (yDomain[0] === yDomain[1]) {
      if (this._yMax !== undefined) {
        yDomain[0]--;
      }
      else {
        yDomain[1]++;
      }
    }

    return [yDomain, legendEntries];

  }
  
}
)}

function _12(md){return(
md`## Appendix`
)}

function _13(md){return(
md`##### Dashboard`
)}

function _dashboard(d3,data,TimeSeriesChart)
{

  d3.select("#charts-container").selectAll("svg").remove();
  
  const width = 460;

  const store = [];

  const selectionHandler = (caller, start, stop) => {
    const sample = data.slice(data.findIndex(d => d.date >= start), data.findIndex(d => d.date > stop));
    if (sample.length >= 6) {
      for (const chart of store) {
        chart.refreshData(sample);
      }
    }
  }

  const configurations = [
    {
      data: data,
      width: width,
      title: "Multi-series + y-axis limits",
      yMin: 0,
      yMax: 100,
      legendValues: ["Min", "Max", "Avg"],
      selectionHandler: selectionHandler,
      series: [
        {
          label: "Packets",
          metric: "metric1",
          lineColor: "green",
          fillColor: "#00800019",
          legend: true,
          tooltip: true
        },
        {
          label: "Requests",
          metric: "metric3",
          lineColor: "red",
          legend: true,
          tooltip: true
        },
        {
          label: "Price",
          metric: "metric4",
          lineColor: "#ffa500",
          fillColor: "#ffa50030",
          legend: true,
          tooltip: true
        }
      ]
    },
    {
      data: data,
      width: width,
      title: "No fill / legend / tooltip + y-axis upper limit",
      format: ".2~f",
      yMax: 60,
      selectionHandler: selectionHandler,
      series: [
        {
          label: "Drift",
          metric: "metric2",
          lineColor: "blue",
          tooltip: false
        }
      ]
    },
    {
      data: data,
      width: width,
      title: "No line / brush + y-axis limits",
      format: ".2~f",
      yMin: 0,
      yMax: 100,
      legendValues: ["Last"],
      series: [
        {
          label: "Requests",
          metric: "metric3",
          fillColor: "#ff000025",
          legend: true,
          tooltip: true
        }
      ]
    },
    {
      data: data,
      width: width,
      title: "Fill below to + Negative Y",
      legendValues: ["Min", "Max", "Avg"],
      selectionHandler: selectionHandler,
      series: [
        {
          label: "Outbound",
          metric: "metric4",
          lineColor: "orange",
          fillColor: "#ffa50050",
          fillToZero: true,
          legend: true,
          tooltip: true
        },
        {
          label: "Inbound",
          metric: "metric4",
          lineColor: "red",
          fillColor: "#ff000050",
          fillToZero: true,
          negativeY: true,
          legend: true,
          tooltip: true
        },
        {
          label: "Dummy",
          metric: "metric5",
          fillColor: "#0000ff30",
          fillToMetric: "metric4",
        },
        {
          label: "Dummy",
          metric: "metric5",
          fillColor: "#00800030",
          fillToMetric: "metric4",
          negativeY: true
        }
      ]
    }
  ];

  for (const [i, c] of configurations.entries()) {
    const chart = new TimeSeriesChart(c);
    chart.appendTo(`#chart-${i+1}`);
    store.push(chart);
  }
  
  return true;
  
}


function _15(md){return(
md`##### Data`
)}

function _data(reset)
{
  reset;
  const cnt = 288;
  const data = [];
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  for (let i=0; i<cnt; i++) {
    data.push({
      "date": new Date(date.getTime()),
      "metric1": 20 + Math.round(Math.random() * 200) / 100,
      "metric2": Math.sin(-2 + i * 4 / cnt) * 40,
      "metric3": 84 + Math.sin(-40 + i * 84 / cnt),
      "metric4": Math.exp(i * 8 / cnt) / 40,
      "metric5": Math.exp(i * 8 / cnt) * (Math.random() / 4 + 1.2) / 40
    });
    date.setSeconds(date.getSeconds() + 300);
  }
  return data;
}


function _17(md){return(
md`##### Control panel`
)}

function _randomize(random,$0,randomValues,Event)
{
  random;
  $0.value = randomValues();
  $0.dispatchEvent(new Event("input"));
}


function _randomValues(roll,options,randomColor){return(
function randomValues() {
  
  const values = {
    title: "Random chart",
    format: ".4~s",
    legendValues: []
  };

  for (const option of ["yMin", "yMax"]) {
    values[option] = roll(0, 1) === 1;
  }

  values["yMinValue"] = roll(0, 8) * 10 - 60;
  values["yMaxValue"] = roll(0, 8) * 10 + 40;

  const labels = ["Outbound", "Discarded", "Inbound"];
  
  for (let i=0; i<3; i++) {

    const prefix = `s${i+1}`;

    values[prefix + "Label"] = labels[i];

    for (const option of ["Line", "NegativeY"]) {
      values[prefix + option] = roll(0, 1) === 1;
    }

    values[prefix + "Metric"] = options.metric[roll(0, options.metric.length-1)].toLowerCase();
    values[prefix + "Fill"] = options.fill[roll(0, options.fill.length-1)].toLowerCase();

    values[prefix + "LineColor"] = randomColor();
    values[prefix + "LineAlpha"] = roll(30, 255);
    values[prefix + "FillColor"] = randomColor();
    values[prefix + "FillAlpha"] = roll(30, 255);

  }

  return values;

}
)}

function _chartDefinition(){return(
function chartDefinition(panel) {

  const definition = {
    title: panel.title,
    format: panel.format,
    legendValues: panel.legendValues,
    series: []
  };

  if (panel.yMin) {
    definition.yMin = panel.yMinValue;
  }
  if (panel.yMax) {
    definition.yMax = panel.yMaxValue;
  }

  let cnt = 0;

  for (let i=1; i<=3; i++) {

    const prefix = `s${i}`;

    if (panel[prefix + "Metric"] !== "disabled") {

      definition.series.push(
        {
          label: panel[prefix + "Label"],
          metric: panel[prefix + "Metric"],
          legend: panel[prefix + "Options"].includes("Legend"),
          tooltip: panel[prefix + "Options"].includes("Tooltip"),
          negativeY: panel[prefix + "Options"].includes("Negative Y")
        }
      );

      if (panel[prefix + "Line"]) {
        definition.series[cnt].lineColor = panel[prefix + "LineColor"]
          + panel[prefix + "LineAlpha"].toString(16).padStart(2, "0");
      }

      if (panel[prefix + "Fill"] !== "disabled") {

        definition.series[cnt].fillColor = panel[prefix + "FillColor"]
          + panel[prefix + "FillAlpha"].toString(16).padStart(2, "0");

        if (panel[prefix + "Fill"] === "zero") {
          definition.series[cnt].fillToZero = true;
        }
        else if (panel[prefix + "Fill"] !== "bottom") {
          definition.series[cnt].fillToMetric = panel[prefix + "Fill"];
        }

      }

      cnt++;

    }

  }

  return definition;

}
)}

function _options()
{
  return {
    metric: ["Disabled", "Metric1", "Metric2", "Metric3", "Metric4", "Metric5"],
    fill: ["Disabled", "Bottom", "Zero", "Metric1", "Metric2", "Metric3", "Metric4", "Metric5"]
  };
}


function _inputs(Inputs,options)
{

  const inputs = {
    title: Inputs.text({label: "Title:", value: "Example chart"}),
    format: Inputs.text({label: "Format:", value: ".4~s"}),
    yMin: Inputs.toggle({label: "yMin:", value: true}),
    yMinValue: Inputs.range([-60, 20], {label: "yMin value:", step: 10, value: 0}),
    yMax: Inputs.toggle({label: "yMax:"}),
    yMaxValue: Inputs.range([40, 120], {label: "yMax value:", step: 10, value: 100}),
    legendValues: Inputs.select(["Min", "Max", "Avg", "Last"], {label: "Legend values:", multiple: true})
  };

  const series = {
    s1: ["metric3", "Outbound", true, "#77bb41", 255, "bottom",  "#77bb41", 50],
    s2: ["disabled", "Discarded", false, "#0000FF", 255, "disabled", "#0000FF", 110],
    s3: ["disabled", "Inbound", false, "#FF0000", 255, "disabled", "#FF0000", 120]
  };
  
  for (const [k, v] of Object.entries(series)) {
    
    inputs[k + "Metric"] = Inputs.select(options.metric, {label: "Metric:", valueof: d => d.toLowerCase(), value: v[0]});
    inputs[k + "Label"] = Inputs.text({label: "Label:", value: v[1]});
    inputs[k + "Line"] = Inputs.toggle({label: "Line:", value: v[2]});
    inputs[k + "LineColor"] = Inputs.color({label: "Line color:", value: v[3]});
    inputs[k + "LineAlpha"] = Inputs.range([0, 255], {label: "Line alpha:", step: 5, value: v[4]});
    inputs[k +  "Fill"] = Inputs.select(options.fill, {label: "Fill below to:", valueof: d => d.toLowerCase(), value: v[5]});
    inputs[k + "FillColor"] = Inputs.color({label: "Fill color:", value: v[6]});
    inputs[k + "FillAlpha"] = Inputs.range([0, 255], {label: "Fill alpha:", step: 5, value: v[7]});
    inputs[k + "Options"] = Inputs.checkbox(["Tooltip", "Legend", "Negative Y"]);

  }

  return inputs;

}


function _randomColor(roll){return(
function randomColor() {
  let color = "#";
  for (let i=0; i<3; i++) {
    color += roll(0, 255).toString(16).padStart(2, "0");
  }
  return color;
}
)}

function _roll(){return(
function roll(from, to) {
  return Math.floor(Math.random() * (to - from + 1)) + from;
}
)}

function _styling(html){return(
html`
<style>
	.cp-row {
		display: flex;
    flex-wrap: wrap;
		justify-content: start;
	}
	.cp-group {
		width: 300px;
    padding-right: 40px;
    padding-bottom: 20px;
	}
	.cp-title {
    font-family: monospace;
    font-size: 11px;
		text-decoration: underline;
		font-weight: bold;
	}
  .cp-group label, .cp-group input, .cp-group output, .cp-group select {
    font-family: monospace;
    font-size: 11px;
  }
</style>
`
)}

function _26(md){return(
md`##### D3.js`
)}

function _d3(require){return(
require("d3@7")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["html"], _3);
  main.variable(observer("viewof reset")).define("viewof reset", ["html"], _reset);
  main.variable(observer("reset")).define("reset", ["Generators", "viewof reset"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["chartDefinition","panel","d3","data","TimeSeriesChart"], _6);
  main.variable(observer("viewof random")).define("viewof random", ["html"], _random);
  main.variable(observer("random")).define("random", ["Generators", "viewof random"], (G, _) => G.input(_));
  main.variable(observer("viewof panel")).define("viewof panel", ["Inputs","inputs","html"], _panel);
  main.variable(observer("panel")).define("panel", ["Generators", "viewof panel"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("TimeSeriesChart")).define("TimeSeriesChart", ["d3"], _TimeSeriesChart);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("dashboard")).define("dashboard", ["d3","data","TimeSeriesChart"], _dashboard);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("data")).define("data", ["reset"], _data);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("randomize")).define("randomize", ["random","viewof panel","randomValues","Event"], _randomize);
  main.variable(observer("randomValues")).define("randomValues", ["roll","options","randomColor"], _randomValues);
  main.variable(observer("chartDefinition")).define("chartDefinition", _chartDefinition);
  main.variable(observer("options")).define("options", _options);
  main.variable(observer("inputs")).define("inputs", ["Inputs","options"], _inputs);
  main.variable(observer("randomColor")).define("randomColor", ["roll"], _randomColor);
  main.variable(observer("roll")).define("roll", _roll);
  main.variable(observer("styling")).define("styling", ["html"], _styling);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
