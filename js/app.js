App = Ember.Application.create();

App.Router.map(function() {
  this.route('other');
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

LiquidFire.defineTransition('rotateBelow', function (oldView, insertNewView, opts) {
  var direction = 1;
  if (opts && opts.direction === 'cw') {
    direction = -1;
  }
  LiquidFire.stop(oldView);
  return insertNewView().then(function(newView) {
    oldView.$().css('transform-origin', '50% 150%');
    newView.$().css('transform-origin', '50% 150%');
    return LiquidFire.Promise.all([
      LiquidFire.animate(oldView, { rotateZ: -90*direction + 'deg' }, opts),
      LiquidFire.animate(newView, { rotateZ: ['0deg', 90*direction+'deg'] }, opts),
    ]);
  });
});

LiquidFire.map(function(){
  this.transition(
    this.fromRoute('index'),
    this.toRoute('other'),
    this.use('toLeft')
  );
  this.transition(
    this.fromRoute('other'),
    this.toRoute('index'),
    this.use('rotateBelow')
  );
});
