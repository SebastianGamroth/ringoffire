import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlltasksService {

  task: any[] = [];
  avatarPic: string;

  constructor() { }
}
