import { QualifyingModule } from './qualifying.module';

describe('QualifyngModule', () => {
  let qualifyngModule: QualifyingModule;

  beforeEach(() => {
    qualifyngModule = new QualifyingModule();
  });

  it('should create an instance', () => {
    expect(qualifyngModule).toBeTruthy();
  });
});
