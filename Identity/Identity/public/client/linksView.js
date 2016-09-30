Shortly.LinksView = Backbone.View.extend({
  className: 'links',

  initialize: function(){
    this.collection.on('sync', this.addAll, this);
    this.collection.fetch();
  },

  render: function() {
    this.$el.empty();
    return this;
  },

  addAll: function(){
    this.collection.forEach(this.addOne, this);
  },

  addOne: function(item){
    var view = new Shortly.LinkView({ model: item });
    this.$el.append(view.render().el);
  }
});
