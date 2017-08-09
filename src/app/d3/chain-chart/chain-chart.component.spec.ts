import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainChartComponent } from './chain-chart.component';

describe('ChainChartComponent', () => {
  let component: ChainChartComponent;
  let fixture: ComponentFixture<ChainChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChainChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
