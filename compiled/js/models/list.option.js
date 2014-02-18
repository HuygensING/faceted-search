(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var ListItem;
    return ListItem = (function(_super) {
      __extends(ListItem, _super);

      function ListItem() {
        return ListItem.__super__.constructor.apply(this, arguments);
      }

      ListItem.prototype.idAttribute = 'name';

      ListItem.prototype.defaults = function() {
        return {
          name: '',
          count: 0,
          total: 0,
          checked: false
        };
      };

      ListItem.prototype.parse = function(attrs) {
        attrs.total = attrs.count;
        return attrs;
      };

      return ListItem;

    })(Backbone.Model);
  });

}).call(this);
