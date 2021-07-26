import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { ApiService } from './api.service';
import { ToolService } from './tool.service';

@Injectable()
export class HomeService {
  constructor(
    private apiService: ApiService,
    private toolService: ToolService
  ) {}

  private async getApi() {
    return JSON.parse(JSON.stringify(await this.apiService.loadData('home')));
  }

  async getHomeData() {
    const result = await this.getApi();
    const homeFormatted = [];

    for (const update of result.home) {
      const updateFormatted = {
        date: update.date,
        items: []
      };
      const tableIndex = -1;

      for (const item of update.items) {
        let dataItem = null;

        switch (item.type) {
          case 'unit' :
            dataItem = result.units.find(searchedUnit => searchedUnit.dataId === item.dataId);
          break;
          case 'esper' :
            dataItem = result.espers.find(searchedEsper => searchedEsper.dataId === item.dataId);
          break;
          case 'card' :
            dataItem = result.cards.find(searchedCard => searchedCard.dataId === item.dataId);
          break;
          case 'equipment' :
            dataItem = result.equipments.find(searchedEquipment => searchedEquipment.dataId === item.dataId);
          break;
        }

        if (dataItem) {
          const formattedItem = {
            type: item.type,
            slug: dataItem.slug,
            name: this.toolService.getName(dataItem),
            image: dataItem.image,
            element: dataItem.element,
            rarity: dataItem.rarity,
            jobs: []
          };

          if (item.type === 'unit') {
            for (const jobId of dataItem.jobs) {
              formattedItem.jobs.push(result.jobs.find(searchedJob => searchedJob.dataId === jobId));
            }
          }

          updateFormatted.items.push(formattedItem);
        }
      }

      homeFormatted.push(updateFormatted);
    }

    return homeFormatted;
  }
}
