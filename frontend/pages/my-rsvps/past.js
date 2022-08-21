import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Dashboard from "../../components/Dashboard";
import EventCard from "../../components/EventCard";

export default function MyPastRSVPs() {
  const { data: account } = useAccount();
  // To lower case because some providers use UpperCase form some letters
  const id = account ? account.address.toLowerCase() : "";

  const [currentTime, setCurrentTime] = useState(
    new Date().getTime().toString()
  );
  const { loading, error, data } = useQuery(MY_PAST_RSVPS, {
    variables: { id },
  });

  if (loading)
    return (
      <Dashboard page="rsvps" isUpcoming={false}>
        Loading...
      </Dashboard>
    );

  if (error)
    return (
      <Dashboard page="rsvps" isUpcoming={false}>
        `Error: ${error.message}`
      </Dashboard>
    );
  // if (data) console.log(data);
  return (
    <Dashboard page="rsvps" isUpcoming={false}>
      {account ? (
        <div>
          {data && !data.account && <p>You have no past RSVPs yet...</p>}
          {data && data.account && (
            <ul
              role="list"
              className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
            >
              {data.account.rsvps.map((rsvp) => {
                if (rsvp.eventTimestamp < currentTime) {
                  return (
                    <li key={rsvp.event.id}>
                      <EventCard
                        id={rspv.event.id}
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
          <p className="mb-4">
            Connect your wallet to display your past RSVPs...
          </p>
          <ConnectButton />
        </div>
      )}
    </Dashboard>
  );
}

const MY_PAST_RSVPS = gql`
  query Account($id: String) {
    account(id: $id) {
      id
      rsvps {
        event {
          id
          name
          eventTimestamp
          imageURL
        }
      }
    }
  }
`;
