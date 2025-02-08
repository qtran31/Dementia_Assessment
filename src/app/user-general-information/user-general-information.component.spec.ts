import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGeneralInformationComponent } from './user-general-information.component';

describe('UserGeneralInformationComponent', () => {
  let component: UserGeneralInformationComponent;
  let fixture: ComponentFixture<UserGeneralInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGeneralInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGeneralInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
