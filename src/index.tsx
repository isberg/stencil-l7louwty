/* @jsx h */
import { h, Component, Prop, Host, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "my-counter",
  styleUrl: "index.css",
  shadow: true,
})
export class MyCounter {
  @Prop({reflect:true}) count: number = 0;
  @Event() increased: EventEmitter;
  @Event() decreased: EventEmitter;

  inc() {
    this.count++;
    this.increased.emit();
  }

  dec() {
    this.count--;
    this.decreased.emit();
  }

  render() {
    return (
      <Host>
        <button onClick={()=>this.dec()}>-</button>
        <span>{this.count}</span>
        <button onClick={()=>this.inc()}>+</button>
      </Host>
    );
  }
}
