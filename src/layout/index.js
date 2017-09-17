import ffi from 'ffi';
import path from 'path';
import ref from 'ref';

const type = {
  GtkWidgetPtr: ref.refType(ref.types.void),
  Number: 'int',
  Void: ref.refType(ref.types.void),
};

const layout = ffi.Library(path.resolve(__dirname, './index'), {
  create: [type.GtkWidgetPtr, []],
  attach: [type.Void, [type.GtkWidgetPtr, type.GtkWidgetPtr]],
  setSize: [type.Void, [type.GtkWidgetPtr, type.Number, type.Number]],
  move: [type.Void, [type.GtkWidgetPtr, type.GtkWidgetPtr, type.Number, type.Number]],
});

export default class Layout {
  constructor() {
    this.pointer = layout.create();
  }

  attach(container) {
    if (container.pointer) {
      container = container.pointer
    };
    layout.attach(this.pointer, container);
  }

  setSize(width, height) {
    layout.setSize(this.pointer, width, height);
  }

  move(child, x, y) {
    // TODO check that 'child' is actually a child of the layout.
    if (!child.pointer) {
      throw new Error("child must be a Gtk element!");
    }
    layout.move(this.pointer, child.pointer, x, y);
  }
}
