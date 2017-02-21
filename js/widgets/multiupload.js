var multiupload = (function () {
    //Переменные по умолчанию, и внутренние переменные для работы
    var  update_flag = false;

    var i = 0;
    var max = 0;
    var curr = {};

    var Constr = function (options) {

        if (options === undefined) {

            return {error: true, msg: 'Невозможно создать виджет'};

        } else {

            var $this = this;

            this.elem      = options.elem;
            this.wrap = $(this.elem).closest('.form-group').find('.file-caption-main');
            this.pos       = options.position;

            this.fieldName = $(this.elem).data('name');
            this.type      = $(this.elem).data('type');
            this.blockName = $(this.elem).data('block');
            this.id        = $(this.elem).data('id');


            this.load = function () {
                var obj = new FormData();
                obj.append('entity_name',   this.blockName);
                obj.append('entity_id',     this.id);
                obj.append('image_name',    this.fieldName);
                obj.append('image_file',    this.getField());
                return obj;
            };


            this.get = function () {
                obj = {
                    block: this.blockName,
                    id   : this.id,
                    key  : this.fieldName,
                    type : this.type,
                    value: this.getFieldAlt()
                };
                return obj;
            };

            this.wrap.on('change','.form-control.alt-text',function(){
                eventManager.call('updateWidget', $this.pos);
            });
            this.getFieldAlt = function(){
                return {
                    update_flag: update_flag,
                    alt: this.wrap.find('.form-control.alt-text').val()
                };
            };
            this.addPreview =  function( data ) {

                var _template = '<div class="file-preview-frame">'+
                    '<div class="kv-file-content">'+
                    '<img src="'+data.image+'" class="kv-preview-data file-preview-image" title="2.jpg" alt="2.jpg" style="width:auto;height:160px;">'+
                    '</div>'+
                    '<div class="file-thumbnail-footer">'+
                    '<div class="file-footer-caption" title="2.jpg">2.jpg <br><samp>(425.24 KB)</samp></div>'+
                    '<div class="file-actions">'+
                    '<input type="text" class="form-control alt-text"' +
                    '                   data-block="'+this.blockName+'"' +
                    '                   data-type="images"' +
                    '                   data-id="'+this.id+'"' +
                    '                   data-name="alt">'+
                    '<button class="btn btn-primary btn-block remove-image"'+
                            'data-block="'+this.blockName+'"'+
                            'data-name="'+this.fieldName+'"'+
                            'data-id="'+data.id+'">Удалить</button>'+
                    '<div class="clearfix"></div>'+
                    '</div>'+
                    '</div>'+
                    '</div>';

                this.wrap.append(_template);
                update_flag = true;
                eventManager.call('updateWidget', $this.pos);
            };


            this.getField = function () {
                return $(this.elem)[0].files;
            };

            $(this.wrap).on('click','.remove-image',function(event){
                obj = {
                    block: $(event.target).data('block'),
                    id   : $(event.target).data('id')
                };
                $(event.target).closest('.file-preview-frame').remove() ;
                eventManager.call('removeItem', obj);
            });
            $(this.elem).on('change', function () {
                i = 0;
                Send(i);
            });

            function Send( i ){
                var data = $this.getField();
                max = data.length;
                var obj = new FormData();
                curr = data[i];
                obj.append("image_file", curr);
                obj.append("entity_name", $this.blockName);
                obj.append("image_name", $this.fieldName);
                obj.append("entity_id", $this.id);

                var deferred = $.ajax({
                    data       : obj,
                    type       : "POST",
                    url        : "/adm/newImage",
                    cache      : false,
                    contentType: false,
                    processData: false
                });
                deferred.success(function(data){
                    if( !data.error ){
                        $this.addPreview(data);
                        if(i < max){
                            i++;
                            Send(i);
                        }
                    }else{

                    }
                });
                deferred.fail(function(){

                });
            }
            this.destroy = function(){
                eventManager.call('removeData', this.get() );
            }
        }
    };


    return Constr;

})();
