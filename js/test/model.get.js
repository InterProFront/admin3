'use strict';

var Model = require('../modules/model.js');
var $     = require('../lib/jquery.min.js');
describe('Model.', function() {
        describe('Get.', function(){
            describe('Static.', function() {
                it(' Получить поле с передачей всех параметров ', function () {
                    Model.clear();
                    Model.set({
                        block: 'bird_block',
                        id   : 0,
                        type : 'string',
                        key  : 'type',
                        value: 'penguin'
                    });

                    var model    = Model.get({block: 'bird_block', type: 'string', key: 'type'});
                    var expected = Model.data()['bird_block']['string']['type'];

                    expect(model).toBe(expected);
                });
                it(' Получить поле без типа  ', function () {
                    Model.clear();
                    Model.set({
                        block: 'bird_block',
                        id   : 0,
                        key  : 'type',
                        value: 'penguin'
                    });

                    var model    = Model.get({block: 'bird_block', key: 'type'});
                    var expected = Model.data()['bird_block']['type'];

                    expect(model).toBe(expected);
                });
                it(' Получить поле без передачи типа  ', function () {
                    Model.clear();
                    Model.set({
                        block: 'bird_block',
                        id   : 0,
                        type : 'string',
                        key  : 'type',
                        value: 'penguin'
                    });

                    var model    = Model.get({block: 'bird_block', key: 'type'});
                    var expected = Model.data()['bird_block']['string']['type'];

                    expect(model).toBe(expected);
                });
            });
            describe('GroupItems.', function(){
                it(' Получить поле без типа из группы с 1 элементом  ', function() {
                    Model.clear();
                    Model.set({
                        block: 'test_block',
                        id: 2,
                        key: 'type',
                        value: 'penguin'
                    });

                    var model = Model.get({block: 'test_block',id: 2, key: 'type'});
                    var expected = Model.data()['test_block'][0]['type'];

                    expect(model).toBe(expected);
                });
                it(' Получить поле без типа из группы с 3 элементом  ', function() {
                    Model.clear();

                    Model.set({block: 'test_block', id: 4, key: 'type', value: 'penguin1'});
                    Model.set({block: 'test_block', id: 6, key: 'type', value: 'penguin2'});
                    Model.set({block: 'test_block', id: 9, key: 'type', value: 'penguin3'});

                    var model = Model.get({block: 'test_block',id: 6,  key: 'type'});
                    var expected = Model.data()['test_block'][1]['type'];

                    expect(model).toBe(expected);
                });

                it(' Получить поле с типом из группы с 1 элементом  ', function() {
                    Model.clear();
                    Model.set({block: 'test_block', id: 4,type: 'string', key: 'type', value: 'penguin1'});

                    var model = Model.get({block: 'test_block', id: 4,type: 'string',  key: 'type'});
                    var expected = Model.data()['test_block'][0]['string']['type'];

                    expect(model).toBe(expected);
                });

                it(' Получить поле с типом из группы с 3 элементом  ', function() {
                    Model.clear();
                    Model.set({block: 'test_block', id: 4, type: 'string', key: 'type', value: 'penguin1'});
                    Model.set({block: 'test_block', id: 25,type: 'string', key: 'type', value: 'penguin2'});
                    Model.set({block: 'test_block', id: 6, type: 'string', key: 'type', value: 'penguin3'});

                    var model = Model.get({block: 'test_block', id: 6,type: 'string',  key: 'type'});
                    var expected = Model.data()['test_block'][2]['string']['type'];

                    expect(model).toBe(expected);
                });
                it(' Получить поле с типом из группы с 3 элементом  без указания типа ', function() {
                    Model.clear();
                    Model.set({block: 'test_block', id: 4, type: 'string', key: 'type', value: 'penguin1'});
                    Model.set({block: 'test_block', id: 25,type: 'string', key: 'type', value: 'penguin2'});
                    Model.set({block: 'test_block', id: 6, type: 'string', key: 'type', value: 'penguin3'});

                    var model = Model.get({block: 'test_block', id: 25,  key: 'type'});
                    var expected = Model.data()['test_block'][1]['string']['type'];

                    expect(model).toBe(expected);
                });
            });
        });
});
