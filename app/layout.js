/**
 * Created by constantant on 23.06.2016.
 */

/**
 * @param {String} label
 * @constructor
 */
app.ui.Layout = function () {
    app.ui.Component.call(this);
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
        element = this.getElement(),
        items = element.querySelectorAll('.app-layout-item');
    
    this.item1 = new app.ui.Textarea('Hello world');
    this.item2 = new app.ui.Textarea('XXX xxx');

    this.item1['onInput'] = function (event) {
        _this.item2.setValue(
            _this.item1.getValue()
        )
    };
    
    this.item2['onInput'] = function (event) {
        _this.item1.setValue(
            _this.item2.getValue()
        )
    };

    this.item1.render(items[0]);
    this.item2.render(items[1]);
};