// Generated by CoffeeScript 1.6.3
(function() {
  var JP;

  JP = (function() {
    function JP() {}

    JP.prototype.ws = null;

    JP.prototype.startWebSocket = function(callback) {
      this.startWSCallback = callback;
      this.ws = new WebSocket("ws://127.0.0.1:31415");
      this.ws.onerror = this.onWSError.bind(this);
      this.ws.onopen = this.onWSOpen.bind(this);
      this.ws.onclose = this.onWSClose.bind(this);
      return this.ws.onmessage = this.handleMessage.bind(this);
    };

    JP.prototype.handleMessage = function(message) {
      var data, dataObject, handler, that, _i, _len, _ref, _results;
      that = this;
      data = message.data;
      dataObject = JSON.parse(data);
      if ("event" in dataObject) {
        if (dataObject["event"] === "connect") {
          that.deviceConnectCallback.call(this, dataObject['device']);
        }
        _ref = this.eventHandlers;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          handler = _ref[_i];
          _results.push(handler.call(this, dataObject));
        }
        return _results;
      }
    };

    JP.prototype.onWSOpen = function() {
      console.log("ws open");
      this.sendMessage("GAMEINIT");
      return this.startWSCallback();
    };

    JP.prototype.onWSError = function() {
      this.ws = null;
      return console.log("connection error");
    };

    JP.prototype.onWSClose = function() {
      this.ws = null;
      return console.log("connection close");
    };

    JP.prototype.sendMessage = function(msgObject) {
      var message, that;
      if (typeof msgObject === "object") {
        message = JSON.stringify(msgObject);
      } else {
        message = msgObject;
      }
      that = this;
      if (this.ws === null) {
        return this.startWebSocket(function() {
          return that.ws.send(message);
        });
      } else {
        return this.ws.send(message);
      }
    };

    JP.prototype.connect = function(layout, callback) {
      this.sendMessage({
        event: "connect",
        layout: layout
      });
      return this.deviceConnectCallback = callback;
    };

    JP.prototype.changeLayout = function(layout) {
      return this.sendMessage({
        event: "layout",
        layout: layout
      });
    };

    JP.prototype.eventHandlers = [];

    JP.prototype.onEvent = function(eventHandler) {
      return this.eventHandlers.push(eventHandler);
    };

    return JP;

  })();

  this.JP = new JP();

}).call(this);

/*
//@ sourceMappingURL=jp.map
*/
