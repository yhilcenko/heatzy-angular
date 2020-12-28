import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SeriesOptions } from 'highcharts';
import timeline from 'highcharts/modules/timeline';
import xRange from 'highcharts/modules/xrange';

timeline(Highcharts);
xRange(Highcharts);

@Component({
  selector: 'app-chart',
  template: '<div #chartTarget style="height: 100%; width: 100%"></div>',
  styleUrls: ['./chart.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class ChartComponent implements OnChanges, AfterViewInit {

  @ViewChild('chartTarget') chartTarget: ElementRef;

  @Input()
  options: Highcharts.Options;

  @Input()
  series: SeriesOptions[] = [];

  private chart;

  ngAfterViewInit(): void {
    Highcharts.setOptions({
      chart: {
        height: 600
      },
    });
    this.chart = Highcharts.chart(this.chartTarget.nativeElement, this.options);
    this.redrawSeries();
    setTimeout(() => this.chart.reflow());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['series'] && this.chart) {
      if (!changes['series'].previousValue) {
        changes['series'].previousValue = [];
      }
      let removed;
      let added;
      if (this.options.chart.type === 'column' && this.options.xAxis['categories']) {
        removed = changes['series'].previousValue;
        added = changes['series'].currentValue;
      } else {
        removed = changes['series'].previousValue?.filter(x => !(changes['series'].currentValue?.indexOf(x) >= 0)).filter(value => value);
        added = changes['series'].currentValue?.filter(x => !(changes['series'].previousValue?.indexOf(x) >= 0)).filter(value => value);
      }

      this.removeSeries(removed);

      if (added) {
        for (const s of added) {
          this.chart.addSeries(s, false, false);
        }
      }

      this.chart.redraw(true);
      this.chart.reflow();
    }
  }

  reflowChart() {
    if (this.chart) {
      this.chart.reflow();
    }
  }

  private redrawSeries() {
    if (this.chart) {
      if (this.series) {
        for (const s of this.series) {
          this.chart.addSeries(s, false, false);
        }
      }
      this.chart.redraw(true);
    }
  }

  private removeSeries(removed) {
    if (this.chart) {
      for (const toBeRemoved of removed) {
        for (let i = this.chart.series.length - 1; i >= 0; i--) {
          if (this.chart.series[i] && this.chart.series[i].name === toBeRemoved['name']) {
            this.chart.series[i].remove(false);
          }
        }
      }
    }
  }

  update(options: Highcharts.Options) {
    if (this.chart) {
      this.chart.update(options);
    }
  }
}
