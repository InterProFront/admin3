var Api = (function () {
    //переменные  приватные
    var _config = {
        save:{
            type: 'POST',
            url :  '/adm/save'
        },
        newRow: {
            type: 'POST',
            url : '/adm/newItemRow'
        },
        newBox: {
            type: 'POST',
            url : '/adm/newItemBox'
        },
        remove: {
            type: 'POST',
            url : '/adm/removeItem'
        },
        image: {
            type: 'POST',
            url: '/adm/image/upload',
            pD :  false,
            cT :  false
        },
        file: {
            type: 'POST',
            url: '/adm/file/upload',
            pD :  false,
            cT :  false
        }
    };
    var tokenClass = 'meta[name="csrf-token"]';
    function progress(e){

        if(e.lengthComputable){
            var max = e.total;
            var current = e.loaded;

            var Percentage = (current * 100)/max;
            console.log(Percentage);


            if(Percentage >= 100)
            {
                // process completed
            }
        }
    }
    return {
        init: function () {

            this.token  = $(tokenClass).attr('content');

            $.ajaxSetup({
                headers: { 'X-CSRF-TOKEN': this.token }
            });
        },
        save: function( data ){
            var deferred = $.ajax({
                type: _config.save.type,
                url:  _config.save.url,
                data: data
            });
            deferred.success(function(data){
                if( !data.error ){
                    eventManager.call('saveSuccess');
                }else{
                    eventManager.call('saveError', data.message)
                }
            });
            deferred.fail(function(){
                eventManager.call('saveFail')
            });
        },
        new: function( data, pos ){
            var deferred = $.ajax({
                type: _config.newRow.type,
                url:  _config.newRow.url,
                data: data
            });
            deferred.success(function(data){
                if( !data.error ){
                    eventManager.call('newSuccess',data.view, pos );
                }else{
                    eventManager.call('saveError', data.message)
                }
            });
            deferred.fail(function(){
                eventManager.call('saveFail')
            });
        },
        newBox: function( data, pos ){
            var deferred = $.ajax({
                type: _config.newBox.type,
                url:  _config.newBox.url,
                data: data
            });
            deferred.success(function(data){
                if( !data.error ){
                    eventManager.call('newSuccess',data.view, pos );
                }else{
                    eventManager.call('newError', data.message)
                }
            });
            deferred.fail(function(){
                eventManager.call('saveFail')
            });
        },
        removeItem: function( data ){
            var deferred = $.ajax({
                type: _config.remove.type,
                url:  _config.remove.url,
                data: data
            });
            deferred.success(function(data){
                if( !data.error ){
                    eventManager.call('removeSuccess', data );
                }else{
                    eventManager.call('removeError', data.message)
                }
            });
            deferred.fail(function(){
                eventManager.call('saveFail')
            });
        },
        sendImage: function( formData, pos ){
            var deferred = $.ajax({
                type: _config.image.type,
                url: _config.image.url,
                processData: _config.image.pD,
                contentType: _config.image.cT,
                data: formData
                //xhr: function(){
                //    var myXhr = $.ajaxSettings.xhr();
                //    if(myXhr.upload){
                //        myXhr.upload.addEventListener('progress',progress, false);
                //    }
                //    eventManager.call('returnXHR', myXhr);
                //}
            });
            deferred.success(function(data){
                if( !data.error ){
                    eventManager.call('fileSuccess', data.preview, pos );
                }else{
                    eventManager.call('fileError', data.message)
                }
            });
            deferred.fail(function(){
                eventManager.call('saveFail');
            });
        },

        sendFile: function( formData, pos ){
            var deferred = $.ajax({
                type: _config.file.type,
                url: _config.file.url,
                processData: _config.file.pD,
                contentType: _config.file.cT,
                data: formData
                //xhr: function(){
                //    var myXhr = $.ajaxSettings.xhr();
                //    if(myXhr.upload){
                //        myXhr.upload.addEventListener('progress',progress, false);
                //    }
                //    eventManager.call('returnXHR', myXhr);
                //}
            });
            deferred.success(function(data){
                if( !data.error ){
                    eventManager.call('fileSuccess', data.preview, pos );
                }else{
                    eventManager.call('fileError', data.message)
                }
            });
            deferred.fail(function(data){
                if(data.status == 413){
                    eventManager.call('fileError','Слишком большой файл.');
                }else{
                    eventManager.call('sendFail');
                }
            });
        }

    }


})();