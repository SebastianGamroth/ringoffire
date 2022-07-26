import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AlltasksService } from '../alltasks.service';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss'
  ]
})
export class DialogAddPlayerComponent implements OnInit {
  name: string = '';
  avatar: string = '';

  constructor(public alltasks: AlltasksService, public dialogRef: MatDialogRef<DialogAddPlayerComponent>) { }

  ngOnInit(): void {

  }

  onNoClick() {
    this.dialogRef.close();
  }

  changeImg(value) {
    // this.alltasks.task.push(value)
    this.alltasks.avatarPic=value;
  }

}
