import { SHOW } from '../constants';

const select = '.js-age-limit-select';
const input = $('.js-age-limit');

input.on('change', function() {
  const targetSelect = $(this).parent().siblings(select);
  if (targetSelect.length) {
    if ($(this).prop('checked')) {
    // $(this).parents('.checkbox').addClass('checked');
      targetSelect.addClass(SHOW);
    }
    else {
    // $(this).parents('.checkbox').removeClass('checked');
      targetSelect.removeClass(SHOW);
    }
  }
  else {
    console.error("There is no neighbor element '.js-age-limit-select' ");
  }
});
