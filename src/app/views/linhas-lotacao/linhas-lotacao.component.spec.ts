import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinhasLotacaoComponent } from './linhas-lotacao.component';

describe('LinhasLotacaoComponent', () => {
  let component: LinhasLotacaoComponent;
  let fixture: ComponentFixture<LinhasLotacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinhasLotacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinhasLotacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
