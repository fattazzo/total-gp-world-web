import { ResultsModule } from './results.module';

describe('ResultsModule', () => {
  let resultsModule: ResultsModule;

  beforeEach(() => {
    resultsModule = new ResultsModule();
  });

  it('should create an instance', () => {
    expect(resultsModule).toBeTruthy();
  });
});
