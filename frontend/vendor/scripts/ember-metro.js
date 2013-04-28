
/**
 * @class Metro
 * Namespace for the ember-metro widget colleciton
 * @singleton
 *
*/


(function() {

  if (this.Metro == null) {
    this.Metro = {};
  }

}).call(this);


(function() {

  Metro.GlobalStyles = Ember.Mixin.create({
    classNameBindings: ['backgroundClass', 'foregroundClass', 'borderClass', 'outlineClass', 'spanClass', 'offsetClass', 'placeClass'],
    backgroundClass: (function() {
      if (this.get('backgroundColor')) {
        return "bg-color-" + (this.get('backgroundColor'));
      }
    }).property('backgroundColor'),
    foregroundClass: (function() {
      if (this.get('foregroundColor')) {
        return "fg-color-" + (this.get('foregroundColor'));
      }
    }).property('foregroundColor'),
    borderClass: (function() {
      if (this.get('borderColor')) {
        return "border-color-" + (this.get('borderColor'));
      }
    }).property('borderColor'),
    outlineClass: (function() {
      if (this.get('outlineColor')) {
        return "outline-color-" + (this.get('outlineColor'));
      }
    }).property('outlineColor'),
    spanClass: (function() {
      if (this.get('span')) {
        return "span" + (this.get('span'));
      }
    }).property('span'),
    offsetClass: (function() {
      if (this.get('offset')) {
        return "offset" + (this.get('offset'));
      }
    }).property('offset'),
    placeClass: (function() {
      if (this.get('place')) {
        return "place-" + (this.get('place'));
      }
    }).property('place')
  });

}).call(this);


(function() {
Metro.View = Ember.View.extend(Metro.GlobalStyles);

}).call(this);


(function() {
}).call(this);


(function() {

  Metro.Page = Metro.View.extend({
    classNameBindings: [':page', 'secondary', 'fill', 'snapped'],
    hLevel: 1,
    layout: (function() {
      if (this.get('title')) {
        return Ember.Handlebars.compile("<div class=\"page-header\">\n  <div class=\"page-header-content\">{{view view.formattedTitle}}</div>\n</div>\n{{yield}}");
      } else {
        return Ember.Handlebars.compile('{{yield}}');
      }
    }).property('title'),
    formattedTitle: (function() {
      var hTag, headerContent;
      hTag = "h" + (this.get('hLevel'));
      if (this.get('iconClass')) {
        headerContent = "<i class='" + (this.get('iconClass')) + "'></i>&nbsp;" + (this.get('title'));
      } else {
        headerContent = this.get('title');
      }
      return Ember.View.extend({
        tagName: hTag,
        template: Ember.Handlebars.compile(headerContent)
      });
    }).property('hLevel', 'title', 'iconClass')
  });

  Metro.PageHeader = Metro.View.extend({
    classNames: ['page-header'],
    layout: Ember.Handlebars.compile('<div class="page-header-content">{{yield}}</div>')
  });

  Metro.PageRegion = Metro.View.extend({
    classNames: ['page-region'],
    layout: Ember.Handlebars.compile('<div class="page-region-content">{{yield}}</div>')
  });

}).call(this);


(function() {

  Metro.AppBar = Metro.View.extend({
    classNames: ['app-bar']
  });

}).call(this);


(function() {

  Metro.Sharms = Metro.View.extend({
    classNames: ['charms']
  });

}).call(this);


(function() {

  Metro.MessageDialog = Metro.View.extend({
    classNames: ['message-dialog']
  });

}).call(this);


(function() {

  Metro.NotificationDialog = Metro.View.extend({
    classNameBindings: ['viewClass'],
    viewClass: (function() {
      return "" + (this.get('type')) + "-bar";
    }).property('type')
  });

}).call(this);


(function() {

  Metro.Grid = Metro.View.extend({
    classNames: ['grid'],
    layout: (function() {
      if (this.get('includeRow')) {
        return Ember.Handlebars.compile('<div class="row">{{yield}}</div>');
      } else {
        return Ember.Handlebars.compile('{{yield}}');
      }
    }).property('includeRow')
  });

  Metro.Row = Metro.View.extend({
    classNames: ['row']
  });

}).call(this);


(function() {
}).call(this);


(function() {
}).call(this);


(function() {

  Metro.Label = Metro.View.extend({
    classNameBindings: [':label', 'type'],
    template: Ember.Handlebars.compile("{{view.content}}")
  });

}).call(this);


(function() {

  Metro.Abbreviation = Metro.View.extend({
    tagName: 'abbr',
    attributeBindings: ['title'],
    template: (function() {
      if (this.get('label')) {
        return Ember.Handlebars.compile('{{view.label}}');
      }
    }).property('label')
  });

}).call(this);


(function() {

  Metro.List = Ember.CollectionView.extend(Metro.GlobalStyles, {
    type: 'unordered',
    classNameBindings: ['unstyled'],
    tagName: (function() {
      if (this.get('type') === 'unordered') {
        return 'ul';
      } else if (this.get('type') === 'ordered') {
        return 'ol';
      } else {
        return Ember.assert("Metro.List type must be either unordered or ordered");
      }
    }).property('listType'),
    itemViewClass: Ember.View.extend({
      tagName: 'li',
      template: Ember.Handlebars.compile("{{view.label}}"),
      label: (function() {
        var path;
        path = this.get('parentView.optionLabelPath');
        if (path != null) {
          return this.get(path);
        } else {
          return this.get('content');
        }
      }).property('content', 'parentView.optionLabelPath')
    })
  });

}).call(this);


(function() {

  Metro.BlockQuote = Metro.View.extend({
    tagName: 'blockquote',
    template: Ember.Handlebars.compile('{{view.content}}{{#if view.author}}<small>{{view.author}}</small>{{/if}}')
  });

}).call(this);


(function() {

  Metro.Address = Metro.View.extend({
    tagName: 'address',
    layout: Ember.Handlebars.compile("<strong>{{view.organization}}</strong>\n {{yield}}\n<abbr title=\"Phone\">P:</abbr>{{view.phoneNumber}}")
  });

}).call(this);


(function() {
}).call(this);


(function() {



}).call(this);



/*
Usage
{{view Metro.TextField placeholder="Enter username"}}
{{view Metro.TextField disabled=true value="This one is disabled"}}
*/


(function() {

  Metro.TextField = Metro.View.extend({
    classNameBindings: [':input-control', ':text', 'disabled'],
    template: Ember.Handlebars.compile("{{view Ember.TextField valueBinding=\"view.value\" disabledBinding=\"view.disabled\"\n placeholderBinding=\"view.placeholder\"}}\n<button class=\"btn-clear\" tabindex=\"-1\" type=\"button\"></button>"),
    didInsertElement: function() {
      return $.Input();
    }
  });

  Metro.PasswordField = Metro.View.extend({
    classNameBindings: [':input-control', ':password', 'disabled'],
    canReveal: true,
    template: Ember.Handlebars.compile("{{view Ember.TextField type=\"password\" valueBinding=\"view.value\" disabledBinding=\"view.disabled\"\n placeholderBinding=\"view.placeholder\"}}\n{{#if view.canReveal}}<button class=\"btn-reveal\" tabindex=\"-1\" type=\"button\"></button>{{/if}}"),
    didInsertElement: function() {
      return $.Input();
    }
  });

}).call(this);


(function() {

  Metro.Button = Metro.View.extend(Ember.ViewTargetActionSupport, {
    tagName: 'button',
    attributeBindings: ['disabled'],
    template: Ember.Handlebars.compile("{{#if view.iconClass}}\n  <i {{bindAttr class=\"view.iconClass\"}}></i>\n{{/if}}\n{{view.label}}"),
    click: function() {
      var action, target, _ref;
      _ref = [this.get('action'), this.get('target')], action = _ref[0], target = _ref[1];
      return this.triggerAction({
        action: action,
        target: target
      });
    }
  });

}).call(this);


(function() {
}).call(this);


(function() {
}).call(this);


(function() {
}).call(this);
