var Handlebars = require('handlebars');
var $ = require('jquery');

module.exports = (function() {
  function Swanson() {
    var _this = this;
    this.templates = {};
    this.options = {
      defaultData: {}
    };
    this.registerTemplates();
    this.find();
    $(function() {
      return _this.find();
    });
  }

  Swanson.prototype.find = function() {
    var self;
    self = this;
    return $('script[type="text/html"]').each(function() {
      var _t;
      _t = $(this);
      self.add(_t.attr('id'), _t.html());
      return _t.remove();
    });
  };

  Swanson.prototype.registerTemplates = function() {
    var id, value, _i, _len, _ref, _results;
    if (Handlebars.templates != null) {
      _ref = Handlebars.templates;
      _results = [];
      for (value = _i = 0, _len = _ref.length; _i < _len; value = ++_i) {
        id = _ref[value];
        _results.push(this.add(id, value));
      }
      return _results;
    }
  };

  Swanson.prototype.addPartial = function(id, html) {
    return Handlebars.registerPartial(id, html);
  };

  Swanson.prototype.add = function(id, html) {
    var _this = this;
    if ((Handlebars.templates != null) && (Handlebars.templates[id] != null)) {
      this.templates[id] = Handlebars.templates[id];
    } else {
      this.templates[id] = Handlebars.compile(html);
    }
    this[id] = function(data, jquery) {
      if (data == null) {
        data = {};
      }
      data = _.extend({}, _this.defaultData(), data);
      if (jquery === false) {
        return _this.templates[id](data);
      } else {
        return $($.trim(_this.templates[id](data)));
      }
    };
    this.addPartial(id, html);
    return this[id];
  };

  Swanson.prototype.defaultData = function() {
    return this.options.defaultData;
  };

  Swanson.prototype.setDefaultData = function(key, value) {
    if (typeof key === "object") {
      return this.options.defaultData = data;
    } else if (typeof key === "string") {
      return this.options.defaultData[key] = value;
    }
  };

  return new Swanson;
})();