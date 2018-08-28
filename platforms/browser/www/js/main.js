json=''

callLanguages()

/*===============================
PEDIDO LOGIN ====================
================================*/
url='https://www.bringobo.com/app_api/?'

$('#form-login').on('submit',function(e){
  $('._required').addClass('w3-hide')
	e.preventDefault()
	$('.w3-overlay').show()
	setTimeout(function(){
		$.ajax({ 
      url:url+$('#form-login').serialize(),
    	type:'GET',
    	cache:false,
      dataType:'json',
  		success: function(data){
    		$('.w3-overlay').hide()
        console.log(data)
      	if(data.status=='success'){
    			$('#info-client').modal()
          $('.info-client-header').html('<span class="w3-text-green"><i class="fa fa-check"></i> '+json.success+'</span>')
          $('.info-client-txt').html(data.message+'<br>'+json.wait)
          localStorage.setItem("language", data.data.idlang)
          localStorage.setItem("autenticado",data.data.autenticado)
          localStorage.setItem("idcliente",data.data.idcliente)
          localStorage.setItem("moeda",data.data.idcurrency)
          localStorage.setItem("username",data.data.username)
          localStorage.setItem("nome",data.data.nome)
          localStorage.setItem("activo",data.data.activo)
          localStorage.setItem("email",data.data.email)
          localStorage.setItem("category",JSON.stringify(data.category))
          localStorage.setItem("allcountries",JSON.stringify(data.allcountries))
          localStorage.setItem("comission_1",JSON.stringify(data.comission_1))
          localStorage.setItem("comission_2",JSON.stringify(data.comission_2))
          localStorage.setItem("taxes",JSON.stringify(data.taxes))
          setTimeout(function(){ location.href = "index.html","blank" }, 1500)
        }
      	else if(data.status=='empty'){
          for(d=0;d<data.data.length;d++)
            $('.'+data.data[d]).removeClass('w3-hide').text(json.required)
    		}
        else if(data.status=='error'){
            $('.password-l').removeClass('w3-hide').text(data.message)
        }
  		},
    	error: function(data){
	   		$('.w3-overlay').hide()
      	$('#info-client').modal()
       	$('.info-client-header').html('<span class="w3-text-red"><i class="fa fa-exclamation-triangle"></i> '+json.check+'</span>')
       	$('.info-client-txt').html(json.no_wifi)
    	}
  	})
	},750)
})

/*===============================
NEW REGISTER  ====================
================================*/

$('#form-register').on('submit',function(e){
  e.preventDefault()
  $('._required').addClass('w3-hide')
  if ( $('#form-register ._confirm_password').val() != $('#form-register ._password').val()){

          $('#info-client').modal()
          $('.info-client-header').html('<span class="w3-text-amber"><i class="fa fa-exclamation-triangle"></i> '+json.check+'</span>')
          $('.info-client-txt').html(json.no_password_match)
  }

  else{

  $('.w3-overlay').show()
  setTimeout(function(){ 
    $.ajax({ 
      url:url+$('#form-register').serialize(),
      type:'GET',
      cache:false,
      dataType:'json',
      success: function(data){
        $('.w3-overlay').hide()
        if(data.status=='success'){
          $('#info-client').modal()
          $('.info-client-header').html('<span class="w3-text-green"><i class="fa fa-check"></i>'+json.success+'</span>')
          $('.info-client-txt').html(json.check_email)
          $('#form-register').trigger('reset')
          $('._back_to_login').trigger('click')
        }
        else{

          for(d=0;d<data.data.length;d++)
            $('.'+data.data[d]).removeClass('w3-hide')
        }
      },
      error: function(data){
        $('.w3-overlay').hide()
        $('#info-client').modal()
        $('.info-client-header').html('<span class="w3-text-red"><i class="fa fa-exclamation-triangle"></i> '+json.check+'</span>')
        $('.info-client-txt').html(json.no_wifi)
      }
    })
  },750)
}
})


/*===============================
PASSWORD FORGET =================
================================*/

$('#form-password-forget').on('submit',function(e){
  $('._required').addClass('w3-hide')
  e.preventDefault()
  $('.w3-overlay').show()
  setTimeout(function(){ 
    $.ajax({ 
      url:url+$('#form-password-forget').serialize(),
      type:'GET',
      cache:false,
      dataType:'json',
      success: function(data){
        console.log(data)
        $('.w3-overlay').hide()
        if(data.status=='success'){
          $('#password-forget').modal('hide')
          $('#info-client').modal()
          $('.info-client-header').html('<span class="w3-text-green"><i class="fa fa-check"></i>'+json.success+'</span>')
          $('.info-client-txt').html(json.check_email)
        }
        else if (data.status=='empty'){
          for(d=0;d<data.data.length;d++)
            $('.'+data.data[d]).removeClass('w3-hide').text(json.required)
        }
        else if (data.status=='fail'){
          $('.email-r-p').removeClass('w3-hide').text(data.message)
        }
      },
      error: function(data){
        $('.w3-overlay').hide()
        $('#info-client').modal()
        $('.info-client-header').html('<span class="w3-text-red"><i class="fa fa-exclamation-triangle"></i> '+json.check+'</span>')
        $('.info-client-txt').html(json.no_wifi)
      }
    })
  },750)
})


/*===============================
GET REQUESTS OR JOURNES =========
================================*/

function getRequestJourney(request){
  $('#modal-search').modal('hide')
  alert('get data from server --> go to page -->  search-'+request+'.html' )
}

/*===============================
LANGUAGES FILES CLIENT ==========
================================*/

  function callLanguages(){

    if (localStorage.getItem("language"))

      localStorage.getItem("language") == 2 ? language_file = 'json/pt.json' : language_file = 'json/en.json'

    else 

      language_file = 'json/en.json'

      $.getJSON(language_file, function(json){
    
      localStorage.setItem("json", JSON.stringify(json))
    
      setLanguage()
    
    })
}


function setLanguage(){

  json = JSON.parse(localStorage.getItem("json"))

  $('._close').html(json.close)
  $('._register').html(json.register)
  $('._name').attr('placeholder',json.name)
  $('._confirm_password').attr('placeholder',json.confirm_password)
  $('._password').attr('placeholder',json.password)
  $('._email').attr('placeholder',json.email)
  $('._from').attr('placeholder',json.from)
  $('._to').attr('placeholder',json.to)
  $('._date').attr('placeholder',json.date)
  $('._stop').attr('placeholder',json.stop)
  $('._width').attr('placeholder',json.width)
  $('._length').attr('placeholder',json.length)
  $('._height').attr('placeholder',json.height)
  $('._volume').attr('placeholder',json.volume)
  $('._weight').attr('placeholder',json.weight)
  $('._country').attr('placeholder',json.country)
  $('._city').attr('placeholder',json.city)
  $('._country_txt').text('placeholder',json.country)
  $('._city_txt').text('placeholder',json.city)
  $('._anytime').attr('placeholder',json.anytime)
  $('._zip_code').attr('placeholder',json.zip_code)
  $('._price_on_store_at').attr('placeholder',json.price_on_store)
  $('._store_name').attr('placeholder',json.store_name)
  $('._address').attr('placeholder',json.address)
  $('._description_a').attr('placeholder',json.description)
  $('._paste_url').html(json.paste_url)
  $('._where_to_deliver').html(json.where_to_deliver)
  $('._upload').html(json.upload)
  $('._link').html(json.link)
  $('._image').html(json.image)
  $('._search_for_messages_or_users').attr('placeholder',json.search_for_messages_or_users)
  $('._please_insert_email').html(json.please_insert_email)
  $('._back_to_login').html(json.back_to_login)
  $('._aggreement').html(json.aggreement)
  $('._username').html(json.username)
  $('._check').html(json.check)
  $('._success').html(json.success)
  $('._submit').html(json.submit)
  $('._signin').html(json.signin)
  $('._doesnt_have_an_account').html(json.doesnt_have_an_account)
  $('._forgot_your_password').html(json.forgot_your_password)
  $('._check_email').html(json.check_email)
  $('._no_wifi').html(json.no_wifi)
  $('._wait').html(json.wait)
  $('._check_try_again').html(json.check_try_again)
  $('._email_pass_wrong').html(json.email_pass_wrong)
  $('._home').html(json.home)
  $('._match').html(json.match)
  $('._hot').html(json.hot)
  $('._settings').html(json.settings)
  $('._profile').html(json.profile)
  $('._bank').html(json.bank)
  $('._messages').html(json.messages)
  $('._reviews').html(json.reviews)
  $('._terms_conditions').html(json.terms_conditions)
  $('._exit').html(json.exit)
  $('._logout').html(json.logout)
  $('._search').html(json.search)
  $('._requests').html(json.requests)
  $('._journeys').html(json.journeys)
  $('._price_on_store').html(json.price_on_store)
  $('._departure').html(json.departure)
  $('._arrival').html(json.arrival)
  $('._its_a_match').html(json.its_a_match)
  $('._decline').html(json.decline)
  $('._pay_now').html(json.pay_now)
  $('._popular_articles').html(json.popular_articles)
  $('._see_all').html(json.see_all)
  $('._recomendation_by_travellers').html(json.recomendation_by_travellers)
  $('._top_travellers').html(json.top_travellers)
  $('._post').html(json.post)
  $('._request').html(json.request)
  $('._journey').html(json.journey)
  $('._reviews').html(json.reviews)
  $('._a').html(json.a)
  $('._product').html(json.product)
  $('._information').html(json.information)
  $('._charateristics').html(json.charateristics)
  $('._confirmation').html(json.confirmation)
  $('._country_to').html(json.country_to)
  $('._shop_in').html(json.shop_in)
  $('._stop_in').html(json.stop_in)
  $('._deal_in').html(json.deal_in)
  $('._city').html(json.city)
  $('._from').html(json.from)
  $('._return_date').html(json.return_date)
  $('._add_stop').html(json.add_stop)
  $('._delete_stop').html(json.delete_stop)
  $('._how_will_you_travel').html(json.how_will_you_travel)
  $('._where_do_you_go').html(json.where_do_you_go)
  $('._where_to_buy').html(json.where_to_buy)
  $('._how_much_space_you_can_share').html(json.how_much_space_you_can_share)
  $('._i_have_read_and_agree_to_the').html(json.i_have_read_and_agree_to_the)
  $('._account_balance').html(json.account_balance),
  $('._my').html(json.my),
  $('._my_f').html(json.my_f),
  $('._number').html(json.number)
  $('._next').html(json.next)
  $('._back').html(json.back)
  $('._upload_image_to').html(json.upload_image_to)
  $('._show_result').html(json.show_result)
  $('._required').html(json.required)
  $('._payment').html(json.payment)
  $('._pay_later').html(json.pay_later)
}


/*====================================================
MESSAGES ACTIONS MNU TOP LINK MESSAGES ===============
======================================================*/

function getMessages() {
  newmessages = 0 
  $.ajax({
      url:url+'rquest=getJourneyAlerts&id='+localStorage.getItem("idcliente"),
      type:'GET',
      cache:false,
      dataType:'json',
      success: function(data){
        if(data.status == 'success'){
          newmessages = data.data[0].count_unread
          getMessages2()
        }
        else getMessages2()
      }
    })
  setTimeout(getMessages, 5*60*1000) // get alertMessages every 5 minutes
}


function getMessages2(){
  $.ajax({
    url:url+'rquest=getRequestAlerts&id='+localStorage.getItem("idcliente"),
    type:'GET',
    cache:false,
    dataType:'json',
    success: function(data){
      if (data.status == 'success'){
        newmessages = parseInt(newmessages) + parseInt(data.data[0].count_unread)
        newmessages !=0 ? $('.mybadge').removeClass('w3-hide').text(newmessages) : $('.mybadge').addClass('w3-hide').text('')
      }
      else 
        newmessages !=0 ? $('.mybadge').removeClass('w3-hide').text(newmessages) : $('.mybadge').addClass('w3-hide').text('')
    }
  })
}

/*==============================
MESSAGES COUNTRIES REQUESTS ====
================================*/

function getCountryRequestJourney(tipo,local,count){

  if ($('.'+count).text() == 0){
    addNewJorneyOrRequest() 
    setTimeout(function(){ 
      if(tipo == 'Journey'){
        $('.animate, .minus-btn').addClass('w3-hide')
        $('#journey_form').show()
      }
      else{
        $('.animate, .minus-btn').addClass('w3-hide')
        $('#request_form').show()
      }
    }, 750)
  }

  else {

  if(tipo == 'Journey' ){
   url_add = url+'rquest=get'+tipo+'s&country='+count.replace('j_','')
  $('.w3-overlay').show()
  insert=''
  $.ajax({
    url: url_add,
    type:'GET',
    cache:false,
    dataType:'json',
    success: function(data){
        $('.w3-overlay').hide()
        console.log(data)
        if (data.status == 'success' && data.total_record > 0){
          insert = TemplateShowJourneys(data.data,data.rating) 
        $.ajax({
          url: tipo+"_country.html",
            success:function(html){
              $('#menu-main-page').html(html)
              $('.searched-country').html(local)
              $('.container-journey').html(insert)
              
              for(f=0;f<data.boxes.length;f++){
                $('.journey-box-'+data.boxes[f][0].id).attr('src','img/'+data.boxes[f][0].box)
                $('.journey-letter-'+data.boxes[f][0].id).text(data.boxes[f][0].letter.toUpperCase())
              }

              for(j=0;j<data.rating.length;j++)
                 $('.user-rating-'+data.rating[j].idcliente_received).text(parseFloat(data.rating[j].rating).toFixed(1))

              for(y=0;y<data.level.length;y++){
                $('.user-level-'+data.level[y].user_id).text(data.level[y].level)
                $('.user-level-title-'+data.level[y].user_id).text(data.level[y].level_title)
                $('.user-journeys-'+data.level[y].user_id).text(data.level[y].journeys)
               }

            }
        })
        .done(function(){
          setLanguage()
          setTimeout(function(){
            $('.w3-overlay').hide()
            $('#menu-main-page').show()
          }, 100)
        })
      }
    },
    error: function(data){
        $('.w3-overlay').hide()
        $('#info-client').modal()
        $('.info-client-header').html('<span class="w3-text-red"><i class="fa fa-exclamation-triangle"></i> '+json.check+'</span>')
        $('.info-client-txt').html(json.no_wifi)
      }
    })
  }


  else if(tipo == 'Request'){
    url_add = url+'rquest=get'+tipo+'s&country='+local 
    $('.w3-overlay').show()
    insert=''
    $.ajax({
      url: url_add,
      type:'GET',
      cache:false,
      dataType:'json',
      success: function(data){
      console.log(data)
      if (data.status == 'success' && data.total_record > 0){
        insert = TemplateShowRequests(data.data,data.rating) 
        $.ajax({
          url: tipo+"_country.html",
            success:function(html){
              $('#menu-main-page').html(html)
              $('.searched-country').html(local)
              $('.container-request').html(insert)

              for(j=0;j<data.rating.length;j++)
                 $('.user-rating-'+data.rating[j].idcliente_received).text(parseFloat(data.rating[j].rating).toFixed(1))

              for(y=0;y<data.level.length;y++){
                $('.user-level-'+data.level[y].user_id).text(data.level[y].level)
                $('.user-level-title-'+data.level[y].user_id).text(data.level[y].level_title)
                $('.user-journeys-'+data.level[y].user_id).text(data.level[y].journeys)
               }
            }
        })
        .done(function(){
          setLanguage()
          setTimeout(function(){
            $('.w3-overlay').hide()
            $('#menu-main-page').show()
          }, 100)
        })
      }
    },
    error: function(data){
        $('.w3-overlay').hide()
        $('#info-client').modal()
        $('.info-client-header').html('<span class="w3-text-red"><i class="fa fa-exclamation-triangle"></i> '+json.check+'</span>')
        $('.info-client-txt').html(json.no_wifi)
      }
    })
  }
  }  
}


function TemplateShowRequests(a){
for(i=0;i<a.length;i++){
  state = requestOrderStates(a[i].produto_estado)
  a[i].produto_buy_shop =='Not Defined' || !a[i].produto_buy_shop ?  a[i].produto_buy_shop = json.anywhere : a[i].produto_buy_shop
  a[i].produto_buy_city  =='Not Defined' || !a[i].produto_buy_city ? a[i].produto_buy_city = json.anywhere : a[i].produto_buy_city
  a[i].produto_buy_country  =='Not Defined' || !a[i].produto_buy_country ? a[i].produto_buy_country = json.anywhere : a[i].produto_buy_country
  a[i].produto_buy_zip_code == 'Not Defined'  ? a[i].produto_buy_zip_code = '' : a[i].produto_buy_zip_code
  !a[i].produto_delivery_date ? a[i].produto_delivery_date = json.anytime : a[i].produto_delivery_date
  a[i].produto_link ? link = '<div class="w3-col s12 w3-text-indigo w3-small w3-center bold"><a href="#" onclick="window.open(\''+a[i].produto_link+'\', \'_system\')">'+json.product_link+'</a></div>': link=''
  !a[i].user_bandeira ? a[i].user_bandeira = 'img/noimage.png' : a[i].user_bandeira = 'https://www.bringobo.com/admin/images/flags/'+a[i].user_bandeira.toUpperCase()+'.png'
  
  insert +=
'<div class="w3-animate-zoom w3-card-4 w3-margin-bottom w3-container-8">'+''
    +'<div class="w3-row w3-text-dark-gray">'+''

        +'<div class="w3-col s5">'+''
            +'<div class="w3-center w3-small">'+''
                +'<img class="requester-pic-2 user-foto" src="https://www.bringobo.com/admin/uploads/users/'+a[i].user_imagem+'">'+''
                +'<div class="inline w3-amber w3-text-white pd-5-bdr-8">'+''
                  +'<i class="fa fa-star"></i><span class="user-rating-'+a[i].user_id+'">0</span>'+''
                +'</div>'+''
                +'<div class="w3-padding-8-8">'+''
                    +'<span class="bold profile-name">'+a[i].user_nome+'</span>'+''
                    +'<span class="bold profile-level w3-tiny"></span><br>'+''
                +'</div>'+''
            +'</div>'+''
        +'</div>'+''

        +'<div class="w3-col w3-center w3-section s2 details-r-1-'+a[i].produto_idcall+'">'+''
          +'<div class="w3-padding w3-border-bottom" style="border-left: 1px solid #ccc">'+''
            +'<img src="img/measure-box.png" style="margin:0 auto" class="img-responsive">'+''
            +'<div class="">'+a[i].produto_volume+'<br>cm³</div>'+''
          +'</div>'+''
          +'<div class="w3-padding" style="border-left: 1px solid #ccc">'+''
            +'<img src="img/measure-scale.png" style="margin:0 auto" class="img-responsive">'+''
            +'<div class="">'+a[i].produto_weight+'<br>g</div>'+''
          +'</div>'+''
        +'</div>'+''

        +'<div class="w3-col w3-center w3-section w3-small s5 details-r-1-'+a[i].produto_idcall+'">'+''
          +'<img src="https://www.bringobo.com/admin/uploads/produtos/'+a[i].produto_imagem+'" style="max-height:100px;margin:0 auto"class="img-responsive"><span class="bold">'+a[i].produto_nome+'</span>'+''
        +'</div>'+''

/*hidden*/

        +'<div class="w3-col s6 w3-large w3-section w3-hide details-r-'+a[i].produto_idcall+'" style="padding-top:16px">'+''
            +'<div class="w3-center w3-col s4">'+''
                +'<span class="w3-badge user-badge w3-indigo w3-tinyxxx"><span class="user-journeys-'+a[i].user_id+'">0</span></span>'+''
                +'<div class="inline w3-light-gray w3-text-dark-gray pd-16-bdr-16">'+''
                    +'<i class="fa fa-plane"></i>'+''
                +'</div>'+''
            +'</div>'+''
            +'<div class="w3-center w3-col s4">'+''
                +'<span class="w3-badge user-badge w3-orange w3-text-white w3-tinyxxx"><span class="user-level-'+a[i].user_id+'">0</span></span>'+''
                +'<div class="inline w3-light-gray w3-text-dark-gray pd-16-bdr-16">'+''
                    +'<i class="fa fa-signal"></i>'+''
                +'</div>'+''
            +'</div>'+''
            +'<div class="w3-center w3-col s4">'+''
                +'<span class="w3-badge user-badge profile-flag w3-transparent" style="background-image: url('+a[i].user_bandeira+')"></span>'+''
                +'<div class="inline w3-light-gray w3-text-dark-gray pd-16-bdr-16">'+''
                    +'<i class="fa fa-globe"></i>'+''
                +'</div>'+''
            +'</div>'+''
            +'<div class="w3-center user-level-title-'+a[i].user_id+'"></div>'+''
        +'</div>'+''

/*end hidden*/

    +'</div>'+''

    +'<div class="w3-row" style="border-bottom:2px solid #EE6420">'+''
        +'<div class="w3-col s6">'+json.request+' '+json.number+'<br>'+''
            +'<span class="w3-xlarge menu-text">'+a[i].produto_call_number+'</span>'+''
        +'</div>'+''
        +'<div class="w3-col s3 view-r-'+a[i].produto_idcall+'">'+''
            +''+json.see_more+'<br><div class="w3-xlarge menu-text w3-center" onclick="showHideRequestDetails(\''+a[i].produto_idcall+'\')"><i class="fa fa-chevron-down"></i></div>'+''
        +'</div>'+state+''
    +'</div>'+''

/* start hidden*/

+'<div class="w3-hide details-r-'+a[i].produto_idcall+'">'+''


    +'<div class="w3-row w3-padding-8-8 w3-small">'+''
        +'<div class="bold">'+json.product.toUpperCase()+' '+json.information.toUpperCase()+'<br>'+''
        +'</div>'+''
        +'<div class="w3-col s12">'+''
          +'<div class="w3-col pd-2-w-auto">'+json.name+'</div>'+''
          +'<div class="w3-col pd-2-w-auto">:'+a[i].produto_nome+'</div>'+''
        +'</div>'+''
        +'<div class="w3-col s12">'+''
          +'<div class="w3-col pd-2-w-auto">'+json.price_on_store+'</div>'+''
          +'<div class="w3-col pd-2-w-auto">:'+a[i].produto_price_on_shop+'€</div>'+''
        +'</div>'+''
        +'<div class="w3-col s12">'+''
          +'<div class="w3-col pd-2-w-auto">'+json.category+'</div>'+''
          +'<div class="w3-col pd-2-w-auto">:'+a[i].produto_cat_nome+'</div>'+''
        +'</div>'+''
        +'<div class="w3-col s12">'+''
          +'<div class="w3-col pd-2-w-auto">'+json.description+'</div>'+''
          +'<div class="w3-col pd-2-w-auto">:'+a[i].produto_descricao+'</div>'+''
        +'</div>'+''
        +link+''
    +'</div>'+''

    +'<div class="w3-row w3-padding-8-8 w3-small">'+''
      +'<div class="bold">'+json.where_to_buy.toUpperCase()+'<br>'+''
      +'</div>'+''
      +'<div class="w3-col s12">'+''
        +'<div class="w3-col pd-2-w-auto">'+json.store_name+'</div>'+''
        +'<div class="w3-col pd-2-w-auto">:'+a[i].produto_buy_shop+'</div>'+''
      +'</div>'+''
      +'<div class="w3-col s12">'+''
        +'<div class="w3-col pd-2-w-auto">'+json.country+'</div>'+''
        +'<div class="w3-col pd-2-w-auto">:'+a[i].produto_buy_country+'</div>'+''
      +'</div>'+''
      +'<div class="w3-col s12">'+''
        +'<div class="w3-col pd-2-w-auto">'+json.city+'</div>'+''
        +'<div class="w3-col pd-2-w-auto">:'+a[i].produto_buy_city+'</div>'+''
      +'</div>'+''
    +'</div>'+''

    +'<div class="w3-row w3-padding-8-8 w3-small">'+''
      +'<div class="bold">'+json.where_to_deliver.toUpperCase()+'<br>'+''
      +'</div>'+''
      +'<div class="w3-col s12">'+''
        +'<div class="w3-col pd-2-w-auto">'+json.city+'</div>'+''
        +'<div class="w3-col pd-2-w-auto">:'+a[i].produto_delivery_city+'</div>'+''
      +'</div>'+''
      +'<div class="w3-col s12">'+''
        +'<div class="w3-col pd-2-w-auto">'+json.country+'</div>'+''
        +'<div class="w3-col pd-2-w-auto">:'+a[i].produto_delivery_country+'</div>'+''
      +'</div>'+''
      +'<div class="w3-col s12">'+''
        +'<div class="w3-col pd-2-w-auto">'+json.zip_code+'</div>'+''
        +'<div class="w3-col pd-2-w-auto">:'+a[i].produto_delivery_zipcode+'</div>'+''
      +'</div>'+''
      +'<div class="w3-col s12">'+''
        +'<div class="w3-col pd-2-w-auto">'+json.date+'</div>'+''
        +'<div class="w3-col pd-2-w-auto">:'+a[i].produto_delivery_date+'</div>'+''
      +'</div>'+''
    +'</div>'+''

    +'<div class="w3-row w3-padding-8-8 w3-small">'+''
      +'<div class="bold">'+json.charateristics.toUpperCase()+'<br>'+''
      +'</div>'+''
      +'<div class="w3-col s12">'+''
        +'<div class="w3-col pd-2-w-auto">'+json.width+'<span style="float:left"><img src="img/measure-horizontal.png" class="img-responsive img-r"></span></div>'+''
        +'<div class="w3-col pd-2-w-auto">:'+a[i].produto_width+'cm</div>'+''
      +'</div>'+''
      +'<div class="w3-col s12">'+''
        +'<div class="w3-col pd-2-w-auto">'+json.height+'<span style="float:left"><img src="img/measure-vertical.png" class="img-responsive img-r"></span></div>'+''
        +'<div class="w3-col pd-2-w-auto">:'+a[i].produto_height+'cm</div>'+''
      +'</div>'+''
      +'<div class="w3-col s12">'+''
        +'<div class="w3-col pd-2-w-auto">'+json.length+'<span style="float:left"><img src="img/icon_comprimento.png" class="img-responsive img-r"></span></div>'+''
        +'<div class="w3-col pd-2-w-auto">:'+a[i].produto_length+'cm</div>'+''
      +'</div>'+''
      +'<div class="w3-col s12">'+''
        +'<div class="w3-col pd-2-w-auto">'+json.volume+'<span style="float:left"><img src="img/measure-box.png" class="img-responsive img-r"></span></div>'+''
        +'<div class="w3-col pd-2-w-auto">:'+a[i].produto_volume+'cm³</div>'+''
      +'</div>'+''
      +'<div class="w3-col s12">'+''
        +'<div class="w3-col pd-2-w-auto">'+json.weight+'<span style="float:left"><img src="img/measure-scale.png" class="img-responsive img-r"></span></div>'+''
        +'<div class="w3-col pd-2-w-auto">:'+a[i].produto_weight+'g</div>'+''
      +'</div>'+''
    +'</div>'+''  

    +'<div class="w3-padding-8-8"><p class="w3-center">'+''
    +'<button class="btn btn-lg w3-text-white orangish hide-own-user" style="border-radius:46px" onclick="AcceptRequest(\''+a[i].produto_call_number+'\',\''+a[i].produto_idcall+'\',\''+localStorage.getItem('idcliente')+'\')">'+json.post_journey_match+'</button>'+''
    +'</p></div>'+''

  +'</div>'+''

/* end hidden*/

    +'<div class="w3-row w3-padding-8-8 w3-medium details-r-1-'+a[i].produto_idcall+'" style="border-top:2px solid #EE6420">'+''
        +'<div class="w3-col s5 w3-text-dark-gray">'+json.buy_in+'<span class="bold">:'+a[i].produto_buy_city+'</div>'+''
        +'<div class="w3-col s2 w3-large w3-text-dark-gray"><i class="fa fa-arrows-h"></i></div>'+''
        +'<div class="w3-col s5 w3-text-dark-gray">'+json.deliver_in+'<span class="bold">:'+a[i].produto_delivery_country+'</div>'+''
         +'<div class="w3-col s12 w3-text-dark-gray"><span class="bold w3-right">:'+a[i].produto_price_on_shop+'€</span><span class="w3-right">'+json.price_on_store+'</span></div>'+''
    +'</div>'+''

+'</div>'


}
return insert 
}


/*
              
              for(f=0;f<data.boxes.length;f++){
                $('.journey-box-'+data.boxes[f][0]id).attr('src','img/'+data.boxes[f][0].box)
                $('.journey-letter-'+data.boxes[f][0]id).text(data.boxes[f][0].letter)
              }


*/

function TemplateShowJourneys(a) {

for(i=0;i<a.length;i++){
  state = requestOrderStates(a[i].journey_idestado)
  
  travel=setActiveTravel(a[i].journey_transport)
  
  a[i].journey_from ? a[i].journey_from : a[i].journey_from = json.anywhere
  a[i].journey_stops ? a[i].journey_stops : a[i].journey_stops =''

  insert +=
'<div class="w3-animate-zoom w3-card-4 w3-margin-bottom w3-container-8">'+''
    +'<div class="w3-row w3-text-dark-gray">'+''
        +'<div class="w3-col s5">'+''
            +'<div class="w3-center w3-small">'+''
                +'<img class="requester-pic-2 user-foto" src="https://www.bringobo.com/admin/uploads/users/'+a[i].user_image+'">'+''
                +'<div class="inline w3-amber w3-text-white pd-5-bdr-8">'+''
                  +'<i class="fa fa-star"></i><span class="user-rating-'+a[i].user_id+'">0</span>'+''
                +'</div>'+''
                +'<div class="w3-padding-8-8">'+''
                    +'<span class="bold profile-name">'+a[i].user_nome+'</span>'+''
                    +'<span class="bold profile-level w3-tiny"></span><br>'+''
                +'</div>'+''
            +'</div>'+''
        +'</div>'+''

        +'<div class="w3-col w3-center w3-section s2 details-r-1-'+a[i].journey_id+'">'+''
          +'<div class="w3-padding w3-border-bottom" style="border-left: 1px solid #ccc">'+''
            +'<img src="img/measure-box.png" style="margin:0 auto" class="img-responsive">'+''
            +'<div class="">'+a[i].journey_volume+'<br>cm³</div>'+''
          +'</div>'+''
          +'<div class="w3-padding" style="border-left: 1px solid #ccc">'+''
            +'<img src="img/measure-scale.png" style="margin:0 auto" class="img-responsive">'+''
            +'<div class="">'+a[i].journey_weight+'<br>g</div>'+''
          +'</div>'+''
        +'</div>'+''

        +'<div class="w3-col w3-center w3-section w3-small s5 details-r-1-'+a[i].journey_id+'">'+''
            +'<img src="img/box-custom.png" style="max-height:100px;margin:0 auto"class="img-responsive journey-box-'+a[i].journey_id+'">'+''
            +'<div class="w3-xxxlarge w3-center bold journey-letter-'+a[i].journey_id+'"></div>'+''
        +'</div>'+''

/*hidden*/

        +'<div class="w3-col s6 w3-large w3-section w3-hide details-r-'+a[i].journey_id+'" style="padding-top:16px">'+''
            +'<div class="w3-center w3-col s4">'+''
                +'<span class="w3-badge user-badge w3-indigo w3-tinyxxx"><span class="user-journeys-'+a[i].user_id+'">0</span></span>'+''
                +'<div class="inline w3-light-gray w3-text-dark-gray pd-16-bdr-16">'+''
                    +'<i class="fa fa-plane"></i>'+''
                +'</div>'+''
            +'</div>'+''
            +'<div class="w3-center w3-col s4">'+''
                +'<span class="w3-badge user-badge w3-orange w3-text-white w3-tinyxxx"><span class="user-level-'+a[i].user_id+'">0</span></span>'+''
                +'<div class="inline w3-light-gray w3-text-dark-gray pd-16-bdr-16">'+''
                    +'<i class="fa fa-signal"></i>'+''
                +'</div>'+''
            +'</div>'+''
            +'<div class="w3-center w3-col s4">'+''
                +'<span class="w3-badge user-badge profile-flag w3-transparent" style="background-image: url(\'https://www.bringobo.com/admin/images/flags/'+a[i].user_bandeira.toUpperCase()+'.png\')"></span>'+''
                +'<div class="inline w3-light-gray w3-text-dark-gray pd-16-bdr-16">'+''
                    +'<i class="fa fa-globe"></i>'+''
                +'</div>'+''
            +'</div>'+''
            +'<div class="w3-center user-level-title-'+a[i].user_id+'"></div>'+''
        +'</div>'+''

/*end hidden*/

    +'</div>'+''

    +'<div class="w3-row" style="border-bottom:2px solid #50768F">'+''
        +'<div class="w3-col s6">'+json.journey+' '+json.number+'<br>'+''
            +'<span class="w3-xlarge menu-text">'+a[i].journey_number+'</span>'+''
        +'</div>'+''
        +'<div class="w3-col s3 view-r-'+a[i].journey_id+'">'+''
            +''+json.see_more+'<br><div class="w3-xlarge menu-text w3-center" onclick="showHideRequestDetails(\''+a[i].journey_id+'\')"><i class="fa fa-chevron-down"></i></div>'+''
        +'</div>'+state+''
    +'</div>'+''

/* start hidden*/

+'<div class="w3-hide details-r-'+a[i].journey_id+'">'+''


    +'<div class="w3-row w3-padding-8-8 w3-small">'+''
        +'<div class="bold">'+json.journey.toUpperCase()+' '+json.information.toUpperCase()+'<br>'+''
        +'</div>'+''
        +'<div class="w3-col s12">'+''
          +'<div class="w3-col pd-2-w-auto">'+json.from+'</div>'+''
          +'<div class="w3-col pd-2-w-auto">'+a[i].journey_from+'</div>'+''
        +'</div>'+''
        +'<div class="w3-col s12">'+''
          +'<div class="w3-col pd-2-w-auto">'+json.pass_through+'</div>'+''
          +'<div class="w3-col pd-2-w-auto">:'+a[i].journey_stops+'</div>'+''
        +'</div>'+''
        +'<div class="w3-col s12">'+''
          +'<div class="w3-col pd-2-w-auto">'+json.to+'</div>'+''
          +'<div class="w3-col pd-2-w-auto">'+a[i].journey_to+'</div>'+''
        +'</div>'+''
    +'</div>'+''
    +'<div class="w3-row w3-padding-8-8 w3-small">'+''
      +'<div class="bold">'+json.space.toUpperCase()+' '+json.available.toUpperCase()+'<br>'+''
      +'</div>'+''
      +'<div class="w3-col s12">'+''
        +'<div class="w3-col pd-2-w-auto">'+json.width+'<span style="float:left"><img src="img/measure-horizontal.png" class="img-responsive img-r"></span></div>'+''
        +'<div class="w3-col pd-2-w-auto">:'+a[i].journey_width+'cm</div>'+''
      +'</div>'+''
      +'<div class="w3-col s12">'+''
        +'<div class="w3-col pd-2-w-auto">'+json.height+'<span style="float:left"><img src="img/measure-vertical.png" class="img-responsive img-r"></span></div>'+''
        +'<div class="w3-col pd-2-w-auto">:'+a[i].journey_height+'cm</div>'+''
      +'</div>'+''
      +'<div class="w3-col s12">'+''
        +'<div class="w3-col pd-2-w-auto">'+json.length+'<span style="float:left"><img src="img/icon_comprimento.png" class="img-responsive img-r"></span></div>'+''
        +'<div class="w3-col pd-2-w-auto">:'+a[i].journey_length+'cm</div>'+''
      +'</div>'+''
      +'<div class="w3-col s12">'+''
        +'<div class="w3-col pd-2-w-auto">'+json.volume+'<span style="float:left"><img src="img/measure-box.png" class="img-responsive img-r"></span></div>'+''
        +'<div class="w3-col pd-2-w-auto">:'+a[i].journey_volume+'cm³</div>'+''
      +'</div>'+''
      +'<div class="w3-col s12">'+''
        +'<div class="w3-col pd-2-w-auto">'+json.weight+'<span style="float:left"><img src="img/measure-scale.png" class="img-responsive img-r"></span></div>'+''
        +'<div class="w3-col pd-2-w-auto">:'+a[i].journey_weight+'g</div>'+''
      +'</div>'+''
    +'</div>'+''

    +'<div class="w3-row w3-padding-8-8 w3-small">'+''
      +'<div class="bold">'+json.travel.toUpperCase()+' '+json.information.toUpperCase()+'<br>'+''
      +'</div>'+''
      +'<div class="w3-col s12">'+travel

      +'<div class="w3-col s12 w3-text-dark-gray">'+json.from.toUpperCase()+'<span class="bold">'+a[i].journey_from+'</div>'+''
        +'<div class="w3-col s12 w3-text-dark-gray">'+json.to.toUpperCase()+'<span class="bold">'+a[i].journey_to+'</div>'+''
         +'<div class="w3-col s12 w3-text-dark-gray"><span>'+json.date.toUpperCase()+'</span><span class="bold">'+a[i].journey_date+'</span></div>'+''
      +'</div>'+''
    +'</div>'+''


    +'<div class="w3-padding-8-8"><p class="w3-center">'+''
    +'<button class="btn btn-lg w3-text-white blueish hide-own-user" style="border-radius:46px" onclick="AcceptJourney(\''+a[i].journey_number+'\',\''+a[i].journey_id+'\',\''+localStorage.getItem('idcliente')+'\')">'+json.post_request_match+'</button>'+''
    +'</p></div>'+''

  +'</div>'+''

 /*end hidden*/

    +'<div class="w3-row w3-padding-8-8 w3-medium details-r-1-'+a[i].journey_id+'" style="border-top:2px solid #50768F">'+''
        +'<div class="w3-col s5 w3-text-dark-gray">'+json.from+'<span class="bold">'+a[i].journey_from+'</div>'+''
        +'<div class="w3-col s2 w3-large w3-text-dark-gray"><i class="fa fa-arrow-right"></i></div>'+''
        +'<div class="w3-col s5 w3-text-dark-gray">'+json.to+'<span class="bold">'+a[i].journey_to+'</div>'+''
         +'<div class="w3-col s12 w3-text-dark-gray w3-center"><span>'+json.date+'</span><span class="bold">'+a[i].journey_date+'</span></div>'+''
    +'</div>'+''

+'</div>'
}


return insert

}


function showHideRequestDetails(idclass){

  if($('.details-r-'+idclass).hasClass('w3-hide') ){
    $('.details-r-1-'+idclass).addClass('w3-hide')
    $('.view-r-'+idclass).html(json.see_less+'<br><div class="w3-xlarge menu-text w3-center" onclick="showHideRequestDetails(\''+idclass+'\')"><i class="fa fa-chevron-up"></i></div>')
    $('.details-r-'+idclass).removeClass('w3-hide').addClass('w3-animate-zoom')
  }
  else{
    $('.details-r-1-'+idclass).removeClass('w3-hide')
    $('.view-r-'+idclass).html(json.see_more+'<br><div class="w3-xlarge menu-text w3-center" onclick="showHideRequestDetails(\''+idclass+'\')"><i class="fa fa-chevron-down"></i></div>')
    $('.details-r-'+idclass).addClass('w3-hide').removeClass('w3-animate-zoom')
  }
}



function AcceptRequest(nr,id,user_id){
  alert('Are you sure? That you want to create a Journey to Request Number '+nr+' ID# '+id+' your user id is '+user_id)
}


function AcceptJourney(nr,id,user_id){
  alert('Are you sure? That you want to create a request To Journey Number '+nr+' ID# '+id+' your user id is '+user_id)
}


function requestOrderStates(g){
  switch(g){
    case '0':
      return'<div class="w3-col s3"><span class="w3-right w3-blue pd-5-bdr-8">'+json.open+'</span></div>'
    break 
    case '1':
      return '<div class="w3-col s3"><span class="w3-right w3-blue pd-5-bdr-8">'+json.open+'</span></div>'
    break
    case '2':
      return'<div class="w3-col s3"><span class="w3-right w3-green pd-5-bdr-8">'+json.paid+'</span></div>'
    break 
    case '3':
      return'<div class="w3-col s3"><span class="w3-right w3-red pd-5-bdr-8">'+json.canceled+'</span></div>'
    break
    case '4':
      return'<div class="w3-col s3"><span class="w3-right w3-yellow pd-5-bdr-8">'+json.waiting+'</span></div>'
    break 
    case '5':
      return'<div class="w3-col s3"><span class="w3-right w3-deep-orange pd-5-bdr-8">'+json.complete+'</span></div>'
    break 
  }
}


function setActiveTravel(t){
  travels =''
  tp_travel =['plane','bike','men','ship','car','train']
  for(r = 0; r < tp_travel.length; r++){
    if (t == tp_travel[r])
      travels +='<div class="w3-padding-8-8 w3-border w3-border-indigo w3-col s2"><img class="img-responsive img-center-mh" src="img/'+tp_travel[r]+'.png"></div>'
    else
      travels +='<div class="w3-padding-8-8 w3-col s2"><img class="img-responsive img-center-mh" src="img/'+tp_travel[r]+'.png"></div>'
  }
return travels
}






/*cpo_status*/



/*
<div class="col-lg-12 col-sm-12 py-2 no-padding">
                          <div class="card h-100">
                              <div class="no-padding">
                                  <div class="row border-bottomish no-padding no-margin">
                                      <div class="col-lg-6 col-xs-6">
                                    <div class="card-img-top">
                                        <img src="https://www.bringobo.com/admin/uploads/produtos/desp-coletivos---bola-cliente-cAlAbration.jpg" class="item-requested-img" alt="card image 1">
                                      </div>  <p class="item-requested-name">DESP. COLETIVOS - BOLA CL</p></div>
                                        <div class="col-lg-2 col-xs-2 border-leftish">
                                            <div class="container-fluid no-padding"><div class="row margin-measurement">
                                                        <img src="https://www.bringobo.com/admin/images/icons/measure-box.png" width="20" class="img-responsive center-block" alt="Measure Box">
                                                        <div class="measure">1367631cm³</div>
                                                    </div>
                                                      <div class="row margin-measurement">
                                                        <img src="https://www.bringobo.com/admin/images/icons/measure-scale.png" width="20" class="img-responsive center-block" alt="Measure Scale">
                                                        <div class="measure">111g</div>
                                                    </div></div>
                                  </div>
                                  <div class="col-lg-4 col-xs-4 rightish border-rightish">
                                    <div class="card-img-top">
                                        <img class="user-request-img" src="https://www.bringobo.com/admin/uploads/users/VilaNovadeGaia.jpg" alt="card image 1"> <small><span class="label label-round badge-gold badge-cardish">5<i class="fa fa-star"></i></span></small>

                                    </div>
                                    <p class="item-requested-name">Ruben</p>
                                </div>
                            </div>
                            <div class="d-flex flex-column">
                                <div class="row background-orangish no-margin">
                                    <div class="col-lg-8 col-sm-8 col-xs-8">
                                        <ul class="request-bottom-list "> <li class="color-requested-info">Buy in <span>Decathlon</span></li>
                                              <li class="color-requested-info">Deliver in <span>Portugal</span></li></ul>
                                        </div>
                                        <div class="col-lg-3 col-xs-3 border-rightish">
                                        </div>
                                        <div class="col-lg-4  col-xs-4 darker-orangish">
                                          <ul class="request-bottom-list">
                                              <li class="color-requested-info">Price on Shop</li>
                                              <li class="color-requested-info">4 €</li>
                                          </ul>
                                      </div>
                                    </div>
                                </div>
                            </div>
                          </div>
                      </div>

*/
/*==============================
LINK HOT SLIDESHOW =============
================================*/

slideIndex = 1
function currentDiv(n) {
  showDivs(slideIndex = n)
}

function showDivs(n) {
  x = document.getElementsByClassName("slide-hot")
  dots = document.getElementsByClassName("hot-img")
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none"
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" w3-white", "")
  }
  x[slideIndex-1].style.display = "block"
  dots[slideIndex-1].className += " w3-white"
}


/*==============================
NEW JOURNEYS OR REQUEST ========
================================*/


function addNewJorneyOrRequest(){
  $.ajax({
    url: "newjourney_request.html",
    success:function(html){
      $('#newjourneyrequest').html(html).addClass('w3-hide')
    },
    error:function(){}
  })
  .done(function() {
    setLanguage()
    setTimeout(function(){
      $('#newjourneyrequest,.animate').removeClass('w3-hide')
    }, 100)
  })
}


function clearNewJorneyOrRequest(){
  $('#newjourneyrequest').empty()
}

function imgError(image) {
    image.onerror = ""
    image.src = "img/noimage.png"
    return true
}

/*=========================================
ADD ALL COUNTRIES TO CONTAINER  ===========
===========================================*/

function createCountries(){
  countries_letters=[]
  uniques = []
  insert=''

  $('.w3-overlay').show()

  $.ajax({ 
    url:url+'rquest=getMyCountries',
    type:'GET',
    cache:false,
    dataType:'json',

    success: function(dat){
      $('.w3-overlay').hide()
      if(dat.status=='success'){

        for(i=0;i<dat.all.length;i++){

          if (dat.all[i].lang_code === undefined ||!dat.all[i].lang_code)
            img = 'img/noimage.png'
          else if (dat.all[i].lang_code == "EN") img ='https://www.bringobo.com/app_api/countries/GB.jpg'
          else
            img = 'https://www.bringobo.com/app_api/countries/'+dat.all[i].lang_code+'.jpg'
          insert +='<div class="w3-display-container w3-card-2 w3-medium"><img class="img-home" src="'+img+'" onerror="imgError(this)"><div class="w3-display-bottomleft w3-padding-large w3-black-40 w3-text-white" style="border-top-right-radius:4px"><span class="bold country"> '+dat.all[i].country_name+'</span></div></div><div class="w3-container w3-light-gray w3-padding-16 w3-text-gray w3-medium"><div class="w3-col s4 w3-bar-item" onclick="getCountryRequestJourney(\'Request\',\''+dat.all[i].country_name+'\',\'r_'+dat.all[i].lang_code+'\')"><p class="t-a-c"><img class="img-responsive img-left_menu" src=img/requests.png><span class="bold r_'+dat.all[i].lang_code+'">0</span></p></div><div class="w3-col s4 w3-bar-item" onclick="getCountryRequestJourney(\'Journey\',\''+dat.all[i].country_name+'\',\'j_'+dat.all[i].lang_code+'\')"><p class="t-a-c"><img class="img-responsive img-left_menu" src=img/journeys.png><span class="bold j_'+dat.all[i].lang_code+'">0</span></p></div><div class="w3-col s4 w3-bar-item w3-hide" onclick="getCountryRequestJourney(\'like\',\''+dat.all[i].country_name+'\')"> <p class="t-a-c"><img class="img-responsive img-left_menu" src=img/like.png><span class="bold count_like"> '+dat.all[i].like+'</span></p></div></div>'
          countries_letters.push(dat.all[i].country_name.charAt(0).toUpperCase())          
          }

        $('.countries-container').html(insert)

        for(j=0;j<dat.r_active.length;j++){
          $('.r_'+dat.r_active[j].lang_code).html(dat.r_active[j].requests_active)
        }

        for(t=0;t<dat.t_active.length;t++){

          if(dat.t_active[t].short_name_to == 'GB')
            dat.t_active[t].short_name_to ='EN'
          
          v = parseInt($('.j_'+dat.t_active[t].short_name_to).text())
          $('.j_'+dat.t_active[t].short_name_to).text(parseInt(dat.t_active[t].journey_to_active) + v)
        }

        for(g=0;g<dat.f_active.length;g++){
          if(dat.f_active[g].short_name_from == 'GB')
            dat.f_active[g].short_name_from ='EN'
          v = parseInt($('.j_'+dat.f_active[g].short_name_from).text())
          $('.j_'+dat.f_active[g].short_name_from).text(parseInt(dat.f_active[g].journey_from_active) +v)
        }

        $.each(countries_letters, function(i, el){

          if($.inArray(el, uniques) === -1) uniques.push(el)
        })

        createCountriesButtons(uniques)

      }
    },
    error: function(){
      $('.w3-overlay').hide()
      $('#info-client').modal()
      $('.info-client-header').html('<span class="w3-text-red"><i class="fa fa-exclamation-triangle"></i> '+json.check+'</span>')
      $('.info-client-txt').html(json.no_wifi)
    }
  })
}


/*=========================================
ADD ALL BUTTONS COUNTRIES TO SELECT =======
===========================================*/

function createCountriesButtons(c){
  obj=''
  for(i=0;i<c.length;i++){
      obj +='<div id="country-'+i+'" class="w3-light-grey countries w3-card-2" title="'+c[i]+'" onclick="fetchCountryRequestJourneyReviews(this)"><span class="w3-text-blue menu-text pd-8">'+c[i]+'</span></div>'
    }
  $('.countries_selector').html(obj)
}


function fetchCountryRequestJourneyReviews(obj){
  insert = ''
  data = ''
  $('.w3-overlay').show()
  setTimeout(function(){ 
    $.ajax({ 
      url:url+'rquest=getCountriesRequestsByFirstLetter&country='+obj.title,
      type:'GET',
      cache:false,
      dataType:'json',
      success: function(dat){
        
        if(dat.status=='success'){
          $('.w3-overlay').hide()
          for(i=0;i<dat.all.length;i++){
            if (dat.all[i].lang_code === undefined ||!dat.all[i].lang_code)
                img = 'img/noimage.png'
            else if (dat.all[i].lang_code == "EN") img ='https://www.bringobo.com/app_api/countries/GB.jpg'
            else
                img = 'https://www.bringobo.com/app_api/countries/'+dat.all[i].lang_code+'.jpg'
          
              insert +='<div class="w3-display-container w3-card-2 w3-medium"><img class="img-home" src="'+img+'" onerror="imgError(this)"><div class="w3-display-bottomleft w3-padding-large w3-black-40 w3-text-white" style="border-top-right-radius:4px"><span class="bold country"> '+dat.all[i].country_name+'</span></div></div><div class="w3-container w3-light-gray w3-padding-16 w3-text-gray w3-medium"><div class="w3-col s4 w3-bar-item" onclick="getCountryRequestJourney(\'Request\',\''+dat.all[i].country_name+'\',\'r_'+dat.all[i].lang_code+'\')"><p class="t-a-c"><img class="img-responsive img-left_menu" src=img/requests.png><span class="bold r_'+dat.all[i].lang_code+'">0</span></p></div><div class="w3-col s4 w3-bar-item" onclick="getCountryRequestJourney(\'Journey\',\''+dat.all[i].country_name+'\',\'j_'+dat.all[i].lang_code+'\')"><p class="t-a-c"><img class="img-responsive img-left_menu" src=img/journeys.png><span class="bold j_'+dat.all[i].lang_code+'">0</span></p></div><div class="w3-col s4 w3-bar-item w3-hide" onclick="getCountryRequestJourney(\'like\',\''+dat.all[i].country_name+'\')"> <p class="t-a-c"><img class="img-responsive img-left_menu" src=img/like.png><span class="bold count_like"> '+dat.all[i].like+'</span></p></div></div>'      
          }

          $('.countries-container').html(insert)

          for(j=0;j<dat.r_active.length;j++){
            $('.r_'+dat.r_active[j].lang_code).html(dat.r_active[j].requests_active)
          }
          
          for(t=0;t<dat.t_active.length;t++){
            if(dat.t_active[t].short_name_to == 'GB')
              dat.t_active[t].short_name_to ='EN'
              v = parseInt($('.j_'+dat.t_active[t].short_name_to).text())
              $('.j_'+dat.t_active[t].short_name_to).text(parseInt(dat.t_active[t].journey_to_active) + v)
          }

          for(g=0;g<dat.f_active.length;g++){
            if(dat.f_active[g].short_name_from == 'GB')
              dat.f_active[g].short_name_from ='EN'
            v = parseInt($('.j_'+dat.f_active[g].short_name_from).text())
            $('.j_'+dat.f_active[g].short_name_from).text(parseInt(dat.f_active[g].journey_from_active) +v)
          }

          $("html, body").animate({ scrollTop: $('#modal-menu').offset().top }, 1000)
          $('.countries').removeClass('activated w3-animate-right')
          $('#'+obj.id).addClass('activated w3-animate-right')
        }

        else{
          $('#info-client').modal()
          $('.info-client-header').html('<span class="w3-text-blue"><i class="fa fa-info-circle"></i> '+json.check+'</span>')
          $('.info-client-txt').html(json.no_results)
        }
      },
      error: function(){
        $('.w3-overlay').hide()
        $('#info-client').modal()
        $('.info-client-header').html('<span class="w3-text-red"><i class="fa fa-exclamation-triangle"></i> '+json.check+'</span>')
        $('.info-client-txt').html(json.no_wifi)
      }
    })
  },750)
}



/*====================================
GET TERMS CONDITONS TO USER   =========
======================================*/

function getTermsConditions(){
  $('#modal-menu').modal('hide')
  $('.w3-overlay').show()  
  setTimeout(function(){ 
    $.ajax({ 
      url:url+'rquest=getTerms',
      type:'GET',
      cache:false,
      dataType:'json',
      success: function(data){
        $('.w3-overlay').hide()
        if(data.status=='success'){
          $('#modal-terms-conditions .modal-body').html(data.data.termos_condicoes)
          $('#modal-terms-conditions').show()
         }
      },
      error: function(){
        $('.w3-overlay').hide()
        $('#info-client').modal()
        $('.info-client-header').html('<span class="w3-text-red"><i class="fa fa-exclamation-triangle"></i> '+json.check+'</span>')
        $('.info-client-txt').html(json.no_wifi)
      }
    })
  },750)
}

/*==============================================
SHOW ALL CAT IN HOT TO CONTAINER  ==============
================================================*/

function linkHotShowAll(v){
  $('.item-'+v).removeClass('w3-hide')
  $('.'+v).addClass('w3-hide')
}

/*==============================================
ADD ALL POPULAR ARTICLES TO CONTAINER  ===========
================================================*/

function createPopularArticles(){
  $('.w3-overlay').show()
  $.ajax({ 
    url:url+'rquest=getPopularArticles',
    type:'GET',
    cache:false,
    dataType:'json',

    success: function(data){
      insert=''
      insert0=''
      data.data.length == null || data.data.length < 1 ?
        $('.popular_articles').addClass('w3-hide') : 
        $('.popular_articles').removeClass('w3-hide')
      if(data.status=='success'){

        for(i=0;i<data.data.length;i++){
          
          data.data[i].imagem_editada === undefined ||!data.data[i].imagem_editada ? data.data[i].image = 'img/noimage.png' : data.data[i].imagem_editada = 'https://bringobo.com/admin/uploads/produtos/'+data.data[i].imagem_editada
          data.data[i].preco === undefined ||!data.data[i].preco ? data.data[i].preco = 0 : data.data[i].preco
          data.data[i].produto === undefined ||!data.data[i].produto ? data.data[i].produto = 0 : data.data[i].produto

          if (i < 3){
          insert +='<div class="w3-round-large item-pop-art w3-card-2 scroll-h-size" onclick="seeDetailsPopularArticles(\''+data.data[i].link_produto+'\')"><div class="hot-img-prod w3-round-large w3-display-container w3-small" style="background-image:url('+data.data[i].imagem_editada+')"><div class="w3-display-bottomleft w3-padding-small w3-black-40 bd-bl-bt-r"><div class="country text-max-size"><span class="w3-medium bold">'+data.data[i].produto+'</span><br><span class="w3-small">'+json.price_on_store+'</span><span class="w3-small"> - '+parseInt(data.data[i].preco).toFixed(2)+'€</div></div></div></div></div>'
            insert0 +='<span style="margin:0px 3px"class="w3-badge item-pop-art hot-img w3-border w3-light-gray w3-hover-white"></span>'
          }
          else {
            insert +='<div class="w3-round-large item-pop-art w3-hide w3-card-2 scroll-h-size" onclick="seeDetailsPopularArticles(\''+data.data[i].link_produto+'\')"><div class="hot-img-prod w3-round-large w3-display-container w3-small" style="background-image:url('+data.data[i].imagem_editada+')"><div class="w3-display-bottomleft w3-padding-small w3-black-40 bd-bl-bt-r"><div class="country text-max-size"><span class="w3-medium bold">'+data.data[i].produto+'</span><br><span class="w3-small">'+json.price_on_store+'</span><span class="w3-small"> - '+parseInt(data.data[i].preco).toFixed(2)+'€</div></div></div></div></div>'
            insert0 +='<span style="margin:0px 3px"class="w3-hide item-pop-art w3-badge hot-img w3-border w3-light-gray w3-hover-white"></span>'
          }
      }

      $('#popular_articles').html(insert)

      $('#popular_articles_count').html(insert0)
      createRecomendationsByTravellers()
    }
    else 
      createRecomendationsByTravellers()
    },
    error: function(){
      $('.w3-overlay').hide()
      $('#info-client').modal()
      $('.info-client-header').html('<span class="w3-text-red"><i class="fa fa-exclamation-triangle"></i> '+json.check+'</span>')
      $('.info-client-txt').html(json.no_wifi)
    }
  })
}

  function seeDetailsPopularArticles(link){
    alert('#Link from Popular Article is: ' + link)
  }

/*=============================================================
ADD ALL RECOMENDATION FROM TRAVELLERS TO CONTAINER  ===========
==============================================================*/

  function createRecomendationsByTravellers(){

  $.ajax({ 
    url:url+'rquest=getRecomendedProducts',
    type:'GET',
    cache:false,
    dataType:'json',

    success: function(data){
      insert=''
      insert0=''
      data.data.length == null || data.data.length < 1 ?
        $('.recomendations_by_travellers').addClass('w3-hide') : 
        $('.recomendations_by_travellers').removeClass('w3-hide')
      if(data.status=='success'){

        for(i=0;i<data.data.length;i++){
          
          data.data[i].imagem_editada === undefined ||!data.data[i].imagem_editada ? data.data[i].image = 'img/noimage.png' : data.data[i].imagem_editada = 'https://bringobo.com/admin/uploads/produtos/'+data.data[i].imagem_editada
          data.data[i].preco === undefined ||!data.data[i].preco ? data.data[i].preco = 0 : data.data[i].preco
          data.data[i].produto === undefined ||!data.data[i].produto ? data.data[i].produto = 0 : data.data[i].produto

          if (i < 3){
          insert +='<div class="w3-round-large item-rec-trav w3-card-2 scroll-h-size" onclick="seeRecomendationsByTravellers(\''+data.data[i].link_produto+'\')"><div class="hot-img-prod w3-round-large w3-display-container w3-small" style="background-image:url('+data.data[i].imagem_editada+')"><div class="w3-display-bottomleft w3-padding-small w3-black-40 bd-bl-bt-r"><div class="country text-max-size"><span class="w3-medium bold">'+data.data[i].produto+'</span><br><span class="w3-small">'+json.price_on_store+'</span><span class="w3-small"> - '+parseInt(data.data[i].preco).toFixed(2)+'€</div></div></div></div></div>'
          insert0 +='<span style="margin:0px 3px"class="w3-badge item-rec-trav hot-img w3-border w3-light-gray w3-hover-white"></span>'
          }
          else {
            insert +='<div class="w3-round-large item-rec-trav w3-hide w3-card-2 scroll-h-size" onclick="seeRecomendationsByTravellers(\''+data.data[i].link_produto+'\')"><div class="hot-img-prod w3-round-large w3-display-container w3-small" style="background-image:url('+data.data[i].imagem_editada+')"><div class="w3-display-bottomleft w3-padding-small w3-black-40 bd-bl-bt-r"><div class="country text-max-size"><span class="w3-medium bold">'+data.data[i].produto+'</span><br><span class="w3-small">'+json.price_on_store+'</span><span class="w3-small"> - '+parseInt(data.data[i].preco).toFixed(2)+'€</div></div></div></div></div>'
            insert0 +='<span style="margin:0px 3px"class="w3-hide item-rec-trav w3-badge hot-img w3-border w3-light-gray w3-hover-white"></span>'
          }
      }

      $('#recomendations_by_traveller').html(insert)
      $('#recomendations_by_traveller_count').html(insert0)
      createTopTravellers()
    }
    else 
      createTopTravellers()
    },
    error: function(){
      $('.w3-overlay').hide()
      $('#info-client').modal()
      $('.info-client-header').html('<span class="w3-text-red"><i class="fa fa-exclamation-triangle"></i> '+json.check+'</span>')
      $('.info-client-txt').html(json.no_wifi)
    }
  })

}

  function seeRecomendationsByTravellers(link){
    alert('#Link from Recomendations By Travellers is: ' + link)
  }

/*==============================================
ADD ALL TOP TRAVELLERS TO CONTAINER  ===========
================================================*/

  function createTopTravellers(){ 

  $.ajax({ 
    url:url+'rquest=getTopTravellers',
    type:'GET',
    cache:false,
    dataType:'json',
    success: function(data){
      insert=''
      insert0=''
      data.data.length == null || data.data.length < 1 ?
        $('.top_traveller').addClass('w3-hide') : 
        $('.top_traveller').removeClass('w3-hide')
      if(data.status=='success'){
        for(i=0;i<data.data.length;i++){

 data.data[i].reviews === undefined ||!data.data[i].reviews ? data.data[i].reviews = 0 : data.data[i].reviews

          if (i < 3){
           insert +='<div class="w3-round-large item-top-trav w3-light-gray scroll-h-size-2 w3-center" onclick=""><img class="requester-pic-3 img-responsive" onerror="imgError(this)" src="https://www.bringobo.com/admin/uploads/users/'+data.data[i].imagem+'"><span class="w3-medium bold country">'+data.data[i].nome+'</span><br><div class="w3-col s4 w3-small w3-amber w3-text-white pd-5-bdr-8"><i class="fa fa-star"></i> '+parseFloat(data.data[i].rating).toFixed(1)+' </div><div class="w3-col s8 w3-tiny w3-text-dark-gray"><span style="margin-left:4px"> ('+data.data[i].reviews+'<span> '+json.reviews+'</span>)</span></div></div>'
            insert0 +='<span style="margin:0px 3px"class="w3-badge item-top-trav hot-img w3-border w3-light-gray w3-hover-white"></span>'
          }
          else {
            insert +='<div class="w3-round-large item-top-trav w3-hide w3-light-gray scroll-h-size-2 w3-center" onclick="seeDetailsTopTraveller()"><img class="requester-pic-3 img-responsive" onerror="imgError(this)" src="https://www.bringobo.com/admin/uploads/users/'+data.data[i].imagem+'"><span class="w3-medium bold country">'+data.data[i].nome+'</span><br><div class="w3-col s4 w3-small w3-amber w3-text-white pd-5-bdr-8"><i class="fa fa-star"></i> '+parseFloat(data.data[i].rating).toFixed(1)+' </div><div class="w3-col s8 w3-tiny w3-text-dark-gray"><span style="margin-left:4px"> ('+data.data[i].reviews+'<span> '+json.reviews+'</span>)</span></div></div>'
            insert0 +='<span style="margin:0px 3px"class="w3-badge item-top-trav w3-hide hot-img w3-border w3-light-gray w3-hover-white"></span>'
          }
       
      }

      $('#top_travellers').html(insert)
      $('#top_travellers_count').html(insert0)
      
      $('.w3-overlay').hide()
    }
    else
      $('.w3-overlay').hide()
    },
    error: function(){
      $('.w3-overlay').hide()
      $('#info-client').modal()
      $('.info-client-header').html('<span class="w3-text-red"><i class="fa fa-exclamation-triangle"></i> '+json.check+'</span>')
      $('.info-client-txt').html(json.no_wifi)
    }
  })

}

function seeDetailsTopTraveller(link){
  alert('#ID from traveller is: ' + link)
}


/*=========================================
USER REQUESTS JOPURNEY REVIEWS  ===========
===========================================*/

function getUserRequestJourneysReviews (tipo,id){


/*
tipp =  tipo de pedido -> request ou journey ou reviews
id = o id do utilizador
*/

if (tipo == 'Request')
 url_add = url+'rquest=getUser'+tipo+'s&userid='+id 

else if (tipo =='Journey')
  url_add = url+'rquest=getUser'+tipo+'s&userid='+id

else 
  url_add = url+'rquest=getUser'+tipo+'s&userid='+id

  $('.w3-overlay').show()
  insert=''
  $.ajax({
    url: url_add,
    type:'GET',
    cache:false,
    dataType:'json',
    success: function(data){
              console.log(data)

      if (data.status == 'success' && data.total_record > 0){
        if(tipo == 'Request'){
        insert = TemplateShowRequests(data.data)
        $.ajax({
          url: tipo+"_country.html",
            success:function(html){
              $('#menu-main-page').html(html)
              $('.searched-country').html(localStorage.getItem("nome"))
              $('.container-request').html(insert)

              for(j=0;j<data.rating.length;j++)
                 $('.user-rating-'+data.rating[j].idcliente_received).text(parseFloat(data.rating[j].rating).toFixed(1))

              for(y=0;y<data.level.length;y++){
                $('.user-level-'+data.level[y].user_id).text(data.level[y].level)
                $('.user-level-title-'+data.level[y].user_id).text(data.level[y].level_title)
                $('.user-journeys-'+data.level[y].user_id).text(data.level[y].journeys)
               }



            }
        })
        .done(function(){
          $('.hide-own-user').hide()
          setLanguage()
          setTimeout(function(){
            $('.w3-overlay').hide()
            $('#menu-main-page').show()
          }, 100)
        })
      }


  else if(tipo == 'Journey'){
        insert = TemplateShowJourneys(data.data)
        $.ajax({
          url: tipo+"_country.html",
            success:function(html){
              $('#menu-main-page').html(html)
              $('.searched-country').html(localStorage.getItem("nome"))
              $('.container-journey').html(insert)
              
              for(f=0;f<data.boxes.length;f++){
                $('.journey-box-'+data.boxes[f][0].id).attr('src','img/'+data.boxes[f][0].box)
                $('.journey-letter-'+data.boxes[f][0].id).text(data.boxes[f][0].letter.toUpperCase())
              }

              for(j=0;j<data.rating.length;j++)
                $('.user-rating-'+data.rating[j].idcliente_received).text(parseFloat(data.rating[j].rating).toFixed(1))
              
              for(y=0;y<data.level.length;y++){
                $('.user-level-'+data.level[y].user_id).text(data.level[y].level)
                $('.user-level-title-'+data.level[y].user_id).text(data.level[y].level_title)
                $('.user-journeys-'+data.level[y].user_id).text(data.level[y].journeys)
               }

            }
        })
        .done(function(){
          $('.hide-own-user').hide()
          setLanguage()
          setTimeout(function(){
            $('.w3-overlay').hide()
            $('#menu-main-page').show()
          }, 100)
        })
      }

    }

    },
    error: function(data){
        $('.w3-overlay').hide()
        $('#info-client').modal()
        $('.info-client-header').html('<span class="w3-text-red"><i class="fa fa-exclamation-triangle"></i> '+json.check+'</span>')
        $('.info-client-txt').html(json.no_wifi)
      }
    })
}



/*=========================================
USER SEARCH MESSAGES OR USERS  ============
===========================================*/

function searchMessagesFromUser(v){

/*SEARCH AVAILABLE IF INPUT BIGGER THAN 3 CHARATERS*/

 if(v.length < 3 ){
          $('#info-client').modal()
          $('.info-client-header').html('<span class="w3-text-amber"><i class="fa fa-exclamation-triangle"></i> '+json.check+'</span>')
          $('.info-client-txt').html(json.min_3_charaters)
        }
else{

  $('.w3-overlay').show()
  insert=''

data = [{"id":"1","date":"12:00 02/01/2017","image":"avatar0.png","message":"This is a message 1!","user":"Mario Alf"},
{"id":"2","date":"14:00 12/11/2016","image":"avatar1.png","message":"This is  another message !","user":"Marta Paul"},
{"id":"3","date":"19:03 11/08/2016","image":"avatar2.png","message":"This is yet another message !","user":"John Walker"},
{"id":"4","date":"17:49 12/01/2018","image":"avatar0.png","message":"This is a message 1!","user":"Alfredo M."},
{"id":"5","date":"15:11 29/10/2016","image":"avatar1.png","message":"This is  another message !","user":"Paulo Martins"},
{"id":"6","date":"22:03 05/08/2016","image":"avatar2.png","message":"This is yet another message !","user":"Walker Lone"}
]

    setTimeout(function(){ 
     
/*
      $.ajax({ 
        url:url+'rquest=searchMessagesUsers&userid='+localStorage.getItem('idcliente')+'&search='+v,
        type:'GET',
        cache:false,
        dataType:'json',
        success: function(data){
*/


          $('.w3-overlay').hide()
          //if(data.status=='success'){
          if(data){

            for(i=0;i<data.length;i++){
              insert +='<div class="w3-row w3-text-dark-gray w3-white w3-border-top"><div class="scrollmenu"><div style="width:133.3333333%"><div class="w3-col w3-container-8 s2 w3-white" ><img class="w3-section img-circle img-responsive" style="max-height: 65px"src="images/'+data[i].image+'"></div><div class="w3-col s8 w3-container-8 w3-xsmall"><p class="mrg-4"><span class="bold">'+data[i].user+'</span><span class="bold w3-right w3-tinyxxx" style="margin-right: 4em">'+data[i].date+'</span></p><p class="mrg-4">'+data[i].message+'</p></div><div class="w3-col s2" style="padding: 2em 0% 0% 0%"><div class="w3-button w3-large w3-circle w3-ripple w3-red" onclick="userDeletesMessage('+data[i].id+')"> <i class="w3-center fa fa-trash"></i></div></div></div></div></div>'
            }
            
            $('.user-messages-container').html(insert)
          }
          
          else{
            $('#info-client').modal()
            $('.info-client-header').html('<span class="w3-text-amber"><i class="fa fa-exclamation-triangle"></i> '+json.check+'</span>')
            $('.info-client-txt').html(data.message+'<br>'+json.check_try_again)
          }
/*
        },
        error: function(data){


          $('.w3-overlay').hide()
          $('#info-client').modal()
          $('.info-client-header').html('<span class="w3-text-red"><i class="fa fa-exclamation-triangle"></i> '+json.check+'</span>')
          $('.info-client-txt').html(json.no_wifi)
        }
      }) */
    },750)
  }
}


function userDeletesMessage(id_message){
 alert(id_message)
}

function getUserProfile(){ 

  $('.w3-overlay').show()
  setTimeout(function(){ 
    $.ajax({ 
      url:url+'rquest=getUserProfile&id='+localStorage.getItem('idcliente'),
      type:'GET',
      cache:false,
      dataType:'json',
      success: function(data){
        insert=''
        $('.w3-overlay').hide()

        if(data.status=='success'){
console.log(data)
          !data.data.journeys ? data.data.journeys = 0 : data.data.journeys
          !data.data.total_rating ? data.data.total_rating = 0 : data.data.total_rating
          !data.data.balance ? data.data.balance = 0 : data.data.balance
          !data.data.level ? data.data.level = 0 : data.data.level
          !data.data.level_title ? data.data.level_title ="Beginner" : data.data.level_title

          data.data.imagem_editada == "noimage.png" ? data.data.imagem_editada = 'img/noimage.png' : data.data.imagem_editada = "https://www.bringobo.com/admin/uploads/users/"+data.data.imagem_editada
          insert = '<div class="w3-row w3-padding-8-8 w3-text-dark-gray"><div class="w3-col s6"><div style="margin-left:4px" class="w3-center w3-small"><img class="requester-pic-2" style="float:left;height:60px;width:60px;border:1px solid #777" src="'+data.data.imagem_editada+'"><div style="padding-top: 18px"><span class="bold profile-name">'+data.data.username+'</span><br><span class="bold profile-level w3-tiny">'+data.data.level_title+' </span><div class="inline w3-amber w3-text-white pd-5-bdr-8"><i class="fa fa-star"></i> '+parseFloat(data.data.total_rating).toFixed(1)+'</div></div></div></div><div class="w3-col s6 w3-large w3-section" style="padding-top:16px"><div class="w3-center w3-col s4"><span class="w3-badge user-badge w3-indigo w3-tinyxxx">'+data.data.journeys+'</span><div class="inline w3-light-gray w3-text-dark-gray pd-16-bdr-16"><i class="fa fa-plane"></i></div></div><div class="w3-center w3-col s4"><span class="w3-badge user-badge w3-orange w3-text-white w3-tinyxxx">'+data.data.level+'</span><div class="inline w3-light-gray w3-text-dark-gray pd-16-bdr-16"><i class="fa fa-signal"></i></div></div><div class="w3-center w3-col s4"><span class="w3-badge user-badge profile-flag w3-transparent"></span><div class="inline w3-light-gray w3-text-dark-gray pd-16-bdr-16"><i class="fa fa-globe"></i> </div></div></div></div>'
          
          insert +='<div class="w3-row w3-padding-8-8 w3-gray w3-border-bottom w3-small"><div class="w3-col s12"><p class="w3-center"><span>'+json.account_balance+'</span><span class="bold w3-xlarge">'+parseFloat(data.data.balance).toFixed(2)+'€</span></p></div></div>'
          
          $('.user-profile-container').html(insert).addClass('w3-animate-zoom')
          
          $('.profile-flag').css('background-image','url(https://www.bringobo.com/admin/images/flags/'+data.data.iso.toUpperCase()+'.png)')
         
         }
    },
    error:function(data){
          $('.w3-overlay').hide()
          $('#info-client').modal()
          $('.info-client-header').html('<span class="w3-text-red"><i class="fa fa-exclamation-triangle"></i> '+json.check+'</span>')
          $('.info-client-txt').html(json.no_wifi)
      }
  })
  },750)
}



/*====================================
========  IMAGE CROPPER FIT SIZE======
======================================*/

ws = window.innerWidth/1.5
hs = window.innerHeight/4



function demoUpload() {
  var $uploadCrop
  function readFile(input) {
    if (input.files && input.files[0]) {
       var reader = new FileReader()
             
                reader.onload = function (e) {
                    $('.upload-demo').addClass('ready')
                    $uploadCrop.croppie('bind', {
                        url: e.target.result
                    }).then(function(){
                        console.log('jQuery bind complete')
                    })
                }
                reader.readAsDataURL(input.files[0])
            }
            else {
                alert("Sorry - Your Device doesn't support the FileReader API")
            }
        }

        $uploadCrop = $('#upload-demo').croppie({
            viewport: {
                width: ws-40,
                height: hs-25,
                type: 'square'
            },
      boundary: {
        width: ws,
        height: hs
      },
      enforceBoundary: false
        })

        $('#upload').on('change', function () { readFile(this); })
        $('.upload-result').on('click', function (ev) {
            $uploadCrop.croppie('result', {
                type: 'canvas',
                size: 'viewport'
            }).then(function (resp) {
                popupResult({
                    src: resp
                })
            })
        })
    }


/*==========================================
========  IMAGE CROPPER FIT SHOW RESULT=====
============================================*/

function popupResult(result) {   
  var html
   if (result.src) {
    html = '<img class="img-responsive" style="margin:0 auto" src="' + result.src + '" /><input type="hidden" value="'+result.src+'" id="r-image-b64">';
    $('#show-img-result').html(html)
  }
}
