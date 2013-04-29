function Template() {
	var templatePath,
		events;
}

Template.prototype = {

	init: function(templatePath) {
		this.templatePath = templatePath;
	},

	addEvent: function(selector, event, handler) {

		// Add event to events array
		this.events.push({
			selector: selector,
			event: event,
			handler: handler
		});

	},

	build: function(template, data, actions) {

		var _this = this;

		this.events = [];
		if (typeof data != 'object') {
			data = {};
		}
		if (typeof actions != 'object') {
			actions = {};
		}
		data.template = this;
		data.actions = actions;

		// Render element
		var element = $(new EJS({url: this.templatePath+template}).render(data));

		// Bind events
		for (var i=0; i<this.events.length; i++) {
			var event = this.events[i];
			element.delegate(event.selector, event.event, event.handler);
		}

		// Return element
		return element;

	}

}