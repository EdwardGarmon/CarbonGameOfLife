import {Component, Input, OnInit} from '@angular/core';
import {CheckboxChange} from 'carbon-components-angular';

@Component({
  selector: 'app-check-boxes',
  styleUrls: ['./check-boxes.component.scss'],
  template: `
    <ibm-tile theme="dark">
      <fieldset className="bx--fieldset">
        <legend style="margin: 10px">{{label}}</legend>
        <ibm-checkbox
          *ngFor="let n of nums; let i = index"
          [checked]="n"
          (change)="updateChecks(i,$event.checked)"
        >
          <div> {{i}}</div>
        </ibm-checkbox>
      </fieldset>
    </ibm-tile>
  `
})
export class CheckBoxesComponent implements OnInit {

  @Input() label: string;
  @Input() nums: boolean [];
  @Input() updateChecks: (index: number, val: boolean) => void;

  constructor() {
  }


  ngOnInit(): void {
  }

}
