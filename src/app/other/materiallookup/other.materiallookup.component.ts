import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { TranslateService } from '../../services/translate.service';
import { NavService } from '../../services/nav.service';
import { ToolService } from '../../services/tool.service';
import { EquipmentService } from '../../services/equipment.service';

@Component({
  selector: 'app-other-materiallookup',
  templateUrl: './other.materiallookup.component.html',
  styleUrls: ['./other.materiallookup.component.css']
})
export class OtherMaterialLookupComponent implements OnInit {
  items = [];
  itemClass = 'in-material-lookup';

  constructor(
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private navService: NavService,
    private toolService: ToolService,
    private equipmentService: EquipmentService
  ) {
    this.translateService.onLangChange.subscribe((event) => {
      this.translateItemsAndEquipments();
    });
  }

  private translateItemsAndEquipments() {
    this.items.forEach(item => {
      item.name = this.toolService.getName(item);

      item.equipments.forEach(equipment => {
        equipment.name = this.toolService.getName(equipment);
      });

      item.equipments = this.toolService.sortByName(item.equipments);
    });

    this.items = this.toolService.sortByName(this.items);
  }

  async ngOnInit() {
    this.navService.setSEO('Material Lookup', 'What can you craft with each material ? This page is made for you.');

    await this.getEquipments();
  }

  async getEquipments() {
    this.items = await this.equipmentService.getEquipmentsFromMaterialLookup();
    this.translateItemsAndEquipments();
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }
}
