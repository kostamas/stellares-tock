import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralVolumeComponent } from './general-volume.component';

describe('GeneralVolumeComponent', () => {
  let component: GeneralVolumeComponent;
  let fixture: ComponentFixture<GeneralVolumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralVolumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
