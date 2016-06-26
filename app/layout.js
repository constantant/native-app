/**
 * Created by constantant on 23.06.2016.
 */

/**
 * @constructor
 */
app.ui.Layout = function () {
    app.ui.Component.call(this);

    /**
     * @type {app.Model}
     * @private
     */
    this._model = new app.Model({
        value: ''
    });
};
app.inherits(app.ui.Layout, app.ui.Component);

/** @override */
app.ui.Layout.prototype.createDom = function () {
    this.setElement(
        app.renderAsElement(
            function (data) {
                return '<div class="app-layout" id="lu' + data.id + '">' +
                    '<div class="app-layout-item"></div>' +
                    '<div class="app-layout-item"></div>' +
                    '</div>';
            },
            {
                id: this.getId()
            }
        )
    );
};

/** @override */
app.ui.Layout.prototype.enterDocument = function () {
    var element = this.getElement(),
        items = element.querySelectorAll('.app-layout-item');

    this.item1 = new app.ui.Textarea('Hello world');
    this.item2 = new app.ui.Textarea('XXX xxx');

    app.events.addListener(
        this.item1,
        'input',
        this._updateModel,
        this
    );

    app.events.addListener(
        this.item2,
        'input',
        this._updateModel,
        this
    );

    app.events.addListener(
        this._model,
        'setProperty',
        this._updateTextarea,
        this
    );

    this.item1.render(items[0]);
    this.item2.render(items[1]);
};

/**
 * @param {app.events.Event} event
 * @private
 */
app.ui.Layout.prototype._updateModel = function (event) {
    this._model.setProperty('value', event.target.getValue());
};

/**
 * @param {app.events.Event} event
 * @private
 */
app.ui.Layout.prototype._updateTextarea = function (event) {
    var value = event.target.getProperty('value');
    this.item1.setValue(value);
    this.item2.setValue(value);
};
