import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-controls',
  styleUrls: ['./controls.component.scss'],
  template: `
    <button ibmButton="primary" (click)="initBoard()" title="action">
      <svg ibmIconRedo size="32"></svg>
    </button>
    <button ibmButton="primary" (click)="togglePlay()" title="action">
      <svg *ngIf="this.playing == -1" ibmIconPlayFilled size="32"></svg>
      <svg *ngIf="this.playing > -1" ibmIconStopFilled size="32"></svg>
    </button>
    <app-check-boxes
      label="Survive"
      [nums]=dNums
      [updateChecks]="updateDeaths.bind(this)"
    ></app-check-boxes>
    <app-check-boxes
      label="Birth"
      [nums]=bNums
      [updateChecks]="updateBirths.bind(this)"
    ></app-check-boxes>`
})
export class ControlsComponent implements OnInit {

  dNums: boolean[];
  bNums: boolean[];

  constructor() {
    this.playing = 0;
    this.dNums = [false, false, false, false, false, false, false, false, false];
    this.bNums = [false, false, false, false, false, false, false, false, false];
  }

  @Input() initBoard: () => void;
  @Input() togglePlay: () => void;
  @Input() playing: number;

  @Output() newDeaths = new EventEmitter<{ index: number, val: boolean }>();
  @Output() newBirths = new EventEmitter<{ index: number, val: boolean }>();

  ngOnInit(): void {
  }

  updateDeaths(i: number, v: boolean): void {
    this.newDeaths.emit({index: i, val: v});
  }

  updateBirths(i: number, v: boolean): void {
    this.newBirths.emit({index: i, val: v});
  }

}
