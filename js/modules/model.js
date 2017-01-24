'use strict';

var Model = (function () {
    //переменные  приватные
    var data = {};

    // Добавить или обновить поле у блока
    function addBlockField(block, type, key, value) {
        if (typeof(data[block]) != 'object') {
            data[block] = {};
        }
        if (type == '') {
            data[block][key] = value;
        } else {
            if (typeof(data[block][type]) != 'object') {
                data[block][type] = {};
            }
            data[block][type][key] = value;
        }
    }

    // Добавить новый элемент группы
    function addGroupItem(block, id) {
        data[block].push({id: id});
        return data[block][data[block].length - 1];
    }

    // Добавить или обновить поле и элемента группы
    function addGroupItemField(block, id, type, key, value) {
        var haveItem = false;
        var item     = {};
        if (!(Object.prototype.toString.call(data[block]) === '[object Array]')) {
            data[block] = [];
        } else {
            //var start = 0;
            //if( data[block].indexOf() != -1 ){
            //    start = data[block].indexOf();
            //}

            var obj = data[block];
            obj.forEach(function(item_obj, i , obj ){
                if( item_obj.id  == id){
                    haveItem = true;
                    item     = data[block][i];
                }
            });
            //for (var i = start ; i < data[block].length; i++) {
            //    if (data[block][i].id == id) {
            //        haveItem = true;
            //        item     = data[block][i];
            //    }
            //}
        }
        if (!haveItem) {
            item = addGroupItem(block, id);
        }
        if (type == '') {
            item[key] = value;
        } else {
            if (typeof(item[type]) != 'object') {
                item[type] = {};
            }
            item[type][key] = value;
        }
    }

    // Поиск поля в Блоке
    function findField(block, type, key) {
        if (type != '') {
            return data[block][type][key];
        } else {
            if (key in data[block]) {
                return data[block][key]
            } else {
                for (var item in data[block]) {
                    if (typeof(data[block][item]) == 'object') {
                        if (key in data[block][item]) {
                            return data[block][item][key];
                        }
                    }
                }
            }
        }
    }
    // Поиск поля в группе
    function findGroupItemField(block, id, type, key) {

        for (var i = 0; i < data[block].length; i++) {

            if (data[block][i].id == id) {
                if (type == '') {
                    if (key in data[block][i]) {
                        return data[block][i][key]
                    } else {
                        for (var item in data[block][i]) {
                            if (typeof(data[block][i][item]) == 'object') {
                                if (key in data[block][i][item]) {
                                    return data[block][i][item][key]
                                }
                            }
                        }
                    }
                } else {
                    return data[block][i][type][key]
                }
            }
        }
    }

    return {
        init : function () {
            //TODO Написать INIT;
        },
        data : function () {
            return data;
        },
        clear: function () {
            data = {};
        },
        get  : function (options) {

            var block = options.block;
            var id    = options.id || 0;
            var type  = options.type || '';
            var key   = options.key;

            if (id == 0) {
                return findField(block, type, key);
            } else {
                return findGroupItemField(block, id, type, key);
            }
        },
        set  : function (options) {

            var block = options.block;
            var id    = options.id || 0;
            var type  = options.type || '';
            var key   = options.key;
            var value = options.value;

            // Если по каким то причинам data это не объект
            if (typeof(data) != 'object') {
                data = {};
            }

            // проверяем есть ли уже в объекте поле по имени Блока
            if (id == 0) {
                addBlockField(block, type, key, value);
            } else {
                addGroupItemField(block, id, type, key, value);
            }
        },
        remove: function( options ){
            var block = options.block;
            var id    = options.id;
            var have  = false;
            if ((Object.prototype.toString.call(data[block]) === '[object Array]')) {
                var obj = data[block];
                obj.forEach(function(item, i , obj ){
                    if( item.id  == id){
                        delete data[block][i];
                    }
                });
                //for (var i = start; i < data[block].length; i++) {
                //    if (data[block][i].id == id) {
                //        delete data[block][i];
                //    }
                //}
            }
        }
    }


})();

//module.exports = Model;