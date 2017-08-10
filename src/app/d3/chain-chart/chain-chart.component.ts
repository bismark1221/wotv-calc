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

  // from gantt
  private FIT_TIME_DOMAIN_MODE = "fit";
  private FIXED_TIME_DOMAIN_MODE = "fixed";
  private margin: any = { top : 20, right : 40, bottom : 20, left : 150 };
  private timeDomainStart = new Date("Sun Dec 01 00:00:00 EST 2017");
  private timeDomainEnd = new Date("Sun Dec 07 00:00:00 EST 2017");
  private timeDomainMode = this.FIT_TIME_DOMAIN_MODE;
  private taskTypes = [];
  private tickFormat = "%H:%M";
  private x: any;
  private y: any;
  private taskStatus = {
    "SUCCEEDED" : "bar",
    "FAILED" : "bar-failed",
    "RUNNING" : "bar-running",
    "KILLED" : "bar-killed"
  };

  // from bar
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  constructor(private chainService: ChainService) { }

  ngOnInit() {
    this.data = this.chainService.getHits();
    this.createChart();
  }

  ngAfterViewInit() {
    console.log("Subscribe");
    this.chainService.$hits.subscribe(hits => {
      this.data = hits;
      if (this.data[0]) {
        this.updateChart();
      }
    });
  }

  private getMaxFrame = function() {
    return this.data[this.data.length - 1] ? this.data[this.data.length - 1].hit : 100;
  }

  private getUnitsName = function() {
    let unitsName = [];
    this.chainService.chainers.forEach(item => {
      item.name ? unitsName.push(item.name) : true;
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
      .attr('x', d => this.xScale(d.hit))
      .attr('y', d => this.yScale(d.unit.name))
      .attr('width', d => 5)
      .attr('height', d => this.yScale.bandwidth());

    // add new bars
    update
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => this.xScale(d.hit))
      .attr('y', d => this.yScale(d.unit.name))
      .attr('width', 5)
      .attr('height', this.yScale.bandwidth());
  }
}
