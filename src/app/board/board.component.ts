import {Component, OnInit} from '@angular/core';
import {ButtonType} from 'carbon-components-angular';

@Component({
  selector: 'app-board',
  styleUrls: ['./board.component.scss'],
  template: `
    <div ibmGrid class="board">
      <app-controls
        [initBoard]="initBoard.bind(this)"
        [togglePlay]="togglePlay.bind(this)"
        [playing]="playing"
        (newBirths)="genBirthArray($event)"
        (newDeaths)="genSurviveArray($event)"
      ></app-controls>
      <div ibmRow *ngFor="let row of boardState; let x = index" style="min-width: 1980px">
        <button [ibmButton]="getState(x,y)" (click)="handleClick(x,y)" style="width: min-content" *ngFor="let b of row; let y = index;">
        </button>
      </div>
    </div>
  `
})

export class BoardComponent implements OnInit {

  boardState: number[][];
  directions: number[];
  playing: number;
  width: number;
  length: number;
  surviveList: number[];
  birthList: number[];

  constructor() {
    this.surviveList = [];
    this.birthList = [];
    this.width = 20;
    this.length = 20;
    this.initBoard();
    this.directions = [-1, 0, 1];
    this.playing = -1;
  }

  initBoard(): void {
    this.boardState = [];
    for (let i = 0; i < this.width; i++) {
      const row = [];
      // tslint:disable-next-line:prefer-for-of
      for (let x = 0; x < this.length; x++) {
        row.push(0);
      }
      this.boardState.push(row);
    }
  }

  getState(x: number, y: number): ButtonType{

    if (this.boardState[x][y] > 0) {
      return 'danger';
    }
    return 'secondary';
  }

  handleClick(x: number, y: number): void {

    if (this.boardState[x][y] === 0) {
      this.boardState[x][y]++;
    } else {
      this.boardState[x][y]--;
    }


  }

  getNeighbors(x: number, y: number): number {
    let n = 0;
    this.directions.forEach((dx) => {
      this.directions.forEach((dy) => {
        if (dy !== 0 || dx !== 0) {
          const xdd = x + dx;
          const ydd = y + dy;
          if (xdd >= 0 && xdd < this.boardState.length &&
            ydd >= 0 && ydd < this.boardState.length &&
            this.boardState[x + dx][y + dy] > 0) {
            n++;
          }
        }
      });
    });
    return n;

  }

  togglePlay(): void {

    if (this.playing === -1) {
      this.playing = setInterval(() => {
        this.play();
      }, 1000);
    } else {

      clearInterval(this.playing);
      this.playing = -1;
    }
  }

  play(): void {

    const boardBuffer: number[][] = [];

    for (let x = 0; x < this.width; x++) {
      const row: number [] = [];
      for (let y = 0; y < this.length; y++) {

        const neighbors = this.getNeighbors(x, y);

        // if tile is alive
        if (this.boardState[x][y] > 0) {

          if (this.surviveList.includes(neighbors)) {
            row.push(1);
          } else {
            row.push(0);
          }

        } else {

          if (this.birthList.includes(neighbors)) {

            row.push(1);
          } else {

            row.push(0);
          }
        }

      }
      boardBuffer.push(row);
    }
    this.boardState = boardBuffer;
  }

  genBirthArray(event: { index: number; val: boolean }): void {
    console.log(event);

    if (event.val) {
      this.birthList.push(event.index);
    } else {
      this.birthList = this.birthList.filter((num) => {
        return (num !== event.index);
      });
    }

    console.log(this.birthList, '<- birth');
  }


  genSurviveArray(event: { index: number; val: boolean }): void {

    if (event.val) {
      this.surviveList.push(event.index);
    } else {
      this.surviveList = this.surviveList.filter((num) => {
        return (num !== event.index);
      });
    }

    console.log(this.surviveList, '<- survive');
  }


  ngOnInit(): void {
  }

}
