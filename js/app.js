$(document).ready(function(){

    Api.init();
    View.init();
    Status.init();


    // TODO: Вынести в меню видежт

    var expPathname = location.pathname.split('/');
    $('.sidebar-menu a').each(function(){
        currentPath = '/'+expPathname[1]+'/'+expPathname[2]; // /adm/<route>
        if( $(this).attr('href') == currentPath ){
            $(this).closest('li').addClass('active');
        }
    });

});
