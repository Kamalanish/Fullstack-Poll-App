import { Component, OnInit } from '@angular/core';
import { PollService } from '../poll.service';
import { Poll } from '../poll.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.css'
})
export class PollComponent implements OnInit {

  newPoll: Poll = {
    id: 0,
    questionText: '',
    optionVotes: [
      { optionText: '', vote: 0 },
      { optionText: '', vote: 0 }
    ]
  };

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

  createPoll() {
    this.pollService.createPoll(this.newPoll).subscribe({
      next: (createdPoll) => {
        this.polls.push(createdPoll);
        this.resetPoll();
      },
      error: (error) => {
        console.error("Error creating Polls: ", error);
      }

    })
  }

  addOption(){
    this.newPoll.optionVotes.push({ optionText: '', vote: 0 });
  }

  resetPoll() {
    this.newPoll = {
      id: 0,
      questionText: '',
      optionVotes: [
        { optionText: '', vote: 0 },
        { optionText: '', vote: 0 }
      ]
    };
  }

  vote(pollId: number, optionIndex: number) {
    this.pollService.vote(pollId, optionIndex).subscribe({
      next: () => {
        const poll = this.polls.find(poll => poll.id == pollId);
        if(poll){
          poll.optionVotes[optionIndex].vote++;
        }
      },
      error: (error) => {
        console.error("Error voting on Poll: ", error);
      }
    })
  }

  trackByIndex(index: number): number {
    return index;
  }
}
