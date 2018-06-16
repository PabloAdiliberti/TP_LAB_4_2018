import { RuteandoModule } from './ruteando.module';

describe('RuteandoModule', () => {
  let ruteandoModule: RuteandoModule;

  beforeEach(() => {
    ruteandoModule = new RuteandoModule();
  });

  it('should create an instance', () => {
    expect(ruteandoModule).toBeTruthy();
  });
});
