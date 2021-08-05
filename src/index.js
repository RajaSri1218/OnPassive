import React from "react";
import ReactDOM from "react-dom";
import events from "./events";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import BigCalendar from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";

BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Dnd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: events
    };

    this.moveEvent = this.moveEvent.bind(this);
  }
   
  moveEvent({ event, start, end }) {

    const { events } = this.state;
    console.log("Total Events Created", events)
    const idx = events.indexOf(event);
    console.log("Vlaue of index Array", idx)
    const updatedEvent = { ...event, start, end };
    console.log("Updated Date after Drag and Drop", updatedEvent)
    const nextEvents = [...events];
    console.log(nextEvents)
   nextEvents.splice(idx, 1, updatedEvent);
    this.setState({
      events: nextEvents
    });
  }

  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.state;

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });
    this.setState({
      events: nextEvents
    });
    
  };
  render() {
    return (
      
      <DragAndDropCalendar
        selectable
        events={this.state.events}
        onEventDrop={this.moveEvent}
        resizable
        onEventResize={this.resizeEvent}
        defaultView={BigCalendar.Views.MONTH}
        defaultDate={new Date(2021, 7, 6)}
      />
    );
  }
}


const Calendar = DragDropContext(HTML5Backend)(Dnd);
ReactDOM.render(<Calendar />, document.getElementById("root"));

