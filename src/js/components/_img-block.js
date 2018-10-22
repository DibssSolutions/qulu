import Popper from 'popper.js';
const edit = 'is-edit';
const container = $('.js-img-block');

container.each((i,el) => {
  const that = $(el);
  const btnEdit = $('.js-edit-img', that);
  const btnRemove = $('.js-remove-img', that);
  const overlay = $('.js-img-block-overlay', that);

  // toggle edit
  btnEdit.on('click', () => that.toggleClass(edit));
  // unedit
  overlay.on('click', () => that.removeClass(edit));

  // remove img-block
  btnRemove.on('click', () => that.remove());

});


const point = $('.js-point');
point.each((i,el) => {
  const that = $(el);
  const trigger = $('.js-point-trigger', that);
  const drop = $('.js-point-drop', that);
  const remove = $('.js-point-remove', that);
  const drop = $('.js-point-drop', that)[0];
  const position = that.data('drop-position') || 'bottom-start';
  var anotherPopper = new Popper(reference, popper, {
	  placement: position,
	  onCreate: function() {
	    getPosition(that, arguments);
	  },
	  onUpdate: function() {
	    getPosition(that, arguments);
	  }
  });
});


