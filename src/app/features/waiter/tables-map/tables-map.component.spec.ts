import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TablesMapComponent } from './tables-map.component';
import { TableService } from '../../../core/services/table.service';

describe('TablesMapComponent', () => {
  let component: TablesMapComponent;
  let fixture: ComponentFixture<TablesMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablesMapComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [TableService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
