(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var FacetedSearch, SearchResults;
    SearchResults = require('collections/searchresults');
    return FacetedSearch = (function(_super) {
      __extends(FacetedSearch, _super);

      function FacetedSearch() {
        return FacetedSearch.__super__.constructor.apply(this, arguments);
      }

      FacetedSearch.prototype.defaults = function() {
        return {
          facetValues: [],
          sortParameters: []
        };
      };

      FacetedSearch.prototype.initialize = function(queryOptions, options) {
        this.queryOptions = queryOptions;
        this.searchResults = new SearchResults();
        this.on('change', (function(_this) {
          return function(model, options) {
            return _this.searchResults.runQuery(_.clone(_this.attributes));
          };
        })(this));
        return this.trigger('change');
      };

      FacetedSearch.prototype.set = function(attrs, options) {
        var facetValues;
        if (attrs.facetValue != null) {
          facetValues = _.reject(this.get('facetValues'), function(data) {
            return data.name === attrs.facetValue.name;
          });
          if (attrs.facetValue.values != null) {
            if (attrs.facetValue.values.length > 0) {
              facetValues.push(attrs.facetValue);
            }
          } else {
            facetValues.push(attrs.facetValue);
          }
          attrs.facetValues = facetValues;
          delete attrs.facetValue;
        }
        return FacetedSearch.__super__.set.call(this, attrs, options);
      };

      FacetedSearch.prototype.reset = function() {
        this.clear({
          silent: true
        });
        this.set(this.defaults(), {
          silent: true
        });
        this.set(this.queryOptions, {
          silent: true
        });
        return this.trigger('change');
      };

      FacetedSearch.prototype.refresh = function(newQueryOptions) {
        if (newQueryOptions == null) {
          newQueryOptions = {};
        }
        this.set(newQueryOptions, {
          silent: true
        });
        return this.searchResults.runQuery(_.clone(this.attributes), false);
      };

      return FacetedSearch;

    })(Backbone.Model);
  });

}).call(this);
