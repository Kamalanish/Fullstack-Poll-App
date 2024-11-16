export interface OptionVote {
  optionText: string;
  vote: number
}

export interface Poll {

  id: number;
  questionText: string;
  optionVotes: OptionVote[]

}


