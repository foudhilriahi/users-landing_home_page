import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosPopupComponent } from './infos-popup.component';

describe('InfosPopupComponent', () => {
  let component: InfosPopupComponent;
  let fixture: ComponentFixture<InfosPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfosPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfosPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
