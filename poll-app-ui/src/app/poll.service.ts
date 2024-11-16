import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Poll} from './poll.models';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  private readonly baseUrl = 'http://localhost:8080/api/polls';

  constructor(private readonly httpClient: HttpClient) {
  }

  createPoll(poll: Poll): Observable<Poll> {
    return this.httpClient.post<Poll>(this.baseUrl, poll);
  }

  getAllPolls(): Observable<Poll[]> {
    return this.httpClient.get<Poll[]>(this.baseUrl);
  }

  vote(pollId: number, optionIndex: number): Observable<void> {
    const url = `${this.baseUrl}/vote`;
    return this.httpClient.post<void>(url, {pollId, optionIndex});
  }


}
