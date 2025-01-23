import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoderesPage } from './poderes.page';

describe('PoderesPage', () => {
  let component: PoderesPage;
  let fixture: ComponentFixture<PoderesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PoderesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
