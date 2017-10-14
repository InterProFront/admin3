
var table = (function () {
    var $this;
    var _widget_types = {
        add: {
            input: '.form-control.add-item',
            button: '.add-group-item'
        },
        remove: {
            button: '.group-remove-item'
        },
        sorter: {
            input: '.form-control.group-sorter'
        },
        show: {
            input: '.form-control.group-show'
        }
    };
    function  addItem( parent ){
        new_name = $(_widget_types.add.input);

        if( new_name.val() != '' ){
            obj = {
                blockname: new_name.data('block'),
                fieldname: new_name.data('name'),
                value    : new_name.val(),
                superior : parent
            };
            eventManager.call('addItem', obj, $this.pos);

            //$this.add( '<tr role="row" class="odd"><td class="sorting_1"><a href="#" class="">'+new_name.val()+'</a></td><td>10.05.16</td><td><select class="form-control"><option>Не опубликовано</option><option>Опубликовано</option></select></td><td>1</td><td><button type="button" class="btn btn-block btn-primary">Удалить</button></td></tr>');
            new_name.val('');
        }else{
            new_name.closest('.col-xs-5').addClass('has-error');
            eventManager.call('addError');
        }
    }

    var Constr = function (options) {
        if (options === undefined) {
            return {error: true, msg: 'Невозможно создать виджет'};
        } else {
            $this = this;

            this.elem        = options.elem;
            this.pos         = options.position;
            this.fieldName   = $(this.elem).data('name');
            this.type        = $(this.elem).data('type');
            this.blockName   = $(this.elem).data('block');
            this.id          = $(this.elem).data('id');



            this.tableObject = $(this.elem).DataTable({
                "paging": true,
                "lengthChange": false,
                "searching": false,
                "ordering": true,
                "info": true,
                "autoWidth": false,
                "language": {
                    "info": "Показаны страницы с _PAGE_ по _PAGES_",
                    "infoEmpty" : "Нет записей",
                    "zeroRecords": "Записей нет",
                    "paginate": {
                        "previous": "Следующая",
                        "next"    : "Предыдущая"
                    }
                }
            });

            this.add = function( data ){
                this.tableObject.row.add( $(data)[0] ).draw( false );
            };

            this.get = function ( item, widget ) {
                return this.getFields(item, widget);
            };

            this.getFields = function ( item, widget ) {
                tmp = $(this.tableObject.row(item ).node()).find(widget);
                console.log(tmp);
                return obj = {
                    block: tmp.data('block'),
                    id   : tmp.data('id'),
                    key  : tmp.data('name'),
                    value: tmp.val()
                };
            };


            this.set = function (value) {
            };

            //Обновление модели для каждой строки
            $(this.elem).on('change', _widget_types.sorter.input ,function(event){
                eventManager.call('updateGroupWidget', $this.pos, $this.tableObject.row($(event.target).closest('tr')).index()  , _widget_types.sorter.input);
            });
            $(this.elem).on('change', _widget_types.show.input ,function(event){
                eventManager.call('updateGroupWidget', $this.pos, $this.tableObject.row($(event.target).closest('tr')).index()  , _widget_types.show.input);
            });

            // Добавление нового элемента
            $(_widget_types.add.button).on('click',function(){
                parent_id = $(_widget_types.add.button).data('parent');

                addItem( parent_id );
            });
            $(_widget_types.add.input).on('keydown',function(e){
                parent_id = $(_widget_types.add.button).data('parent');
                $(_widget_types.add.input).closest('.col-xs-5').removeClass('has-error');
                if(e.keyCode == 13){
                    addItem( parent_id );
                }
            });

            // Удаление элемента
            $(this.elem).on('click', _widget_types.remove.button, function(event){
                var res = confirm('Удалить элемент?');
                if(res){
                    obj = {
                        block: $(event.target).data('block'),
                        id   : $(event.target).data('id')
                    };
                    row = $this.tableObject.row( $(event.target).closest('tr')).index() ;
                    $this.tableObject.row(row).remove().draw();

                    eventManager.call('removeItem', obj);
                }
            });


        }
    };


    return Constr;

})();