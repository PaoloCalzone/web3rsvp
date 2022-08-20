import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Dashboard from "../../components/Dashboard";
import EventCard from "../../components/EventCard";

export default function MyUpcomingRSVPs() {
  const { data: account } = useAccount();
  const id = account ? account.address.toLowerCase() : "";
  const [currentTimestamp, setTimeStamp] = useState(
    new Date().getTime().toString()
  );
  const { loading, error, data } = useQuery(MY_UPCOMMING_RSVP, {
    variables: { id },
  });

  return (
    <div>
      {loading && (
        <Dashboard page="rsvps" isUpcoming={true}>
          Loading...
        </Dashboard>
      )}
      {error && (
        <Dashboard page="rsvps" isUpcoming={true}>
          `Error: ${error.message}`
        </Dashboard>
      )}
      {data.account ? (
        <Dashboard page="rsvps" isUpcoming={true}>
          {data.account}
        </Dashboard>
      ) : (
        <Dashboard page="rsvps" isUpcoming={true}>
          <p>
            Connect your wallet with the account your RSVPed to display your
            reservations!
          </p>
          <ConnectButton />
        </Dashboard>
      )}
    </div>
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
