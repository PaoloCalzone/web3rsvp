import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Dashboard from "../../components/Dashboard";
import EventCard from "../../components/EventCard";

export default function MyUpcomingRSVPs() {
  const { data: account } = useAccount();
  // To lower case because some providers use UpperCase form some letters
  const id = account ? account.address.toLowerCase() : "";

  const [currentTimestamp, setTimeStamp] = useState(
    new Date().getTime().toString()
  );
  const { loading, error, data } = useQuery(MY_UPCOMMING_RSVP, {
    variables: { id },
  });
  // console.log("DATA:", data);
  if (loading)
    return (
      <Dashboard page="rsvps" isUpcoming={true}>
        <p>Loading...</p>
      </Dashboard>
    );
  if (error)
    return (
      <Dashboard page="rsvps" isUpcoming={true}>
        <p>`Error! ${error.message}`</p>
      </Dashboard>
    );

  return (
    <Dashboard page="rsvps" isUpcoming={true}>
      {account ? (
        <div>
          {data && !data.account && <p>No upcoming RSVPs found</p>}
          {data && data.account && (
            <ul
              role="list"
              className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
            >
              {data.account.rsvps.map(function (rsvp) {
                if (rsvp.event.eventTimestamp > currentTimestamp) {
                  return (
                    <li key={rsvp.event.id}>
                      <EventCard
                        id={rsvp.event.id}
                        name={rsvp.event.name}
                        eventTimestamp={rsvp.event.eventTimestamp}
                        imageURL={rsvp.event.imageURL}
                      />
                    </li>
                  );
                }
              })}
            </ul>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center py-8">
          <p className="mb-4">Please connect your wallet to view your rsvps</p>
          <ConnectButton />
        </div>
      )}
    </Dashboard>
  );
}

const MY_UPCOMMING_RSVP = gql`
  query Account($id: String) {
    account(id: $id) {
      id
      rsvps {
        event {
          id
          name
          description
          eventTimestamp
          deposit
          imageURL
          link
          eventOwner
        }
      }
    }
  }
`;
