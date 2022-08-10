# Notes on Web3RSVP tutorial

## Difference between `storage` and `memory`

Explain the difference between
```js
CreateEvent storage myEvent = idToEvent[eventId];

// and

CreateEvent memory myEvent = idToEvent[eventId];
``` 

And why in the `withdrawUnclaimedDeposit` function we use `storage` 
even if we modify (write) the boolean `paidOut`

## Where come the deposit from in a payable function?

msg.sender.value

## Why you modify the value before sending eth before and not after

To avoid reentrency attacks.
```js
// add the attendee to the claimedRSVPs list
        myEvent.claimedRSVPs.push(attendee);

        // sending eth back to the staker `https://solidity-by-exemple.org/sending-ether`
        (bool sent,) = attendee.call{value: myEvent.deposit}("");

        // if this fails, remove the user from the array of claimed RSVPs
        if (!sent) {
            myEvent.claimedRSVPs.pop();
        }

        require(sent, "Failed to send Ether");
```

## Avoid accidentally or malicious unclaimed withrawn from event owner

Event owner should run confirmAllAttendee only after the event, otherwise
some attendee could not be redeemed
