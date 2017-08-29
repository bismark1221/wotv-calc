import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { ChainService } from '../../services/chain.service';

@Component({
  selector: 'app-chain-chart',
  templateUrl: './chain-chart.component.html',
  styleUrls: ['./chain-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ChainChartComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;
  private data: Array<any>;

  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  private margin: any = { top : 20, right : 20, bottom : 20, left : 80 };

  constructor(private chainService: ChainService) { }

  ngOnInit() {
    this.data = this.chainService.getHits();
    this.createChart();
  }

  ngAfterViewInit() {
    this.chainService.$hits.subscribe(hits => {
      this.data = hits;
      this.updateChart();
    });
  }

  private getMaxFrame = function() {
    return this.data[this.data.length - 1] ? this.data[this.data.length - 1].hit : 100;
  }

  private getUnitsName = function() {
    let unitsName = [];
    this.chainService.chainers.forEach((item, index) => {
      item.name ? unitsName.push((index + 1) + '.' + item.name) : true;
    });
    return unitsName;
  }

  createChart() {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    let svg = d3.select(element)
      .append("svg")
      .attr("class", "chart")
      .attr("width", element.offsetWidth)
      .attr("height", element.offsetHeight);

    // chart plot area
    this.chart = svg.append("g")
      .attr("class", "gantt-chart")
      .attr("width", element.offsetWidth)
      .attr("height", element.offsetHeight)
      .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);

    let xDomain = [0, this.getMaxFrame()];
    let yDomain = this.getUnitsName();
    this.xScale = d3.scaleLinear().domain(xDomain).range([0, this.width]);
    this.yScale = d3.scaleBand().padding(0.1).domain(yDomain).rangeRound([0, this.height]);

    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3.axisBottom(this.xScale));
    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale));
  }

  updateChart() {
    // update scales & axis
    this.xScale.domain([0, this.getMaxFrame()]);
    this.yScale.domain(this.getUnitsName());

    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    let update = this.chart.selectAll('.bar').data(this.data);

    // remove exiting bars
    update.exit().remove();

    // update existing bars
    this.chart.selectAll('.bar').transition()
      .attr('class', d => 'bar bar-' + d.type)
      .attr('x', d => this.xScale(d.hit))
      .attr('y', d => this.yScale(d.unitName))
      .attr('width', d => d.size)
      .attr('height', d => this.yScale.bandwidth());

    // add new bars
    update
      .enter()
      .append('rect')
      .attr('class', d => 'bar bar-' + d.type)
      .attr('x', d => this.xScale(d.hit))
      .attr('y', d => this.yScale(d.unitName))
      .attr('width', d => d.size)
      .attr('height', this.yScale.bandwidth());
  }
}
