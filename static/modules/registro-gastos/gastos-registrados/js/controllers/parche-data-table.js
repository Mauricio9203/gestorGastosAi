function makeWheelListenersPassive() {
  const originalAddEventListener = EventTarget.prototype.addEventListener;

  EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (type === "wheel") {
      if (typeof options === "object") {
        options.passive = true;
      } else {
        options = { passive: true };
      }
    }
    return originalAddEventListener.call(this, type, listener, options);
  };
}

export { makeWheelListenersPassive };
