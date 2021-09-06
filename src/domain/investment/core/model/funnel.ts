export class Funnel {
  public company: string = ''
  public email: string = ''
  public matchingScore: number = 0
  public warnings: number = 0
  public missingInfo: number = 0
  public mustHaves: number = 0
  public superNiceToHave: number = 0
  public niceToHaves: number = 0
  public meet: number = 0

  public constructor(init?: Partial<Funnel>) {
    Object.assign(this, init)
  }
}
