import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Tidus' },
      { id: 2, name: 'Aileen' },
      { id: 3, name: 'Orlandeau' },
      { id: 4, name: 'Fohlen' },
      { id: 5, name: 'Lunera' },
      { id: 6, name: 'Bran' },
      { id: 7, name: 'Agrias' },
      { id: 8, name: 'Onion Knight' },
      { id: 9, name: 'Dark Veritas' }
    ];
    return {heroes};
  }
}
