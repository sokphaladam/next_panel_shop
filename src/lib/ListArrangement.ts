export default class ListArrangement {
  protected left: any[] = [];
  protected right: any[] = [];
  protected leftHeight: number = 0;
  protected rightHeight: number = 0;
  protected pointer: number = 0;
  protected previousData: any = [];

  update(data: any[]) {
    if (data && this.pointer < data.length) {
      this.arrange(data, this.pointer);
      this.previousData = data;
    } else if (data.length === this.pointer || data.length < this.pointer) {
      if (data !== this.previousData) {
        this.left = [];
        this.right = [];
        this.leftHeight = 0;
        this.rightHeight = 0;
        this.arrange(data, 0);
      }
    }
  }

  protected getHeight(item: any) {
    return item.thumbnail ? 350 : 490;
  }

  protected arrange(data: any[], start: number) {
    for (let i = start; i < data.length; i++) {
      const currentItem = data[i];

      if (this.leftHeight > this.rightHeight) {
        this.right.push(currentItem);
        this.rightHeight += this.getHeight(currentItem);
      } else {
        this.left.push(currentItem);
        this.leftHeight += this.getHeight(currentItem);
      }
    }

    this.pointer = data.length;
  }

  getLeftSide(): any[] {
    return this.left;
  }

  getRightSide(): any[] {
    return this.right;
  }
}
