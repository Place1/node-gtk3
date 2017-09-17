import ffi from 'ffi';
import path from 'path';
import ref from 'ref';

const type = {
  GtkWidgetPtr: ref.refType(ref.types.void),
};

const box = ffi.Library(path.resolve(__dirname, './index'), {
  create: [type.GtkWidgetPtr, []],
  attach: [type.GtkWidgetPtr, [type.GtkWidgetPtr, type.GtkWidgetPtr]]
});

export default class Box {
  constructor() {
    this.pointer = box.create();
  }

  attach(container) {
    if (container.pointer) container = container.pointer;
    box.attach(this.pointer, container);
  }
}
