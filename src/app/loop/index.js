import ffi from 'ffi';
import path from 'path';
import ref from 'ref';

/**
 * GTK runs applications in a GTK event loop.
 * This is problematic in a NodeJS environment as
 * a GTK application will block the calling
 * NodeJS function.
 * To solve this, we can nest the NodeJS LibUV event
 * loop in the GTK event loop so that NodeJS events will
 * continue to tick along concurrently with GTK events.
 * @credit To WebReflection's prior work on NodeGTK
 * bindings that solved this issue.
 * @credit https://github.com/WebReflection/node-gtk/blob/master/src/loop.cc
 */
const loop = ffi.Library(path.resolve(__dirname, 'index'), {
  startLoop: ['void', []],
});

export default loop;
