import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { WorkingHours } from 'src/app/models/workingHours';

@Component({
  selector: 'cyh-working-hours-form',
  templateUrl: './working-hours-form.component.html',
  styleUrls: ['./working-hours-form.component.sass']
})
export class WorkingHoursFormComponent implements OnInit {
  @Input() workingHoursInput = new WorkingHours();
  @Input() forEdit = false;
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

    if (this.forEdit) {
      this.setWorkingHours(this.workingHoursInput);
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

  private setWorkingHours(wh: WorkingHours): void {
    const monday = wh.monday.start !== 0 || wh.monday.end !== 0;
    this.workingHoursForm.controls['monday'].setValue(!!monday);
    if (!!monday) {
      this.workingHoursForm.controls['mondayStart'].setValue(wh.monday.start);
      this.workingHoursForm.controls['mondayEnd'].setValue(wh.monday.end);
    }

    const tuesday = wh.tuesday.start !== 0 || wh.tuesday.end !== 0;
    this.workingHoursForm.controls['tuesday'].setValue(!!tuesday);
    if (!!tuesday) {
      this.workingHoursForm.controls['tuesdayStart'].setValue(wh.tuesday.start);
      this.workingHoursForm.controls['tuesdayEnd'].setValue(wh.tuesday.end);
    }

    const wednesday = wh.wednesday.start !== 0 || wh.wednesday.end !== 0;
    this.workingHoursForm.controls['wednesday'].setValue(!!wednesday);
    if (!!wednesday) {
      this.workingHoursForm.controls['wednesdayStart'].setValue(wh.wednesday.start);
      this.workingHoursForm.controls['wednesdayEnd'].setValue(wh.wednesday.end);
    }

    const thursday = wh.thursday.start !== 0 || wh.thursday.end !== 0;
    this.workingHoursForm.controls['thursday'].setValue(!!thursday);
    if (!!thursday) {
      this.workingHoursForm.controls['thursdayStart'].setValue(wh.thursday.start);
      this.workingHoursForm.controls['thursdayEnd'].setValue(wh.thursday.end);
    }

    const friday = wh.friday.start !== 0 || wh.friday.end !== 0;
    this.workingHoursForm.controls['friday'].setValue(!!friday);
    if (!!friday) {
      this.workingHoursForm.controls['fridayStart'].setValue(wh.friday.start);
      this.workingHoursForm.controls['fridayEnd'].setValue(wh.friday.end);
    }
  }
}
