Template.postItem.helpers({
  date: function() {

  	var ma_date = new Date();
  	var time = Date.parse(ma_date)-Date.parse(this.submit_date);
  	var d, h, m, s;
	  s = Math.floor(time / 1000);
	  m = Math.floor(s / 60);
	  s = s % 60;
	  h = Math.floor(m / 60);
	  m = m % 60;
	  d = Math.floor(h / 24);
	  h = h % 24;
	  var custom_date;

	  
	  if(s>0 && m==0 && h ==0 && d==0)
	  {
	  	custom_date = s+'s';
	  }
	  else if(s>0 && m>0 && h == 0 && d== 0)
	  {
	 	
	 	if(m>1)
	 	{
	 		custom_date = m+'mins';
	 	}
	 	else
	 	{
	 		custom_date = m+'min';
	 	}
	  }
	  else if(s>0 && m>0 && h>0 && d==0)
	  {
	  	custom_date =  h+'h';
	  }
	  else if(s>0 && m>0 && h>0 && d>0)
	  {
	  	
	  	if(d>1)
	  	{
	  		custom_date = d+' jrs';
	  	}
	  	else
	  	{
	  		custom_date = d+' jr';
	  	}
	  }
	  else
	  {
	  	custom_date = "now"; 
	  }
  	
	  return custom_date;
  }
});




