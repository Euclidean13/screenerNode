export class Company {
  public name: string = ''
  public email: string = ''
  public has: Array<string> = []
  public hasNot: Array<string> = []
  public meet: number = 0

  public constructor(init?: Partial<Company>) {
    Object.assign(this, init)
  }
}
