import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { WorkingHours } from 'src/app/models/workingHours';

@Component({
  selector: 'cyh-working-hours-form',
  templateUrl: './working-hours-form.component.html',
  styleUrls: ['./working-hours-form.component.sass']
})
export class WorkingHoursFormComponent implements OnInit {
  @Output() changedWorkingHours = new EventEmitter<WorkingHours>();

  public workingHours: WorkingHours = new WorkingHours();

  public workingHoursForm = new FormGroup({
    monday: new FormControl(false),
    mondayStart: new FormControl(0),
    mondayEnd: new FormControl(0),
    tuesday: new FormControl(false),
    tuesdayStart: new FormControl(0),
    tuesdayEnd: new FormControl(0),
    wednesday: new FormControl(false),
    wednesdayStart: new FormControl(0),
    wednesdayEnd: new FormControl(0),
    thursday: new FormControl(false),
    thursdayStart: new FormControl(0),
    thursdayEnd: new FormControl(0),
    friday: new FormControl(false),
    fridayStart: new FormControl(0),
    fridayEnd: new FormControl(0),
  });

  public daysOfTheWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  public translatedDaysOfTheWeek = ['luni', 'marți', 'miercuri', 'joi', 'vineri'];

  public selectHoursValues: {key: string, value: number}[] = [];

  constructor(private cd: ChangeDetectorRef) { 
    this.workingHoursForm.valueChanges.subscribe((form) => {
      Object.entries(this.workingHours).forEach(([day, hoursInterval]) => {
        hoursInterval.start = form[day + 'Start'];
        hoursInterval.end = form[day + 'End'];
      });
      this.changedWorkingHours.emit(this.workingHours);
    });
  }

  public ngOnInit(): void {
    this.selectHoursValues = [];
    for(let i = 1; i < 25; i++) {
      this.selectHoursValues.push({
        key: i <= 12 ? i + ':00 AM' : (i - 12) + ':00 PM',
        value: i * 100
      });
    }
  }

  public getLabelForDay(day: string): string {
    return this.translatedDaysOfTheWeek[this.daysOfTheWeek.indexOf(day)];
  }

  public getToggleLabelForDay(day: string): string {
    return this.workingHoursForm.controls[day].value ? 'Deschis' : 'Închis';
  }
  
  public showTimeInputs(day: string): boolean {
    return this.workingHoursForm.controls[day].value;
  }

  public toggleDay(toggleChange: MatSlideToggleChange, day: string): void {
    if (toggleChange.checked) {
      this.workingHoursForm.setControl(day + 'Start', new FormControl(900));
      this.workingHoursForm.setControl(day + 'End', new FormControl(1700));
      this.cd.detectChanges();
    }
    else {
      this.workingHoursForm.setControl(day + 'Start', new FormControl(0));
      this.workingHoursForm.setControl(day + 'End', new FormControl(0));
      this.cd.detectChanges();
    }
  }
}
