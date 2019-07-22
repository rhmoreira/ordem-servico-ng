
export abstract class BaseComponent {

  public compareEntities(e1, e2): boolean {
    if (!e1 || !e2) {
      return false;
    } else {
      return e1._id === e2._id;
    }
  }

}
