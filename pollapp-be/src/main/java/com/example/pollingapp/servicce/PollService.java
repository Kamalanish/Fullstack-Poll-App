package com.example.pollingapp.servicce;

import com.example.pollingapp.model.OptionVote;
import com.example.pollingapp.model.Poll;
import com.example.pollingapp.repostiory.PollRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PollService {
    private final PollRepository pollRepository;


    public Poll createPoll(Poll poll) {
        return pollRepository.save(poll);
    }

    public List<Poll> getAllPolls() {
        return pollRepository.findAll();
    }

    public Optional<Poll> getPoolById(Long id) {
        return pollRepository.findById(id);
    }

    public void vote(Long pollId, int optionIndex) throws IllegalArgumentException {
        Poll poll = pollRepository.findById(pollId)
                .orElseThrow(() -> new IllegalArgumentException("Poll not found with id: " + pollId));

        List<OptionVote> optionVotes = poll.getOptionVotes();
        if (optionIndex < optionVotes.size()) {
            OptionVote selectedOption = optionVotes.get(optionIndex);
            selectedOption.setVote(selectedOption.getVote() + 1);
            pollRepository.save(poll);
        } else {
            throw new IllegalArgumentException("Invalid option index");
        }


    }
}
