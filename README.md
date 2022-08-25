# WEB3RSVP 

## Description

WEB3RSVP - that stands for "web3 **R**épondez **s**'il **v**ous **p**laît" - is a dApp (decentralized application) built on Polygon that allows the user to create an event and invite the attendee to RSVP. RSVPing to an event is done by locking in an amount (set by the event creator). This amount is returned in case of participation in this event. If the user does not attend the event, the amount goes to the creator of the event.

## Structure

This project contains 3 packages:
1. The [contract](https://github.com/PaoloCalzone/web3rsvp/tree/main/contracts) written in solidity.
2. The [subgraph](https://github.com/PaoloCalzone/web3rsvp/tree/main/subgraph) with the graphql.schema derived from the contract's methods and serving as an API for the frontend.
3. The [frontend](https://github.com/PaoloCalzone/web3rsvp/tree/main/frontend) - a Nextjs app.
