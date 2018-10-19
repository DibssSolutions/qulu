import tagsinput from 'bootstrap-tagsinput';
import 'typeahead.js';

const htmlEncodeContainer = $('<div />');
const htmlEncode = value => {
  if (value) {
    return htmlEncodeContainer.text(value).html();
  } else {
    return '';
  }
};
$.fn.tagsinput.Constructor.prototype.add = function(item, dontPushVal) {
  var self = this;

  if (self.options.maxTags && self.itemsArray.length >= self.options.maxTags)
    return;

  // Ignore falsey values, except false
  if (item !== false && !item)
    return;

  // Throw an error when trying to add an object while the itemValue option was not set
  if (typeof item === 'object' && !self.objectItems)
    throw("Can't add objects when itemValue option is not set");

  // Ignore strings only containg whitespace
  if (item.toString().match(/^\s*$/))
    return;

  // If SELECT but not multiple, remove current tag
  if (self.isSelect && !self.multiple && self.itemsArray.length > 0)
    self.remove(self.itemsArray[0]);

  if (typeof item === 'string' && this.$element[0].tagName === 'INPUT') {
    var items = item.split(',');
    if (items.length > 1) {
      for (var i = 0; i < items.length; i++) {
        this.add(items[i], true);
      }

      if (!dontPushVal)
        self.pushVal();
      return;
    }
  }

  var itemValue = self.options.itemValue(item),
    itemText = self.options.itemText(item),
    tagClass = self.options.tagClass(item);

  // Ignore items allready added
  var existing = $.grep(self.itemsArray, function(item) { return self.options.itemValue(item) === itemValue; } )[0];
  if (existing) {
    // Invoke onTagExists
    if (self.options.onTagExists) {
      var $existingTag = $('.tag', self.$container).filter(function() { return $(this).data('item') === existing; });
      self.options.onTagExists(item, $existingTag);
    }

  }

  // register item in internal array and map
  self.itemsArray.push(item);

  // add a tag element
  var $tag = $('<span class="tag ' + htmlEncode(tagClass) + '">' + htmlEncode(itemText) + '<span data-role="remove"></span> <span><input type="file"></span></span>');
  $tag.data('item', item);
  self.findInputWrapper().before($tag);
  $tag.after(' ');

  // add <option /> if item represents a value not present in one of the <select />'s options
  if (self.isSelect && !$('option[value="' + escape(itemValue) + '"]',self.$element)[0]) {
    var $option = $('<option selected>' + htmlEncode(itemText) + '</option>');
    $option.data('item', item);
    $option.attr('value', itemValue);
    self.$element.append($option);
  }

  if (!dontPushVal)
    self.pushVal();

  // Add class when reached maxTags
  if (self.options.maxTags === self.itemsArray.length)
    self.$container.addClass('bootstrap-tagsinput-max');

  self.$element.trigger($.Event('itemAdded', { item: item }));
};

const citynames = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  prefetch: {
    url: '/json/citynames.json',
    filter: function(list) {
      return $.map(list, function(cityname) {
        return { name: cityname }; });
    }
  }
});
citynames.initialize();

$('[data-role="tagsinput"]').tagsinput({
  typeaheadjs: {
    name: 'citynames',
    displayKey: 'name',
    valueKey: 'name',
    source: citynames.ttAdapter()
  }
});

console.log($.fn.tagsinput.Constructor.prototype.add);


