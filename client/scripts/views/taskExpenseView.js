Lancealot.TaskExpenseView = Backbone.View.extend({
  template: Templates['taskexpensetable'],

  initialize: function () {
    this.render();
  },

  render: function(){
    this.$el.empty();
    this.$el.html(this.template());
    var thisView = this.$el;
    this.collection.forEach(function (expense) {
      thisView.find('table').append('<tr>'
        + '<td contenteditable>' + expense.get('expense_name') + '</td>'
        + '<td contenteditable>' + expense.get('unit_price') + '</td>'
        + '<td><button>X</button></td>'
        + '</tr>');
    })
    return this;
  }
});
