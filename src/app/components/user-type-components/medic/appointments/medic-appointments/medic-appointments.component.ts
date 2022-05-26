import { AppointmentsService } from 'src/app/services/appointments.service';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'cyh-medic-appointments',
  templateUrl: './medic-appointments.component.html',
  styleUrls: ['./medic-appointments.component.sass']
})
export class MedicAppointmentsComponent implements OnInit{
  @Output() gotAppointments = new EventEmitter<string>();

  public futureAcceptedAppointments$ = new Subject<Appointment[]>();
  public futureAppointments$ = new Subject<Appointment[]>();
  public oldAppointments$: Observable<Appointment[]> = this.appointmentsService.pastAppointmentsObservable
    .pipe(map((app: Appointment[]) => {
      this.gotAppointments.emit('old');
      return app;
    })
  );

  constructor(private appointmentsService: AppointmentsService) {
    this.appointmentsService.getAppointments('medic');
  }

  public ngOnInit(): void {
    this.filterFutureAppointments();
  }

  private filterFutureAppointments(): void {
    this.appointmentsService.futureAppointmentsObservable.subscribe((appointments: Appointment[]) => {
      const futureAccepted: Appointment[] = [];
      const future: Appointment[] = [];

      appointments.forEach((app: Appointment) => {
        if (app.status === 'pending') {
          future.push(app);
        }
        else if (app.status === 'accepted') {
          futureAccepted.push(app);
        }
      });

      this.gotAppointments.emit('future');
      this.futureAcceptedAppointments$.next(futureAccepted);
      this.futureAppointments$.next(future);
    });
  }

}
