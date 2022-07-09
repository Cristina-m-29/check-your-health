import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBaseInfoDialogComponent } from './edit-base-info-dialog.component';

describe('EditBaseInfoDialogComponent', () => {
  let component: EditBaseInfoDialogComponent;
  let fixture: ComponentFixture<EditBaseInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBaseInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBaseInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
