import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Landing from "../components/Landing";
import EventCard from "../components/EventCard";

export default function Home() {
  const [currentTimestamp, setEventTimestamp] = useState(
    new Date().getTime().toString()
  );
  const { loading, error, data } = useQuery(UPCOMING_EVENTS, {
    variables: { currentTimestamp },
  });
  console.log("Data:", data);
  if (loading)
    return (
      <Landing>
        <p>loading...</p>
      </Landing>
    );
  if (error)
    return (
      <Landing>
        <p>`Error! ${error.message}`</p>
      </Landing>
    );

  return (
    <Landing>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {data &&
          data.events &&
          data.events.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              name={event.name}
              eventTimestamp={event.eventTimestamp}
              imageURL={event.imageURL}
            />
          ))}
      </ul>
    </Landing>
  );
}

const UPCOMING_EVENTS = gql`
  query Events($currentTimestamp: String) {
    events(where: { eventTimestamp_gt: $currentTimestamp }) {
      id
      name
      eventTimestamp
      imageURL
    }
  }
`;
