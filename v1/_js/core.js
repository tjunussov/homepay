var prevState = "index.html";
	$(window).bind('popstate', function (e) {

		var fname = location.href.split('/').pop();
		
		if(fname != prevState) prevState = fname; 
		else return false;
		
		if(fname == 'index.html') fname = 'index.html#index';
		
		$.get(fname, function(data) {
			$('#slider').slideBackTo(data);
		});
		
		return false;
	});

	$('#slider button, a').live("click",function() {
		var l = this.getAttribute("href");
		if(!l) return;
		
		if(l.indexOf("#") == 0 ) l = l.replace('.html','');
		
		history.pushState({ path: this.path }, '', l);
	
		prevState = l;
		
		$.get(l, function(data) {
		  $('#slider').slideTo(data);
		})
		
		return false;
	})

$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
   if(originalOptions.url.lastIndexOf("#") > -1) {
   	  jqXHR.abort();
   	  myId = ''+originalOptions.url.substr(originalOptions.url.lastIndexOf("#"));
	  $(myId).each(function(){
		 originalOptions.success($(this).html());
		 window.setTimeout(function(){ 
			console.log('trigger ' + myId);
			$(myId).trigger('onAjaxContentLoad'); 
		 },500); // bug with display
	  });
   }
});
/*
$.ajax( url, {
  dataType: "xml text mydatatype",
  converters: {
    "xml text": function( xmlValue ) {
      // Extract relevant text from the xml document
      return $(a).find(".frame-center");
    }
  }
});
*/

var Service = {
	'request_data':
	{
	  "result": "FOUND",
	  "request": "000",
	  "service": "Получения пасспорта Республики Казахстан",
	  "cost": 10104,
	  "commission":10,
	  "pshep":{
		"nk":"НК по Алмалискому району, г Алматы, Республика Казахстан",
		"payer":"ЗАКИРЬЯНОВ ЭЛЬДАР АМАНГЕЛЬДИНОВИЧ",
		"beneficar":{
			"ЦОН":"РГУ «Центр обслуживания населения г. Астана р-на Алматы",
			"Адрес ЦОН":"г. Астана, ул. Мирзояна, 25"
		}
	  }
	}
};