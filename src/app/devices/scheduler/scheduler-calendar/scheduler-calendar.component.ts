import { Component, Input, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { ChartComponent } from '../chart/chart.component';
import { Scheduler } from '../scheduler';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-scheduler-calendar',
  templateUrl: './scheduler-calendar.component.html',
  styleUrls: ['./scheduler-calendar.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class SchedulerCalendarComponent implements OnChanges {

  @ViewChild('chartTarget') chartTarget: ChartComponent;

  @Input()
  scheduler: Scheduler;

  startDate = moment().startOf('day');

  options = {
    chart: {
      type: 'xrange'
    },
    title: {
      text: ''
    },
    xAxis: {
      type: 'datetime',
      tickInterval: 3600 * 1000,
      min: Date.UTC(this.startDate.year(), this.startDate.month(), this.startDate.date(), this.startDate.hours(), this.startDate.minutes()),
      labels: {
        formatter: function() {
          return Highcharts.dateFormat('%H:%M', this.value);
        }
      },
      plotLines: []
    },
    yAxis: {
      title: {
        text: ''
      },
      categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      reversed: true
    },
    dataLabels: {
      enabled: true
    }
  };

  series$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  private table = {
    '00': 'cft',
    '01': 'eco',
    '10': 'fro',
  };


  ngOnChanges(changes: SimpleChanges) {
    const scheduler: Scheduler = changes['scheduler'].currentValue;
    if (scheduler) {
      const date = this.startDate.clone().add(scheduler.attr.time_hour * 30, 'minutes');


      this.chartTarget.update({
        xAxis: {
          plotLines: [{
            value: Date.UTC(date.year(), date.month(), date.date(), date.hours(), date.minutes()),
            width: 1,
            color: 'green',
            dashStyle: 'Dash',
          }]
        }
      });

      const seriesEco = {
        borderColor: 'gray',
        borderRadius: 5,
        pointWidth: 10,
        name: 'Eco',
        data: [],
      };
      const seriesComfort = {
        borderColor: 'gray',
        borderRadius: 5,
        pointWidth: 10,
        name: 'Comfort',
        data: [],
      };
      const seriesFrozen = {
        borderColor: 'gray',
        borderRadius: 5,
        pointWidth: 10,
        name: 'Frozen',
        data: [],
      };
      for (let i = 1; i <= 7; i++) {
        for (let j = 1; j <= 12; j++) {
          const key = `p${i}_data${j}`;
          const value = scheduler.attr[key];
          const blocks = this.getValueBlocks(value);

          let start = this.startDate.clone().add((j - 1) * 2, 'hours');
          for (let k = 0; k <= 3; k++) {
            const end = start.clone().add(30, 'minutes');
            let series;
            let color;
            if (blocks[k] === 'eco') {
              series = seriesEco;
              color = '#213C37';
            } else if (blocks[k] === 'cft') {
              series = seriesComfort;
              color = '#B2422C';
            } else if (blocks[k] === 'fro') {
              series = seriesFrozen;
              color = '#1B99D2';
            }
            const utcStart = Date.UTC(start.year(), start.month(), start.date(), start.hours(), start.minutes());
            const utcEnd = Date.UTC(end.year(), end.month(), end.date(), end.hours(), end.minutes());
            if (series?.data.length > 0 && series?.data[series?.data.length - 1].x2 === utcStart) {
              series.data[series?.data.length - 1].x2 = utcEnd;
            } else {
              series?.data.push({
                color,
                x: utcStart,
                x2: utcEnd,
                y: i - 1,
              });
            }
            start = end;
          }
        }
      }
      this.series$.next([seriesEco, seriesComfort, seriesFrozen]);
    }
  }

  private getValueBlocks(value: string): string[] {
    const binary = Number(value).toString(2);
    const yieldBinary = '00000000'.substr(binary.length) + binary;
    return yieldBinary.match(/.{1,2}/g).map(data => this.convert(data)).reverse();
  }

  private convert(value: string): string {
    return this.table[value];
  }
}
