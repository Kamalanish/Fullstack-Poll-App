import {Component, OnInit} from '@angular/core';
import {PollService} from '../poll.service';
import {Poll} from '../poll.models';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.css'
})
export class PollComponent implements OnInit {

  polls: Poll[] = [];

  constructor(private pollService: PollService) {
  }

  ngOnInit(): void {
    this.loadPolls();
  }

  loadPolls() {
    this.pollService.getAllPolls().subscribe({
      next: data => {
        this.polls = data;
      },
      error: error => {
        console.log("Error getting all Polls: ", error);
      }
    })
  }
}
