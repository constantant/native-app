/**
 * Created by constantant on 23.06.2016.
 */

/**
 * @param {String} label
 * @constructor
 */
app.ui.Textarea = function (label) {
    app.ui.Component.call(this);

    /**
     * @type {HTMLTextAreaElement|null}
     * @private
     */
    this._input = null;
    this.label = label;
};
app.inherits(app.ui.Textarea, app.ui.Component);

/**
 * @returns {String}
 */
app.ui.Textarea.prototype.getValue = function () {
    return this._input.value;
};

/**
 * @param {String} opt_value
 */
app.ui.Textarea.prototype.setValue = function (opt_value) {
    this._input.value = opt_value || '';
};

/** @override */
app.ui.Textarea.prototype.createDom = function () {
    this.setElement(
        app.renderAsElement(
            function (data) {
                return '<div class="app-textarea"><label for="el' + data.id + '">' + data.label + '</label><textarea id="el' + data.id + '"></textarea></div>';
            },
            {
                label: this.label,
                id: this.getId()
            }
        )
    );
};

app.ui.Textarea.prototype.enterDocument = function () {
    var _this = this;
    
    
    this._input = this.getElement().querySelector('textarea');
    this._input.addEventListener('input', function (event) {
        _this._onInput(event);
    })
};

app.ui.Textarea.prototype.exitDocument = function () {};

/**
 * @param {Event} event
 * @private
 */
app.ui.Textarea.prototype._onInput = function (event) {
    if(this['onInput']){
        this['onInput'](event);
    }
};
