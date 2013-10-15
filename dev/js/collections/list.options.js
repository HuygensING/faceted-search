(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var Collections, ListItems, Models, _ref;
    Models = {
      Option: require('models/list.option')
    };
    Collections = {
      Base: require('collections/base')
    };
    return ListItems = (function(_super) {
      __extends(ListItems, _super);

      function ListItems() {
        _ref = ListItems.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      ListItems.prototype.model = Models.Option;

      ListItems.prototype.parse = function(attrs) {
        return attrs;
      };

      ListItems.prototype.comparator = function(model) {
        return -1 * parseInt(model.get('count'), 10);
      };

      ListItems.prototype.revert = function() {
        var _this = this;
        this.each(function(option) {
          return option.set('checked', false, {
            silent: true
          });
        });
        return this.trigger('change');
      };

      ListItems.prototype.updateOptions = function(newOptions) {
        var _this = this;
        if (newOptions == null) {
          newOptions = [];
        }
        this.each(function(option) {
          return option.set('count', 0, {
            silent: true
          });
        });
        _.each(newOptions, function(newOption) {
          var opt;
          opt = _this.get(newOption.name);
          return opt.set('count', newOption.count, {
            silent: true
          });
        });
        return this.sort();
      };

      return ListItems;

    })(Collections.Base);
  });

}).call(this);
