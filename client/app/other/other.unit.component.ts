import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { OtherUnitService } from '../services/otherunit.service';
import { SkillService } from '../services/skill.service';
import { RangeService } from '../services/range.service';
import { NavService } from '../services/nav.service';
import { ToolService } from '../services/tool.service';
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
    FIRE_RES : 'assets/elements/fire.webp',
    ICE_RES : 'assets/elements/ice.webp',
    EARTH_RES : 'assets/elements/earth.webp',
    WIND_RES : 'assets/elements/wind.webp',
    LIGHTNING_RES : 'assets/elements/lightning.webp',
    WATER_RES : 'assets/elements/water.webp',
    LIGHT_RES : 'assets/elements/light.webp',
    DARK_RES : 'assets/elements/dark.webp',

    SLASH_RES : 'assets/damage/neutral_slash.webp',
    PIERCE_RES : 'assets/damage/neutral_pierce.webp',
    STRIKE_RES : 'assets/damage/neutral_strike.webp',
    MISSILE_RES : 'assets/damage/neutral_missile.webp',
    MAGIC_RES : 'assets/damage/neutral_magic.webp',

    POISON_RES : 'assets/status-ailments/POISON.webp',
    FROSTBITE_RES : 'assets/status-ailments/FROSTBITE.webp',
    BLIND_RES : 'assets/status-ailments/BLIND.webp',
    SLEEP_RES : 'assets/status-ailments/SLEEP.webp',
    SILENCE_RES : 'assets/status-ailments/SILENCE.webp',
    PARALYZE_RES : 'assets/status-ailments/PARALYZE.webp',
    CONFUSION_RES : 'assets/status-ailments/CONFUSION.webp',
    PETRIFY_RES : 'assets/status-ailments/PETRIFY.webp',
    TOAD_RES : 'assets/status-ailments/TOAD.webp',
    CHARM_RES : 'assets/status-ailments/CHARM.webp',
    SLOW_RES : 'assets/status-ailments/SLOW.webp',
    STOP_RES : 'assets/status-ailments/STOP.webp',
    IMMOBILIZE_RES : 'assets/status-ailments/IMMOBILIZE.webp',
    DISABLE_RES : 'assets/status-ailments/DISABLE.webp',
    BERSERK_RES : 'assets/status-ailments/BERSERK.webp',
    DOOM_RES : 'assets/status-ailments/DOOM.webp',
    STUN_RES : 'assets/status-ailments/STUN.webp'
  };

  constructor(
    private otherUnitService: OtherUnitService,
    private skillService: SkillService,
    private rangeService: RangeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private navService: NavService,
    private toolService: ToolService,
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
      this.masterInfos.name = this.toolService.getName(this.otherUnits[0]);
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
