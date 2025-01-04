// import React, { Component } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";

// // import "./App.css";
// import "react-big-calendar/lib/css/react-big-calendar.css";

// const localizer = momentLocalizer(moment);

// class App extends Component {
//   state = {
//     events: [
//       {
//         start: moment().toDate(),
//         end: moment()
//           .add(1, "days")
//           .toDate(),
//         title: "Some title"
//       }
//     ]
//   };

//   render() {
//     return (
//       <div className="App">
//         <Calendar
//           localizer={localizer}
//           defaultDate={new Date()}
//           defaultView="month"
//           events={this.state.events}
//           style={{ height: "100vh" }}
//         />
//       </div>
//     );
//   }
// }

// export default App;
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [events, setEvents] = useState([
    {
      start: moment().toDate(),
      end: moment().add(1, "days").toDate(),
      title: "Some title",
    },
  ]);

  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={{ height: "100vh" }}
      />
    </div>
  );
};

export default CalendarView;
