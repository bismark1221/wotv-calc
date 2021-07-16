import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { OtherUnitService } from '../services/otherunit.service';
import { SkillService } from '../services/skill.service';
import { RangeService } from '../services/range.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';
import { QuestService } from '../services/quest.service';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-other-unit',
  templateUrl: './other.unit.component.html',
  styleUrls: ['./other.unit.component.css']
})
export class OtherUnitComponent implements OnInit {
  otherUnits = [];
  isCollapsedEnemy = [];
  masterInfos = {
    name: '',
    image: '',
    species: ''
  };
  statImage = {
    FIRE_RES : 'assets/elements/fire.png',
    ICE_RES : 'assets/elements/ice.png',
    EARTH_RES : 'assets/elements/earth.png',
    WIND_RES : 'assets/elements/wind.png',
    LIGHTNING_RES : 'assets/elements/lightning.png',
    WATER_RES : 'assets/elements/water.png',
    LIGHT_RES : 'assets/elements/light.png',
    DARK_RES : 'assets/elements/dark.png',

    SLASH_RES : 'assets/damage/neutral_slash.png',
    PIERCE_RES : 'assets/damage/neutral_pierce.png',
    STRIKE_RES : 'assets/damage/neutral_strike.png',
    MISSILE_RES : 'assets/damage/neutral_missile.png',
    MAGIC_RES : 'assets/damage/neutral_magic.png',

    POISON_RES : 'assets/status-ailments/POISON.png',
    FROSTBITE_RES : 'assets/status-ailments/FROSTBITE.png',
    BLIND_RES : 'assets/status-ailments/BLIND.png',
    SLEEP_RES : 'assets/status-ailments/SLEEP.png',
    SILENCE_RES : 'assets/status-ailments/SILENCE.png',
    PARALYZE_RES : 'assets/status-ailments/PARALYZE.png',
    CONFUSION_RES : 'assets/status-ailments/CONFUSION.png',
    PETRIFY_RES : 'assets/status-ailments/PETRIFY.png',
    TOAD_RES : 'assets/status-ailments/TOAD.png',
    CHARM_RES : 'assets/status-ailments/CHARM.png',
    SLOW_RES : 'assets/status-ailments/SLOW.png',
    STOP_RES : 'assets/status-ailments/STOP.png',
    IMMOBILIZE_RES : 'assets/status-ailments/IMMOBILIZE.png',
    DISABLE_RES : 'assets/status-ailments/DISABLE.png',
    BERSERK_RES : 'assets/status-ailments/BERSERK.png',
    DOOM_RES : 'assets/status-ailments/DOOM.png',
    STUN_RES : 'assets/status-ailments/STUN.png'
  };

  constructor(
    private otherUnitService: OtherUnitService,
    private skillService: SkillService,
    private rangeService: RangeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService,
    private questService: QuestService,
    private jobService: JobService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getMasterInfos();
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async (params: Params) => {
      this.otherUnits = await this.otherUnitService.getSlugDetail(params.get('slug'));

      if (this.otherUnits.length > 0) {
        this.getMasterInfos();
      } else {
        this.router.navigate([this.navService.getRoute('/unit-not-found')]);
      }
    });
  }

  getMasterInfos() {
    if (this.otherUnits.length > 0) {
      this.masterInfos.name = this.nameService.getName(this.otherUnits[0]);
      this.navService.setTitle(this.masterInfos.name);
      this.masterInfos.image = this.otherUnits[0].image;
      this.masterInfos.species = this.otherUnits[0].species;

      this.otherUnits.forEach(otherUnit => {
        this.isCollapsedEnemy.push(true);
      });
    }
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }
}
