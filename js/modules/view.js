var widgets_class = {
    string  : {
        class : '.form-control.string',
        object: string
    },
    int: {
        class : '.form-control.int',
        object: int
    },
    slug: {
        class: '.form-control.slug',
        object: slug
    },
    float: {
        class : '.form-control.float',
        object: float
    },
    bool: {
        class: '.minimal.bool',
        object: bool
    },
    text: {
        class: '.form-control.text',
        object: text
    },
    table: {
        class: '.table-widget-selector',
        object: table
    },
    groupitems: {
        class: '.group-item-widget',
        object: groupitem
    },
    defaultSelect: {
        class: '.form-control.select',
        object: defaultSelect
    },
    customSelect: {
        class: '.form-control.custom-select',
        object: customSelect
    },
    image: {
        class: '.form-control.file',
        object: image
    },
    texteditor: {
        class: '.form-control.text-editor',
        object: texteditor
    }
};

var View = (function () {
    //переменные  приватные
    var widgets       = [];
    var $this;
    return {
        init: function () {
            $this = this;
            var tmp ;
            $.each(widgets_class, function (key, obj) {
                $(obj.class).each(function () {
                    if(key != 'defaultSelect'){
                        tmp = new obj.object({elem: this, position: widgets.length});

                        widgets.push(tmp);
                        if( !(key == 'table' || key == 'groupitems') ){
                            Model.set(tmp.get());
                        }
                    }
                });
            });

            $('.global-save').on('click',function(){

                eventManager.call('save');

            });
        },
        initItem: function( elem ){
            $.each(widgets_class, function (key, obj) {
                elem.find(obj.class).each(function(){
                    tmp = new obj.object({elem: this, position: widgets.length});
                    widgets.push(tmp);
                    Model.set( tmp.get() );
                    console.log('test');
                });
            });
        },
        get : function (pos) {
            Model.set( widgets[ pos ].get() );
        },
        getItem: function (pos, item, widget){
            console.log(item, widget);
            Model.set( widgets[ pos ].get(item, widget) );
        },
        addItem: function(  data, pos   ){
            widgets[ pos ].add( data );
        },
        removeWidget: function( elem ){
            var removed = [];
            $.each(widgets_class, function (key, obj) {

                elem.find(obj.class).each(function(){
                    var obj = {
                        blockName : $(this).data('block'),
                        fieldName : $(this).data('name'),
                        id        : $(this).data('id'),
                        type      : $(this).data('type')
                    };
                    $.each(widgets, function(key, item){
                        if(typeof(item) != 'undefined'){
                            if( obj.blockName == item.blockName &&
                                obj.type      == item.type      &&
                                obj.id        == item.id        &&
                                obj.fieldName == item.fieldName){

                                removed.push(item.pos);
                                removeItem = item;
                                widgets.splice(key, 1);
                                removeItem.destroy();
                                delete removeItem;
                            }
                        }
                    });
                });

            });
            /*$.each(removed, function(key, obj){
                item = widgets[obj];
                widgets.splice(obj, 1);
                item.destroy();
                delete item;
            });*/
            $.each(widgets, function(key, obj){
                obj.pos = key;
            });

        },

        widgets: widgets
    }


})();