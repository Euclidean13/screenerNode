export class Criteria {
  public mustHave: Array<string> = []
  public superNiceToHave: Array<string> = []
  public niceToHave: Array<string> = []

  public constructor(init?: Partial<Criteria>) {
    Object.assign(this, init)
  }
}
