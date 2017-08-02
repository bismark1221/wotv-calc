import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainingComponent } from './chaining.component';

describe('ChainingComponent', () => {
  let component: ChainingComponent;
  let fixture: ComponentFixture<ChainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
