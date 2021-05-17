import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { IndexService } from '../services/index.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';
import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-other-index',
  templateUrl: './other.index.component.html',
  styleUrls: ['./other.index.component.css']
})
export class OtherIndexComponent implements OnInit {
  units = [];
  sort = 'name';
  order = 'asc';
  statsType = [
    {type: 'HP', width: 55},
    {type: 'TP', width: 55},
    {type: 'AP', width: 55},
    {type: 'ATK', width: 65},
    {type: 'DEF', width: 65},
    {type: 'MAG', width: 70},
    {type: 'SPR', width: 65},
    {type: 'AGI', width: 60},
    {type: 'DEX', width: 65},
    {type: 'LUCK', width: 80},
    {type: 'EVADE', width: 90},
    {type: 'ACCURACY', width: 125},
    {type: 'CRITIC_RATE', width: 150}
  ];

  imageStatsType = [
    {type: 'SLASH_RES', width: 70},
    {type: 'PIERCE_RES', width: 70},
    {type: 'STRIKE_RES', width: 70},
    {type: 'MISSILE_RES', width: 70},
    {type: 'MAGIC_RES', width: 70},

    {type: 'SLASH_ATK', width: 70},
    {type: 'PIERCE_ATK', width: 70},
    {type: 'STRIKE_ATK', width: 70},
    {type: 'MISSILE_ATK', width: 70},
    {type: 'MAGIC_ATK', width: 70},

    {type: 'FIRE_RES', width: 70},
    {type: 'ICE_RES', width: 70},
    {type: 'EARTH_RES', width: 70},
    {type: 'WIND_RES', width: 70},
    {type: 'LIGHTNING_RES', width: 70},
    {type: 'WATER_RES', width: 70},
    {type: 'LIGHT_RES', width: 70},
    {type: 'DARK_RES', width: 70},

    {type: 'POISON_RES', width: 70},
    {type: 'BLIND_RES', width: 70},
    {type: 'SLEEP_RES', width: 70},
    {type: 'SILENCE_RES', width: 70},
    {type: 'PARALYZE_RES', width: 70},
    {type: 'CONFUSION_RES', width: 70},
    {type: 'PETRIFY_RES', width: 70},
    {type: 'TOAD_RES', width: 70},
    {type: 'CHARM_RES', width: 70},
    {type: 'SLOW_RES', width: 70},
    {type: 'STOP_RES', width: 70},
    {type: 'IMMOBILIZE_RES', width: 70},
    {type: 'DISABLE_RES', width: 70},
    {type: 'BERSERK_RES', width: 70},
    {type: 'DOOM_RES', width: 70}
  ];

  @ViewChild('leftWrapperContent') leftWrapperContent: ElementRef;
  @ViewChild('rightWrapperHeader') rightWrapperHeader: ElementRef;

  constructor(
    private indexService: IndexService,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService,
    private toolService: ToolService
  ) {
  }

  async ngOnInit() {
    this.navService.setTitle('Index');

    await this.getUnits();
  }

  async getUnits() {
    this.units = await this.indexService.getUnits();

    this.units.forEach(unit => {
      unit.name = this.nameService.getName(unit);
    });

    this.sortTable();
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }

  changeSort(sort) {
    if (sort === this.sort) {
      this.order = this.order === 'asc' ? 'desc' : 'asc';
    } else {
      if (sort === 'name') {
        this.order = 'asc';
      } else {
        this.order = 'desc';
      }
    }

    this.sort = sort;
    this.sortTable();
  }

  sortTable() {
    this.toolService.sortByName(this.units, this.sort === 'name' ? this.order : 'asc');

    if (this.sort !== 'name') {
      this.units.sort((a, b) => {
        if (!a.stats[this.sort] && !b.stats[this.sort]) {
          return 0;
        }

        if (!a.stats[this.sort]) {
          return this.order === 'asc' ? -1 : 1;
        }

        if (!b.stats[this.sort]) {
          return this.order === 'asc' ? 1 : -1;
        }

        if (a.stats[this.sort] > b.stats[this.sort]) {
          return this.order === 'asc' ? 1 : -1;
        } else if (a.stats[this.sort] < b.stats[this.sort]) {
          return this.order === 'asc' ? -1 : 1;
        }

        return 0;
      });
    }
  }

  onScroll(event) {
    this.leftWrapperContent.nativeElement.scrollTop = event.srcElement.scrollTop;
    this.rightWrapperHeader.nativeElement.scrollLeft = event.srcElement.scrollLeft;
  }
}
