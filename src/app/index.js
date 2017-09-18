import ffi from 'ffi';
import path from 'path';
import ref from 'ref';
import loop from './loop';
import { Window } from '../';

const type = {
  GtkApplicationPtr: ref.refType(ref.types.void),
  GtkWidgetPtr: ref.refType(ref.types.void),
  on_activate_cb: ref.refType(ref.types.void)
};

const app = ffi.Library(path.resolve(__dirname, './index'), {
  create: [type.GtkApplicationPtr, ['string', 'string', 'int', 'int']],
  init: ['int', [type.GtkApplicationPtr]],
  register_on_activate: ['void', [type.on_activate_cb]],
  render: ['void', [type.GtkWidgetPtr]]
});

export default class App {
  constructor({title, namespace, width, height}) {
    this.title = title || 'Some Title';
    this.namespace = namespace || 'org.gtk.example';
    this.width = width || 200;
    this.height = height || 200;
    this.window = null;
    this.pointer = app.create(this.title, this.namespace, this.width, this.height);
  }

  init() {
    loop.startLoop();
    return new Promise((resolve, reject) => {
      app.register_on_activate(ffi.Callback('void', [type.GtkWidgetPtr], (windowPtr) => {
        this.window = new Window({ pointer: windowPtr });
        resolve(this.window);
      }));
      app.init(this.pointer);
    });
  }

  render() {
    return app.render(this.window.pointer);
  }
}
