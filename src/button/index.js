import ffi from 'ffi';
import path from 'path';
import ref from 'ref';

const type = {
  GtkWidgetPtr: ref.refType(ref.types.void),
  Void: 'void',
  Number: 'int',
};

const button = ffi.Library(path.resolve(__dirname, './index'), {
  create: [type.GtkWidgetPtr, ['string']],
  attach: [type.Void, [type.GtkWidgetPtr, type.GtkWidgetPtr]],
  setSize: [type.Void, [type.GtkWidgetPtr, type.Number, type.Number]],
});

export default class Button {
  constructor({name}) {
    this.name = name || 'Some Button';
    this.pointer = button.create(this.name);
  }

  attach(container) {
    if (container.pointer) container = container.pointer;
    button.attach(this.pointer, container);
  }

  setSize(width, height) {
    button.setSize(this.pointer, width, height);
  }
}
