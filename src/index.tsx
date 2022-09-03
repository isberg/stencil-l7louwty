/* @jsx h */
import { h, Component, Prop, Host, Event, EventEmitter } from "@stencil/core";

const increased = 'increased';
const decreased = 'decreased';
type Msg = 'increased' | 'decreased'
type Model = number;
type Event = EventEmitter | 'NoEvent'

@Component({
  tag: "my-counter",
  styleUrl: "index.css",
  shadow: true,
})
export class MyCounter {
  @Prop({reflect:true}) count: number = 0;
  @Event() increased: EventEmitter;
  @Event() decreased: EventEmitter;

  update(msg: Msg, model: Model): [Model, Event] {
    switch (msg){
      case 'increased':
        return [model + 1, this.increased]
      case 'decreased':
        return [model - 1, this.decreased]
      default:
        console.log("Wrong type of msg in MyCounter.trigger");
        return [model, 'NoEvent']  // This really means that we wish we where programming Elm :-(
    }
  }

  trigger(msg: Msg) {
    let evnt : Event
    [ this.count, evnt ] = this.update(msg, this.count)
    switch (evnt) {
      case 'NoEvent':
        break;
      default:
        evnt.emit();
        break;
    }
  }

  render() {
    return (
      <Host>
        <button onClick={()=>this.trigger('decreased')}>-</button>
        <span>{this.count}</span>
        <button onClick={()=>this.trigger(increased)}>+</button>
      </Host>
    );
  }
}
