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

