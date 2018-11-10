'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = true;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    let events = {};

    function allEvents(event) {
        let result = [event];
        let index = event.lastIndexOf('.');

        while (index !== -1) {
            event = event.substring(0, index);
            result.push(event);
            index = event.lastIndexOf('.');
        }

        return result;
    }

    function useHandlers(studentsList) {

        studentsList.forEach(element => {
            if (element.count < element.times &&
                element.count % element.frequency === 0) {
                element.handler.call(element.context);
            }
            element.count++;
        });
    }

    return {

        /**
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @returns {Object}
         */
        on: function (event, context, handler) {
            if (!events[event]) {
                events[event] = [];
            }

            events[event].push({
                context,
                handler,
                frequency: 1,
                times: Infinity,
                count: 0
            });

            return this;
        },

        /**
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         * @returns {Object}
         */
        off: function (event, context) {
            for (let e in events) {
                if (e === event || e.startsWith(event + '.')) {
                    events[e] = events[event].filter(i => i.context !== context);
                }
            }

            return this;
        },

        /**
         * Уведомить о событии
         * @param {String} event
         * @returns {Object}
         */
        emit: function (event) {
            let all = allEvents(event);

            all.forEach(element => {
                if (events.hasOwnProperty(element)) {
                    useHandlers(events[element]);
                }
            });

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         * @returns {Object}
         */
        several: function (event, context, handler, times) {
            if (!events[event]) {
                events[event] = [];
            }

            events[event].push({
                context,
                handler,
                frequency: 1,
                times,
                count: 0
            });

            return this;
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         * @returns {Object}
         */
        through: function (event, context, handler, frequency) {
            if (!events[event]) {
                events[event] = [];
            }

            events[event].push({
                context,
                handler,
                frequency,
                times: Infinity,
                count: 0
            });

            return this;
        }
    };
}

module.exports = {
    getEmitter,

    isStar
};
