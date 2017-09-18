import ffi from 'ffi';
import path from 'path';
import ref from 'ref';
import loop from './loop';
import { Window } from '../';

const type = {
  GtkApplicationPtr: ref.refType(ref.types.void),
  GtkWidgetPtr: ref.refType(ref.types.void),
  on_activate_cb: 'pointer',
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
    this.onActivate = null;
    this.pointer = app.create(this.title, this.namespace, this.width, this.height);
  }

  init() {
    loop.startLoop();
    return new Promise((resolve, reject) => {
      // assign the ffi callback to 'this' so we retain a reference
      // after this.init() finishes. If we don't do this Node
      // will garbage collect it and we will get a segmentation
      // fault when C calls into it.
      this.onActivate = ffi.Callback('void', [type.GtkWidgetPtr], (windowPtr) => {
        this.window = new Window({ pointer: windowPtr });
        resolve(this.window);
      });
      app.register_on_activate(this.onActivate);

      // If we call app.init() then it blocks the main loop
      // forever and out program halts.
      // If we call app.init.async() then FFI will call the
      // foreign function in another thread (https://github.com/node-ffi/node-ffi/wiki/Node-FFI-Tutorial#async-library-calls)
      // My guess is that it will be scheduled on one of the
      // threads that LibUV controls for IO tasks.
      // This means we avoid blocking the event loop but this
      // results in a segmentation fault after some time and
      // I can't figure out why. My only guess is that it's a
      // multi-thread issue with GTK???
      app.init.async(this.pointer, () => null);
    });
  }

  render() {
    return app.render(this.window.pointer);
  }
}
