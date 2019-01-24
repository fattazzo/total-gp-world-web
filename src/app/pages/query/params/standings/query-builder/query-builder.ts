import { environment } from '../../../../../../environments/environment.prod';
import { StandingsModel } from '../models/standings-model';
import { SearchType } from '../models/search-type';
export class QueryBuilder {
  buildUrl(model: StandingsModel): string {
    // Remove last char ( last char = '/' )
    let url = environment.ergastApiUrl.slice(0, -1);

    // append url generated from model params
    url += this.getUrlFromModel(model);

    // append resource to retreive
    url += `/${SearchType.findByKey(model.type).endPointName}.json`;

    // add query limit
    url += `?limit=${model.resultPerPage}`;

    return url;
  }

  private getUrlFromModel(model: StandingsModel): string {
    let url = '';

    if (model.season !== null) {
      url += `/${model.season}`;
    }
    if (model.round !== null) {
      url += `/${model.round}`;
    }
    if (model.driverId !== null) {
      url += `/drivers/${model.driverId}`;
    }
    if (model.driverStanding !== null) {
      url += `/driverStandings/${model.driverStanding}`;
    }
    if (model.constructorId !== null) {
      url += `/constructors/${model.constructorId}`;
    }
    if (model.constructorStanding !== null) {
      url += `/constructorStanding/${model.constructorStanding}`;
    }

    return url;
  }
}
