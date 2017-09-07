import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyUnitsComponent } from './my-units.component';

describe('MyUnitsComponent', () => {
  let component: MyUnitsComponent;
  let fixture: ComponentFixture<MyUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyUnitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
