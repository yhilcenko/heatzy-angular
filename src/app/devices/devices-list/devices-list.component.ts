import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../devices.service';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.sass']
})
export class DevicesListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'status', 'online'];

  bindings;

  constructor(private service: DevicesService) {
  }

  ngOnInit(): void {
    this.service.bindings().subscribe(value => this.bindings = value['devices']);
  }

}
