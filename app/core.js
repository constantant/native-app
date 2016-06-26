/**
 * Created by constantant on 23.06.2016.
 */
var app = {};
app.ui = {};
app.events = {};

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
 * @param {Object} opt_template_data
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

app.events._type = [];
app.events._target = [];
app.events._handler = [];
app.events._context = [];
app.events._ItemIndex = {
    TYPE: 0,
    TARGET: 1,
    HANDLER: 2,
    CONTEXT: 3
};
app.events._list = [];

app.events._addToList = function (target, type, handler, context) {
    var item = [];

    item[app.events._ItemIndex.TARGET] = app.events._addTarget(target);
    item[app.events._ItemIndex.TYPE] = app.events._addType(type);
    item[app.events._ItemIndex.HANDLER] = app.events._addHandler(handler);
    item[app.events._ItemIndex.CONTEXT] = app.events._addContext(context);

    app.events._list.push(item);
};

app.events._getRows = function (opt_target, opt_type, opt_handler) {
    var targetIndex = opt_target && app.events._getTarget(opt_target),
        typeIndex = opt_type && app.events._getType(opt_type),
        handlerIndex = opt_handler && app.events._getHandler(opt_handler),
        list = app.events._list,
        listLength = app.events._list.length, item,
        rows = [], i;

    if (opt_target && opt_type && opt_handler) {
        for (i = 0; i < listLength; i++) {
            item = list[i];
            if (
                item[app.events._ItemIndex.TYPE] === typeIndex &&
                item[app.events._ItemIndex.TARGET] === targetIndex &&
                item[app.events._ItemIndex.HANDLER] === handlerIndex
            ) {
                rows.push(i);
            }
        }
        return rows;
    }

    if (opt_target && opt_type) {
        for (i = 0; i < listLength; i++) {
            item = list[i];
            if (
                item[app.events._ItemIndex.TYPE] === typeIndex &&
                item[app.events._ItemIndex.TARGET] === targetIndex
            ) {
                rows.push(i);
            }
        }
        return rows;
    }

    if (opt_target) {
        for (i = 0; i < listLength; i++) {
            item = list[i];
            if (
                item[app.events._ItemIndex.TARGET] === targetIndex
            ) {
                rows.push(i);
            }
        }
        return rows;
    }

    if (opt_type && opt_handler) {
        for (i = 0; i < listLength; i++) {
            item = list[i];
            if (
                item[app.events._ItemIndex.TYPE] === typeIndex &&
                item[app.events._ItemIndex.HANDLER] === handlerIndex
            ) {
                rows.push(i);
            }
        }
        return rows;
    }

    if (opt_type) {
        for (i = 0; i < listLength; i++) {
            item = list[i];
            if (
                item[app.events._ItemIndex.TYPE] === typeIndex
            ) {
                rows.push(i);
            }
        }
        return rows;
    }

    if (opt_handler) {
        for (i = 0; i < listLength; i++) {
            item = list[i];
            if (
                item[app.events._ItemIndex.HANDLER] === handlerIndex
            ) {
                rows.push(i);
            }
        }
        return rows;
    }
};

app.events._getEntity = function (entity, scope) {
    var index = scope.indexOf(entity);
    if (!!(index + 1)) {
        return index;
    }
    return null;
};

app.events._addEntity = function (entity, scope) {
    var index = scope.indexOf(entity);
    if (!!(index + 1)) {
        return index;
    }

    scope.push(entity);
    return (scope.length - 1);
};

app.events._removeEntity = function (entity, scope) {
    var index = scope.indexOf(entity),
        value;

    if (!!(index + 1)) {
        value = scope[index];
        scope[index] = void(0);
        return value;
    }
};

app.events._getType = function (type) {
    return app.events._getEntity(type, app.events._type);
};

app.events._addType = function (type) {
    return app.events._addEntity(type, app.events._type);
};

app.events._removeType = function (type) {
    return app.events._removeEntity(type, app.events._type);
};

app.events._getTarget = function (target) {
    return app.events._getEntity(target, app.events._target);
};

app.events._addTarget = function (target) {
    return app.events._addEntity(target, app.events._target);
};

app.events._removeTarget = function (target) {
    return app.events._removeEntity(target, app.events._target);
};

app.events._getHandler = function (handler) {
    return app.events._getEntity(handler, app.events._handler);
};

app.events._addHandler = function (handler) {
    return app.events._addEntity(handler, app.events._handler);
};

app.events._removeHandler = function (handler) {
    return app.events._removeEntity(handler, app.events._handler);
};

app.events._getContext = function (context) {
    return app.events._getEntity(context, app.events._context);
};

app.events._addContext = function (context) {
    return app.events._addEntity(context, app.events._context);
};

app.events._removeContext = function (context) {
    return app.events._removeEntity(context, app.events._context);
};

/**
 * Event
 * @param {String} type
 * @param {*?} opt_target
 * @constructor
 */
app.events.Event = function (type, opt_target) {
    this.type = type;
    this.target = opt_target;
};

/**
 * dispatchEvent
 * @param {Object} target
 * @param {app.events.Event} event
 */
app.events.dispatchEvent = function (target, event) {
    var rows = app.events._getRows(target, event.type),
        list = app.events._list,
        rowsLength = rows.length, i, row, index, handler, context;

    for (i = 0; i < rowsLength; i++) {
        index = rows[i];
        row = list[index];
        handler = app.events._handler[row[app.events._ItemIndex.HANDLER]];
        context = app.events._context[row[app.events._ItemIndex.CONTEXT]];

        handler.call((context || event.target), event);
    }
};

app.events.addListener = function (target, type, handler, context) {
    app.events._addToList(target, type, handler, context);
};

app.events.removeListener = function (opt_target, opt_type, opt_handler) {
    var rows = app.events._getRows(opt_target, opt_type, opt_handler),
        list = app.events._list,
        rowsLength = rows.length, i, row, index;

    for (i = 0; i < rowsLength; i++) {
        index = rows[i];
        row = list[index];
        app.events._removeTarget(row[app.events._ItemIndex.TARGET]);
        app.events._removeContext(row[app.events._ItemIndex.CONTEXT]);
        app.events._removeHandler(row[app.events._ItemIndex.HANDLER]);
        app.events._removeType(row[app.events._ItemIndex.TYPE]);

        list[index] = void(0);
    }
};


/**
 * Model
 * @param {Object} properties
 * @constructor
 */
app.Model = function (properties) {
    this._properties = properties;
    this._oldValues = {};
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
 * @returns {*}
 */
app.Model.prototype.getOldValue = function (name) {
    return this._oldValues[name];
};

/**
 * @param {String} name
 * @param {String} value
 */
app.Model.prototype.setProperty = function (name, value) {
    if (this._properties[name] !== void 0) {
        this._oldValues[name] = this._properties[name];
        this._properties[name] = value;
        this._onSetProperty();
    }
};

/**
 * @private
 */
app.Model.prototype._onSetProperty = function () {
    app.events.dispatchEvent(
        this,
        new app.events.Event(
            'setProperty',
            this
        )
    );
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
