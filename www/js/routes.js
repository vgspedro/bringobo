

/*============================================================================
EVENTOS DO MENU DE BAIXO (HOME,HOT,MATCH) CARREGA BLOCO HTML PARA DIV #page
============================================================================*/

function menuBottom(v){
	if ($('.'+v).hasClass('w3-bottombar')){}
	else{
		$('.w3-overlay').show()
	    $.ajax({
    		url: v+".html",
    		success:function(html){
    			$('.home, .hot, .match').removeClass('w3-bottombar w3-border-white')
	    		$('#page').html(html).addClass('w3-hide')
    		},
    		error:function(){}
    	})
    	.done(function() {
			setLanguage()
			v=='hot' ? showDivs() : false
			setTimeout(function(){
				$('.'+v).addClass('w3-bottombar w3-border-white')
                $("html, body").animate({scrollTop: 0}, 500)
                $('#page').removeClass('w3-hide')
			}, 500)
    	})
	}
}


/*==============================
MENU TOP ACTIONS ===============
================================*/

function menuTop(link){
  switch(link){
    case 'search': 
      $('#modal-search').modal()      
    break
    case 'messages': alert('goto page messages.html')
    break
    case 'menu': $('#modal-menu').modal()
    break
  }
}

/*==============================
MENU MAIN ACTIONS ==============
================================*/

function menuMain(link){
  switch(link){
  	case 'settings':
    	menuMainLoadPages(link)
    break
  	  	case 'profile':

    	menuMainLoadPages(link)
        getUserProfile()

    break
  	  	case 'bank':
    	menuMainLoadPages(link)
    break
  	  	case 'messages':
    	menuMainLoadPages(link)
    break
  	case 'reviews':
    	menuMainLoadPages(link)
    break
    case 'terms_conditions':
    	getTermsConditions()
    break

    case 'search_request':
    	menuMainLoadPages(link)
    break

    case 'search_journey':
    	menuMainLoadPages(link)
    break

    case 'exit':
    	navigator.app.exitApp()
    break
    case 'logout':
    	localStorage.clear()
  		navigator.app.exitApp()
    break
  }
}

function menuMainLoadPages(v){
	$('.w3-overlay').show()
	$('#modal-menu, #modal-search').modal('hide')
	$.ajax({
    	url: v+".html",
    	success:function(html){
	    	$('#menu-main-page').html(html)
    	},
    	error:function(){}
    })
    .done(function(){
		setLanguage()
		setTimeout(function(){
			$('.w3-overlay').hide()
			$('#menu-main-page').show()
		}, 100)
    })
}
