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
        value_1:'',
        value_2:''
    });
};
app.inherits(app.ui.Layout, app.ui.Component);

/** @override */
app.ui.Layout.prototype.createDom = function () {
    this.setElement(
        app.renderAsElement(
            function (data) {
                return '<div class="app-layout" id="lu'+ data.id +'">' +
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

app.ui.Layout.prototype.enterDocument = function () {
    var _this = this,
        _model = this._model,
        element = this.getElement(),
        items = element.querySelectorAll('.app-layout-item');
    
    this.item1 = new app.ui.Textarea('Hello world');
    this.item2 = new app.ui.Textarea('XXX xxx');

    this.item1['onInput'] = function (event) {
        _model.setProperty('value_2',  _this.item1.getValue());
    };
    
    this.item2['onInput'] = function (event) {
        _model.setProperty('value_1',  _this.item2.getValue());
    };

    _model['onSetProperty'] =  function (name, value, old_value) {
        switch (name){
            case 'value_1':
                _this.item1.setValue(value);
                break;
            case 'value_2':
                _this.item2.setValue(value);
                break;
            default:
                break;
        }
    };

    this.item1.render(items[0]);
    this.item2.render(items[1]);
};