import { Observable, Observer, Subject } from 'rxjs';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public modalType: Subject<string> = new Subject<string>();
  private subject: Subject<any> = new Subject<any>();

  public connect(compUrl: string, id?: string): Subject<any> {
    const url = environment.wsBaseUrl + '/' + compUrl + (id ? '/' + id : '')
    this.subject = this.create(url);
    return this.subject;
  }

  private create(url: string): Subject<any> {
    let ws = new WebSocket(url);

    let observable = Observable.create((obs: Observer<any>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    
    return Subject.create(observer, observable);
  }
}
