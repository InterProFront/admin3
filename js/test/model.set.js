'use strict';

var Model = require('../modules/model.js');
var $     = require('../lib/jquery.min.js');
describe('Model.', function() {
    describe('Set data.', function(){
        describe('Static.',function(){
            it(' Добавить поле с типом ', function() {
                Model.clear();
                Model.set({
                    block: 'bird_block',
                    id: 0,
                    type: 'string',
                    key: 'type',
                    value: 'penguin'
                });

                var model = Model.data()['bird_block']['string']['type'];
                var expected = 'penguin';

                expect(model).toBe(expected);
            });

            it(' Добавить поле без типа ', function() {
                Model.clear();
                Model.set({
                    block: 'bird_block',
                    id: 0,
                    key: 'type',
                    value: 'penguin'
                });

                var model = Model.data()['bird_block']['type'];
                var expected = 'penguin';

                expect(model).toBe(expected);
            });
            it(' Добавить поле без ID ', function() {
                Model.clear();
                Model.set({
                    block: 'bird_block',
                    type: 'string',
                    key: 'type',
                    value: 'penguin'
                });

                var model = Model.data()['bird_block']['string']['type'];
                var expected = 'penguin';

                expect(model).toBe(expected);
            });
            it(' Добавить поле без типа и ID ', function() {
                Model.clear();
                Model.set({
                    block: 'bird_block',
                    key: 'type',
                    value: 'penguin'
                });

                var model = Model.data()['bird_block']['type'];
                var expected = 'penguin';

                expect(model).toBe(expected);
            });

            it(' Изменить поле ', function() {
                Model.clear();
                Model.set({
                    block: 'bird_block',
                    id: 0,
                    type: 'string',
                    key: 'type',
                    value: 'not_a_penguin'
                });
                var test1 = Model.data()['bird_block']['string']['type'];

                Model.set({
                    block: 'bird_block',
                    id: 0,
                    type: 'string',
                    key: 'type',
                    value: 'penguin'
                });

                var model = Model.data()['bird_block']['string']['type'];
                var expected = 'penguin';

                expect(model).toBe(expected);
            });
        });
        describe('GroupItems.', function(){

            it(' Добавить поле в элемент группы ', function() {
                Model.clear();
                Model.set({
                    block: 'penguin_block',
                    id: 5,
                    type: 'string',
                    key: 'type',
                    value: 'penguin'
                });

                var model = Model.data()['penguin_block'];
                var expected = [{id: 5, string: {type: 'penguin'}} ];

                expect(model).toEqual(expected);
            });
            it(' Добавить поле у элемент группы без типа ', function() {
                Model.clear();
                Model.set({
                    block: 'penguin_block',
                    id: 5,
                    key: 'type',
                    value: 'penguin'
                });

                var model = Model.data()['penguin_block'][0]['type'];
                var expected = 'penguin';

                expect(model).toBe(expected);
            });


            it(' Обновить поле у элемент группы ', function() {
                Model.clear();
                Model.set({
                    block: 'penguin_block',
                    id: 5,
                    type: 'string',
                    key: 'type',
                    value: 'penguin'
                });
                Model.set({
                    block: 'penguin_block',
                    id: 5,
                    type: 'string',
                    key: 'type',
                    value: 'tirex'
                });

                var model = Model.data()['penguin_block'];
                var expected = [{id: 5, string: {type: 'tirex'}}];

                expect(model).toEqual(expected);
            });

            it(' Добавить 3 элементов группы  ', function() {
                Model.clear();
                Model.set({
                    block: 'penguin_block',
                    id: 2,
                    type: 'string',
                    key: 'type',
                    value: 'penguin'
                });
                Model.set({
                    block: 'penguin_block',
                    id: 8,
                    type: 'string',
                    key: 'type',
                    value: 'tirex'
                });
                Model.set({
                    block: 'penguin_block',
                    id: 13,
                    type: 'string',
                    key: 'type',
                    value: 'Чайка'
                });

                var model = Model.data()['penguin_block'];
                var expected = [
                    {id: 2, string: {type: 'penguin'}},
                    {id: 8, string: {type: 'tirex'}},
                    {id: 13, string: {type: 'Чайка'}}
                ];

                expect(model).toEqual(expected);
            });

        });

    });
});
