import { CardSettings } from './card-settings';

export class DashboardCards {

    static driversPointsCard: CardSettings = {
        title: 'driver.points',
        iconClass: 'fas fa-layer-group',
        type: 'primary',
        value: '',
    };
    static driversNumberCard: CardSettings = {
        title: 'driver.numbers',
        iconClass: 'fas fa-users',
        type: 'success',
        value: '',
    };
    static driversWinningCard: CardSettings = {
        title: 'driver.winning',
        iconClass: 'fas fa-trophy',
        type: 'info',
        value: '',
    };
    static driversNationalitiesCard: CardSettings = {
        title: 'driver.nationalities',
        iconClass: 'far fa-flag',
        type: 'warning',
        value: '',
    };

    public static get driversCards(): CardSettings[] {
        return [this.driversPointsCard, this.driversNumberCard, this.driversWinningCard, this.driversNationalitiesCard];
    }

    public static updateDriversCardsValues(nrDrivers: number, totalPoins: number, winningDrivers: number, nationalities: number) {
        this.driversNumberCard.value = nrDrivers.toString();
        this.driversPointsCard.value = totalPoins.toString();
        this.driversWinningCard.value = winningDrivers.toString();
        this.driversNationalitiesCard.value = nationalities.toString();
    }

    static constructorsPointsCard: CardSettings = {
        title: 'constructor.points',
        iconClass: 'fas fa-layer-group',
        type: 'primary',
        value: '',
    };
    static constructorsNumberCard: CardSettings = {
        title: 'constructor.numbers',
        iconClass: 'fas fa-users',
        type: 'success',
        value: '',
    };
    static constructorsWinningCard: CardSettings = {
        title: 'constructor.winning',
        iconClass: 'fas fa-trophy',
        type: 'info',
        value: '',
    };
    static constructorsNationalitiesCard: CardSettings = {
        title: 'constructor.nationalities',
        iconClass: 'far fa-flag',
        type: 'warning',
        value: '',
    };

    public static get constructorsCards(): CardSettings[] {
        return [this.constructorsPointsCard, this.constructorsNumberCard, this.constructorsWinningCard, this.constructorsNationalitiesCard];
    }

    public static updateConstructorsCardsValues(
        nrConstructors: number,
        totalPoins: number,
        winningConstructors: number,
        nationalities: number) {
        this.constructorsNumberCard.value = nrConstructors.toString();
        this.constructorsPointsCard.value = totalPoins.toString();
        this.constructorsWinningCard.value = winningConstructors.toString();
        this.constructorsNationalitiesCard.value = nationalities.toString();
    }

    static racesNumberCard: CardSettings = {
        title: 'race.numbers',
        iconClass: 'fas fa-users',
        type: 'success',
        value: '',
    };

    static racesNationalitiesCard: CardSettings = {
        title: 'race.nationalities',
        iconClass: 'far fa-flag',
        type: 'warning',
        value: '',
    };

    public static get racesCards(): CardSettings[] {
        return [this.racesNumberCard, this.racesNationalitiesCard];
    }

    public static updateRacesCardsValues(nrRaces: number, nationalities: number) {
        this.racesNumberCard.value = nrRaces.toString();
        this.racesNationalitiesCard.value = nationalities.toString();
    }
}
