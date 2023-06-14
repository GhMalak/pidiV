import { Component, Input, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner-overlay',
  templateUrl: './spinner-overlay.component.html',
  styleUrls: ['./spinner-overlay.component.sass']
})
export class SpinnerOverlayComponent implements OnInit {

  constructor(public spinnerService: SpinnerService) { }
  @Input() value : number = 100;
  @Input() diameter: number = 100;
  @Input() mode : string ="indeterminate";
  @Input() strokeWidth : number = 10;
  @Input() overlay: boolean = false;
  @Input() color: string = "primary";
  ngOnInit(): void {
  }

}
