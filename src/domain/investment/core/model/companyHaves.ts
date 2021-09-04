export class CompanyHaves {
  public have: Array<string> = []
  public haveNot: Array<string> = []
  public missing: Array<string> = []

  public constructor(init?: Partial<CompanyHaves>) {
    Object.assign(this, init)
  }
}
