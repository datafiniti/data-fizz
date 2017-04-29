const registeredEvents = {};

const registerType = e => {
    if (typeof registeredEvents[e] !== 'object' || registeredEvents[e].constructor.name !== 'Array') {
        registeredEvents[e] = [];
    }
};

const isRegisteredEvent = e => {
    return (typeof registeredEvents[e] === 'object' && registeredEvents[e].constructor.name === 'Array');
};

const registerEvent = (e, cb) => {
    registeredEvents[e].push(cb);
};

const triggerEvent = (e, ...args) => {
    registeredEvents[e].map((cb) => {
        cb(...args);
    });
};

export function on(e, cb, ...args) {
    registerType(e);
    registerEvent(e, cb, ...args);
}

export function trigger(e, ...args) {
    if (isRegisteredEvent(e)) {
        triggerEvent(e, ...args);
    }
}

