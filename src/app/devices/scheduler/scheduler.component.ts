import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../devices.service';
import { ActivatedRoute } from '@angular/router';
import { Scheduler } from './scheduler';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.sass']
})
export class SchedulerComponent implements OnInit {

  result: Scheduler;

  bindings: any[];

  constructor(private route: ActivatedRoute,
              private service: DevicesService) {
    this.result = null;
  }

  ngOnInit(): void {
    const deviceId = this.route.parent.snapshot.paramMap.get('deviceId');

    this.service.scheduler(deviceId).subscribe((result: Scheduler) => {
      this.result = result;
    });

    this.service.bindings().subscribe((bindings) => {
      this.bindings = bindings['devices'];
    });
  }

  getTitle() {
    const result = (this.bindings || []).find(binding => binding.did === this.result?.did);
    const group = result?.remark.split('|')[3].split('groupname=')[1];
    return group ? `${group} / ${result?.dev_alias}` : result?.dev_alias;
  }
}
