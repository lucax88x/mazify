export class MazeRoom {
  private _row: number;
  private _column: number;
  private _top: MazeRoom | null = null;
  private _right: MazeRoom | null = null;
  private _bottom: MazeRoom | null = null;
  private _left: MazeRoom | null = null;

  private _isTopOpen = false;
  private _isRightOpen = false;
  private _isBottomOpen = false;
  private _isLeftOpen = false;

  private _depth = 0;

  public get row(): number {
    return this._row;
  }

  public get column(): number {
    return this._column;
  }

  public get top() {
    return this._top;
  }

  public set top(value: MazeRoom | null) {
    this._top = value;
  }

  public get right() {
    return this._right;
  }

  public set right(value: MazeRoom | null) {
    this._right = value;
  }

  public get bottom() {
    return this._bottom;
  }

  public set bottom(value: MazeRoom | null) {
    this._bottom = value;
  }

  public get left() {
    return this._left;
  }

  public set left(value: MazeRoom | null) {
    this._left = value;
  }

  public get isTopOpen() {
    return this._isTopOpen;
  }

  public get isRightOpen() {
    return this._isRightOpen;
  }

  public get isBottomOpen() {
    return this._isBottomOpen;
  }

  public get isLeftOpen() {
    return this._isLeftOpen;
  }

  public get depth() {
    return this._depth;
  }

  public set depth(value: number) {
    this._depth = value;
  }

  constructor(row: number, column: number) {
    this._row = row;
    this._column = column;
  }

  openTop() {
    if (this._isTopOpen) return;

    this._isTopOpen = true;

    if (!!this.top) {
      this.top.openBottom();
    }
  }

  openRight() {
    if (this._isRightOpen) return;

    this._isRightOpen = true;

    if (!!this.right) {
      this.right.openLeft();
    }
  }

  openBottom() {
    if (this._isBottomOpen) return;

    this._isBottomOpen = true;

    if (!!this.bottom) {
      this.bottom.openTop();
    }
  }

  openLeft() {
    if (this._isLeftOpen) return;

    this._isLeftOpen = true;

    if (!!this.left) {
      this.left.openRight();
    }
  }
}
