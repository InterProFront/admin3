var groupitem = (function () {

    //var $this;
    var _widget_types = {
        add: {
            button: '.add-flat-item'
        },
        remove: {
            button: '.remove-flat-item'
        },
        wrap: {
            form: '.groupflat-widget.group-item-wrap'
        },
        item: {
            row: '.box'
        }
    };

    var Constr = function (options) {
        if (options === undefined) {
            return {error: true, msg: 'Невозможно создать виджет'};
        } else {
            var $this = this;

            this.elem        = options.elem;
            this.pos         = options.position;
            this.fieldName   = $(this.elem).data('name');
            this.type        = $(this.elem).data('type');
            this.blockName   = $(this.elem).data('block');
            this.id          = $(this.elem).data('id');

            $(this.elem).find(_widget_types.add.button).on('click',function(){
               // add
                obj = {
                    blockname: $this.blockName,
                    superior: $(this).data('parent')
                };
                eventManager.call('addBoxItem', obj, $this.pos)

            });
            $(this.elem).on('click',_widget_types.remove.button,function( event ){
                var res = confirm('Удалить элемент?');
                if(res){
                    obj = {
                        block: $(event.target).data('block'),
                        id   : $(event.target).data('id')
                    };
                    eventManager.call('removeWidgets', $(event.target).closest('.box') );

                    $(event.target).closest('.box').remove();
                    eventManager.call('removeItem', obj);
                }
            });

            this.add = function( data ){
                $(this.elem).find(_widget_types.wrap.form).prepend( $(data) );

                row = $(this.elem).find(_widget_types.wrap.form+' '+_widget_types.item.row+':first-child');
                eventManager.call('initGroupItem', row);
            };
        }
    };


    return Constr;

})();
