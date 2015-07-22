import Ember from 'ember';
import LazyArray from 'ember-table/models/lazy-array';
import ThreeColumnsMixin from '../mixins/three-columns-mixin';
import SortQueryMixin from '../mixins/sort-query-mixin';

export default Ember.Controller.extend(ThreeColumnsMixin, SortQueryMixin, {
  queryParams:['totalCount'],
  sortName: null,
  sortDirect: null,

  model: function () {
    var self = this;
    return LazyArray.create({
      chunkSize: 50,
      totalCount: 200,
      callback: function (pageIndex) {
        var params = {section: pageIndex + 1};
        var sortQuery = self.get('sortQuery');
        if(sortQuery){
          params['sortDirects[0]'] = sortQuery.sortDirect;
          params['sortNames[0]'] = sortQuery.sortName;
        }
        return self.store.find('loan', params).then(function (data) {
          return data.get('content');
        });
      }
    });
  }.property(),

  columnsMetadata: [
    ["id", "Id", 20, function(prev, next){
      return Ember.get(prev, 'id') - Ember.get(next, 'id');
    }],
    ["activity", "Activity", 150],
    ["status", "status", 150]
  ],

  actions: {
    apply:function(){
      window.location.reload(true);
    },

    sortAction: function(sortingColumns) {
      this.set('sortingColumns', sortingColumns);
    }
  }
});
