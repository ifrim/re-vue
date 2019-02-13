import { NOTIFICATION_DELAY } from './static-data.js';

let events = [
  {
    id: 1001,
    name: 'Sepultura Live',
    startDate: '1999-06-27',
    endDate: '1999-06-28',
    location: 'Dessel',
    type: 'Entertainment',
    requiresInvitation: false,
    description: 'Metal meeting. Other bands playing: Cradle Of Filth, Immortal, Children Of Bodom, Kreator, and others.'
  },
  {
    id: 1002,
    name: 'Royal Wedding',
    startDate: '2019-04-12',
    endDate: '2019-04-13',
    location: 'London',
    type: 'Wedding',
    requiresInvitation: true,
    description: 'Some princess found her prince. You are not invited, you can watch it on tv.'
  },
  {
    id: 1003,
    name: 'Oktoberfest',
    startDate: '2019-09-21',
    endDate: '2019-10-06',
    location: 'Munich',
    type: 'Entertainment',
    requiresInvitation: false,
    description: 'beer beer beer tiddily beer beer beer'
  },
  {
    id: 1004,
    name: 'ReactEurope 2019',
    startDate: '2019-05-23',
    endDate: '2019-05-24',
    location: 'Paris',
    type: 'Conference',
    requiresInvitation: true,
    description: 'ReactEurope is coming back on 23-24 May 2019 to bring you the best and most passionate people from the very core team to the coolest people from the community we love.'
  }
];
let notificationTimeoutId;

export default {
  state: {
    events,
    notification: null
  },
  addEvent (eventData) {
    this.state.events.push({ id: uniqueId(), ...eventData });
  },
  notify (message, type) {
    clearTimeout(notificationTimeoutId);
    this.state.notification = { message, type };
    notificationTimeoutId = setTimeout(() => {
      this.state.notification = null;
    }, NOTIFICATION_DELAY);
  }
};

function uniqueId () {
  if (!uniqueId.id) uniqueId.id = 1;
  return uniqueId.id++;
}
