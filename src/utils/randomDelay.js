/*
 Waits for a random amount of time between min and max milliseconds.
 Useful for mimicking human-like delays.
*/

const randomDelay = async (min = 500, max = 1500) => {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
};

module.exports = randomDelay;