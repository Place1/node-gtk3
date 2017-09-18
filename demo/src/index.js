import { App, Button } from '../../lib';

const app = new App({
  title: 'Node Gtk',
  namespace: 'org.gtk.example',
  width: 200,
  height:  200
});

app.init()
  .then((window) => {
    const button = new Button({
      name: 'Button 1'
    });
    button.onClick = () => {
      console.log('Button was clicked');
    };
    button.attach(window);
    console.log('creating a set timeout');
    setTimeout(() => console.log('this will run after the application window closes'), 1000);
    app.render();
  })
  .catch((error) => {
    console.log('error');
  })

console.log('I will run after the application window is closed!');
