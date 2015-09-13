if (Meteor.isClient) {
  Template.questionSubmit.helpers({
    schema: function () {
      return QuestionSchema;
    },
    action: function () {
      return function (els, callbacks, changed) {
        console.log('[forms] Action Running!');
        console.log('[forms] Form data!', this);
        console.log('[forms] HTML elements with `.reactive-elemet` class!', els);
        console.log('[forms] Callbacks!', callbacks);
        console.log('[forms] Changed fields', changed);
        callbacks.success('Thanks');
        callbacks.reset('Fill the form');
      };
      callbacks.success();
      callbacks.reset();
    }
    });

  ReactiveForms.createFormBlock({
    template: 'basicFormBlock',
    submitType: 'normal'
  });

  ReactiveForms.createElement({
    template: 'basicInput2',
    validationEvent: 'keyup',
    reset: function (el) {
      $(el).val('');
    }
  });

  Template['inputElement'].helpers({
    numberOfFields: function () {
      var currentFieldCount = Template.instance().numberOfFields.get();
      var times = [];
      _.times(currentFieldCount, function (n) {
        times.push(n);
      });
      return times;
    },
    getValueFor: function (n, values) {
      if (n && values && values[n]) {
        return values[n];
      }
    }
  });

  // Add event to change custom state
  Template.inputElement.events({
    'click .add-field': function (event, template) {
      event.preventDefault();
      var currentFieldCount = Template.instance().numberOfFields.get();
      currentFieldCount+=1;
      Template.instance().numberOfFields.set(currentFieldCount);
    }
  });

  // Add ReactiveVar here using the `created` callback
  ReactiveForms.createElement({
    template: 'inputElement',
    validationEvent: 'keyup',
    validationValue: function (el, clean, template) {
      var values = $(el).find('input').map(function () {
        return $(this).val();
      }).get();
      console.log(values);
      return values; // An array with all your input values
    },
    created: function () {
      this.numberOfFields = new ReactiveVar(4); // Default to one field
    }
  });

  ReactiveForms.createElement({
    template: 'basicInput2',
    validationEvent: 'keyup',
    validationValue: function (el, clean, template) {
      value = $(el).val();
      console.log(value);

      return value;
    },
    reset: function (el) {
      $(el).val('');
    }
  });

  ReactiveForms.createElement({
    template: 'basicRadio',
    validationEvent: 'keyup',
    validationValue: function (el, clean, template) {
      value = $(el).is(':checked');
      console.log(value);
      return value;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
