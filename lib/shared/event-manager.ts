
// module InteractiveCharts.Shared {
    "use strict";

    // observer
    class EventSubscription {
        constructor(
            public id: number,
            public callback: ISubscribeCallback) {
        }
    }

    interface IMessage {
        subscribe(callback: ISubscribeCallback): number;
        unsubscribe(id: number): void;
        notify(sender?: any, payload?: any): void;
    }


    class Message implements IMessage {
        private subscriptions: Array<EventSubscription>;
        private nextId: number;

        constructor(public message: string) {
            this.subscriptions = [];
            this.nextId = 0;
        }

        public subscribe(callback: ISubscribeCallback) {
            var subscription = new EventSubscription(this.nextId++, callback);
            this.subscriptions[subscription.id] = subscription;
            return subscription.id;
        }

        public unsubscribe(id: number) {
            this.subscriptions[id] = undefined;
        }

        public notify(sender?: any, payload?: any) {
            var index;
            for (index = 0; index < this.subscriptions.length; index++) {
                if (this.subscriptions[index]) {
                    this.subscriptions[index].callback(sender, payload);
                }
            }
        }
    }

    interface IMessageMap {
        [message: string]: Message;
    }

    export interface ISubscribeCallback {
        (sender?: any, payload?: any): void;
    }

    export interface IEventManager {
        keycodes: Array<boolean>;
        isShiftDown: () => boolean;
        isCtrlDown: () => boolean;
        isAltDown: () => boolean;

        subscribe: (message: string, callback: ISubscribeCallback) => IEventManager;
        unsubscribe: (message: string, token: number) => IEventManager;
        publish: (message: string, sender?: any, payload?: any) => IEventManager;
    }

    export class EventManager implements IEventManager {
        private messages: IMessageMap = {};
        public keycodes: Array<boolean> = [];
        public isShiftDown: () => boolean = function () { return this.keycodes[16]; };
        public isCtrlDown: () => boolean = function () { return this.keycodes[17]; };
        public isAltDown: () => boolean = function () { return this.keycodes[18]; };

        constructor() {
            // register for key events from the dom
            $(document).keydown($.proxy(function (e) {
                this.keycodes[e.keyCode] = true;
                this.publish("keydown", this, e.keyCode);
            }, this));
            $(document).keyup($.proxy(function (e) {
                this.keycodes[e.keyCode] = false;
                this.publish("keyup", this, e.keyCode);
            }, this));
        }

        public subscribe(message: string, callback: ISubscribeCallback) {
            var msg: IMessage;
            msg = this.messages[message] ||
                (this.messages[message] = new Message(message));
            msg.subscribe(callback);
            return this;
        }

        public unsubscribe(message: string, token: number) {
            if (this.messages[message]) {
                this.messages[message].unsubscribe(token);
            }
            return this;
        }

        public publish(message: string, sender?: any, payload?: any) {
            if (this.messages[message]) {
                this.messages[message].notify(sender, payload);
            }
            return this;
        }
    }
// }