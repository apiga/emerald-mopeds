Lancealot.TaskExpenseView = Backbone.View.extend({
  template: Templates['taskexpensetable'],
  tagName: 'table',
  className: 'table table-striped',

  initialize: function () {
    this.render();
  },

  render: function(){
    this.$el.empty();
    this.$el.html(this.template());
    var thisView = this.$el;
    this.collection.forEach(function (expense) {
      var expenseDisplay = new TaskListView({model: expense});
      thisView.append(expenseDisplay.el);
    })
    return this;
  }
});

var TaskListView = Backbone.View.extend({
  tagName: 'tr',

  initialize: function () {
    this.render();
  },

  render: function () {
    this.$el.html('<td class="nameEdit" contenteditable>' + this.model.get('expense_name') + '</td>'
      + '<td class="priceEdit" contenteditable>' + this.model.get('unit_price') + '</td>'
      + '<td><button>X</button></td>');
  },

  events: {
    'keydown .nameEdit': 'editExpenseName',
    'keydown .priceEdit': 'editExpensePrice'
  },

  editExpenseName: function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      var expense_name = this.$el.find('.nameEdit').text();
      this.$el.find('.nameEdit').blur();
      $.ajax({
        url: '/api/expenses/' + this.model.get('id'),
        method: 'PUT',
        data: {
          expense_name: expense_name
        }
      });
    }
  },

  editExpensePrice: function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      var unit_price = this.$el.find('.priceEdit').text();
      this.$el.find('.priceEdit').blur();
      $.ajax({
        url: '/api/expenses/' + this.model.get('id'),
        method: 'PUT',
        data: {
          unit_price: unit_price
        }
      });
    }
  }
});
