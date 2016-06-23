/**
 * Created by constantant on 23.06.2016.
 */
var app = {};
app.ui = {};

/**
 * inherits
 * @param {!Function} child_constructor
 * @param {!Function} parent_constructor
 */
app.inherits = function (child_constructor, parent_constructor) {
    /** @constructor */
    function tempConstructor() {
    }

    tempConstructor.prototype = parent_constructor.prototype;
    child_constructor.superClass_ = parent_constructor.prototype;
    child_constructor.prototype = new tempConstructor();
    /** @override */
    child_constructor.prototype.constructor = child_constructor;
};

/**
 *
 * @param {Function} template
 * @param opt_template_data
 * @returns {!Element}
 */
app.renderAsElement = function (template, opt_template_data) {
    var wrapper = document.createElement('div'),
        firstChild;

    wrapper.innerHTML = template(opt_template_data);

    if (wrapper.childNodes.length == 1) {
        firstChild = wrapper.firstChild;
        if (firstChild.nodeType == 1) {
            return /** @type {!Element} */ firstChild;
        }
    }
    return wrapper;
};

/**
 * Model
 * @param {Object} properties
 * @constructor
 */
app.Model = function (properties) {
    this._properties = properties || {};
};

/**
 * @returns {Object|{}|*}
 */
app.Model.prototype.getProperties = function () {
    return this._properties;
};

/**
 * @param {String} name
 * @returns {*}
 */
app.Model.prototype.getProperty = function (name) {
    return this._properties[name];
};

/**
 * @param {String} name
 * @param {String} value
 */
app.Model.prototype.setProperty = function (name, value) {
    var oldValue;
    if(this._properties[name] !== void 0){
        oldValue = this._properties[name];
        this._properties[name] = value;
        this._onSetProperty(name, value, oldValue);
    }
};

/**
 * @param {String} name
 * @param {String} value
 * @param {String} old_value
 * @private
 */
app.Model.prototype._onSetProperty = function (name, value, old_value) {
    if(this['onSetProperty']){
        this['onSetProperty'](name, value, old_value);
    }
};






/**
 * Component
 * @constructor
 */
app.ui.Component = function () {
    /**
     * @type {!Element}
     * @private
     */
    this._element = null;

    /**
     * @type {number}
     * @private
     */
    this._id = ++app.ui.Component._id;
};
app.ui.Component._id = 0;

app.ui.Component.prototype.getId = function () {
    return this._id;
};

/**
 * @returns {!Element|*}
 */
app.ui.Component.prototype.getElement = function () {
    return this._element;
};

/**
 * @param {!Element} element
 */
app.ui.Component.prototype.setElement = function (element) {
    this._element = element;
};

app.ui.Component.prototype.createDom = function () {
    this.setElement(document.createElement('div'));
};

/**
 * render component
 * @param {HTMLElement?} opt_parent
 */
app.ui.Component.prototype.render = function (opt_parent) {
    this.createDom();
    (opt_parent || document.body).appendChild(this._element);
    this.enterDocument();
};

/**
 * destroy component
 */
app.ui.Component.prototype.destroy = function () {
    this.exitDocument();
    this._element.parentNode.removeChild(this._element);
};

/**
 * after render
 */
app.ui.Component.prototype.enterDocument = function () {

};

/**
 * before destroy
 */
app.ui.Component.prototype.exitDocument = function () {

};
